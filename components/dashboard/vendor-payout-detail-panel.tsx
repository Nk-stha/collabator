"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { payoutService } from "@/lib/services";
import { ApiError } from "@/lib/api-error";
import { toast } from "sonner";
import type { VendorPayout } from "@/lib/types";

interface VendorPayoutDetailPanelProps {
  payout: VendorPayout | null;
  onClose: () => void;
  onActionSuccess?: () => void;
}

export function VendorPayoutDetailPanel({ payout, onClose, onActionSuccess }: VendorPayoutDetailPanelProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionError, setRejectionError] = useState("");

  const handleApprove = async () => {
    if (!payout) return;

    setIsApproving(true);
    try {
      const response = await payoutService.approveVendorPayout(payout.id);
      toast.success(response.message || "Payout approved successfully");
      onActionSuccess?.();
      onClose();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Failed to approve payout");
      }
    } finally {
      setIsApproving(false);
    }
  };

  const handleComplete = async () => {
    if (!payout) return;

    setIsCompleting(true);
    try {
      const response = await payoutService.completeVendorPayout(payout.id);
      toast.success(response.message || "Payout completed successfully");
      onActionSuccess?.();
      onClose();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Failed to complete payout");
      }
    } finally {
      setIsCompleting(false);
    }
  };

  const handleReject = async () => {
    if (!payout) return;

    if (!rejectionReason.trim()) {
      setRejectionError("Rejection reason is required");
      return;
    }

    setIsRejecting(true);
    setRejectionError("");

    try {
      const response = await payoutService.rejectVendorPayout(payout.id, {
        reason: rejectionReason.trim(),
      });
      toast.success(response.message || "Payout rejected successfully");
      setShowRejectForm(false);
      setRejectionReason("");
      onActionSuccess?.();
      onClose();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Failed to reject payout");
      }
    } finally {
      setIsRejecting(false);
    }
  };

  const canApprove = payout?.status === 'PENDING';
  const canComplete = payout?.status === 'APPROVED';
  const canReject = payout?.status === 'PENDING';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-primary/10 border-primary/20 text-primary';
      case 'PENDING':
        return 'bg-accent-orange/10 border-accent-orange/20 text-accent-orange';
      case 'APPROVED':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      case 'PROCESSING':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      case 'REJECTED':
        return 'bg-red-500/10 border-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'check_circle';
      case 'PENDING':
        return 'schedule';
      case 'APPROVED':
        return 'verified';
      case 'PROCESSING':
        return 'hourglass_bottom';
      case 'REJECTED':
        return 'cancel';
      default:
        return 'help';
    }
  };

  return (
    <>
      {/* Overlay */}
      {payout && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Side Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-card-dark border-l border-white/10 shadow-2xl transition-transform duration-300 z-50 overflow-y-auto",
          payout ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card-dark border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Vendor Payout Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {payout && (
            <>
              {/* Vendor Info Section */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Vendor
                </label>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">storefront</span>
                  </div>
                  <div>
                    <p className="text-base font-bold text-white">{payout.vendor.business_name}</p>
                    <p className="text-xs text-gray-400 font-mono">{payout.vendor.code}</p>
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </label>
                <div className={cn(
                  "px-4 py-3 rounded-lg border flex items-center gap-2 w-fit",
                  getStatusColor(payout.status)
                )}>
                  <span className="material-symbols-outlined text-lg">
                    {getStatusIcon(payout.status)}
                  </span>
                  <span className="font-bold">{payout.status}</span>
                </div>
              </div>

              {/* Amount Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Gross Amount
                  </label>
                  <p className="text-2xl font-bold text-white">
                    NPR {payout.amount.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Net Amount
                  </label>
                  <p className="text-2xl font-bold text-primary">
                    NPR {payout.net_amount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Reference ID */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Reference ID
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-mono text-gray-300">{payout.reference_id}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(payout.reference_id);
                    }}
                    className="text-primary hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                  </button>
                </div>
              </div>

              {/* Bank Details */}
              {payout.bank_name && (
                <>
                  <div className="border-t border-white/5 pt-4 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">account_balance</span>
                      Bank Details
                    </h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Bank Name
                        </label>
                        <p className="text-sm text-gray-300">{payout.bank_name}</p>
                      </div>
                      {payout.account_holder_name && (
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Account Holder
                          </label>
                          <p className="text-sm text-gray-300">{payout.account_holder_name}</p>
                        </div>
                      )}
                      {payout.account_number && (
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Account Number
                          </label>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-mono text-gray-300">
                              {payout.account_number.slice(-4).padStart(payout.account_number.length, '*')}
                            </p>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(payout.account_number || '');
                              }}
                              className="text-primary hover:text-white transition-colors"
                            >
                              <span className="material-symbols-outlined text-sm">content_copy</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Timeline */}
              <div className="border-t border-white/5 pt-4 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mt-1.5"></div>
                      {payout.processed_at && <div className="w-0.5 h-12 bg-white/10 my-1"></div>}
                    </div>
                    <div className="pb-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Requested
                      </p>
                      <p className="text-sm text-gray-300 mt-1">
                        {new Date(payout.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {payout.processed_at && (
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-primary mt-1.5"></div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Processed
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          {new Date(payout.processed_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Rejection Reason */}
              {payout.rejection_reason && (
                <div className="border-t border-white/5 pt-4 space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Rejection Reason
                  </label>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-sm text-red-400">{payout.rejection_reason}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {(canApprove || canComplete || canReject) && (
                <div className="border-t border-white/5 pt-6 space-y-4">
                  <h3 className="text-sm font-bold text-white">Actions</h3>
                  
                  {!showRejectForm ? (
                    <div className="flex flex-col gap-3">
                      {canApprove && (
                        <Button
                          variant="primary"
                          onClick={handleApprove}
                          disabled={isApproving || isRejecting}
                          className="w-full"
                        >
                          {isApproving ? "Approving..." : "Approve Payout"}
                        </Button>
                      )}
                      
                      {canComplete && (
                        <Button
                          variant="primary"
                          onClick={handleComplete}
                          disabled={isCompleting}
                          className="w-full"
                        >
                          {isCompleting ? "Completing..." : "Complete Payout"}
                        </Button>
                      )}
                      
                      {canReject && (
                        <Button
                          variant="outline"
                          onClick={() => setShowRejectForm(true)}
                          disabled={isApproving || isRejecting}
                          className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10"
                        >
                          Reject Payout
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Rejection Reason <span className="text-red-500">*</span>
                        </label>
                        <Input
                          value={rejectionReason}
                          onChange={(e) => {
                            setRejectionReason(e.target.value);
                            setRejectionError("");
                          }}
                          placeholder="Enter reason for rejection"
                          disabled={isRejecting}
                          error={rejectionError}
                        />
                        {rejectionError && (
                          <p className="text-red-500 text-xs mt-1">{rejectionError}</p>
                        )}
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowRejectForm(false);
                            setRejectionReason("");
                            setRejectionError("");
                          }}
                          disabled={isRejecting}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleReject}
                          disabled={isRejecting}
                          className="flex-1 bg-red-500 hover:bg-red-600"
                        >
                          {isRejecting ? "Rejecting..." : "Confirm Reject"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </>
          )}
        </div>
      </div>
    </>
  );
}
