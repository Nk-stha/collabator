"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { payoutService } from "@/lib/services";
import { ApiError } from "@/lib/api-error";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  onSuccess?: () => void;
}

export function WithdrawalModal({ isOpen, onClose, availableBalance, onSuccess }: WithdrawalModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    amount: "",
    bank_name: "",
    account_number: "",
    account_holder_name: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    } else if (parseFloat(formData.amount) > availableBalance) {
      newErrors.amount = `Amount cannot exceed available balance (NPR ${availableBalance.toLocaleString()})`;
    }

    if (!formData.bank_name.trim()) {
      newErrors.bank_name = "Bank name is required";
    }

    if (!formData.account_number.trim()) {
      newErrors.account_number = "Account number is required";
    }

    if (!formData.account_holder_name.trim()) {
      newErrors.account_holder_name = "Account holder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await payoutService.requestVendorPayout({
        amount: formData.amount,
        bank_name: formData.bank_name,
        account_number: formData.account_number,
        account_holder_name: formData.account_holder_name,
      });

      toast.success("Withdrawal request submitted successfully", {
        description: `Reference ID: ${response.data.reference_id}`,
      });

      setFormData({
        amount: "",
        bank_name: "",
        account_number: "",
        account_holder_name: "",
      });
      setErrors({});
      onClose();
      onSuccess?.();
    } catch (error) {
      if (error instanceof ApiError) {
        // Handle specific API errors
        if (error.isValidationError && error.fieldErrors) {
          const fieldErrors: Record<string, string> = {};
          for (const [field, messages] of Object.entries(error.fieldErrors)) {
            fieldErrors[field] = messages[0] || "Invalid value";
          }
          setErrors(fieldErrors);
          setApiError("Please check the form fields and try again");
        } else if (error.isNetworkError) {
          setApiError("Network error. Please check your connection and try again.");
          toast.error("Network Error", { description: error.message });
        } else if (error.isServerError) {
          setApiError("Server error. Please try again later.");
          toast.error("Server Error", { description: error.message });
        } else {
          setApiError(error.message);
          toast.error("Request Failed", { description: error.message });
        }
      } else {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        setApiError(message);
        toast.error("Error", { description: message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
    if (apiError) {
      setApiError(null);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Modal */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="bg-card-dark border border-white/10 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-card-dark border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Request Withdrawal</h2>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white disabled:opacity-50"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* API Error Alert */}
            {apiError && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{apiError}</p>
              </div>
            )}

            {/* Available Balance */}
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Available Balance
              </p>
              <p className="text-2xl font-bold text-primary">
                NPR {availableBalance.toLocaleString()}
              </p>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Withdrawal Amount *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                step="0.01"
                disabled={isLoading}
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg bg-white/5 border transition-all text-white placeholder-gray-500 disabled:opacity-50",
                  errors.amount
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-primary"
                )}
              />
              {errors.amount && (
                <p className="text-xs text-red-400">{errors.amount}</p>
              )}
            </div>

            {/* Bank Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Bank Name *
              </label>
              <input
                type="text"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleChange}
                placeholder="e.g., Nepal Bank Limited"
                disabled={isLoading}
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg bg-white/5 border transition-all text-white placeholder-gray-500 disabled:opacity-50",
                  errors.bank_name
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-primary"
                )}
              />
              {errors.bank_name && (
                <p className="text-xs text-red-400">{errors.bank_name}</p>
              )}
            </div>

            {/* Account Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Account Number *
              </label>
              <input
                type="text"
                name="account_number"
                value={formData.account_number}
                onChange={handleChange}
                placeholder="Enter account number"
                disabled={isLoading}
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg bg-white/5 border transition-all text-white placeholder-gray-500 disabled:opacity-50",
                  errors.account_number
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-primary"
                )}
              />
              {errors.account_number && (
                <p className="text-xs text-red-400">{errors.account_number}</p>
              )}
            </div>

            {/* Account Holder Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Account Holder Name *
              </label>
              <input
                type="text"
                name="account_holder_name"
                value={formData.account_holder_name}
                onChange={handleChange}
                placeholder="Enter account holder name"
                disabled={isLoading}
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg bg-white/5 border transition-all text-white placeholder-gray-500 disabled:opacity-50",
                  errors.account_holder_name
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-primary"
                )}
              />
              {errors.account_holder_name && (
                <p className="text-xs text-red-400">{errors.account_holder_name}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 font-bold text-sm transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-black font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">
                      hourglass_bottom
                    </span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">
                      send
                    </span>
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
