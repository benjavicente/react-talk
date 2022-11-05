import { useState } from "react";

function Index() {
	return <div>In index</div>;
}

function Login() {
	return (
		<div className="my-auto max-w-sm rounded bg-base-200 p-4 text-center">
			In Login
		</div>
	);
}

function Register() {
	return (
		<div className="my-auto max-w-sm rounded bg-base-200 p-4 text-center">
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
	const Page = pages[route]; // Importante! Prueba ver que pasa si lo dejas en minúscula
	return (
		<>
			<div className="flex gap-4">
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
			{/* ¿Como se puede hacer que Login y Register tengan un layout */}
			{/* en común, dejando a Index con un layout por defecto? */}
			{/* ¿Puedes encontrar el problema que hay en la implementación actual? */}
			<div className="p-4">
				<Page />
			</div>
		</>
	);
}
