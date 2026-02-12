"use client";

import { useApi } from "@/hooks/use-api";
import { authService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Building2, MapPin, Calendar, Key } from "lucide-react";
import { useState } from "react";
import { ChangePasswordModal } from "@/components/dashboard/change-password-modal";

export default function ProfilePage() {
  const { data: partner, isLoading, error, refetch } = useApi(() => authService.getMe());
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!partner) return null;

  // Helper function to get display name
  const getDisplayName = () => {
    if (partner.profile.full_name) {
      return partner.profile.full_name;
    }
    // Check camelCase (firstName, lastName)
    if (partner.profile.firstName || partner.profile.lastName) {
      return [partner.profile.firstName, partner.profile.lastName].filter(Boolean).join(' ');
    }
    // Check snake_case (first_name, last_name)
    if (partner.profile.first_name || partner.profile.last_name) {
      return [partner.profile.first_name, partner.profile.last_name].filter(Boolean).join(' ');
    }
    return null;
  };

  const displayName = getDisplayName();

  const getStatusColor = (status: string) => {
    return status === 'ACTIVE' 
      ? 'bg-green-500/10 text-green-500 border-green-500/20' 
      : 'bg-red-500/10 text-red-500 border-red-500/20';
  };

  const getPartnerTypeLabel = (type: string) => {
    return type === 'VENDOR' ? 'Vendor' : 'Franchisee';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Profile</h1>
          <p className="text-text-secondary mt-1">Manage your account information</p>
        </div>
        <Button 
          variant="secondary" 
          onClick={() => setIsPasswordModalOpen(true)} 
          leftIcon={<Key className="h-4 w-4" />}
          className="w-full sm:w-auto"
        >
          Change Password
        </Button>
      </div>

      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center p-6">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              {partner.profile.avatar_url ? (
                <img 
                  src={partner.profile.avatar_url} 
                  alt={partner.business_name}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-primary" />
              )}
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-1">
              {displayName || partner.business_name}
            </h2>
            <p className="text-sm text-text-secondary mb-3">{partner.code}</p>
            <div className="flex gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(partner.status)}`}>
                {partner.status}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                {getPartnerTypeLabel(partner.partner_type)}
              </span>
            </div>
            {partner.vendor_type && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                {partner.vendor_type}
              </span>
            )}
          </div>
        </Card>

        {/* Details Card */}
        <Card className="lg:col-span-2">
          <div className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Account Details</h3>

            <div className="space-y-4 sm:space-y-5">
              {/* Business Name */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                <Building2 className="h-5 w-5 text-text-secondary mt-0.5 hidden sm:block" />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary flex items-center gap-2">
                    <Building2 className="h-4 w-4 sm:hidden" />
                    Business Name
                  </p>
                  <p className="text-base font-medium text-text-primary mt-1">{partner.business_name}</p>
                </div>
              </div>

              {/* Full Name */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                <User className="h-5 w-5 text-text-secondary mt-0.5 hidden sm:block" />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary flex items-center gap-2">
                    <User className="h-4 w-4 sm:hidden" />
                    Full Name
                  </p>
                  <p className="text-base font-medium text-text-primary mt-1">
                    {displayName || <span className="text-text-secondary italic">Not set</span>}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                <Mail className="h-5 w-5 text-text-secondary mt-0.5 hidden sm:block" />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary flex items-center gap-2">
                    <Mail className="h-4 w-4 sm:hidden" />
                    Email
                  </p>
                  <p className="text-base font-medium text-text-primary mt-1 break-all">{partner.contact_email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                <Phone className="h-5 w-5 text-text-secondary mt-0.5 hidden sm:block" />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary flex items-center gap-2">
                    <Phone className="h-4 w-4 sm:hidden" />
                    Phone
                  </p>
                  <p className="text-base font-medium text-text-primary mt-1">{partner.contact_phone}</p>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                <Calendar className="h-5 w-5 text-text-secondary mt-0.5 hidden sm:block" />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary flex items-center gap-2">
                    <Calendar className="h-4 w-4 sm:hidden" />
                    Date of Birth
                  </p>
                  <p className="text-base font-medium text-text-primary mt-1">
                    {partner.profile.date_of_birth || <span className="text-text-secondary italic">Not set</span>}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                <MapPin className="h-5 w-5 text-text-secondary mt-0.5 hidden sm:block" />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary flex items-center gap-2">
                    <MapPin className="h-4 w-4 sm:hidden" />
                    Address
                  </p>
                  <p className="text-base font-medium text-text-primary mt-1">
                    {partner.profile.address || <span className="text-text-secondary italic">Not set</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <div className="p-4 sm:p-6">
            <h3 className="text-sm font-medium text-text-secondary mb-2">Current Balance</h3>
            <p className="text-2xl sm:text-3xl font-bold text-primary">NPR {parseFloat(partner.balance).toLocaleString()}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4 sm:p-6">
            <h3 className="text-sm font-medium text-text-secondary mb-2">Total Earnings</h3>
            <p className="text-2xl sm:text-3xl font-bold text-green-500">NPR {parseFloat(partner.total_earnings).toLocaleString()}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
