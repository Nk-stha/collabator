"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateVendorModal } from "@/components/dashboard/create-vendor-modal";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { useApi } from "@/hooks/use-api";
import { vendorService } from "@/lib/services";
import { cn } from "@/lib/utils";
import { Users, UserPlus, Building2, MapPin, Phone, Mail, TrendingUp, Search, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Vendor } from "@/lib/types/vendor.types";

export default function FranchiseSubVendors() {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: vendorData, loading, error, refetch } = useApi(() => 
    vendorService.getSubVendors({ page: 1, page_size: 50 })
  );

  const handleVendorCreated = () => {
    refetch();
  };

  // Safe vendor data accessor
  const getVendorData = (vendor: Vendor | null | undefined) => {
    if (!vendor) return null;
    return {
      id: vendor.id ?? '',
      code: vendor.code ?? 'N/A',
      business_name: vendor.business_name ?? 'Unknown Vendor',
      vendor_type: vendor.vendor_type ?? 'NON_REVENUE',
      contact_phone: vendor.contact_phone ?? 'N/A',
      contact_email: vendor.contact_email ?? null,
      status: vendor.status ?? 'INACTIVE',
      balance: vendor.balance ?? 0,
      total_earnings: vendor.total_earnings ?? 0,
      station: vendor.station ? {
        id: vendor.station.id ?? '',
        station_name: vendor.station.station_name ?? 'Unknown Station',
        serial_number: vendor.station.serial_number ?? 'N/A',
        address: vendor.station.address ?? 'No address',
        status: vendor.station.status ?? 'OFFLINE',
      } : null,
    };
  };

  // Filter vendors by search query
  const filteredVendors = (vendorData?.data?.results ?? []).filter((vendor) => {
    if (!searchQuery) return true;
    const data = getVendorData(vendor);
    if (!data) return false;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      data.business_name.toLowerCase().includes(searchLower) ||
      data.code.toLowerCase().includes(searchLower) ||
      data.contact_phone.toLowerCase().includes(searchLower) ||
      (data.contact_email?.toLowerCase().includes(searchLower) ?? false) ||
      (data.station?.station_name.toLowerCase().includes(searchLower) ?? false) ||
      (data.station?.serial_number.toLowerCase().includes(searchLower) ?? false)
    );
  });

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!vendorData?.data) {
    return <ErrorDisplay error={new Error("No data available") as any} onRetry={refetch} />;
  }

  const vendors = filteredVendors;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Sub-Vendors</h1>
          <p className="text-gray-500 text-sm font-medium">
            Manage your partner vendors and their assignments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            size="sm" 
            leftIcon={<RefreshCw className="h-4 w-4" />}
            onClick={() => refetch()}
          >
            Refresh
          </Button>
          <Button 
            variant="primary" 
            leftIcon={<UserPlus className="h-4 w-4" />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add Sub-Vendor
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by name, code, phone, email, or station..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* Empty State */}
      {vendors.length === 0 && !searchQuery ? (
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
      ) : vendors.length === 0 && searchQuery ? (
        <div className="bg-[#171712]/60 backdrop-blur-xl rounded-2xl border border-primary/20 p-12 text-center">
          <p className="text-gray-400">No vendors match your search criteria</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View (hidden on small/medium) */}
          <div className="hidden lg:block bg-[#171712]/60 backdrop-blur-xl rounded-2xl border border-primary/20 overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-white">Active Vendors</h2>
              <span className="ml-auto text-sm text-gray-400">{vendors.length} {searchQuery ? 'found' : 'total'}</span>
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
                  {vendors.map((vendor) => {
                    const data = getVendorData(vendor);
                    if (!data) return null;
                    
                    return (
                      <tr 
                        key={data.id}
                        onClick={() => router.push(`/franchise/sub-vendors/${data.id}`)}
                        className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-white">{data.business_name}</div>
                              <div className="text-xs text-gray-400">{data.contact_email || 'No email'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-mono text-gray-300">{data.code}</span>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "px-2 py-1 rounded text-xs font-semibold",
                            data.vendor_type === "REVENUE"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-gray-500/10 text-gray-400"
                          )}>
                            {data.vendor_type}
                          </span>
                        </td>
                        <td className="p-4">
                          {data.station ? (
                            <>
                              <div className="text-sm text-white">{data.station.station_name}</div>
                              <div className="text-xs text-gray-400">{data.station.serial_number}</div>
                            </>
                          ) : (
                            <div className="text-sm text-gray-400">No station assigned</div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-gray-300">{data.contact_phone}</div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="text-sm font-semibold text-white">
                            NPR {data.total_earnings.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-400">
                            Balance: NPR {data.balance.toLocaleString()}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <span className={cn(
                            "inline-flex px-2 py-1 rounded border text-xs font-bold tracking-wider",
                            data.status === "ACTIVE"
                              ? "bg-primary/10 border-primary/20 text-primary"
                              : "bg-red-500/10 border-red-500/20 text-red-500"
                          )}>
                            {data.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Card View (visible on small/medium) */}
          <div className="lg:hidden space-y-4">
            {vendors.map((vendor) => {
              const data = getVendorData(vendor);
              if (!data) return null;
              
              return (
                <div
                  key={data.id}
                  onClick={() => router.push(`/franchise/sub-vendors/${data.id}`)}
                  className="bg-[#171712]/60 backdrop-blur-xl rounded-xl border border-primary/20 p-4 hover:border-primary/40 transition-all cursor-pointer"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{data.business_name}</h3>
                        <p className="text-xs text-gray-400 font-mono">{data.code}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "px-2 py-1 rounded border text-xs font-bold tracking-wider",
                      data.status === "ACTIVE"
                        ? "bg-primary/10 border-primary/20 text-primary"
                        : "bg-red-500/10 border-red-500/20 text-red-500"
                    )}>
                      {data.status}
                    </span>
                  </div>

                  {/* Type Badge */}
                  <div className="mb-3">
                    <span className={cn(
                      "inline-flex px-2 py-1 rounded text-xs font-semibold",
                      data.vendor_type === "REVENUE"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-gray-500/10 text-gray-400"
                    )}>
                      {data.vendor_type}
                    </span>
                  </div>

                  {/* Station Info */}
                  {data.station ? (
                    <div className="flex items-start gap-2 mb-3 p-3 bg-white/5 rounded-lg">
                      <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">
                          {data.station.station_name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {data.station.serial_number} • {data.station.address}
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
                      <span className="text-gray-300">{data.contact_phone}</span>
                    </div>
                    {data.contact_email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300 truncate">{data.contact_email}</span>
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
                        NPR {data.total_earnings.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400">
                        Balance: NPR {data.balance.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
