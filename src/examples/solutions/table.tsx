import { ReactNode } from "react";

type TableProps<T> = {
	data: T[];
	cols: [header: string, value: keyof T | ((d: T) => ReactNode)][];
	dataKey: (row: T) => string;
};

type TD = Record<string, any>;

export function Table<T extends TD>({ data, cols, dataKey }: TableProps<T>) {
	return (
		<table className="table">
			<thead>
				<tr>
					{cols.map(([header]) => (
						<th key={header}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row) => (
					<tr key={dataKey(row)}>
						{cols.map(([header, keyOrFn]) =>
							typeof keyOrFn === "function" ? (
								<td key={header}>{keyOrFn(row)}</td>
							) : (
								<td key={header}>{row[keyOrFn]}</td>
							)
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export function Example() {
	const data = [
		{ name: "John", age: 18, id: 1 },
		{ name: "Jane", age: 20, id: 1 },
	];

	return (
		<Table
			data={data}
			dataKey={(row) => row.name}
			cols={[
				["Name", "name"],
				["Age", "age"],
				[
					"Personal page",
					(row) => <a href={`https://example.com/${row.id}`}>Link</a>,
				],
			]}
		/>
	);
}
