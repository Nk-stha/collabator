import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiError } from '@/lib/api-error';

interface UseApiState<T> {
  data: T | null;
  error: ApiError | null;
  isLoading: boolean;
}

interface UseApiOptions {
  skip?: boolean;
}

interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => void;
  loading: boolean;
}

/**
 * Lightweight data fetching hook with loading, error, and refetch support.
 *
 * Usage:
 *   const { data, loading, error, refetch } = useApi(
 *     () => stationService.getStations()
 *   );
 *
 * With dependencies (re-fetch when stationId changes):
 *   const { data } = useApi(
 *     () => stationService.getStationById(stationId),
 *     [stationId]
 *   );
 *
 * With skip option (conditionally fetch):
 *   const { data } = useApi(
 *     () => payoutService.getPayoutDetail(payoutId),
 *     { skip: !payoutId }
 *   );
 */
export function useApi<T>(
  fetchFn: (() => Promise<T>) | null,
  depsOrOptions: unknown[] | UseApiOptions = []
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: true,
  });

  const isMounted = useRef(true);
  const requestId = useRef(0);

  // Handle both old API (deps array) and new API (options object)
  const options: UseApiOptions = Array.isArray(depsOrOptions) ? {} : depsOrOptions;
  const deps = Array.isArray(depsOrOptions) ? depsOrOptions : [];

  const execute = useCallback(async () => {
    if (!fetchFn || options.skip) {
      setState({ data: null, error: null, isLoading: false });
      return;
    }

    const currentRequestId = ++requestId.current;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await fetchFn();

      if (isMounted.current && currentRequestId === requestId.current) {
        setState({ data, error: null, isLoading: false });
      }
    } catch (err) {
      if (isMounted.current && currentRequestId === requestId.current) {
        const apiError =
          err instanceof ApiError
            ? err
            : new ApiError(0, err instanceof Error ? err.message : 'Unknown error');

        setState({ data: null, error: apiError, isLoading: false });

        if (apiError.isAuthError && typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.skip, ...deps]);

  useEffect(() => {
    isMounted.current = true;
    execute();
    return () => { isMounted.current = false; };
  }, [execute]);

  const refetch = useCallback(() => { execute(); }, [execute]);

  return { ...state, refetch, loading: state.isLoading };
}
