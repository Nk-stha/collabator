import { InputHTMLAttributes, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  helperText?: string;
}

export function Input({
  className,
  type = "text",
  label,
  error,
  leftIcon,
  rightIcon,
  helperText,
  id,
  disabled,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || props.name || Math.random().toString(36).substr(2, 9);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          type={inputType}
          className={cn(
            "block w-full rounded-xl border border-gray-300 dark:border-transparent bg-gray-50 dark:bg-input text-gray-900 dark:text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 py-3 sm:text-sm shadow-sm",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : "",
            leftIcon ? "pl-10" : "pl-4",
            (rightIcon || isPassword) ? "pr-10" : "pr-4",
            disabled && "opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-800",
            className
          )}
          disabled={disabled}
          {...props}
        />
        {(rightIcon || isPassword) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
             {rightIcon}
             {isPassword && !rightIcon && (
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="text-text-secondary hover:text-gray-600 focus:outline-none"
               >
                 {showPassword ? (
                   <EyeOff className="h-4 w-4" />
                 ) : (
                   <Eye className="h-4 w-4" />
                 )}
               </button>
             )}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p
          className={cn(
            "mt-1.5 text-xs",
            error ? "text-red-500" : "text-text-secondary"
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
