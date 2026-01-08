"use client";

import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bolt, LogIn, Lock, Mail, LockOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 antialiased bg-background-light dark:bg-background-dark text-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="w-full bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white">
            <Bolt className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-wider text-gray-900 dark:text-white uppercase">
            Charge Ghar
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-4 lg:p-8 gap-8">
        {/* Left Section: Components */}
        <section className="w-full lg:w-1/2 flex flex-col gap-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Button Palette & Components
            </h1>
            <p className="text-gray-600 dark:text-text-secondary">
              Derived from the Charge Ghar admin interface. This system emphasizes
              high contrast actions on dark backgrounds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card padding="md" className="bg-white dark:bg-surface-dark shadow-sm">
              <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-4">
                Primary Actions
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Button variant="primary" size="lg" className="w-full shadow-lg shadow-primary/20">
                    <LogIn className="h-4 w-4 mr-2" />
                    Primary Button
                  </Button>
                  <span className="text-xs text-center text-gray-400 font-mono">
                    bg-primary (#54BC28)
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="primary" className="w-full cursor-default hover:bg-primary-hover bg-primary-hover">
                    Hover State
                  </Button>
                  <span className="text-xs text-center text-gray-400 font-mono">
                    bg-primary-hover (#46A020)
                  </span>
                </div>
              </div>
            </Card>

            <Card padding="md" className="bg-white dark:bg-surface-dark shadow-sm">
              <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-4">
                Secondary & States
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Button variant="secondary" className="w-full">
                    Secondary Action
                  </Button>
                  <span className="text-xs text-center text-gray-400 font-mono">
                    border-primary
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Button disabled className="w-full">
                     <Lock className="h-4 w-4 mr-2" />
                     Disabled State
                  </Button>
                  <span className="text-xs text-center text-gray-400 font-mono">
                    opacity-50
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <Card padding="md" className="bg-white dark:bg-surface-dark shadow-sm">
            <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-4">
              Brand Colors
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col gap-2 items-center">
                <div className="w-16 h-16 rounded-lg bg-primary shadow-md"></div>
                <span className="text-xs font-mono text-gray-500">Primary</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <div className="w-16 h-16 rounded-lg bg-primary-hover shadow-md"></div>
                <span className="text-xs font-mono text-gray-500">Hover</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <div className="w-16 h-16 rounded-lg bg-background-dark border border-gray-700 shadow-md"></div>
                <span className="text-xs font-mono text-gray-500">Dark Bg</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <div className="w-16 h-16 rounded-lg bg-surface-dark border border-gray-700 shadow-md"></div>
                <span className="text-xs font-mono text-gray-500">Input Bg</span>
              </div>
            </div>
          </Card>
        </section>

        {/* Right Section: Login Form */}
        <section className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-black rounded-3xl p-4 lg:p-12 relative overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
           {/* Background Blobs */}
           <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten opacity-30 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[60px] border-primary rounded-full opacity-5"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary rounded-full blur-3xl opacity-20"></div>
           </div>

           <div className="w-full max-w-md bg-white/80 dark:bg-black/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl relative z-10">
              <div className="mb-10 text-center lg:text-left">
                 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome, <span className="text-primary">Admin</span>
                 </h2>
                 <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Please enter your details to access the dashboard.
                 </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                 <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email address"
                    leftIcon={<Mail className="h-5 w-5" />}
                    className="bg-gray-50 dark:bg-input-dark"
                 />
                 
                 <div className="space-y-2">
                    <div className="flex justify-between items-center">
                       <label className="block text-sm font-medium text-text-main">Password</label>
                       <a href="#" className="text-xs text-primary hover:text-primary-hover font-medium">Forgot password?</a>
                    </div>
                    {/* Using Input component normally - it handles 'type=password' toggling internally */}
                    <Input
                       type="password"
                       placeholder="Enter your password"
                       leftIcon={<Lock className="h-5 w-5" />}
                       className="bg-gray-50 dark:bg-input-dark"
                     />
                 </div>

                 <div className="pt-2">
                    <Button 
                       type="submit" 
                       variant="primary" 
                       fullWidth 
                       size="lg" 
                       className="shadow-lg shadow-primary/25 hover:shadow-primary/40 text-base font-bold"
                    >
                       <LockOpen className="h-4 w-4 mr-2" />
                       Login
                    </Button>
                 </div>

                 <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                       Don&apos;t have an account?{" "}
                       <a href="#" className="text-primary hover:text-primary-hover font-semibold transition-colors">
                          Contact Support
                       </a>
                    </p>
                 </div>
              </form>
           </div>
        </section>
      </main>

      <footer className="w-full py-6 text-center text-gray-500 dark:text-gray-600 text-sm mt-auto">
        © 2023 Charge Ghar Admin Portal. All rights reserved.
      </footer>
    </div>
  );
}
