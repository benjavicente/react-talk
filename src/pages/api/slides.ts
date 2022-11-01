import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
	const dir = path.join(process.cwd(), "src", "pages", "slides");
	const pages = (await fs.readdir(dir)).filter((s) => s.includes(".mdx")).map((s) => s.replace(".mdx", ""));
	res.status(200).json(pages);
}
