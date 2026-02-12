"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { payoutService } from "@/lib/services";
import { ApiError } from "@/lib/api-error";
import { X, DollarSign, Building2, CreditCard, User, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface RequestPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  availableBalance: number;
}

export function RequestPayoutModal({
  isOpen,
  onClose,
  onSuccess,
  availableBalance,
}: RequestPayoutModalProps) {
  const [formData, setFormData] = useState({
    amount: "",
    bank_name: "",
    account_number: "",
    account_holder_name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Amount validation
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = "Amount must be greater than 0";
      } else if (amount > availableBalance) {
        newErrors.amount = `Amount cannot exceed available balance (NPR ${availableBalance.toLocaleString()})`;
      }
    }

    // Bank name validation
    if (!formData.bank_name.trim()) {
      newErrors.bank_name = "Bank name is required";
    }

    // Account number validation
    if (!formData.account_number.trim()) {
      newErrors.account_number = "Account number is required";
    } else if (!/^\d+$/.test(formData.account_number)) {
      newErrors.account_number = "Account number must contain only digits";
    }

    // Account holder name validation
    if (!formData.account_holder_name.trim()) {
      newErrors.account_holder_name = "Account holder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await payoutService.requestFranchisePayout({
        amount: formData.amount,
        bank_name: formData.bank_name.trim(),
        account_number: formData.account_number.trim(),
        account_holder_name: formData.account_holder_name.trim(),
      });

      toast.success(response.message || "Payout request submitted successfully");
      
      // Reset form
      setFormData({
        amount: "",
        bank_name: "",
        account_number: "",
        account_holder_name: "",
      });
      setErrors({});
      
      onSuccess();
      onClose();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
        
        // Handle field-specific errors
        if (error.fieldErrors) {
          const fieldErrors: Record<string, string> = {};
          Object.entries(error.fieldErrors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              fieldErrors[field] = messages[0];
            }
          });
          setErrors(fieldErrors);
        }
      } else {
        toast.error("Failed to submit payout request");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        amount: "",
        bank_name: "",
        account_number: "",
        account_holder_name: "",
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#171712] border border-primary/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#171712] border-b border-primary/20 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Request Payout</h2>
              <p className="text-sm text-gray-400">Submit a payout request from ChargeGhar</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="h-8 w-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Available Balance Info */}
        <div className="p-6 bg-primary/5 border-b border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Available Balance</p>
              <p className="text-3xl font-bold text-primary">
                NPR {availableBalance.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Business Rules Notice */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-300">
              <p className="font-semibold mb-1">Business Rules:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-300/80">
                <li>Amount must be less than or equal to available balance</li>
                <li>No pending payout request should exist</li>
                <li>ChargeGhar will process and pay franchises</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Payout Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max={availableBalance}
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  placeholder="Enter amount"
                  className="pl-10"
                  disabled={isSubmitting}
                  error={errors.amount}
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Bank Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  value={formData.bank_name}
                  onChange={(e) => handleInputChange("bank_name", e.target.value)}
                  placeholder="e.g., Nepal Bank Limited"
                  className="pl-10"
                  disabled={isSubmitting}
                  error={errors.bank_name}
                />
              </div>
              {errors.bank_name && (
                <p className="text-red-500 text-xs mt-1">{errors.bank_name}</p>
              )}
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Account Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  value={formData.account_number}
                  onChange={(e) => handleInputChange("account_number", e.target.value)}
                  placeholder="Enter account number"
                  className="pl-10"
                  disabled={isSubmitting}
                  error={errors.account_number}
                />
              </div>
              {errors.account_number && (
                <p className="text-red-500 text-xs mt-1">{errors.account_number}</p>
              )}
            </div>

            {/* Account Holder Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Account Holder Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  value={formData.account_holder_name}
                  onChange={(e) => handleInputChange("account_holder_name", e.target.value)}
                  placeholder="Enter account holder name"
                  className="pl-10"
                  disabled={isSubmitting}
                  error={errors.account_holder_name}
                />
              </div>
              {errors.account_holder_name && (
                <p className="text-red-500 text-xs mt-1">{errors.account_holder_name}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
