const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk"];

module.exports = {
	content: ["./src/**/*.tsx", "./src/**/*.mdx"],
	theme: { extend: {} },
	daisyui: { themes },
	plugins: [require("daisyui")],
};
