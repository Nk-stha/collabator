"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { usePathname, useRouter } from "next/navigation";
import { User, Bell, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/use-api";
import { authService } from "@/lib/services";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

interface DashboardNavbarProps {
  onMenuClick?: () => void;
}

export function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: partner } = useApi(() => authService.getMe());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "Dashboard";
    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, " ");
  };

  const getProfileLink = () => {
    if (pathname.startsWith('/vendor')) return '/vendor/profile';
    if (pathname.startsWith('/franchise')) return '/franchise/profile';
    return '/profile';
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success("Logged out successfully");
      router.push('/login');
    } catch (error) {
      toast.error("Logout failed, but local session cleared");
      router.push('/login');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-1 text-text-muted hover:text-text-primary transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold tracking-tight text-text-primary">
          {getTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="relative p-2 h-10 w-10 rounded-full">
          <Bell className="h-5 w-5 text-text-muted" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-surface" />
        </Button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <ThemeToggle />
          
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-text-primary leading-none">
                  {partner?.profile.full_name || partner?.business_name || "Loading..."}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  {partner?.code || ""}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                {partner?.profile.avatar_url ? (
                  <img 
                    src={partner.profile.avatar_url} 
                    alt={partner.business_name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5 text-primary" />
                )}
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-xl shadow-lg overflow-hidden z-50">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-semibold text-text-primary">
                    {partner?.profile.full_name || partner?.business_name}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {partner?.contact_email}
                  </p>
                </div>
                
                <div className="py-1">
                  <button
                    onClick={() => {
                      router.push(getProfileLink());
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-2 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    View Profile
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
