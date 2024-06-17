/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#F59625",
				dark: "#000000",
				light: "#F3F3F3",
				success: "#4CAF50",
				danger: "#F44336",
			},
			keyframes: {
				breathe: {
					"0%, 100%": { transform: "rotate(0deg)" },
					"50%": { transform: "rotate(1deg)" },
				},
				circle: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
			},
			animation: {
				breathe: "breathe 10s infinite",
				circle: "circle 20s linear infinite",
			},
		},
	},
	plugins: [],
};

