import fs from "fs";
import path from "path";

const pages = fs
	.readdirSync(path.join(process.cwd(), "src", "pages", "slides"))
	.filter((s) => s.includes(".mdx"))
	.map((s) => s.replace(".mdx", ""));

fs.writeFileSync(path.join("src", "slides.json"), JSON.stringify(pages, null, 2));
