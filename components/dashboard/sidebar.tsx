"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Radio,
  Wallet,
  Users,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  X,
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

const franchiseItems: NavItem[] = [
  { title: "Dashboard", href: "/franchise/dashboard", icon: LayoutDashboard },
  { title: "Stations", href: "/franchise/stations", icon: Radio },
  { title: "Payouts", href: "/franchise/payouts", icon: Wallet },
  { title: "Ejection Logs", href: "/franchise/ejection-logs", icon: LogOut },
  { title: "Sub Vendors", href: "/franchise/sub-vendors", icon: Users },
  { title: "Agreements", href: "/franchise/agreements", icon: FileText },
];

const vendorItems: NavItem[] = [
  { title: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
  { title: "Stations", href: "/vendor/stations", icon: Radio },
  { title: "Payouts", href: "/vendor/payouts", icon: Wallet },
  { title: "Ejection Logs", href: "/vendor/ejection-logs", icon: LogOut },
  { title: "Agreements", href: "/vendor/agreements", icon: FileText },
];

function SidebarContent({ role, collapsed }: { role: "franchise" | "vendor"; collapsed: boolean }) {
  const pathname = usePathname();
  const menuItems = role === "franchise" ? franchiseItems : vendorItems;

  return (
    <>
      <div className={cn("flex items-center", collapsed ? "justify-center p-4" : "px-6 py-6")}>
        {!collapsed ? (
          <div className="relative h-10 w-32">
            <Image 
              src="/ChargeGharLogo.webp" 
              alt="ChargeGhar" 
              fill 
              className="object-contain object-left"
              priority
            />
          </div>
        ) : (
          <Zap className="h-8 w-8 text-primary fill-primary" />
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
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

      <div className="p-4 border-t border-border mt-auto">
        <Link href="/login">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 px-3",
              collapsed && "justify-center px-0"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </Link>
      </div>
    </>
  );
}

export function Sidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-surface border-r border-border transition-all duration-300 ease-in-out h-screen sticky top-0",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <SidebarContent role={role} collapsed={collapsed} />
      
      <div className="p-4 pt-0">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-start gap-3 text-text-muted hover:text-text-primary px-3",
            collapsed && "justify-center px-0"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          {!collapsed && <span>Collapse</span>}
        </Button>
      </div>
    </aside>
  );
}

interface MobileSidebarProps extends SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ role, isOpen, onClose }: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Sidebar Panel */}
      <div className="relative bg-surface w-64 h-full flex flex-col border-r border-border shadow-2xl animate-in slide-in-from-left duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary"
        >
          <X className="h-6 w-6" />
        </button>
        <SidebarContent role={role} collapsed={false} />
      </div>
    </div>
  );
}


