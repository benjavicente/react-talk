import { useEffect, useRef, useState } from "react";

/* Input que no acepta espacios */
export function Component() {
	const [validatedData, setValidatedData] = useState("");

	//* ¿Como podemos extraer esto a un hook?
	const ref = useRef<HTMLInputElement>(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const listener = ({ target }: Event) => {
			const input = target as HTMLInputElement;
			if (input.value.includes(" ")) {
				input.value = validatedData;
			} else {
				setValidatedData(input.value);
			}
		};

		el.addEventListener("change", listener);
		return () => el.removeEventListener("change", listener);
	}, [validatedData, ref]);

	return (
		<div className="flex flex-wrap items-center gap-2 md:gap-8">
			Sin espacios:
			<input ref={ref} className="input-primary input" />
			<div className="font-mono text-base-content">{validatedData}</div>
		</div>
	);
}
