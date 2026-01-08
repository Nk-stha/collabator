"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Radio,
  Wallet,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  role: "franchise" | "vendor";
}

interface NavItem {
  title: string;
  href: string;
  icon: any;
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const franchiseItems: NavItem[] = [
    { title: "Dashboard", href: "/franchise/dashboard", icon: LayoutDashboard },
    { title: "Stations", href: "/franchise/stations", icon: Radio },
    { title: "Payouts", href: "/franchise/payouts", icon: Wallet },
    { title: "Sub Vendors", href: "/franchise/sub-vendors", icon: Users },
    { title: "Agreements", href: "/franchise/agreements", icon: FileText },
  ];

  const vendorItems: NavItem[] = [
    { title: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
    { title: "Stations", href: "/vendor/stations", icon: Radio },
    { title: "Payouts", href: "/vendor/payouts", icon: Wallet },
    { title: "Agreements", href: "/vendor/agreements", icon: FileText },
  ];

  const menuItems = role === "franchise" ? franchiseItems : vendorItems;

  return (
    <aside
      className={cn(
        "flex flex-col bg-surface border-r border-border transition-all duration-300 ease-in-out h-screen sticky top-0",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary fill-primary" />
            <span className="font-bold text-xl tracking-tight">ChargeGhar</span>
          </div>
        )}
        {collapsed && <Zap className="h-8 w-8 text-primary fill-primary mx-auto" />}
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-colors group",
                isActive
                  ? "bg-primary text-white"
                  : "text-text-muted hover:bg-gray-100 dark:hover:bg-white/5 hover:text-text-primary"
              )}
              title={collapsed ? item.title : ""}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-text-muted group-hover:text-text-primary")} />
              {!collapsed && <span className="font-medium">{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          className="justify-start gap-3 text-text-muted hover:text-text-primary px-3"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          {!collapsed && <span>Collapse</span>}
        </Button>
        <Link href="/login">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            className="justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 px-3"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </Link>
      </div>
    </aside>
  );
}
