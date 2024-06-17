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
		},
	},
	plugins: [],
};

