"use client";

import { useState } from "react";
import { useApi } from "@/hooks/use-api";
import { payoutService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, TrendingUp, DollarSign, Search } from "lucide-react";
import type { VendorRevenueListParams, VendorRevenueTransaction } from "@/lib/types";

export default function VendorRevenuePage() {
  const [params, setParams] = useState<VendorRevenueListParams>({
    page: 1,
    page_size: 20,
  });

  const { data: response, isLoading, error, refetch } = useApi(
    () => payoutService.getVendorRevenue(params),
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

  const formatCurrency = (value: string | number | null | undefined) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return `NPR ${(num ?? 0).toLocaleString()}`;
  };

  const formatPercent = (value: string | number | null | undefined) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return `${(num ?? 0).toFixed(2)}%`;
  };

  // Safe transaction data accessor
  const getTransactionData = (transaction: VendorRevenueTransaction | null | undefined) => {
    if (!transaction) return null;
    return {
      id: transaction.id ?? '',
      transaction_date: transaction.transaction_date ?? new Date().toISOString(),
      station: {
        name: transaction.station?.name ?? 'Unknown Station',
      },
      gross_revenue: transaction.gross_revenue ?? '0',
      net_revenue: transaction.net_revenue ?? '0',
      vendor_share: transaction.vendor_share ?? '0',
      vendor_share_percent: transaction.vendor_share_percent ?? '0',
    };
  };

  // Filter transactions by search query
  const filteredResults = (response?.data?.results ?? []).filter((transaction) => {
    if (!searchQuery) return true;
    const data = getTransactionData(transaction);
    if (!data) return false;
    
    const searchLower = searchQuery.toLowerCase();
    return data.station.name.toLowerCase().includes(searchLower);
  });

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!response?.data) return <ErrorDisplay error={new Error("No data available") as any} onRetry={refetch} />;

  const { summary, pagination } = response.data;
  const totalTransactions = summary?.total_transactions ?? 0;
  const totalGrossRevenue = summary?.total_gross_revenue ?? '0';
  const totalNetRevenue = summary?.total_net_revenue ?? '0';
  const totalVendorShare = summary?.total_vendor_share ?? '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Revenue</h1>
          <p className="text-text-secondary mt-1">Track your revenue share from transactions</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-text-secondary mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-text-primary">{totalTransactions}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-text-secondary mb-1">Gross Revenue</p>
          <p className="text-2xl font-bold text-text-primary">{formatCurrency(totalGrossRevenue)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-text-secondary mb-1">Net Revenue</p>
          <p className="text-2xl font-bold text-text-primary">{formatCurrency(totalNetRevenue)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-text-secondary mb-1 flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-primary" />
            Your Share
          </p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(totalVendorShare)}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder="Search by station..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
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
          <Button onClick={handleSearch} variant="primary" className="w-full" leftIcon={<Filter className="h-4 w-4" />}>
            Apply Filters
          </Button>
        </div>
      </Card>

      {/* Revenue Table */}
      <Card>
        {filteredResults.length === 0 ? (
          <div className="p-12 text-center">
            <DollarSign className="h-12 w-12 text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">
              {searchQuery ? 'No transactions match your search' : 'No revenue transactions found'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-text-secondary">Date</th>
                    <th className="text-left p-4 text-sm font-semibold text-text-secondary">Station</th>
                    <th className="text-right p-4 text-sm font-semibold text-text-secondary">Gross Revenue</th>
                    <th className="text-right p-4 text-sm font-semibold text-text-secondary">Net Revenue</th>
                    <th className="text-right p-4 text-sm font-semibold text-text-secondary">Share %</th>
                    <th className="text-right p-4 text-sm font-semibold text-text-secondary">Your Share</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((transaction) => {
                    const data = getTransactionData(transaction);
                    if (!data) return null;
                    
                    return (
                      <tr key={data.id} className="border-b border-border hover:bg-surface/50">
                        <td className="p-4">
                          <p className="text-sm text-text-primary">
                            {new Date(data.transaction_date).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {new Date(data.transaction_date).toLocaleTimeString()}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="text-sm font-medium text-text-primary">{data.station.name}</p>
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-sm font-medium text-text-primary">{formatCurrency(data.gross_revenue)}</p>
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-sm font-medium text-text-primary">{formatCurrency(data.net_revenue)}</p>
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-sm font-medium text-blue-500">{formatPercent(data.vendor_share_percent)}</p>
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-sm font-bold text-primary">{formatCurrency(data.vendor_share)}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4 p-4">
              {filteredResults.map((transaction) => {
                const data = getTransactionData(transaction);
                if (!data) return null;
                
                return (
                  <Card key={data.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{data.station.name}</p>
                        <p className="text-xs text-text-secondary mt-1">
                          {new Date(data.transaction_date).toLocaleDateString()} • {new Date(data.transaction_date).toLocaleTimeString()}
                        </p>
                      </div>
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        {formatPercent(data.vendor_share_percent)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                      <div>
                        <p className="text-xs text-text-secondary">Gross Revenue</p>
                        <p className="text-sm font-medium text-text-primary">{formatCurrency(data.gross_revenue)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary">Net Revenue</p>
                        <p className="text-sm font-medium text-text-primary">{formatCurrency(data.net_revenue)}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-text-secondary mb-1">Your Share</p>
                      <p className="text-lg font-bold text-primary">{formatCurrency(data.vendor_share)}</p>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination && pagination.total_pages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border">
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
