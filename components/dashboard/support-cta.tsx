"use client";

import { cn } from "@/lib/utils";

interface SupportCtaProps {
  className?: string;
  onContactSupport?: () => void;
}

export function SupportCta({ className, onContactSupport }: SupportCtaProps) {
  return (
    <section
      className={cn(
        "bg-primary p-6 rounded-2xl relative overflow-hidden group",
        className
      )}
    >
      <div className="relative z-10">
        <h4 className="text-black font-bold text-lg mb-2">Need Help?</h4>
        <p className="text-black/70 text-sm mb-4">
          Our support team is available 24/7 for station assistance.
        </p>
        <button
          onClick={onContactSupport}
          className="bg-black text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-zinc-900 transition-colors"
        >
          Contact Support
        </button>
      </div>
      <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-black/10 text-9xl group-hover:scale-110 transition-transform">
        headset_mic
      </span>
    </section>
  );
}
