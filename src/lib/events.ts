import { useEffect } from "react";

export function useEventListener<T extends keyof HTMLElementEventMap>(
	element: HTMLElement,
	event: T,
	handler: (this: HTMLElement, ev: HTMLElementEventMap[T]) => any,
	options?: boolean | AddEventListenerOptions
) {
	useEffect(() => {
		element.addEventListener(event, handler, options);
		return () => element.removeEventListener(event, handler, options);
	}, [element, event, handler, options]);
}

export function useWindowEventListener<T extends keyof WindowEventMap>(
	event: T,
	handler: (this: Window, ev: WindowEventMap[T]) => any,
	options?: boolean | AddEventListenerOptions
) {
	useEffect(() => {
		window.addEventListener(event, handler, options);
		return () => window.removeEventListener(event, handler, options);
	}, [event, handler, options]);
}
