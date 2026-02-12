"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { vendorService } from "@/lib/services";
import { ApiError } from "@/lib/api-error";
import { AlertCircle, Shield, CheckCircle, XCircle, PauseCircle } from "lucide-react";

interface UpdateVendorStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  vendorId: string;
  vendorName: string;
  currentStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

type VendorStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

const STATUS_CONFIG: Record<VendorStatus, {
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}> = {
  ACTIVE: {
    label: 'Active',
    icon: <CheckCircle className="h-5 w-5" />,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    description: 'Vendor can access dashboard and earn revenue',
  },
  INACTIVE: {
    label: 'Inactive',
    icon: <XCircle className="h-5 w-5" />,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    description: 'Vendor account is deactivated',
  },
  SUSPENDED: {
    label: 'Suspended',
    icon: <PauseCircle className="h-5 w-5" />,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    description: 'Vendor access is temporarily suspended',
  },
};

export function UpdateVendorStatusModal({
  isOpen,
  onClose,
  onSuccess,
  vendorId,
  vendorName,
  currentStatus,
}: UpdateVendorStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<VendorStatus>(currentStatus);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedStatus(currentStatus);
      setReason("");
      setApiError(null);
    }
  }, [isOpen, currentStatus]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedStatus === currentStatus) {
      setApiError("Please select a different status");
      return;
    }

    setApiError(null);
    setIsSubmitting(true);

    try {
      const payload: any = {
        status: selectedStatus,
      };

      if (reason.trim()) {
        payload.reason = reason.trim();
      }

      const result = await vendorService.updateVendorStatus(vendorId, payload);

      if (result.success) {
        toast.success("Vendor status updated successfully", {
          description: `${vendorName} is now ${STATUS_CONFIG[selectedStatus].label}`,
        });
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isNetworkError) {
          setApiError("Network error. Please check your connection and try again.");
          toast.error("Network Error", { description: error.message });
        } else if (error.isServerError) {
          setApiError("Server error. Please try again later.");
          toast.error("Server Error", { description: error.message });
        } else {
          setApiError(error.message);
          toast.error("Failed to update status", { description: error.message });
        }
      } else {
        const message = error instanceof Error ? error.message : "Failed to update status";
        setApiError(message);
        toast.error("Failed to update status", { description: message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-[#171712]/85 backdrop-blur-xl w-full max-w-2xl rounded-2xl border border-primary/40 shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-start p-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold tracking-tight">
                Update Vendor Status
              </h2>
              <p className="text-[#b6b6a0] text-sm mt-0.5">
                Change status for {vendorName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-[#b6b6a0] hover:text-white transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* API Error Alert */}
          {apiError && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{apiError}</p>
            </div>
          )}

          {/* Current Status */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-gray-400 font-medium mb-2">Current Status</p>
            <div className="flex items-center gap-2">
              <span className={STATUS_CONFIG[currentStatus].color}>
                {STATUS_CONFIG[currentStatus].icon}
              </span>
              <span className="text-white font-semibold">
                {STATUS_CONFIG[currentStatus].label}
              </span>
            </div>
          </div>

          {/* Status Selection */}
          <div className="space-y-3">
            <label className="text-white text-sm font-medium">
              Select New Status
            </label>
            <div className="grid grid-cols-1 gap-3">
              {(Object.keys(STATUS_CONFIG) as VendorStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  disabled={isSubmitting}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedStatus === status
                      ? `${STATUS_CONFIG[status].borderColor} ${STATUS_CONFIG[status].bgColor}`
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  } disabled:opacity-50`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={selectedStatus === status ? STATUS_CONFIG[status].color : 'text-gray-400'}>
                      {STATUS_CONFIG[status].icon}
                    </span>
                    <span className="font-bold text-white">{STATUS_CONFIG[status].label}</span>
                    {status === currentStatus && (
                      <span className="ml-auto text-xs text-gray-400">(Current)</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{STATUS_CONFIG[status].description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Reason (Optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isSubmitting}
              rows={3}
              className="w-full rounded-lg text-white border border-[#51513e] bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary p-4 placeholder:text-[#51513e] outline-none disabled:opacity-50 resize-none"
              placeholder="Provide a reason for this status change..."
            />
          </div>
        </form>

        {/* Footer Action Buttons */}
        <div className="p-6 pt-0 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 h-12 rounded-lg border border-[#51513e] text-white text-sm font-bold hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedStatus === currentStatus}
            className="flex-1 h-12 rounded-lg bg-primary text-[#171712] text-sm font-black uppercase tracking-widest hover:brightness-110 shadow-[0_0_20px_rgba(189,189,40,0.3)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-xl">sync</span>
                Updating...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">check_circle</span>
                Update Status
              </>
            )}
          </button>
        </div>

        {/* Subtle glow effect at bottom */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>
    </div>
  );
}
