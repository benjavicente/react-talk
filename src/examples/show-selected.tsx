import { useState, useId } from "react";

const options = ["svelte", "vue", "react", "angular"];

export function Component() {
	// ¿Como podemos separar el estado de la lógica de selección?
	const [selected, setSelected] = useState<string[]>([]);
	const id = useId(); // uso de hook useId

	return (
		<>
			<div>
				<h4 className="font-bold">Selecciona tus tecnologías favoritas</h4>
				<ul className="flex gap-2">
					{options.map((option) => (
						<li
							key={option}
							className="flex max-w-fit list-none gap-4 rounded bg-base-200 px-2 py-1"
						>
							<input
								type="checkbox"
								id={`${id}-${option}`}
								checked={selected.includes(option)}
								onChange={(event) => {
									if (event.target.checked) {
										setSelected([...selected, option]);
									} else {
										setSelected(selected.filter((o) => o !== option));
									}
								}}
							/>
							<label htmlFor={`${id}-${option}`}>{option}</label>
						</li>
					))}
				</ul>
			</div>
			<div>Tecnologías seleccionadas: {selected.join(", ")}</div>
		</>
	);
}
