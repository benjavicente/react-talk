import { useEffect, useState } from "react";

const url = "https://api.github.com/repos/benjavicente/react-talk/stargazers";

export function Component() {
	// El useState y useEffect son usados de la misma manera en varios componentes
	// ¿Como se podría reutilizar la lógica?
	const [data, setData] = useState<{ login: string }[] | null>(null);
	useEffect(() => {
		const headers = { "Content-Type": "application/json" };
		fetch(url, { headers })
			.then((response) => response.json())
			.then((json) => setData(json));
	}, []);

	if (!data) return <div>Loading...</div>;

	return (
		<>
			<h4 className="font-bold">Estrellas en el repo del taller</h4>
			<ul>
				{data.map(({ login }) => (
					<li key={login}>{login}</li>
				))}
			</ul>
		</>
	);
}
