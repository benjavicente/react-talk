import "@/styles/globals.css";

import { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

import { SlidesProvider, useSlides } from "@/lib/slides";
import { ThemeProvider } from "@/lib/theme";

function SlideLayout({ children }: PropsWithChildren) {
	const slidesStore = useSlides();
	if (!slidesStore) return null;
	const { prev, next, slides, currentSlide } = slidesStore;

	return (
		<div className="h-screen max-h-screen w-screen flex flex-col">
			<div className="bg-base-300 text-base-content text-center">
				<Link href="/">Taller de React</Link>
			</div>
			<main className="flex-grow p-12 slide overflow-auto">{children}</main>
			<div className="grid grid-cols-3 bg-base-300 font-bold px-2 text-center">
				<div className="w-full bg-red">{prev ? <Link href={`/slides/${prev}`}>{prev}</Link> : null}</div>
				<div className="w-full">
					{currentSlide + 1}/{slides.length}
				</div>
				<div className="w-full bg-red">{next ? <Link href={`/slides/${next}`}>{next}</Link> : null}</div>
			</div>
		</div>
	);
}

function AppLayout({ children }: PropsWithChildren) {
	const { pathname } = useRouter();
	if (pathname.startsWith("/slides")) {
		return (
			<SlidesProvider>
				<SlideLayout>{children}</SlideLayout>
			</SlidesProvider>
		);
	}
	return (
		<div className="h-screen max-h-screen w-screen overflow-clip">
			<main className="p-4 h-full overflow-clip">{children}</main>
		</div>
	);
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<AppLayout>
				<Component {...pageProps} />
			</AppLayout>
		</ThemeProvider>
	);
}
