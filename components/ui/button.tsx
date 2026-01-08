import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-primary hover:bg-primary-hover active:bg-primary-active text-white shadow-lg shadow-primary/20",
    secondary:
      "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm", // Expanded height for "py-3" feel
    lg: "h-14 px-8 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.99]",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size="sm" className="mr-2 text-current" />}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
