"use client";

import { useApi } from "@/hooks/use-api";
import { agreementService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import { FileText, Download, Eye, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function VendorAgreements() {
  const { data: response, loading, error, refetch } = useApi(() => 
    agreementService.getVendorAgreement()
  );

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!response?.data) return <EmptyState message="No agreement found" />;

  const agreement = response.data;
  const vendor = agreement.vendor;
  const station = agreement.station;
  const distribution = agreement.distribution;
  const revenueModel = agreement.revenue_model;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white">My Agreement</h3>
        <p className="text-sm text-gray-400">Current contract details with your Franchise</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 dashboard-card p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Business Name</p>
              <p className="text-lg font-bold text-white">{vendor.business_name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Station</p>
              <p className="text-lg font-bold text-white">{station.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Distribution Type</p>
              <p className="text-lg font-bold text-white">{distribution.distribution_type}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Slots</p>
              <p className="text-lg font-bold text-white">{station.total_slots}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-8">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Revenue Model</p>
            <p className="text-lg font-bold text-primary">{revenueModel.description}</p>
            {revenueModel.model_type === 'PERCENTAGE' && revenueModel.partner_percent && (
              <p className="text-sm text-gray-400 mt-2">You receive {revenueModel.partner_percent}% of net revenue</p>
            )}
            {revenueModel.model_type === 'FIXED' && revenueModel.fixed_amount && (
              <p className="text-sm text-gray-400 mt-2">Fixed amount: NPR {revenueModel.fixed_amount.toLocaleString()}</p>
            )}
          </div>

          <div className="space-y-4">
            <h5 className="font-semibold text-white">Agreement Details</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-gray-300">Station: {station.code}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-gray-300">Address: {station.address}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-gray-300">Active: {distribution.is_active ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-gray-300">Balance: NPR {vendor.balance.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card p-6 bg-primary/5 border-primary/20">
          <h5 className="font-bold text-white mb-4">Financial Summary</h5>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Current Balance</p>
              <p className="text-2xl font-bold text-primary">NPR {vendor.balance.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Earnings</p>
              <p className="text-2xl font-bold text-white">NPR {vendor.total_earnings.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
