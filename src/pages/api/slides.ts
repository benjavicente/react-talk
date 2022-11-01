import fs from "fs";

export default function handler(req, res) {
	const pages = fs
		.readdirSync("src/pages/slides")
		.filter((s) => s.includes(".mdx"))
		.map((s) => s.replace(".mdx", ""));
	res.status(200).json(pages);
}
