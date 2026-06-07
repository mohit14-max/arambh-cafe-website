export type OrderStatus =
  | 'Pending'
  | 'Accepted'
  | 'Preparing'
  | 'Ready'
  | 'Delivered'
  | 'Cancelled';

export interface InventoryMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  isPopular?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
  stockQuantity: number;
}

export interface CartItem {
  itemId: string;
  quantity: number;
}

export interface OrderLineItem {
  itemId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  lineTotal: number;
}

export interface Invoice {
  invoiceNumber: string;
  issuedAt: string;
  subtotal: number;
  tax: number;
  total: number;
}

export interface CafeOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  orderType: 'Dine In' | 'Takeaway';
  tableLabel?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  items: OrderLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  invoice: Invoice;
}

export interface StockHistoryEntry {
  id: string;
  itemId: string;
  itemName: string;
  previousQuantity: number;
  change: number;
  newQuantity: number;
  reason: string;
  createdAt: string;
  orderId?: string;
}

export interface ReportRangeSummary {
  label: string;
  orderCount: number;
  revenue: number;
}

export interface ProductSalesSummary {
  itemId: string;
  name: string;
  quantity: number;
  revenue: number;
}

