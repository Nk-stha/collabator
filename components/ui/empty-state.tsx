import { Inbox } from 'lucide-react';
import { Button } from './button';

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: { label: string; onClick: () => void };
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'No Data',
  message = 'There are no items to display.',
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
        {icon || <Inbox className="h-8 w-8 text-gray-500" />}
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary text-sm text-center max-w-md mb-6">{message}</p>
      {action && (
        <Button variant="secondary" onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
}
