"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, ShieldCheck, Store, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 rotate-12">
              <Zap className="h-10 w-10 text-white fill-white -rotate-12" />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-text-primary">
            ChargeGhar <span className="text-primary">Collabator</span>
          </h1>
          <p className="text-xl text-text-muted max-w-lg mx-auto">
            Centralized management portal for franchises and vendors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 hover:border-primary/50 transition-all group" hoverable>
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-primary">Franchise Portal</h3>
                <p className="text-text-muted mt-2">Manage stations, sub-vendors, and revenue distribution.</p>
              </div>
              <Link href="/franchise/dashboard" className="block">
                <Button variant="primary" fullWidth rightIcon={<LayoutDashboard className="h-4 w-4" />}>
                  Go to Franchise Dashboard
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-8 hover:border-primary/50 transition-all group" hoverable>
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Store className="h-8 w-8 text-orange-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-primary">Vendor Portal</h3>
                <p className="text-text-muted mt-2">Track earnings, payouts, and station status in real-time.</p>
              </div>
              <Link href="/vendor/dashboard" className="block">
                <Button variant="secondary" fullWidth rightIcon={<LayoutDashboard className="h-4 w-4" />}>
                  Go to Vendor Dashboard
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-text-muted">
            Need help? Contact <span className="font-semibold text-text-primary">support@chargeghar.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
