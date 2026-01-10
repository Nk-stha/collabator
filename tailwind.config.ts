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
                    DEFAULT: "#54BC28",
                    hover: "#46A020",
                    active: "#39821A",
                },
                background: {
                    DEFAULT: "var(--background)",
                    light: "#F3F4F6",
                    dark: "#0A0A0A",
                },
                surface: {
                    DEFAULT: "var(--surface)",
                    light: "#FFFFFF",
                    dark: "#121212",
                },
                input: {
                    DEFAULT: "var(--input)",
                    light: "#FFFFFF",
                    dark: "#1F1F1F",
                },
                border: {
                    DEFAULT: "var(--border)",
                    light: "#E5E7EB",
                    dark: "#262626",
                },
                card: {
                    DEFAULT: "var(--card)",
                    dark: "#181818",
                },
                text: {
                    primary: "var(--text-primary)",
                    secondary: "#9CA3AF",
                    muted: "var(--text-muted)",
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
export default config;
