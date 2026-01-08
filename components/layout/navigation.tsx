import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface NavigationProps {
  logo?: ReactNode;
  title: string;
  rightActions?: ReactNode[];
  sticky?: boolean;
  className?: string;
}

export function Navigation({
  logo,
  title,
  rightActions,
  sticky = false,
  className,
}: NavigationProps) {
  return (
    <nav
      className={cn(
        "w-full bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50",
        sticky && "sticky top-0",
        className
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {logo && <span className="text-primary">{logo}</span>}
          <h1 className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {rightActions?.map((action, index) => (
            <div key={index}>{action}</div>
          ))}
          <div className="pl-2 ml-2 border-l border-gray-200 dark:border-gray-700">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
