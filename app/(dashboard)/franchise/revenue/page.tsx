"use client";

import { useState } from "react";
import { useApi } from "@/hooks/use-api";
import { payoutService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Filter, TrendingUp } from "lucide-react";
import type { RevenueListParams } from "@/lib/types";

export default function FranchiseRevenuePage() {
  const [params, setParams] = useState<RevenueListParams>({
    page: 1,
    page_size: 20,
  });

  const { data: response, isLoading, error, refetch } = useApi(
    () => payoutService.getFranchiseRevenue(params),
    [params]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = () => {
    setParams({
      ...params,
      page: 1,
      start_date: startDate || undefined,
      end_date: endDate || undefined,
    });
  };

  const handlePageChange = (newPage: number) => {
    setParams({ ...params, page: newPage });
  };

  const formatCurrency = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return `NPR ${(num || 0).toLocaleString()}`;
  };

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!response?.data) return null;

  const { results, summary, pagination } = response.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Revenue</h1>
          <p className="text-text-secondary mt-1">Track all revenue transactions and distributions</p>
        </div>
        <Button variant="primary" leftIcon={<Download className="h-4 w-4" />}>
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-text-secondary mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-text-primary">{summary.total_transactions}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-text-secondary mb-1">Gross Revenue</p>
          <p className="text-2xl font-bold text-text-primary">{formatCurrency(summary.total_gross)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-text-secondary mb-1">Net Revenue</p>
          <p className="text-2xl font-bold text-text-primary">{formatCurrency(summary.total_net)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-text-secondary mb-1 flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-primary" />
            Your Share
          </p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(summary.franchise_total_share)}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
          />
          <div className="sm:col-span-2 lg:col-span-1">
            <Button onClick={handleSearch} variant="primary" className="w-full" leftIcon={<Filter className="h-4 w-4" />}>
              Apply Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Revenue Table */}
      <Card>
        {results.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-text-secondary">No revenue transactions found</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-text-secondary">Transaction ID</th>
                    <th className="text-left p-4 text-sm font-semibold text-text-secondary">Station</th>
                    <th className="text-left p-4 text-sm font-semibold text-text-secondary">Vendor</th>
                    <th className="text-right p-4 text-sm font-semibold text-text-secondary">Gross</th>
                    <th className="text-right p-4 text-sm font-semibold text-text-secondary">Net</th>
                    <th className="text-right p-4 text-sm font-semibold text-text-secondary">Your Share</th>
                    <th className="text-center p-4 text-sm font-semibold text-text-secondary">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-text-secondary">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-border hover:bg-surface/50">
                      <td className="p-4">
                        <p className="text-sm font-mono text-text-primary">{transaction.transaction_id.slice(0, 8)}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-text-primary">{transaction.station.station_name}</p>
                        <p className="text-xs text-text-secondary">{transaction.station.serial_number}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-text-primary">{transaction.vendor.business_name}</p>
                        <p className="text-xs text-text-secondary">{transaction.vendor.code}</p>
                      </td>
                      <td className="p-4 text-right">
                        <p className="text-sm font-medium text-text-primary">{formatCurrency(transaction.gross_amount)}</p>
                      </td>
                      <td className="p-4 text-right">
                        <p className="text-sm font-medium text-text-primary">{formatCurrency(transaction.net_amount)}</p>
                      </td>
                      <td className="p-4 text-right">
                        <p className="text-sm font-bold text-primary">{formatCurrency(transaction.franchise_share)}</p>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.is_distributed 
                            ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                            : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                        }`}>
                          {transaction.is_distributed ? 'Distributed' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-text-secondary">
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4 p-4">
              {results.map((transaction) => (
                <Card key={transaction.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-mono text-text-primary">{transaction.transaction_id.slice(0, 8)}</p>
                      <p className="text-xs text-text-secondary mt-1">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.is_distributed 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    }`}>
                      {transaction.is_distributed ? 'Distributed' : 'Pending'}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-text-secondary">Station</p>
                      <p className="text-sm font-medium text-text-primary">{transaction.station.station_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Vendor</p>
                      <p className="text-sm font-medium text-text-primary">{transaction.vendor.business_name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                    <div>
                      <p className="text-xs text-text-secondary">Gross</p>
                      <p className="text-sm font-medium text-text-primary">{formatCurrency(transaction.gross_amount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Net</p>
                      <p className="text-sm font-medium text-text-primary">{formatCurrency(transaction.net_amount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Your Share</p>
                      <p className="text-sm font-bold text-primary">{formatCurrency(transaction.franchise_share)}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination.total_pages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-border">
                <p className="text-sm text-text-secondary">
                  Page {pagination.current_page} of {pagination.total_pages} ({pagination.total_count} total)
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    disabled={!pagination.has_previous}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    disabled={!pagination.has_next}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
