"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { vendorService } from "@/lib/services";
import { ApiError } from "@/lib/api-error";
import { AlertCircle, Building2, Phone, Mail, MapPin } from "lucide-react";
import type { VendorDetail } from "@/lib/types/vendor.types";

interface EditVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  vendor: VendorDetail;
}

export function EditVendorModal({
  isOpen,
  onClose,
  onSuccess,
  vendor,
}: EditVendorModalProps) {
  const [formData, setFormData] = useState({
    business_name: vendor.business_name,
    contact_phone: vendor.contact_phone,
    contact_email: vendor.contact_email || "",
    address: vendor.address || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Update form data when vendor changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        business_name: vendor.business_name,
        contact_phone: vendor.contact_phone,
        contact_email: vendor.contact_email || "",
        address: vendor.address || "",
      });
      setApiError(null);
      setFieldErrors({});
    }
  }, [isOpen, vendor]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    if (apiError) setApiError(null);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.business_name.trim()) {
      errors.business_name = "Business name is required";
    }
    if (!formData.contact_phone.trim()) {
      errors.contact_phone = "Contact phone is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setApiError("Please fix the errors in the form");
      return;
    }

    setApiError(null);
    setIsSubmitting(true);

    try {
      const payload: any = {
        business_name: formData.business_name,
        contact_phone: formData.contact_phone,
      };

      if (formData.contact_email) payload.contact_email = formData.contact_email;
      if (formData.address) payload.address = formData.address;

      const result = await vendorService.updateVendor(vendor.id, payload);

      if (result.success) {
        toast.success("Vendor updated successfully", {
          description: `${formData.business_name} has been updated`,
        });
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isValidationError && error.fieldErrors) {
          const errors: Record<string, string> = {};
          for (const [field, messages] of Object.entries(error.fieldErrors)) {
            errors[field] = Array.isArray(messages) ? messages[0] : messages;
          }
          setFieldErrors(errors);
          setApiError("Please check the form for errors");
        } else if (error.isNetworkError) {
          setApiError("Network error. Please check your connection and try again.");
          toast.error("Network Error", { description: error.message });
        } else if (error.isServerError) {
          setApiError("Server error. Please try again later.");
          toast.error("Server Error", { description: error.message });
        } else {
          setApiError(error.message);
          toast.error("Failed to update vendor", { description: error.message });
        }
      } else {
        const message = error instanceof Error ? error.message : "Failed to update vendor";
        setApiError(message);
        toast.error("Failed to update vendor", { description: message });
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
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold tracking-tight">
                Edit Vendor
              </h2>
              <p className="text-[#b6b6a0] text-sm mt-0.5">
                Update vendor information
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

          {/* Business Name */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Business Name *
            </label>
            <input
              type="text"
              value={formData.business_name}
              onChange={(e) => handleChange("business_name", e.target.value)}
              disabled={isSubmitting}
              className={`w-full rounded-lg text-white border ${
                fieldErrors.business_name ? "border-red-500" : "border-[#51513e]"
              } bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary h-12 px-4 placeholder:text-[#51513e] outline-none disabled:opacity-50`}
              placeholder="Enter business name"
            />
            {fieldErrors.business_name && (
              <p className="text-xs text-red-400">{fieldErrors.business_name}</p>
            )}
          </div>

          {/* Contact Phone */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact Phone *
            </label>
            <input
              type="tel"
              value={formData.contact_phone}
              onChange={(e) => handleChange("contact_phone", e.target.value)}
              disabled={isSubmitting}
              className={`w-full rounded-lg text-white border ${
                fieldErrors.contact_phone ? "border-red-500" : "border-[#51513e]"
              } bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary h-12 px-4 placeholder:text-[#51513e] outline-none disabled:opacity-50`}
              placeholder="+977 9800000000"
            />
            {fieldErrors.contact_phone && (
              <p className="text-xs text-red-400">{fieldErrors.contact_phone}</p>
            )}
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Email
            </label>
            <input
              type="email"
              value={formData.contact_email}
              onChange={(e) => handleChange("contact_email", e.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-lg text-white border border-[#51513e] bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary h-12 px-4 placeholder:text-[#51513e] outline-none disabled:opacity-50"
              placeholder="vendor@example.com"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-lg text-white border border-[#51513e] bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary h-12 px-4 placeholder:text-[#51513e] outline-none disabled:opacity-50"
              placeholder="Enter business address"
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
            disabled={isSubmitting}
            className="flex-1 h-12 rounded-lg bg-primary text-[#171712] text-sm font-black uppercase tracking-widest hover:brightness-110 shadow-[0_0_20px_rgba(189,189,40,0.3)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-xl">sync</span>
                Updating...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">save</span>
                Update Vendor
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
