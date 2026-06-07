import type { OrderStatus } from '../types/cafe';

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  Pending: {
    label: 'Pending',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  Accepted: {
    label: 'Accepted',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  Preparing: {
    label: 'Preparing',
    className: 'bg-violet-50 text-violet-700 border-violet-200',
  },
  Ready: {
    label: 'Ready',
    className: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  },
  Delivered: {
    label: 'Delivered',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  Cancelled: {
    label: 'Cancelled',
    className: 'bg-red-50 text-red-600 border-red-200',
  },
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium font-lato ${config.className}`}
    >
      {config.label}
    </span>
  );
}

