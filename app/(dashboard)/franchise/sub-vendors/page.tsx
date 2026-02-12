"use client";

import { Button } from "@/components/ui/button";
import { CreateVendorModal } from "@/components/dashboard/create-vendor-modal";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { useApi } from "@/hooks/use-api";
import { vendorService } from "@/lib/services";
import { cn } from "@/lib/utils";
import { Users, UserPlus, Building2, MapPin, DollarSign, Phone, Mail, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Vendor } from "@/lib/types/vendor.types";

export default function FranchiseSubVendors() {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const { data: vendorData, loading, error, refetch } = useApi(() => 
    vendorService.getSubVendors({ page: 1, page_size: 50 })
  );

  const handleVendorCreated = () => {
    refetch();
  };

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!vendorData?.data) {
    return <ErrorDisplay error={new Error("No data available") as any} onRetry={refetch} />;
  }

  const vendors = vendorData.data.results;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Sub-Vendors</h1>
          <p className="text-gray-500 text-sm font-medium">
            Manage your partner vendors and their assignments
          </p>
        </div>
        <Button 
          variant="primary" 
          leftIcon={<UserPlus className="h-4 w-4" />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add Sub-Vendor
        </Button>
      </div>

      {/* Empty State */}
      {vendors.length === 0 ? (
        <div className="bg-[#171712]/60 backdrop-blur-xl rounded-2xl border border-primary/20 p-12 text-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Vendors Yet</h3>
          <p className="text-gray-400 mb-6">Get started by adding your first sub-vendor</p>
          <Button 
            variant="primary" 
            leftIcon={<UserPlus className="h-4 w-4" />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add Sub-Vendor
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop Table View (hidden on small/medium) */}
          <div className="hidden lg:block bg-[#171712]/60 backdrop-blur-xl rounded-2xl border border-primary/20 overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-white">Active Vendors</h2>
              <span className="ml-auto text-sm text-gray-400">{vendors.length} total</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-sm font-semibold text-gray-400">Vendor</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-400">Code</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-400">Type</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-400">Station</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-400">Contact</th>
                    <th className="text-right p-4 text-sm font-semibold text-gray-400">Earnings</th>
                    <th className="text-center p-4 text-sm font-semibold text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <tr 
                      key={vendor.id}
                      onClick={() => router.push(`/franchise/sub-vendors/${vendor.id}`)}
                      className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{vendor.business_name}</div>
                            <div className="text-xs text-gray-400">{vendor.contact_email || 'No email'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-mono text-gray-300">{vendor.code}</span>
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-semibold",
                          vendor.vendor_type === "REVENUE"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-gray-500/10 text-gray-400"
                        )}>
                          {vendor.vendor_type}
                        </span>
                      </td>
                      <td className="p-4">
                        {vendor.station ? (
                          <>
                            <div className="text-sm text-white">{vendor.station.station_name}</div>
                            <div className="text-xs text-gray-400">{vendor.station.serial_number}</div>
                          </>
                        ) : (
                          <div className="text-sm text-gray-400">No station assigned</div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-300">{vendor.contact_phone}</div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="text-sm font-semibold text-white">
                          NPR {vendor.total_earnings.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          Balance: NPR {vendor.balance.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={cn(
                          "inline-flex px-2 py-1 rounded border text-xs font-bold tracking-wider",
                          vendor.status === "ACTIVE"
                            ? "bg-primary/10 border-primary/20 text-primary"
                            : "bg-red-500/10 border-red-500/20 text-red-500"
                        )}>
                          {vendor.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Card View (visible on small/medium) */}
          <div className="lg:hidden space-y-4">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                onClick={() => router.push(`/franchise/sub-vendors/${vendor.id}`)}
                className="bg-[#171712]/60 backdrop-blur-xl rounded-xl border border-primary/20 p-4 hover:border-primary/40 transition-all cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{vendor.business_name}</h3>
                      <p className="text-xs text-gray-400 font-mono">{vendor.code}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "px-2 py-1 rounded border text-xs font-bold tracking-wider",
                    vendor.status === "ACTIVE"
                      ? "bg-primary/10 border-primary/20 text-primary"
                      : "bg-red-500/10 border-red-500/20 text-red-500"
                  )}>
                    {vendor.status}
                  </span>
                </div>

                {/* Type Badge */}
                <div className="mb-3">
                  <span className={cn(
                    "inline-flex px-2 py-1 rounded text-xs font-semibold",
                    vendor.vendor_type === "REVENUE"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-gray-500/10 text-gray-400"
                  )}>
                    {vendor.vendor_type}
                  </span>
                </div>

                {/* Station Info */}
                {vendor.station ? (
                  <div className="flex items-start gap-2 mb-3 p-3 bg-white/5 rounded-lg">
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">
                        {vendor.station.station_name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {vendor.station.serial_number} • {vendor.station.address}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 mb-3 p-3 bg-white/5 rounded-lg">
                    <MapPin className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-400">No station assigned</div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{vendor.contact_phone}</span>
                  </div>
                  {vendor.contact_email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300 truncate">{vendor.contact_email}</span>
                    </div>
                  )}
                </div>

                {/* Earnings */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-xs text-gray-400">Total Earnings</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">
                      NPR {vendor.total_earnings.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      Balance: NPR {vendor.balance.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Create Vendor Modal */}
      <CreateVendorModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleVendorCreated}
      />
    </div>
  );
}
