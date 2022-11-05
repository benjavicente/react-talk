import { useEffect, useState } from "react";

const url = "https://api.github.com/repos/benjavicente/react-talk/stargazers";

function useFetch<T>(url: string) {
	// T: done, null: error, undefined: loading
	const [data, setData] = useState<T | null | undefined>(undefined);

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((json) => setData(json))
			.catch(() => setData(null));
	}, [url]);

	return data;
}

export function Component() {
	const data = useFetch<{ login: string }[]>(url);

	if (data === undefined) return <div>Loading...</div>;
	if (data === null) return <div>Error</div>;

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

function useFetchWithErrorMessage(url: string) {
	const [data, setData] = useState<unknown>(undefined);
	const [error, setError] = useState<unknown>(undefined);

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((json) => setData(json))
			.catch((error) => {
				setData(null);
				setError(error);
			});
	}, [url]);

	return [data, error] as const;
}
