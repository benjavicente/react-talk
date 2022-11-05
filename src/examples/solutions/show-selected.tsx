import { useState } from "react";

const options = ["svelte", "vue", "react", "angular"];

export function Selection() {
	// ¿Como podemos separar el estado de la lógica de selección?
	const [selected, setSelected] = useState<string[]>([]);

	return (
		<>
			<div>
				<h4 className="font-bold">Selecciona tus tecnologías favoritas</h4>
				<ul>
					{options.map((option) => (
						<li key={option}>
							<label>
								<input
									type="checkbox"
									checked={selected.includes(option)}
									onChange={(event) => {
										if (event.target.checked) {
											setSelected([...selected, option]);
										} else {
											setSelected(selected.filter((o) => o !== option));
										}
									}}
								/>
								{option}
							</label>
						</li>
					))}
				</ul>
			</div>
			<div>
				Tecnologías seleccionadas:
				{selected.join(", ")}
			</div>
		</>
	);
}
