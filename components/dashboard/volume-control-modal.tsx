"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { stationService } from "@/lib/services";
import { ApiError } from "@/lib/api-error";
import { AlertCircle, Volume2, VolumeX } from "lucide-react";

interface VolumeControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationId: string;
}

export function VolumeControlModal({
  isOpen,
  onClose,
  stationId,
}: VolumeControlModalProps) {
  const [volume, setVolume] = useState(50);
  const [isSettingVolume, setIsSettingVolume] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Reset state when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setVolume(50);
      setApiError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSetVolume = async () => {
    setApiError(null);
    setIsSettingVolume(true);

    try {
      const result = await stationService.setVolume({
        station_id: stationId,
        volume,
      });

      if (result.success) {
        toast.success("Volume updated successfully", {
          description: `Station volume set to ${volume}%`,
        });
        onClose();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isValidationError && error.fieldErrors) {
          const fieldErrors: string[] = [];
          for (const [field, messages] of Object.entries(error.fieldErrors)) {
            fieldErrors.push(`${field}: ${messages[0]}`);
          }
          setApiError(fieldErrors.join(", "));
        } else if (error.isNetworkError) {
          setApiError("Network error. Please check your connection and try again.");
          toast.error("Network Error", { description: error.message });
        } else if (error.isServerError) {
          setApiError("Server error. Please try again later.");
          toast.error("Server Error", { description: error.message });
        } else {
          setApiError(error.message);
          toast.error("Failed to set volume", { description: error.message });
        }
      } else {
        const message = error instanceof Error ? error.message : "Failed to set volume";
        setApiError(message);
        toast.error("Failed to set volume", { description: message });
      }
    } finally {
      setIsSettingVolume(false);
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-6 w-6 text-gray-500" />;
    return <Volume2 className="h-6 w-6 text-primary" />;
  };

  const getVolumeColor = () => {
    if (volume === 0) return "bg-gray-500";
    if (volume < 30) return "bg-yellow-500";
    if (volume < 70) return "bg-orange-500";
    return "bg-primary";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-[#171712]/85 backdrop-blur-xl w-full max-w-[480px] rounded-2xl border border-primary/40 shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-start p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              {getVolumeIcon()}
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold tracking-tight">
                Volume Control
              </h2>
              <p className="text-[#b6b6a0] text-sm mt-0.5">
                Adjust station speaker volume
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSettingVolume}
            className="text-[#b6b6a0] hover:text-white transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 pb-6 space-y-6">
          {/* API Error Alert */}
          {apiError && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{apiError}</p>
            </div>
          )}

          {/* Volume Display */}
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <span className="text-6xl font-black text-white tracking-tight">
                {volume}
              </span>
              <span className="text-3xl font-bold text-[#b6b6a0]">%</span>
            </div>
            <p className="text-sm text-gray-400">
              {volume === 0 && "Muted"}
              {volume > 0 && volume < 30 && "Low Volume"}
              {volume >= 30 && volume < 70 && "Medium Volume"}
              {volume >= 70 && "High Volume"}
            </p>
          </div>

          {/* Volume Slider */}
          <div className="space-y-4">
            <div className="relative">
              {/* Track Background */}
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                {/* Active Track */}
                <div
                  className={`h-full ${getVolumeColor()} transition-all duration-200 rounded-full`}
                  style={{ width: `${volume}%` }}
                />
              </div>
              
              {/* Slider Input */}
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  if (apiError) setApiError(null);
                }}
                disabled={isSettingVolume}
                className="absolute inset-0 w-full h-3 opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
            </div>

            {/* Quick Volume Buttons */}
            <div className="grid grid-cols-5 gap-2">
              {[0, 25, 50, 75, 100].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    setVolume(val);
                    if (apiError) setApiError(null);
                  }}
                  disabled={isSettingVolume}
                  className={`py-2 px-3 rounded-lg text-sm font-bold transition-all disabled:opacity-50 ${
                    volume === val
                      ? "bg-primary text-black"
                      : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* Volume Level Indicators */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <VolumeX className="h-3 w-3" />
              <span>Mute</span>
            </div>
            <div className="flex items-center gap-1">
              <Volume2 className="h-3 w-3" />
              <span>Max</span>
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="p-6 pt-0 flex items-center gap-3">
          <button
            onClick={onClose}
            disabled={isSettingVolume}
            className="flex-1 h-12 rounded-lg border border-[#51513e] text-white text-sm font-bold hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSetVolume}
            disabled={isSettingVolume}
            className="flex-1 h-12 rounded-lg bg-primary text-[#171712] text-sm font-black uppercase tracking-widest hover:brightness-110 shadow-[0_0_20px_rgba(189,189,40,0.3)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSettingVolume ? (
              <>
                <span className="material-symbols-outlined animate-spin text-xl">sync</span>
                Setting...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">check_circle</span>
                Apply Volume
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
