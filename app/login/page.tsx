"use client";

import React from "react";
import { Zap, Eye, Lock, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { MOCK_USERS } from "@/lib/config";

export default function LoginPage() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const user = MOCK_USERS.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            // In a real app, we would set cookies/tokens here
            router.push(user.redirect);
        } else {
            setError("Invalid email or password");
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background dark:bg-background-dark text-text-primary antialiased h-screen w-full flex overflow-hidden selection:bg-primary selection:text-white">
            {/* Left Side - Hero Section */}
            <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-primary-active">
                <div className="absolute inset-0 pointer-events-none">
                    <svg className="absolute w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" fillOpacity="0.1"></path>
                        <path d="M0 100 C 30 20 70 20 100 100 Z" fill="white" fillOpacity="0.1" style={{ transform: "translateY(-20px)" }}></path>
                    </svg>
                    <div 
                        className="absolute top-0 left-0 w-full h-full opacity-10 mix-blend-overlay"
                        style={{
                            backgroundImage: "url(https://lh3.googleusercontent.com/aida-public/AB6AXuC3KhS0fGggQiIE125Dsdt1lCr0IDiNz61uY6OyRNds64fgO2vKys0u9aO8iBUzAcLjf2OGiTlXptE-F7AKagD8rEsk2hOGHNdtXGme9Q5blLOEuf9QuGGLjHgdgRtvOQ9TJLWuNNeVBHcCn_q6dgIF9JvBAJ1zHJfiyoaR3UcAq4yIoJgfH1lGOF8Jla9gzRcudxgS2WWQW_f--wNxaC7Zh2xP5C73_sID6UuYeemfcR5yMQka3RC8Gqo6aDGayYiliHIDSsXGXOJw)"
                        }}
                    ></div>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full bg-green-700/30 border-2 border-white/20 flex items-center justify-center shadow-lg backdrop-blur-sm">
                            <Zap className="text-white w-10 h-10 drop-shadow-md" />
                        </div>
                        <h1 className="text-5xl font-bold text-white tracking-wider drop-shadow-md uppercase">
                            Charge Ghar
                        </h1>
                    </div>
                    <p className="mt-6 text-green-100 text-lg font-medium tracking-wide opacity-90 max-w-md text-center">
                        Empowering your energy future with smart solutions.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 h-full flex items-center justify-center px-6 py-12 lg:px-20 xl:px-32 bg-background-light dark:bg-background-dark transition-colors duration-300">
                <div className="w-full max-w-md space-y-8">
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                            <Zap className="text-white w-8 h-8" />
                        </div>
                    </div>
                    <div className="text-left">
                        <h2 className="text-4xl font-bold tracking-tight text-text-primary">
                            Welcome <span className="text-primary">Back</span>
                        </h2>
                        <p className="mt-2 text-sm text-text-secondary">
                            Please sign in to access your dashboard.
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-text-muted dark:text-gray-400" htmlFor="email">
                                Email
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-700 bg-surface-light dark:bg-input-dark text-text-primary placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition duration-200 ease-in-out outline-none"
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-text-muted dark:text-gray-400" htmlFor="password">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-4 py-3 pr-10 rounded-lg border-gray-300 dark:border-gray-700 bg-surface-light dark:bg-input-dark text-text-primary placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition duration-200 ease-in-out outline-none"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <div className="flex items-center justify-end">
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-primary hover:text-primary-hover transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-full text-white bg-primary hover:bg-primary-hover active:bg-primary-active focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    {isLoading ? (
                                        <Loader2 className="h-5 w-5 text-white/70 animate-spin" />
                                    ) : (
                                        <Lock className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                                    )}
                                </span>
                                {isLoading ? "Signing in..." : "Login"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Demo Credentials</p>
                        <div className="space-y-1 text-xs text-text-muted">
                            <p><span className="font-medium">Franchise:</span> franchise@chargeghar.com / password123</p>
                            <p><span className="font-medium">Vendor:</span> vendor@chargeghar.com / password123</p>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-text-secondary">
                            © 2026 Charge Ghar. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Theme Toggle - Fixed Position */}
            <div className="fixed top-4 right-4 z-50">
               <ThemeToggle className="rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors w-10 h-10 p-0" />
            </div>
        </div>
    );
}

