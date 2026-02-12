"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { vendorService, stationService } from "@/lib/services";
import { ApiError } from "@/lib/api-error";
import { AlertCircle, Building2, User, Mail, Phone, MapPin, DollarSign, Lock, FileText, Loader2 } from "lucide-react";
import type { UserSearchResult } from "@/lib/types/vendor.types";
import type { Station } from "@/lib/types/station.types";

interface CreateVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateVendorModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateVendorModalProps) {
  const [formData, setFormData] = useState({
    user_id: "",
    vendor_type: "REVENUE" as "REVENUE" | "NON_REVENUE",
    business_name: "",
    contact_phone: "",
    contact_email: "",
    address: "",
    station_id: "",
    revenue_model: "PERCENTAGE" as "PERCENTAGE" | "FIXED" | "",
    partner_percent: "",
    fixed_amount: "",
    password: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  
  // Data fetching states
  const [users, setUsers] = useState<UserSearchResult[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingStations, setIsLoadingStations] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);

  // Fetch users and stations when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchUsers();
      fetchStations();
    }
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        user_id: "",
        vendor_type: "REVENUE",
        business_name: "",
        contact_phone: "",
        contact_email: "",
        address: "",
        station_id: "",
        revenue_model: "PERCENTAGE",
        partner_percent: "",
        fixed_amount: "",
        password: "",
        notes: "",
      });
      setApiError(null);
      setFieldErrors({});
      setShowPassword(false);
      setDataError(null);
    }
  }, [isOpen]);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    setDataError(null);
    try {
      const response = await vendorService.searchUsers();
      if (response.success && response.data.results) {
        setUsers(response.data.results);
      }
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Failed to load users";
      setDataError(message);
      toast.error("Failed to load users", { description: message });
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const fetchStations = async () => {
    setIsLoadingStations(true);
    try {
      const response = await stationService.getStations({ page: 1, page_size: 100 });
      if (response.success && response.data.results) {
        setStations(response.data.results);
      }
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Failed to load stations";
      setDataError(message);
      toast.error("Failed to load stations", { description: message });
    } finally {
      setIsLoadingStations(false);
    }
  };

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

    if (!formData.user_id) errors.user_id = "User ID is required";
    if (!formData.business_name.trim()) errors.business_name = "Business name is required";
    if (!formData.contact_phone.trim()) errors.contact_phone = "Contact phone is required";
    if (!formData.station_id) errors.station_id = "Station assignment is required";

    if (formData.vendor_type === "REVENUE") {
      if (!formData.password) errors.password = "Password is required for REVENUE vendors";
      if (!formData.revenue_model) errors.revenue_model = "Revenue model is required";
      
      if (formData.revenue_model === "PERCENTAGE" && !formData.partner_percent) {
        errors.partner_percent = "Partner percentage is required";
      }
      if (formData.revenue_model === "FIXED" && !formData.fixed_amount) {
        errors.fixed_amount = "Fixed amount is required";
      }
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
        user_id: parseInt(formData.user_id),
        vendor_type: formData.vendor_type,
        business_name: formData.business_name,
        contact_phone: formData.contact_phone,
        station_id: formData.station_id,
      };

      if (formData.contact_email) payload.contact_email = formData.contact_email;
      if (formData.address) payload.address = formData.address;
      if (formData.notes) payload.notes = formData.notes;

      if (formData.vendor_type === "REVENUE") {
        payload.revenue_model = formData.revenue_model;
        payload.password = formData.password;
        
        if (formData.revenue_model === "PERCENTAGE") {
          payload.partner_percent = formData.partner_percent;
        } else if (formData.revenue_model === "FIXED") {
          payload.fixed_amount = formData.fixed_amount;
        }
      }

      const result = await vendorService.createVendor(payload);

      if (result.success) {
        toast.success("Vendor created successfully", {
          description: `${formData.business_name} has been added to your network`,
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
          toast.error("Failed to create vendor", { description: error.message });
        }
      } else {
        const message = error instanceof Error ? error.message : "Failed to create vendor";
        setApiError(message);
        toast.error("Failed to create vendor", { description: message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      {/* Modal Container */}
      <div className="bg-[#171712]/85 backdrop-blur-xl w-full max-w-4xl rounded-2xl border border-primary/40 shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="flex justify-between items-start p-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold tracking-tight">
                Create New Vendor
              </h2>
              <p className="text-[#b6b6a0] text-sm mt-0.5">
                Add a sub-vendor to your franchise network
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
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
          {/* Data Loading Error */}
          {dataError && (
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-yellow-400">{dataError}</p>
                <button
                  type="button"
                  onClick={() => {
                    fetchUsers();
                    fetchStations();
                  }}
                  className="text-xs text-yellow-300 underline mt-1 hover:text-yellow-200"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* API Error Alert */}
          {apiError && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{apiError}</p>
            </div>
          )}

          {/* Vendor Type Selection */}
          <div className="space-y-3">
            <label className="text-white text-sm font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Vendor Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleChange("vendor_type", "REVENUE")}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  formData.vendor_type === "REVENUE"
                    ? "border-primary bg-primary/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="font-bold text-white">REVENUE</span>
                </div>
                <p className="text-xs text-gray-400">Dashboard access with earnings</p>
              </button>
              <button
                type="button"
                onClick={() => handleChange("vendor_type", "NON_REVENUE")}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  formData.vendor_type === "NON_REVENUE"
                    ? "border-primary bg-primary/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-5 w-5 text-gray-400" />
                  <span className="font-bold text-white">NON-REVENUE</span>
                </div>
                <p className="text-xs text-gray-400">No dashboard or earnings</p>
              </button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* User Selection */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Select User *
              </label>
              <div className="relative">
                <select
                  value={formData.user_id}
                  onChange={(e) => {
                    const userId = e.target.value;
                    const selectedUser = users.find(u => u.id.toString() === userId);
                    handleChange("user_id", userId);
                    
                    // Auto-fill contact info if available
                    if (selectedUser) {
                      if (selectedUser.phone_number && !formData.contact_phone) {
                        handleChange("contact_phone", selectedUser.phone_number);
                      }
                      if (selectedUser.email && !formData.contact_email) {
                        handleChange("contact_email", selectedUser.email);
                      }
                      if (selectedUser.profile.address && !formData.address) {
                        handleChange("address", selectedUser.profile.address);
                      }
                    }
                  }}
                  disabled={isSubmitting || isLoadingUsers}
                  className={`w-full rounded-lg text-white border ${
                    fieldErrors.user_id ? "border-red-500" : "border-[#51513e]"
                  } bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary h-12 px-4 appearance-none cursor-pointer outline-none disabled:opacity-50`}
                >
                  <option value="">
                    {isLoadingUsers ? "Loading users..." : "-- Select a user --"}
                  </option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.profile.full_name || user.username} ({user.email || user.phone_number || `ID: ${user.id}`})
                    </option>
                  ))}
                </select>
                {isLoadingUsers && (
                  <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary animate-spin" />
                )}
              </div>
              {fieldErrors.user_id && (
                <p className="text-xs text-red-400">{fieldErrors.user_id}</p>
              )}
            </div>

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
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Station Assignment */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Assign Station *
            </label>
            <div className="relative">
              <select
                value={formData.station_id}
                onChange={(e) => handleChange("station_id", e.target.value)}
                disabled={isSubmitting || isLoadingStations}
                className={`w-full rounded-lg text-white border ${
                  fieldErrors.station_id ? "border-red-500" : "border-[#51513e]"
                } bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary h-12 px-4 appearance-none cursor-pointer outline-none disabled:opacity-50`}
              >
                <option value="">
                  {isLoadingStations ? "Loading stations..." : "-- Select a station --"}
                </option>
                {stations.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.station_name} ({station.serial_number})
                  </option>
                ))}
              </select>
              {isLoadingStations && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary animate-spin" />
              )}
            </div>
            {fieldErrors.station_id && (
              <p className="text-xs text-red-400">{fieldErrors.station_id}</p>
            )}
          </div>

          {/* Revenue Model (only for REVENUE vendors) */}
          {formData.vendor_type === "REVENUE" && (
            <>
              <div className="space-y-3">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Revenue Model *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleChange("revenue_model", "PERCENTAGE")}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.revenue_model === "PERCENTAGE"
                        ? "border-primary bg-primary/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <span className="font-bold text-white">Percentage</span>
                    <p className="text-xs text-gray-400 mt-1">Revenue share %</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange("revenue_model", "FIXED")}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.revenue_model === "FIXED"
                        ? "border-primary bg-primary/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <span className="font-bold text-white">Fixed</span>
                    <p className="text-xs text-gray-400 mt-1">Monthly amount</p>
                  </button>
                </div>
                {fieldErrors.revenue_model && (
                  <p className="text-xs text-red-400">{fieldErrors.revenue_model}</p>
                )}
              </div>

              {/* Revenue Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.revenue_model === "PERCENTAGE" && (
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">
                      Partner Percentage *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={formData.partner_percent}
                        onChange={(e) => handleChange("partner_percent", e.target.value)}
                        disabled={isSubmitting}
                        className={`w-full rounded-lg text-white border ${
                          fieldErrors.partner_percent ? "border-red-500" : "border-[#51513e]"
                        } bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary h-12 px-4 pr-10 placeholder:text-[#51513e] outline-none disabled:opacity-50`}
                        placeholder="0.00"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                    </div>
                    {fieldErrors.partner_percent && (
                      <p className="text-xs text-red-400">{fieldErrors.partner_percent}</p>
                    )}
                  </div>
                )}

                {formData.revenue_model === "FIXED" && (
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">
                      Fixed Amount *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">NPR</span>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.fixed_amount}
                        onChange={(e) => handleChange("fixed_amount", e.target.value)}
                        disabled={isSubmitting}
                        className={`w-full rounded-lg text-white border ${
                          fieldErrors.fixed_amount ? "border-red-500" : "border-[#51513e]"
                        } bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary h-12 pl-16 pr-4 placeholder:text-[#51513e] outline-none disabled:opacity-50`}
                        placeholder="0.00"
                      />
                    </div>
                    {fieldErrors.fixed_amount && (
                      <p className="text-xs text-red-400">{fieldErrors.fixed_amount}</p>
                    )}
                  </div>
                )}

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Initial Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      disabled={isSubmitting}
                      className={`w-full rounded-lg text-white border ${
                        fieldErrors.password ? "border-red-500" : "border-[#51513e]"
                      } bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary h-12 px-4 pr-10 placeholder:text-[#51513e] outline-none disabled:opacity-50`}
                      placeholder="Enter initial password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="text-xs text-red-400">{fieldErrors.password}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              disabled={isSubmitting}
              rows={3}
              className="w-full rounded-lg text-white border border-[#51513e] bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary p-4 placeholder:text-[#51513e] outline-none disabled:opacity-50 resize-none"
              placeholder="Add any additional notes..."
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
                Creating...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">add_circle</span>
                Create Vendor
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
