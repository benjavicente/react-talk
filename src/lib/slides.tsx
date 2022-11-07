import { useContext, useState, createContext } from "react";

import { useRouter } from "next/router";

import { useWindowEventListener } from "@/lib/events";
import slides from "@/slides.json";

const SlidesContext = createContext<SlideContextPayload | undefined>(undefined);

function getSlideIndex(pathname: string, slidesNames: string[]) {
	return slidesNames.findIndex((slideName) => pathname.includes(slideName));
}

function makeMoveDiffControls(back: KeyboardEvent["key"][], forward: KeyboardEvent["key"][]) {
	return function moveControl(key: KeyboardEvent["key"]) {
		if (back.includes(key)) return -1;
		if (forward.includes(key)) return 1;
		return 0;
	};
}

export type SlideContextPayload = {
	currentSlide: number;
	slides: string[];
	prev?: string;
	next?: string;
};

const presentationMoveDiff = makeMoveDiffControls(["ArrowLeft"], ["ArrowRight"]);

function useSlideControls(slides: string[]) {
	const router = useRouter();
	const currentSlide = getSlideIndex(router.pathname, slides);
	const prev = currentSlide > 0 ? slides[currentSlide - 1] : undefined;
	const next = currentSlide < slides.length - 1 ? slides[currentSlide + 1] : undefined;

	const goToNext = () => {
		if (!next) return;
		router.push(`/slides/${next}`);
	};

	const goToPrev = () => {
		if (!prev) return;
		router.push(`/slides/${prev}`);
	};

	useWindowEventListener("keydown", (e) => {
		const diff = presentationMoveDiff(e.key);
		if (diff > 0) goToNext();
		else if (diff < 0) goToPrev();
	});

	return { currentSlide, prev, next };
}

export function SlidesProvider(props: PropsWithChildren) {
	const controls = useSlideControls(slides);
	return <SlidesContext.Provider value={{ slides, ...controls }} {...props} />;
}

export function useSlides() {
	const context = useContext(SlidesContext);
	if (!context) throw new Error("useSlides must be used within a SlidesProvider");
	return context;
}

const slideMoveDiff = makeMoveDiffControls(["ArrowUp"], ["ArrowDown"]);
export function useSteps(steps: number): number {
	const [currentStep, setCurrentStep] = useState(0);

	useWindowEventListener("keydown", (e) => {
		const newStep = slideMoveDiff(e.key) + currentStep;
		if (newStep < 0 || newStep >= steps) return;
		console.log(newStep, steps);
		setCurrentStep(newStep);
	});

	return currentStep;
}
