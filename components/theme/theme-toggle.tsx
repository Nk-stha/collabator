import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      className={className}
      onClick={() => toggleTheme()}
      title={`Current theme: ${theme}`}
    >
      {theme === "light" && <Sun className="h-5 w-5" />}
      {theme === "dark" && <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
