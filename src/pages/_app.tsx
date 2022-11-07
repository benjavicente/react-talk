import "@/styles/globals.css";

import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { SlidesProvider, useSlides } from "@/lib/slides";
import { ThemeProvider } from "@/lib/theme";

function SlideLayout({ children }: PropsWithChildren) {
	const slidesStore = useSlides();
	if (!slidesStore) return null;
	const { prev, next, slides, currentSlide } = slidesStore;

	return (
		<div className="flex h-[100vh] h-[100svh] w-screen flex-col">
			<div className="columns-2 bg-base-300 px-2 text-sm font-bold text-base-content">
				<Link href="/" className="block text-left">
					Taller de React
				</Link>
				<div className="text-right">{slides[currentSlide]}</div>
			</div>
			<main className="slide flex-grow overflow-auto px-8 pt-8 pb-2">{children}</main>
			<div className="grid h-16 grid-cols-[3fr_1fr_3fr] bg-base-300 px-2 text-center font-bold text-base-content lg:h-fit ">
				<div className="bg-red flex w-full items-center justify-center  active:bg-base-200">
					{prev ? <Link href={`/slides/${prev}`}>{prev}</Link> : null}
				</div>
				<Link href="/slides/" className="flex w-full items-center justify-center">
					{currentSlide + 1}/{slides.length}
				</Link>
				<div className="bg-red flex w-full items-center justify-center active:bg-base-200">
					{next ? <Link href={`/slides/${next}`}>{next}</Link> : null}
				</div>
			</div>
		</div>
	);
}

function AppLayout({ children }: PropsWithChildren) {
	const { pathname } = useRouter();
	if (pathname.startsWith("/slides") && pathname !== "/slides") {
		return (
			<SlidesProvider>
				<SlideLayout>{children}</SlideLayout>
			</SlidesProvider>
		);
	}
	return <div className="h-min-fit h-screen w-screen">{children}</div>;
}

function Meta() {
	const description = "Página con el material del taller de React organizado por Benjamín Vicente";
	const title = "Taller de React";
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="icon" href="/icon.svg" />
			<link rel="apple-touch-icon" href="/icon.svg" />
			<meta name="theme-color" content="#ffffff" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="og:title" content={title} />
			<meta name="og:description" content={description} />
			<meta name="og:image" content="/square.png" />
			<meta name="og:url" content="https://react.osuc.dev" />
			<meta name="og:type" content="website" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@opensource_euc" />
			<meta name="twitter:creator" content="@benjavicenteg" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content="/landscape.png" />
		</Head>
	);
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<AppLayout>
				<Meta />
				<Component {...pageProps} />
			</AppLayout>
		</ThemeProvider>
	);
}
