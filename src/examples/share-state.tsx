import { useState } from "react";

import { currentTime } from "@/utils";

type DependentCounterProps = {
	count: number;
	setCount: (count: number) => void;
};

function DependentCounter({ count, setCount }: DependentCounterProps) {
	return (
		<button className="btn" onClick={() => setCount(count + 1)}>
			Count: {count}
		</button>
	);
}

export default function App() {
	//* ¿Cómo podemos evitar que toda la App se renderice?
	const [count, setCount] = useState(0);
	return (
		<div className="px-4">
			<div>Renderizado a las {currentTime()}</div>
			<div className="flex gap-4">
				<DependentCounter count={count} setCount={setCount} />
				<DependentCounter count={count} setCount={setCount} />
			</div>
		</div>
	);
}
