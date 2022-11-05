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
		<div className="flex h-[100vh] h-[100svw] w-screen flex-col">
			<div className="columns-2 bg-base-300 px-2 text-sm font-bold text-base-content">
				<Link href="/" className="block text-left">
					Taller de React
				</Link>
				<div className="text-right">{slides[currentSlide]}</div>
			</div>
			<main className="slide flex-grow overflow-auto px-8 pt-8 pb-2">{children}</main>
			<div className="grid grid-cols-[3fr_1fr_3fr] bg-base-300 px-2 text-center text-sm font-bold">
				<div className="bg-red w-full">{prev ? <Link href={`/slides/${prev}`}>{prev}</Link> : null}</div>
				<div className="w-full">
					{currentSlide + 1}/{slides.length}
				</div>
				<div className="bg-red w-full">{next ? <Link href={`/slides/${next}`}>{next}</Link> : null}</div>
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
	return <div className="h-min-fit h-screen w-screen">{children}</div>;
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
