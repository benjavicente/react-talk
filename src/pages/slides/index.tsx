import Link from "next/link";

import { SlidesProvider, useSlides } from "@/lib/slides";

function Slides() {
	const { slides } = useSlides();
	return (
		<main className="relative h-full p-4">
			<h1 className="mb-4 text-6xl font-bold leading-normal underline decoration-primary decoration-wavy underline-offset-4">
				Slides
			</h1>
			<ol className="columns-1 sm:columns-3">
				{slides.map((slide) => (
					<li key={slide} className="mb-2 w-fit rounded bg-base-200 px-2 py-1 hover:shadow">
						<Link href={`/slides/${slide}/`} className="text-base-content hover:underline">
							{slide}
						</Link>
					</li>
				))}
			</ol>
		</main>
	);
}

export default function SlidesIndex() {
	return (
		<SlidesProvider>
			<Slides />
		</SlidesProvider>
	);
}
