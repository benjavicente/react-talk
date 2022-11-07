import { useState } from "react";

function Index() {
	return <div>In index</div>;
}

function Login() {
	return (
		<div className="my-auto mx-auto max-w-sm rounded bg-base-200 p-4 text-center">
			In Login
		</div>
	);
}

function Register() {
	return (
		<div className="my-auto mx-auto max-w-sm rounded bg-base-200 p-4 text-center">
			In Register
		</div>
	);
}

// Asume que lo siguiente no es modificable (como si se auto-generara)

const pages = {
	"/": Index,
	"/login": Login,
	"/register": Register,
};

type PagePath = keyof typeof pages;

// El componente App lo puedes modificar

export function App() {
	const [route, setRoute] = useState<PagePath>("/");
	const Page = pages[route]; // Prueba ver que pasa si dejas `Page` en minúscula

	//* ¿Como se puede hacer que el componente Login y Register tengan
	//* un layout en común, dejando a Index con un layout por defecto?
	// ¿Puedes encontrar el problema que hay en la implementación actual?
	return (
		<div className="flex flex-col sm:flex-row">
			<div className="flex items-center gap-4">
				{Object.keys(pages).map((path) => (
					<button
						className="btn"
						key={path}
						onClick={() => setRoute(path as PagePath)}
					>
						{path}
					</button>
				))}
			</div>
			<div className="divider divider-vertical sm:divider-horizontal" />
			<Page />
		</div>
	);
}
