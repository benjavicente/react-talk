import fs from "fs";

export default function SlideRedirect() {
	return null;
}

export async function getServerSideProps() {
	const slides = fs.readdirSync("src/pages/slides");
	const destination = "slides/" + slides[0].replace(".mdx", "");
	return { redirect: { destination, permanent: false } };
}
