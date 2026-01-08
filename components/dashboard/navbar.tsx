"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { usePathname } from "next/navigation";
import { User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardNavbar() {
  const pathname = usePathname();

  const getTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "Dashboard";
    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, " ");
  };

  return (
    <header className="h-16 border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
      <h2 className="text-xl font-bold tracking-tight text-text-primary">
        {getTitle()}
      </h2>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="relative p-2 h-10 w-10 rounded-full">
          <Bell className="h-5 w-5 text-text-muted" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-surface" />
        </Button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <ThemeToggle />
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-text-primary leading-none">John Doe</p>
              <p className="text-xs text-text-muted mt-1">Super Admin</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <User className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
