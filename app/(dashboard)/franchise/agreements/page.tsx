"use client";

import { useApi } from "@/hooks/use-api";
import { agreementService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import { FileText, Eye, Calendar, CheckCircle, Building2 } from "lucide-react";

export default function FranchiseAgreements() {
  const { data: response, loading, error, refetch } = useApi(() => 
    agreementService.getFranchiseAgreements()
  );

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!response?.data) return <EmptyState message="No agreements found" />;

  const { franchise_agreement, vendor_agreements } = response.data;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-white">Franchise Agreements</h3>
        <p className="text-sm text-gray-400">Your franchise contract and vendor agreements with Chargeghar</p>
      </div>

      {/* Franchise Agreement */}
      <div className="dashboard-card p-6">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xl">{franchise_agreement.franchise_code}</h4>
              <p className="text-sm text-gray-400">Master Franchise Agreement</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400 flex items-center gap-2 justify-end">
              <Calendar className="h-4 w-4" />
              {new Date(franchise_agreement.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Franchise Name</p>
            <p className="text-lg font-bold text-white">{franchise_agreement.franchise_name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Revenue Share</p>
            <p className="text-lg font-bold text-primary">{franchise_agreement.revenue_share_percent}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Stations</p>
            <p className="text-lg font-bold text-white">{franchise_agreement.total_stations}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Vendors</p>
            <p className="text-lg font-bold text-white">{franchise_agreement.total_vendors}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Upfront Payment</p>
              <p className="text-sm font-bold text-white">NPR {parseFloat(franchise_agreement.upfront_payment).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Current Balance</p>
              <p className="text-sm font-bold text-white">NPR {parseFloat(franchise_agreement.balance).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Earnings</p>
              <p className="text-sm font-bold text-white">NPR {parseFloat(franchise_agreement.total_earnings).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Agreements */}
      {vendor_agreements.length > 0 && (
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Vendor Agreements ({vendor_agreements.length})</h4>
          <div className="grid grid-cols-1 gap-4">
            {vendor_agreements.map((vendor) => (
              <div key={vendor.vendor_id} className="dashboard-card p-6 border-white/5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Building2 className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-bold text-white">{vendor.vendor_name}</h5>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          vendor.is_active 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-gray-500/10 text-gray-500'
                        }`}>
                          {vendor.is_active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 font-mono">{vendor.vendor_code}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="px-2 py-1 bg-white/5 rounded">
                          {vendor.vendor_type}
                        </span>
                        <span>Station: {vendor.station_name} ({vendor.station_code})</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary mb-1">
                      {vendor.revenue_model === 'PERCENTAGE' 
                        ? `${vendor.partner_percent}% Revenue Share`
                        : `NPR ${vendor.fixed_amount?.toLocaleString()} Fixed`
                      }
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(vendor.created_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {vendor_agreements.length === 0 && (
        <div className="dashboard-card p-8 text-center">
          <Building2 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No vendor agreements yet</p>
        </div>
      )}
    </div>
  );
}
