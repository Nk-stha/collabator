"use client";

import { GlassTable } from "@/components/dashboard/glass-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
    CalendarIcon, 
    Dock, 
    Edit, 
    Receipt,
    Briefcase
} from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data for the specific vendor view
const VENDOR_TRANSACTIONS = [
    { id: "#TRX-9902", date: "2024-06-12 14:30", customer: "Anil Kapoor", amount: "NPR 450", status: "COMPLETED", initials: "AK" },
    { id: "#TRX-9898", date: "2024-06-12 12:15", customer: "Rita Shrestha", amount: "NPR 120", status: "COMPLETED", initials: "RS" },
    { id: "#TRX-9887", date: "2024-06-11 21:05", customer: "Binod Karki", amount: "NPR 200", status: "FAILED", initials: "BK" },
    { id: "#TRX-9852", date: "2024-06-11 18:45", customer: "Suman Pandey", amount: "NPR 300", status: "COMPLETED", initials: "SP" },
];

export default function SubVendorDetail({ params }: { params: { vendorId: string } }) {
    const router = useRouter();

    const columns = [
        { 
            header: "Transaction ID", 
            accessorKey: "id",
            className: "font-mono text-primary/80" 
        },
        { 
            header: "Date", 
            accessorKey: "date",
            className: "text-gray-400"
        },
        { 
            header: "Customer", 
            accessorKey: "customer",
            render: (row: any) => (
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-gray-400">
                        {row.initials}
                    </div>
                    <span className="text-white">{row.customer}</span>
                </div>
            )
        },
        { 
            header: "Amount", 
            accessorKey: "amount",
            className: "font-semibold text-white"
        },
        { 
            header: "Status", 
            accessorKey: "status",
            render: (row: any) => (
                <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold tracking-widest border",
                    row.status === "COMPLETED" 
                        ? "bg-primary/10 border-primary/20 text-primary" 
                        : "bg-danger/10 border-danger/20 text-danger"
                )}>
                    {row.status}
                </span>
            )
        }
    ];

    return (
        <div className="max-w-[1400px] mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2">
                    {/* Breadcrumb removed as per user request */}
                    <div className="flex items-center gap-4">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">Cafe 101</h1>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Vendor</span>
                    </div>
                    <p className="text-gray-500 text-sm max-w-md font-medium">Station ID: CG-V101-KTM | Premium Partner</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 rounded-xl border border-primary/40 bg-primary/5 text-primary text-sm font-bold hover:bg-primary/10 transition-all flex items-center gap-2">
                        <Edit className="h-5 w-5" />
                        Edit Vendor
                    </button>
                    <button 
                        className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-[0_0_20px_rgba(84,188,40,0.2)] transition-all flex items-center gap-2"
                        onClick={() => router.push('/franchise/stations')}
                    >
                        <Dock className="h-5 w-5" />
                        View Station
                    </button>
                </div>
            </div>

            {/* Business Profile Panel */}
            <div className="glass-panel p-8 bg-card-bg/60 border border-white/10 rounded-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-gray-400">
                        <Briefcase className="h-5 w-5 text-primary" />
                        Business Profile
                    </h3>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">Status</label>
                            <span className="flex items-center gap-2 text-primary font-bold text-xs">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                                ACTIVE
                            </span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Vendor ID</label>
                        <p className="font-mono text-sm text-primary tracking-tight">V-8829</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Contact Person</label>
                        <p className="text-sm text-white font-semibold">Sarah Jenkins</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Phone</label>
                        <p className="text-sm text-gray-400">+977 980 123 4567</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Address</label>
                        <p className="text-sm text-gray-400 leading-relaxed">Patan Dhoka, Kathmandu, Nepal</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Joined Date</label>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <CalendarIcon className="h-4 w-4" />
                            2024-05-12
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <GlassTable 
                title="Recent Transactions"
                icon={<Receipt className="h-5 w-5" />}
                columns={columns}
                data={VENDOR_TRANSACTIONS}
                actions={
                    <button className="px-3 py-1.5 border border-border-dark rounded-lg text-gray-400 hover:text-white text-xs font-bold transition-all hover:bg-white/5">
                        View All History
                    </button>
                }
            />
        </div>
    );
}
