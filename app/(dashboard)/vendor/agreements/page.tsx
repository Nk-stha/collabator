"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Calendar, CheckCircle } from "lucide-react";

export default function VendorAgreements() {
  const agreement = {
    id: "AGR-V-102",
    franchise: "Kathmandu Franchise",
    type: "Percentage Split",
    value: "10% Revenue Share",
    startDate: "2025-03-01",
    status: "ACTIVE",
    terms: [
      "Monthly revenue settlement",
      "Maintenance by Franchise",
      "24/7 power supply commitment",
      "Space allocation for 1 station"
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary">My Agreement</h3>
          <p className="text-sm text-text-muted">Current contract details with your Franchise</p>
        </div>
        <Button variant="secondary" leftIcon={<Download className="h-4 w-4" />}>
          Download PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary text-xl">{agreement.id}</h4>
                <p className="text-sm text-text-muted">Status: <span className="text-green-500 font-semibold">{agreement.status}</span></p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-muted flex items-center gap-2 justify-end">
                <Calendar className="h-4 w-4" />
                Signed on: {agreement.startDate}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-1">
              <p className="text-sm font-medium text-text-muted">Partner Franchise</p>
              <p className="text-lg font-bold text-text-primary">{agreement.franchise}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-text-muted">Revenue Model</p>
              <p className="text-lg font-bold text-text-primary">{agreement.value}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-semibold text-text-primary">Key Terms & Conditions</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {agreement.terms.map((term, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-border/50">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-text-primary">{term}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h5 className="font-bold text-text-primary mb-4">Contact Franchise</h5>
          <p className="text-sm text-text-muted mb-6">Need to update your agreement or have questions? Contact your franchise manager.</p>
          <div className="space-y-4">
            <Button variant="primary" fullWidth>Message Manager</Button>
            <Button variant="ghost" fullWidth>Request Revision</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
