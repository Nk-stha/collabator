"use client";

import { useState } from "react";
import { useApi } from "@/hooks/use-api";
import { payoutService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, TrendingUp, Search } from "lucide-react";
import type { RevenueListParams, RevenueTransaction } from "@/lib/types";

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

  const formatCurrency = (value: string | number | null | undefined) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return `NPR ${(num ?? 0).toLocaleString()}`;
  };

  // Safe transaction data accessor
  const getTransactionData = (transaction: RevenueTransaction | null | undefined) => {
    if (!transaction) return null;
    return {
      id: transaction.id ?? '',
      transaction_id: transaction.transaction_id ?? 'N/A',
      created_at: transaction.created_at ?? new Date().toISOString(),
      station: {
        station_name: transaction.station?.station_name ?? 'Unknown Station',
        serial_number: transaction.station?.serial_number ?? 'N/A',
      },
      vendor: transaction.vendor ? {
        business_name: transaction.vendor.business_name ?? 'Unknown Vendor',
        code: transaction.vendor.code ?? 'N/A',
      } : null,
      gross_amount: transaction.gross_amount ?? '0',
      net_amount: transaction.net_amount ?? '0',
      franchise_share: transaction.franchise_share ?? '0',
      is_distributed: transaction.is_distributed ?? false,
    };
  };

  // Filter transactions by search query
  const filteredResults = (response?.data?.results ?? []).filter((transaction) => {
    if (!searchQuery) return true;
    const data = getTransactionData(transaction);
    if (!data) return false;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      data.transaction_id.toLowerCase().includes(searchLower) ||
      data.station.station_name.toLowerCase().includes(searchLower) ||
      data.station.serial_number.toLowerCase().includes(searchLower) ||
      (data.vendor?.business_name.toLowerCase().includes(searchLower) ?? false) ||
      (data.vendor?.code.toLowerCase().includes(searchLower) ?? false)
    );
  });

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!response?.data) return <ErrorDisplay error={new Error("No data available") as any} onRetry={refetch} />;

  const { summary, pagination } = response.data;
  const totalTransactions = summary?.total_transactions ?? 0;
  const totalGross = summary?.total_gross ?? '0';
  const totalNet = summary?.total_net ?? '0';
  const franchiseTotalShare = summary?.franchise_total_share ?? '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Revenue</h1>
          <p className="text-text-secondary mt-1">Track all revenue transactions and distributions</p>
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
          <p className="text-2xl font-bold text-text-primary">{formatCurrency(totalGross)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-text-secondary mb-1">Net Revenue</p>
          <p className="text-2xl font-bold text-text-primary">{formatCurrency(totalNet)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-text-secondary mb-1 flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-primary" />
            Your Share
          </p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(franchiseTotalShare)}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder="Search transactions..."
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
                  {filteredResults.map((transaction) => {
                    const data = getTransactionData(transaction);
                    if (!data) return null;
                    
                    return (
                      <tr key={data.id} className="border-b border-border hover:bg-surface/50">
                        <td className="p-4">
                          <p className="text-sm font-mono text-text-primary">{data.transaction_id.slice(0, 8)}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-sm font-medium text-text-primary">{data.station.station_name}</p>
                          <p className="text-xs text-text-secondary">{data.station.serial_number}</p>
                        </td>
                        <td className="p-4">
                          {data.vendor ? (
                            <>
                              <p className="text-sm font-medium text-text-primary">{data.vendor.business_name}</p>
                              <p className="text-xs text-text-secondary">{data.vendor.code}</p>
                            </>
                          ) : (
                            <p className="text-sm text-text-secondary">No vendor</p>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-sm font-medium text-text-primary">{formatCurrency(data.gross_amount)}</p>
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-sm font-medium text-text-primary">{formatCurrency(data.net_amount)}</p>
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-sm font-bold text-primary">{formatCurrency(data.franchise_share)}</p>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            data.is_distributed 
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                              : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                          }`}>
                            {data.is_distributed ? 'Distributed' : 'Pending'}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-text-secondary">
                            {new Date(data.created_at).toLocaleDateString()}
                          </p>
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
                        <p className="text-sm font-mono text-text-primary">{data.transaction_id.slice(0, 8)}</p>
                        <p className="text-xs text-text-secondary mt-1">
                          {new Date(data.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        data.is_distributed 
                          ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                          : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                      }`}>
                        {data.is_distributed ? 'Distributed' : 'Pending'}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-text-secondary">Station</p>
                        <p className="text-sm font-medium text-text-primary">{data.station.station_name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary">Vendor</p>
                        <p className="text-sm font-medium text-text-primary">
                          {data.vendor ? data.vendor.business_name : 'No vendor'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                      <div>
                        <p className="text-xs text-text-secondary">Gross</p>
                        <p className="text-sm font-medium text-text-primary">{formatCurrency(data.gross_amount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary">Net</p>
                        <p className="text-sm font-medium text-text-primary">{formatCurrency(data.net_amount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary">Your Share</p>
                        <p className="text-sm font-bold text-primary">{formatCurrency(data.franchise_share)}</p>
                      </div>
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
