const colors = require("tailwindcss/colors");

module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: { teal: colors.teal },
			flex: {
				2: "2 2 0%",
				8: "8 8 0%",
			},
			height: {
				192: "48rem",
			},
			maxHeight: { 192: "48rem" },
			keyframes: {
				"spin-slow": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
			},
			animation: {
				"spin-slow": "spin-slow 2s ease-in-out infinite",
			},
		},
	},
	variants: {
		extend: {
			boxShadow: ["hover"],
		},
	},
	plugins: [],
};
