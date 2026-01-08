"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardNavbar } from "@/components/dashboard/navbar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Simple role detection based on pathname for now
  const role = pathname.includes("/vendor") ? "vendor" : "franchise";

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNavbar />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
