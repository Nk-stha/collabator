import { ApiError } from '@/lib/api-error';
import { AlertTriangle, WifiOff, ShieldOff, RefreshCw } from 'lucide-react';
import { Button } from './button';

interface ErrorDisplayProps {
  error: ApiError | null;
  onRetry?: () => void;
  compact?: boolean;
}

export function ErrorDisplay({ error, onRetry, compact = false }: ErrorDisplayProps) {
  if (!error) return null;

  const config = getErrorConfig(error);

  if (compact) {
    return (
      <div className={`p-4 rounded-xl border ${config.bgClass} ${config.borderClass}`}>
        <div className="flex items-center gap-3">
          <config.icon className={`h-5 w-5 ${config.iconColor}`} />
          <p className={`text-sm font-medium ${config.textColor}`}>{error.message}</p>
          {onRetry && (
            <Button variant="ghost" size="sm" onClick={onRetry} className="ml-auto">
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className={`h-16 w-16 rounded-2xl ${config.bgClass} flex items-center justify-center mb-6`}>
        <config.icon className={`h-8 w-8 ${config.iconColor}`} />
      </div>
      <h3 className="text-xl font-bold text-text-primary mb-2">{config.title}</h3>
      <p className="text-text-secondary text-sm text-center max-w-md mb-6">{error.message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} leftIcon={<RefreshCw className="h-4 w-4" />}>
          Try Again
        </Button>
      )}
    </div>
  );
}

function getErrorConfig(error: ApiError) {
  if (error.isNetworkError) {
    return {
      icon: WifiOff, title: 'Connection Failed',
      bgClass: 'bg-orange-500/10', borderClass: 'border-orange-500/20',
      iconColor: 'text-orange-500', textColor: 'text-orange-500',
    };
  }
  if (error.isAuthError) {
    return {
      icon: ShieldOff, title: 'Access Denied',
      bgClass: 'bg-red-500/10', borderClass: 'border-red-500/20',
      iconColor: 'text-red-500', textColor: 'text-red-500',
    };
  }
  return {
    icon: AlertTriangle, title: 'Something Went Wrong',
    bgClass: 'bg-yellow-500/10', borderClass: 'border-yellow-500/20',
    iconColor: 'text-yellow-500', textColor: 'text-yellow-500',
  };
}
