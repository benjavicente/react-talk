import { createContext, Fragment, useContext, useId, useState } from "react";

const options = ["svelte", "vue", "react", "angular"];

const SelectContext = createContext<any | undefined>(undefined);

function Selection({ options, ...props }) {
	const [selected, setSelected] = useState<string[]>([]);
	const selectionId = useId();
	return (
		<SelectContext.Provider
			{...props}
			value={{ options, selected, setSelected, selectionId }}
		/>
	);
}

Selection.List = function List({ children }) {
	const { selected, setSelected, options, selectionId } =
		useContext(SelectContext);

	return options.map((option) => {
		const onChange = (event) => {
			setSelected(
				event.target.checked
					? [...selected, option]
					: selected.filter((o) => o !== option)
			);
		};
		const checked = selected.includes(option);
		const id = `${selectionId}-${option}`;

		return (
			<Fragment key={option}>
				{children({
					option,
					inputProps: { id, onChange, checked, type: "checkbox" },
					id,
				})}
			</Fragment>
		);
	});
};

Selection.Selected = function Selected({ children }) {
	const { selected } = useContext(SelectContext);
	return children({ selected });
};

// ---

export function App() {
	return (
		<Selection options={options}>
			<div>
				<h4 className="font-bold">Selecciona tus tecnologías favoritas</h4>
				<ul className="flex gap-2">
					<Selection.List>
						{({ option, inputProps, id }) => (
							<li className="flex max-w-fit list-none gap-4 rounded bg-base-200 px-2 py-1">
								<input {...inputProps} />
								<label htmlFor={id}>{option}</label>
							</li>
						)}
					</Selection.List>
				</ul>
			</div>
			<div>
				<Selection.Selected>
					{({ selected }) =>
						`Tecnologías seleccionadas: ${selected.join(", ")}`
					}
				</Selection.Selected>
			</div>
		</Selection>
	);
}
