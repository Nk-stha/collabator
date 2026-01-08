"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, ShieldCheck, Store, ArrowRight, Activity, BarChart3, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="w-full max-w-7xl px-6 py-6 flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Zap className="h-6 w-6 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-text-primary uppercase">
            ChargeGhar
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:flex">Login</Button>
          </Link>
          <Link href="/login">
            <Button variant="primary" className="rounded-full px-6 shadow-md hover:shadow-primary/20">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-7xl px-6 flex flex-col items-center justify-center py-20 relative">
        {/* Background Decorations */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="text-center space-y-8 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider animate-bounce-slow">
            <Activity className="h-3 w-3" />
            <span>Next-Gen Energy Management</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
            Empowering the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">
              EV Collaboration
            </span>
          </h1>
          
          <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            The ultimate management portal for franchises and vendors. Streamline your operations, track real-time data, and grow your energy network with ease.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-10 py-7 text-lg shadow-xl shadow-primary/20 group">
                Access Dashboard
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-10 py-7 text-lg border-2">
              View Solutions
            </Button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full">
          {[
            {
              icon: <ShieldCheck className="h-6 w-6 text-blue-500" />,
              title: "Franchise Control",
              desc: "Complete oversight of stations, sub-vendors, and revenue streams."
            },
            {
              icon: <Store className="h-6 w-6 text-orange-500" />,
              title: "Vendor Portal",
              desc: "Dedicated space for vendors to track earnings and station performance."
            },
            {
              icon: <Globe className="h-6 w-6 text-green-500" />,
              title: "Scalable Network",
              desc: "Manage multiple locations across different regions effortlessly."
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-surface-light dark:bg-surface-dark border border-border/50 hover:border-primary/30 transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-background dark:bg-background-dark border border-border flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full max-w-7xl px-6 py-12 border-t border-border mt-20 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-2 opacity-50">
          <Zap className="h-5 w-5" />
          <span className="font-bold text-sm tracking-widest uppercase">ChargeGhar</span>
        </div>
        <p className="text-sm text-text-muted">
          © 2026 Charge Ghar Collabator. All rights reserved.
        </p>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="text-sm text-text-muted hover:text-primary transition-colors font-medium">Support</a>
        </div>
      </footer>
    </div>
  );
}
