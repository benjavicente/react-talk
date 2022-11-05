import path from "path";

import withShiki from "@leafac/rehype-shiki";
import mdx from "@next/mdx";
import { codeImport } from "remark-code-import";
import * as shiki from "shiki";

const highlighter = await shiki.getHighlighter({ theme: "dark-plus" });

const withMDX = mdx({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [[codeImport, { rootDir: path.join(process.cwd(), "./src/examples/") }]],
		rehypePlugins: [[withShiki, { highlighter }]],
	},
});

/** @type {import('next').NextConfig} */
export default withMDX({
	reactStrictMode: true,
	swcMinify: true,
	pageExtensions: ["tsx", "mdx"],
});
