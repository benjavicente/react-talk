import fs from "fs";

export async function getServerSideProps(context) {
	const slides = fs.readdirSync("src/pages/slides");
	const destination = "slides/" + slides[0].replace(".mdx", "");
	return { redirect: { destination, permanent: false } };
}
