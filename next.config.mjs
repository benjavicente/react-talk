import mdx from "@next/mdx";
import withShiki from "@stefanprobst/rehype-shiki";
import * as shiki from "shiki";

const highlighter = await shiki.getHighlighter({ theme: "dark-plus" });

const withMDX = mdx({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [[withShiki, { highlighter }]],
	},
});

/** @type {import('next').NextConfig} */
export default withMDX({
	reactStrictMode: true,
	swcMinify: true,
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});
