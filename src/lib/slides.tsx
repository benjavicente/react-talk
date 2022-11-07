import { useContext, useState, createContext, useRef, useEffect } from "react";

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
	const startTouchRef = useRef({ x: 0, y: 0, t: 0 });
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

	useWindowEventListener("touchstart", (e) => {
		const { clientX: x, clientY: y } = e.touches[0];
		startTouchRef.current = { x, y, t: Date.now() };
	});

	useWindowEventListener("touchend", (e) => {
		const { x, y, t } = startTouchRef.current;
		const { clientX: endX, clientY: endY } = e.changedTouches[0];
		const angle = Math.atan2(endX - x, endY - y);
		const duration = Date.now() - t;
		const size = Math.sqrt(Math.pow(endX - x, 2) + Math.pow(endY - y, 2));

		const acceptedDelta = Math.PI / 8;
		const sideCAngle = Math.PI / 2;
		const isToSide = sideCAngle - acceptedDelta < Math.abs(angle) && Math.abs(angle) < sideCAngle + acceptedDelta;

		const speed = size / duration;

		console.info({ angle, duration, size, speed, isToSide });

		if (speed > 1 && isToSide) {
			if (angle < 0) goToNext();
			else goToPrev();
		}
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

	useEffect(() => {
		// see if it is in mobile mode
		const isMobile = window.innerWidth < 768;
		if (!isMobile) return;
		setCurrentStep(steps);
	}, [steps]);

	useWindowEventListener("keydown", (e) => {
		const newStep = slideMoveDiff(e.key) + currentStep;
		if (newStep < 0 || newStep >= steps) return;
		console.log(newStep, steps);
		setCurrentStep(newStep);
	});

	return currentStep;
}
