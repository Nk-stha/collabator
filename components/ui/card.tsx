import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  padding?: "sm" | "md" | "lg";
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  title,
  subtitle,
  padding = "md",
  hoverable = false,
  className,
  onClick,
}: CardProps) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border border-gray-200 bg-surface dark:border-gray-800 transition-all duration-200",
        paddingClasses[padding],
        hoverable && "hover:shadow-lg cursor-pointer hover:-translate-y-0.5",
        onClick && "cursor-pointer",
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
