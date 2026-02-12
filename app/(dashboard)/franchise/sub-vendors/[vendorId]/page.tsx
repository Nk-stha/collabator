"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { EditVendorModal } from "@/components/dashboard/edit-vendor-modal";
import { UpdateVendorStatusModal } from "@/components/dashboard/update-vendor-status-modal";
import { useApi } from "@/hooks/use-api";
import { vendorService } from "@/lib/services";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Wallet,
  MapPinned,
  Percent,
  BadgeCheck,
  FileText,
  Dock,
  Edit,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubVendorDetail({ params }: { params: Promise<{ vendorId: string }> }) {
  const router = useRouter();
  const { vendorId } = use(params);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  
  const { data: vendorResponse, loading, error, refetch } = useApi(() => 
    vendorService.getVendorById(vendorId)
  );

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!vendorResponse?.data) {
    return <ErrorDisplay error={new Error("Vendor not found") as any} onRetry={refetch} />;
  }

  const vendor = vendorResponse.data;

  const handleEditSuccess = () => {
    refetch();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Vendors</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-4xl font-extrabold text-white tracking-tight">
                {vendor.business_name}
              </h1>
              <span className={cn(
                "px-3 py-1 rounded-lg border text-xs font-bold tracking-wider",
                vendor.status === "ACTIVE"
                  ? "bg-primary/10 border-primary/20 text-primary"
                  : "bg-red-500/10 border-red-500/20 text-red-500"
              )}>
                {vendor.status}
              </span>
              <span className={cn(
                "px-3 py-1 rounded-lg text-xs font-semibold",
                vendor.vendor_type === "REVENUE"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-gray-500/10 text-gray-400"
              )}>
                {vendor.vendor_type}
              </span>
            </div>
            <p className="text-gray-400 text-sm font-medium font-mono">{vendor.code}</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="outline"
              leftIcon={<Shield className="h-4 w-4" />}
              onClick={() => setIsStatusModalOpen(true)}
            >
              Change Status
            </Button>
            <Button
              variant="outline"
              leftIcon={<Edit className="h-4 w-4" />}
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit Vendor
            </Button>
            <Button
              variant="primary"
              leftIcon={<Dock className="h-4 w-4" />}
              onClick={() => router.push(`/franchise/stations/${vendor.station.id}`)}
            >
              View Station
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards - Mobile Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Earnings */}
        <div className="bg-[#171712]/60 backdrop-blur-xl rounded-xl border border-primary/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs text-gray-400 font-medium">All Time</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">
              NPR {vendor.total_earnings.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 font-medium">Total Earnings</p>
          </div>
        </div>

        {/* Current Balance */}
        <div className="bg-[#171712]/60 backdrop-blur-xl rounded-xl border border-primary/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-green-400" />
            </div>
            <span className="text-xs text-gray-400 font-medium">Available</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">
              NPR {vendor.balance.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 font-medium">Current Balance</p>
          </div>
        </div>

        {/* Revenue Model */}
        {vendor.revenue_share && (
          <div className="bg-[#171712]/60 backdrop-blur-xl rounded-xl border border-primary/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {vendor.revenue_share.revenue_model}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">
                {vendor.revenue_share.revenue_model === 'PERCENTAGE' 
                  ? `${vendor.revenue_share.partner_percent}%`
                  : `NPR ${vendor.revenue_share.fixed_amount?.toLocaleString()}`
                }
              </p>
              <p className="text-xs text-gray-400 font-medium">Revenue Share</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Information */}
        <div className="bg-[#171712]/60 backdrop-blur-xl rounded-2xl border border-primary/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-white">Business Information</h2>
          </div>

          <div className="space-y-4">
            {/* User Info */}
            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
              <User className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 font-medium mb-1">Linked User</p>
                <p className="text-sm font-semibold text-white">{vendor.user.username}</p>
                <p className="text-xs text-gray-400 mt-0.5">ID: {vendor.user.id}</p>
              </div>
            </div>

            {/* Contact Phone */}
            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
              <Phone className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 font-medium mb-1">Contact Phone</p>
                <p className="text-sm font-semibold text-white">{vendor.contact_phone}</p>
              </div>
            </div>

            {/* Email */}
            {vendor.contact_email && (
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <Mail className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-medium mb-1">Email Address</p>
                  <p className="text-sm font-semibold text-white truncate">{vendor.contact_email}</p>
                </div>
              </div>
            )}

            {/* Address */}
            {vendor.address && (
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <MapPin className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-medium mb-1">Business Address</p>
                  <p className="text-sm font-semibold text-white">{vendor.address}</p>
                </div>
              </div>
            )}

            {/* Created Date */}
            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 font-medium mb-1">Joined Date</p>
                <p className="text-sm font-semibold text-white">
                  {new Date(vendor.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Station & Revenue Information */}
        <div className="space-y-6">
          {/* Station Details */}
          <div className="bg-[#171712]/60 backdrop-blur-xl rounded-2xl border border-primary/20 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPinned className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-white">Assigned Station</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {vendor.station.station_name}
                    </h3>
                    <p className="text-sm text-gray-400 font-mono">{vendor.station.serial_number}</p>
                  </div>
                  <span className={cn(
                    "px-2 py-1 rounded text-xs font-bold",
                    vendor.station.status === "ONLINE"
                      ? "bg-green-500/10 text-green-400"
                      : vendor.station.status === "OFFLINE"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  )}>
                    {vendor.station.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{vendor.station.address}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Dock className="h-4 w-4" />
                  <span>{vendor.station.total_slots} Total Slots</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                leftIcon={<Dock className="h-4 w-4" />}
                onClick={() => router.push(`/franchise/stations/${vendor.station.id}`)}
              >
                View Station Details
              </Button>
            </div>
          </div>

          {/* Revenue Share Details */}
          {vendor.revenue_share && (
            <div className="bg-[#171712]/60 backdrop-blur-xl rounded-2xl border border-primary/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Percent className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-white">Revenue Model</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400 font-medium mb-2">Model Type</p>
                  <p className="text-lg font-bold text-white">
                    {vendor.revenue_share.revenue_model === 'PERCENTAGE' ? 'Percentage Based' : 'Fixed Amount'}
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400 font-medium mb-2">Vendor Share</p>
                  <p className="text-2xl font-bold text-primary">
                    {vendor.revenue_share.revenue_model === 'PERCENTAGE'
                      ? `${vendor.revenue_share.partner_percent}%`
                      : `NPR ${vendor.revenue_share.fixed_amount?.toLocaleString()}`
                    }
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {vendor.revenue_share.revenue_model === 'PERCENTAGE'
                      ? 'of total revenue'
                      : 'per month'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notes Section */}
      {vendor.notes && (
        <div className="bg-[#171712]/60 backdrop-blur-xl rounded-2xl border border-primary/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-white">Notes</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{vendor.notes}</p>
        </div>
      )}

      {/* Edit Vendor Modal */}
      <EditVendorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleEditSuccess}
        vendor={vendor}
      />

      {/* Update Vendor Status Modal */}
      <UpdateVendorStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onSuccess={handleEditSuccess}
        vendorId={vendor.id}
        currentStatus={vendor.status}
        vendorName={vendor.business_name}
      />
    </div>
  );
}
