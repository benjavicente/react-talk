import { RefObject, useEffect, useRef, useState } from "react";

function useEventListenerRef(
	ref: RefObject<HTMLElement>,
	event: string,
	listener: (event: Event) => void
) {
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		el.addEventListener(event, listener);
		return () => el.removeEventListener(event, listener);
	}, [event, listener, ref]);
}

/* Input que no acepta espacios */
export function Component() {
	const [validatedData, setValidatedData] = useState("");

	const ref = useRef<HTMLInputElement>(null);
	useEventListenerRef(ref, "change", ({ target }: Event) => {
		const input = target as HTMLInputElement;
		if (input.value.includes(" ")) {
			input.value = validatedData;
		} else {
			setValidatedData(input.value);
		}
	});

	return (
		<>
			<div className="font-mono text-primary">{validatedData}</div>
			<input ref={ref} className="input-primary input" type="text" />;
		</>
	);
}
