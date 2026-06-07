import type { CafeOrder } from '../types/cafe';
import { formatInvoiceText } from '../utils/cafe';

export default function InvoiceButton({
  order,
  className,
}: {
  order: CafeOrder;
  className?: string;
}) {
  const handleDownload = () => {
    const contents = formatInvoiceText(order);
    const blob = new Blob([contents], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${order.invoice.invoiceNumber}.txt`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={
        className ??
        'rounded-xl border border-[#c8a87a] px-3 py-2 text-xs font-medium text-[#8d5930] transition-colors hover:bg-[#f9edd9] font-lato'
      }
    >
      Download Bill
    </button>
  );
}
