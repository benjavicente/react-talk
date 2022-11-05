import Link from "next/link";

import { ArrowRightIcon, CodeBracketIcon } from "@heroicons/react/20/solid";

import ReactLogo from "@/components/ReactLogo";
import { ThemeSwitcher } from "@/lib/theme";

export default function Home() {
	return (
		<>
			<main className="relative h-full overflow-hidden p-4">
				<h1 className="my-8 text-6xl font-bold leading-normal underline decoration-primary decoration-wavy underline-offset-4">
					Taller de React
				</h1>
				<div className="flex flex-wrap gap-2">
					<ThemeSwitcher />
					<Link href="/slides/01-intro/" className="btn flex gap-1">
						Ir a las diapositivas
						<ArrowRightIcon className="h-5 w-5" />
					</Link>
					<Link href="https://github.com/benjavicente/react-talk" className="btn flex gap-1">
						Código fuente
						<CodeBracketIcon className="h-5 w-5" />
					</Link>
				</div>
				<ReactLogo className="absolute bottom-5 right-2 -z-10 h-96 animate-[spin_8s_linear_infinite] fill-primary stroke-primary opacity-30" />
			</main>
		</>
	);
}
