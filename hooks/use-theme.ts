import { useThemeContext } from "@/components/providers/theme-provider";

export const useTheme = () => {
    const { theme, setTheme } = useThemeContext();

    const toggleTheme = () => {
        if (theme === "light") setTheme("dark");
        else setTheme("light");
    };

    return { theme, setTheme, toggleTheme };
};
