"use client";

import { useApi } from "@/hooks/use-api";
import { agreementService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { FileText, Eye, Calendar, CheckCircle, Building2, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { FranchiseVendorAgreement } from "@/lib/types/agreement.types";

export default function FranchiseAgreements() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: response, loading, error, refetch } = useApi(() => 
    agreementService.getFranchiseAgreements()
  );

  // Safe number formatter
  const formatNumber = (value: string | number | null | undefined): string => {
    const num = typeof value === 'string' ? parseFloat(value) : (value ?? 0);
    return num.toLocaleString();
  };

  // Safe date formatter
  const formatDate = (date: string | null | undefined): string => {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Safe vendor agreement accessor
  const getVendorData = (vendor: FranchiseVendorAgreement | null | undefined) => {
    if (!vendor) return null;
    return {
      vendor_id: vendor.vendor_id ?? '',
      vendor_name: vendor.vendor_name ?? 'Unknown Vendor',
      vendor_code: vendor.vendor_code ?? 'N/A',
      vendor_type: vendor.vendor_type ?? 'NON_REVENUE',
      station_name: vendor.station_name ?? 'Unknown Station',
      station_code: vendor.station_code ?? 'N/A',
      revenue_model: vendor.revenue_model ?? 'PERCENTAGE',
      partner_percent: typeof vendor.partner_percent === 'string' ? parseFloat(vendor.partner_percent) : (vendor.partner_percent ?? 0),
      fixed_amount: vendor.fixed_amount ?? 0,
      is_active: vendor.is_active ?? false,
      created_at: vendor.created_at ?? null,
    };
  };

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!response?.data) {
    return <ErrorDisplay error={new Error("No data available") as any} onRetry={refetch} />;
  }

  const { franchise_agreement, vendor_agreements } = response.data;

  // Filter vendor agreements by search query
  const filteredVendors = (vendor_agreements ?? []).filter((vendor) => {
    if (!searchQuery) return true;
    const data = getVendorData(vendor);
    if (!data) return false;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      data.vendor_name.toLowerCase().includes(searchLower) ||
      data.vendor_code.toLowerCase().includes(searchLower) ||
      data.station_name.toLowerCase().includes(searchLower) ||
      data.station_code.toLowerCase().includes(searchLower) ||
      data.vendor_type.toLowerCase().includes(searchLower)
    );
  });

  // Safe franchise agreement accessor
  const franchiseData = {
    franchise_code: franchise_agreement?.franchise_code ?? 'N/A',
    franchise_name: franchise_agreement?.franchise_name ?? 'Unknown Franchise',
    revenue_share_percent: typeof franchise_agreement?.revenue_share_percent === 'string' 
      ? parseFloat(franchise_agreement.revenue_share_percent) 
      : (franchise_agreement?.revenue_share_percent ?? 0),
    total_stations: franchise_agreement?.total_stations ?? 0,
    total_vendors: franchise_agreement?.total_vendors ?? 0,
    upfront_payment: franchise_agreement?.upfront_payment ?? 0,
    balance: franchise_agreement?.balance ?? 0,
    total_earnings: franchise_agreement?.total_earnings ?? 0,
    created_at: franchise_agreement?.created_at ?? null,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Agreements</h1>
          <p className="text-gray-500 text-sm font-medium">
            Your franchise contract and vendor agreements with Chargeghar
          </p>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          leftIcon={<RefreshCw className="h-4 w-4" />}
          onClick={() => refetch()}
        >
          Refresh
        </Button>
      </div>

      {/* Franchise Agreement */}
      <div className="bg-[#171712]/60 backdrop-blur-xl rounded-2xl border border-primary/20 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-white/5 gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg sm:text-xl">{franchiseData.franchise_code}</h4>
              <p className="text-xs sm:text-sm text-gray-400">Master Franchise Agreement</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(franchiseData.created_at)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Franchise Name</p>
            <p className="text-base sm:text-lg font-bold text-white">{franchiseData.franchise_name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Revenue Share</p>
            <p className="text-base sm:text-lg font-bold text-primary">{franchiseData.revenue_share_percent}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Total Stations</p>
            <p className="text-base sm:text-lg font-bold text-white">{franchiseData.total_stations}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Total Vendors</p>
            <p className="text-base sm:text-lg font-bold text-white">{franchiseData.total_vendors}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase font-bold tracking-wider">Upfront Payment</p>
              <p className="text-xs sm:text-sm font-bold text-white truncate">NPR {formatNumber(franchiseData.upfront_payment)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase font-bold tracking-wider">Current Balance</p>
              <p className="text-xs sm:text-sm font-bold text-white truncate">NPR {formatNumber(franchiseData.balance)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase font-bold tracking-wider">Total Earnings</p>
              <p className="text-xs sm:text-sm font-bold text-white truncate">NPR {formatNumber(franchiseData.total_earnings)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Agreements Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h4 className="text-lg font-bold text-white">
            Vendor Agreements ({filteredVendors.length}{searchQuery ? ` of ${vendor_agreements?.length ?? 0}` : ''})
          </h4>
          {(vendor_agreements?.length ?? 0) > 0 && (
            <div className="flex-1 sm:max-w-md">
              <Input
                placeholder="Search by vendor, station, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>
          )}
        </div>

        {/* Empty State - No Vendors */}
        {(vendor_agreements?.length ?? 0) === 0 ? (
          <div className="bg-[#171712]/60 backdrop-blur-xl rounded-2xl border border-primary/20 p-8 sm:p-12 text-center">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No Vendor Agreements Yet</h3>
            <p className="text-sm text-gray-400">Vendor agreements will appear here once created</p>
          </div>
        ) : filteredVendors.length === 0 ? (
          <div className="bg-[#171712]/60 backdrop-blur-xl rounded-2xl border border-primary/20 p-8 sm:p-12 text-center">
            <p className="text-gray-400">No vendor agreements match your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredVendors.map((vendor) => {
              const data = getVendorData(vendor);
              if (!data) return null;

              return (
                <div 
                  key={data.vendor_id} 
                  className="bg-[#171712]/60 backdrop-blur-xl rounded-xl border border-primary/20 p-4 sm:p-6 hover:border-primary/40 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                        <Building2 className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h5 className="font-bold text-white truncate">{data.vendor_name}</h5>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                            data.is_active 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-gray-500/10 text-gray-500'
                          }`}>
                            {data.is_active ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 font-mono mb-2">{data.vendor_code}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-500">
                          <span className="px-2 py-1 bg-white/5 rounded inline-block w-fit">
                            {data.vendor_type}
                          </span>
                          <span className="truncate">Station: {data.station_name} ({data.station_code})</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left md:text-right shrink-0">
                      <p className="text-sm font-bold text-primary mb-1">
                        {data.revenue_model === 'PERCENTAGE' 
                          ? `${data.partner_percent}% Revenue Share`
                          : `NPR ${formatNumber(data.fixed_amount)} Fixed`
                        }
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(data.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
