import { useContext, useEffect, useState, createContext } from "react";

import { useRouter } from "next/router";

import axios from "axios";

export type SlideContextPayload = null | {
	currentSlide: number;
	slides: string[];
	prev?: string;
	next?: string;
	setSteps: (steps: number) => void;
	currentStep: number;
};

const SlidesContext = createContext<SlideContextPayload | undefined>(undefined);

function useSlidesNames() {
	const [slides, setSlides] = useState<string[]>([]);
	useEffect(() => {
		axios.get("/api/slides").then((res) => {
			setSlides(res.data);
		});
	}, []);
	return slides;
}

function getSlideIndex(pathname: string, slidesNames: string[]) {
	return slidesNames.findIndex((slideName) => pathname.includes(slideName));
}

function getStepDiffByKey(key: KeyboardEvent["key"]) {
	switch (key) {
		case "ArrowLeft":
			return -1;
		case "ArrowRight":
			return 1;
		default:
			return 0;
	}
}

function useSlideControls(slides: string[]) {
	const router = useRouter();
	const [steps, setSteps] = useState(1);
	const [currentStep, setCurrentStep] = useState(0);

	const currentSlide = getSlideIndex(router.pathname, slides);
	const prev = currentSlide > 0 ? slides[currentSlide - 1] : undefined;
	const next = currentSlide < slides.length - 1 ? slides[currentSlide + 1] : undefined;

	useEffect(() => {
		setSteps(1);
	}, [router.pathname]);

	useEffect(() => {
		if (currentStep === -1) setCurrentStep(steps - 1);
	}, [steps, currentStep]);

	useEffect(() => {
		if (!slides) return;
		const step = currentStep == -1 ? 0 : currentStep;
		const handleKeyDown = (e: KeyboardEvent) => {
			const newCurrentStep = getStepDiffByKey(e.key) + step;
			if (newCurrentStep < 0) {
				if (prev) {
					router.push(`/slides/${prev}`);
					setCurrentStep(-1);
				}
			} else if (newCurrentStep >= steps) {
				if (next) {
					router.push(`/slides/${next}`);
					setCurrentStep(0);
				}
			} else {
				setCurrentStep(newCurrentStep);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [prev, next, slides, currentStep, steps, router]);

	return { currentStep, steps, setSteps, currentSlide, prev, next };
}

export function SlidesProvider(props: PropsWithChildren) {
	const slides = useSlidesNames();
	const { setSteps, next, prev, currentSlide, currentStep } = useSlideControls(slides);
	if (!slides) return <SlidesContext.Provider value={null} {...props} />;
	return <SlidesContext.Provider value={{ prev, currentStep, next, setSteps, slides, currentSlide }} {...props} />;
}

export function useSlides() {
	const context = useContext(SlidesContext);
	if (context === undefined) throw new Error("useSlides must be used within a SlidesProvider");
	return context;
}

export function useSteps(n: number): number {
	const s = useSlides();
	useEffect(() => {
		if (s) s.setSteps(n);
	}, [n, s]);
	return s?.currentStep ?? 0;
}
