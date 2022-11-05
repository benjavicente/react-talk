const themes = [
	"corporate",
	"dracula",
	"light",
	"dark",
	"bumblebee",
	"emerald",
	"synthwave",
	"lemonade",
	"cyberpunk",
	{
		osuc: {
			primary: "#0073de",
			secondary: "#d08770",
			accent: "#b48ead",
			neutral: "#4c566a",
			"base-100": "#2e3440",
			info: "#5e81ac",
			success: "#a3be8c",
			warning: "#ebcb8b",
			error: "#bf616a",
			"--btn-text-case": "none",
			"--rounded-btn": "0.3rem",
			"--btn-focus-scale": "0.98",
		},
	},
];

module.exports = {
	content: ["./src/**/*.tsx", "./src/**/*.mdx"],
	theme: { extend: {} },
	daisyui: { themes },
	plugins: [require("daisyui")],
};
