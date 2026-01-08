import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "var(--primary)",
                    hover: "var(--primary-hover)",
                    active: "var(--primary-active)",
                },
                background: {
                    DEFAULT: "var(--background)",
                    light: "#F3F4F6", // Keep for legacy if needed, or deprecate
                    dark: "#0A0A0A", // Keep for legacy
                },
                surface: {
                    DEFAULT: "var(--surface)",
                    dark: "#121212",
                },
                input: {
                    DEFAULT: "var(--input)",
                    dark: "#1F1F1F",
                },
                border: "var(--border)",
                text: {
                    main: "var(--text-main)",
                    secondary: "var(--text-secondary)",
                },
            },
            borderRadius: {
                DEFAULT: "0.5rem",
                xl: "0.75rem",
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            }
        },
    },
    plugins: [],
    darkMode: "class",
};
export default config;
