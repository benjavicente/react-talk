type TableProps<T> = {
	data: T[];
	cols: [header: string, key: keyof T][];
};

type Obj = Record<string, any>;

export function Table<T extends Obj>({ data, cols }: TableProps<T>) {
	return (
		<table className="table [zoom:0.8] sm:[zoom:1]">
			<thead>
				<tr>
					{cols.map(([header]) => (
						<th key={header}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row) => (
					//* ¿Hay alguna forma que el key sea más concreto?
					<tr key={JSON.stringify(row)}>
						{cols.map(([header, key]) => (
							//* ¿Como podemos añadir links a la tabla?
							<td key={header}>{row[key]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
