import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";

interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => void;
  loading?: boolean;
  error?: string;
  title?: string;
  subtitle?: string;
  forgotPasswordLink?: string;
  signupLink?: string;
  className?: string;
}

export function LoginForm({
  onSubmit,
  loading,
  error,
  title = "Welcome Back",
  subtitle = "Sign in to continue",
  forgotPasswordLink,
  signupLink,
  className,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      onSubmit({ email, password });
    }
  };

  return (
    <Card className={className} title={title} subtitle={subtitle} padding="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-lg">
            {error}
          </div>
        )}
        
        <Input
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError("");
          }}
          error={emailError}
          leftIcon={<Mail className="h-4 w-4" />}
          disabled={loading}
        />
        
        <div className="space-y-1">
          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
            }}
            error={passwordError}
            leftIcon={<Lock className="h-4 w-4" />}
            disabled={loading}
          />
          {forgotPasswordLink && (
            <div className="flex justify-end">
              <a
                href={forgotPasswordLink}
                className="text-xs font-medium text-primary hover:text-primary-hover"
              >
                Forgot password?
              </a>
            </div>
          )}
        </div>

        <Button
          type="submit"
          fullWidth
          loading={loading}
          size="lg"
        >
          Sign In
        </Button>

        {signupLink && (
          <p className="text-center text-sm text-text-secondary mt-4">
            Don&apos;t have an account?{" "}
            <a
              href={signupLink}
              className="font-medium text-primary hover:text-primary-hover"
            >
              Sign up
            </a>
          </p>
        )}
      </form>
    </Card>
  );
}
