import type { StockStatus } from '../data/mockData';

interface StockBadgeProps {
  status: StockStatus;
}

const statusConfig = {
  available: { label: 'Available', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  low: { label: 'Low Stock', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  out: { label: 'Out of Stock', className: 'bg-red-50 text-red-600 border-red-200' },
};

export default function StockBadge({ status }: StockBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${config.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'available' ? 'bg-emerald-500' : status === 'low' ? 'bg-amber-500' : 'bg-red-500'}`} />
      {config.label}
    </span>
  );
}
