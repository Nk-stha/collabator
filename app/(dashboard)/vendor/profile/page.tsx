"use client";

import { useApi } from "@/hooks/use-api";
import { authService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Building2, MapPin, Calendar, Edit2, Save, X, Key } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ChangePasswordModal } from "@/components/dashboard/change-password-modal";

export default function ProfilePage() {
  const { data: partner, isLoading, error, refetch } = useApi(() => authService.getMe());
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    address: "",
  });

  const handleEdit = () => {
    if (partner?.profile) {
      setFormData({
        full_name: partner.profile.full_name || "",
        date_of_birth: partner.profile.date_of_birth || "",
        address: partner.profile.address || "",
      });
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      full_name: "",
      date_of_birth: "",
      address: "",
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement profile update API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully");
      setIsEditing(false);
      refetch();
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!partner) return null;

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Profile</h1>
          <p className="text-text-secondary mt-1">Manage your account information</p>
        </div>
        <div className="flex gap-3">
          {!isEditing && (
            <>
              <Button 
                variant="secondary" 
                onClick={() => setIsPasswordModalOpen(true)} 
                leftIcon={<Key className="h-4 w-4" />}
              >
                Change Password
              </Button>
              <Button variant="primary" onClick={handleEdit} leftIcon={<Edit2 className="h-4 w-4" />}>
                Edit Profile
              </Button>
            </>
          )}
        </div>
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
              {partner.profile.full_name || partner.business_name}
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
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">Account Details</h3>
              {isEditing && (
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCancel}
                    leftIcon={<X className="h-4 w-4" />}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={handleSave}
                    loading={isSaving}
                    leftIcon={<Save className="h-4 w-4" />}
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Business Name */}
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-text-secondary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary">Business Name</p>
                  <p className="text-base font-medium text-text-primary">{partner.business_name}</p>
                </div>
              </div>

              {/* Full Name */}
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-text-secondary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary mb-1">Full Name</p>
                  {isEditing ? (
                    <Input
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-base font-medium text-text-primary">
                      {partner.profile.full_name || <span className="text-text-secondary italic">Not set</span>}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-text-secondary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary">Email</p>
                  <p className="text-base font-medium text-text-primary">{partner.contact_email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-text-secondary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary">Phone</p>
                  <p className="text-base font-medium text-text-primary">{partner.contact_phone}</p>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-text-secondary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary mb-1">Date of Birth</p>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    />
                  ) : (
                    <p className="text-base font-medium text-text-primary">
                      {partner.profile.date_of_birth || <span className="text-text-secondary italic">Not set</span>}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-text-secondary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary mb-1">Address</p>
                  {isEditing ? (
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Enter your address"
                    />
                  ) : (
                    <p className="text-base font-medium text-text-primary">
                      {partner.profile.address || <span className="text-text-secondary italic">Not set</span>}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-text-secondary mb-2">Current Balance</h3>
            <p className="text-3xl font-bold text-primary">NPR {parseFloat(partner.balance).toLocaleString()}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-text-secondary mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-green-500">NPR {parseFloat(partner.total_earnings).toLocaleString()}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
