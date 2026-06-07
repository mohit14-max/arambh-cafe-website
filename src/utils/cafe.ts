import { menuItems } from '../data/mockData';
import type {
  CafeOrder,
  InventoryMenuItem,
  Invoice,
  OrderLineItem,
  OrderStatus,
  ProductSalesSummary,
  ReportRangeSummary,
  StockHistoryEntry,
} from '../types/cafe';

const TAX_RATE = 0.05;

export const ORDER_STATUSES: OrderStatus[] = [
  'Pending',
  'Accepted',
  'Preparing',
  'Ready',
  'Delivered',
  'Cancelled',
];

export function getStockStatus(quantity: number): 'available' | 'low' | 'out' {
  if (quantity <= 0) {
    return 'out';
  }

  if (quantity <= 5) {
    return 'low';
  }

  return 'available';
}

export function buildInitialInventory(): InventoryMenuItem[] {
  return menuItems.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category,
    image: item.image,
    rating: item.rating,
    isPopular: item.isPopular,
    isBestSeller: item.isBestSeller,
    tags: item.tags,
    stockQuantity:
      item.stock === 'available' ? 18 : item.stock === 'low' ? 4 : 0,
  }));
}

function buildInvoice(orderNumber: string, issuedAt: string, subtotal: number): Invoice {
  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  return {
    invoiceNumber: `INV-${orderNumber}`,
    issuedAt,
    subtotal,
    tax,
    total,
  };
}

function buildOrderLineItems(
  items: Array<{ item: InventoryMenuItem; quantity: number }>
): OrderLineItem[] {
  return items.map(({ item, quantity }) => ({
    itemId: item.id,
    name: item.name,
    image: item.image,
    price: item.price,
    quantity,
    lineTotal: item.price * quantity,
  }));
}

export function createSeedOrders(inventory: InventoryMenuItem[]): CafeOrder[] {
  const inventoryMap = new Map(inventory.map((item) => [item.id, item]));
  const seed = [
    {
      orderNumber: 'AR-1001',
      customerName: 'Aditya Verma',
      customerPhone: '+91 98765 43210',
      orderType: 'Dine In' as const,
      tableLabel: 'Table 3',
      notes: 'Extra hot latte please',
      createdAt: '2026-06-07T09:10:00+05:30',
      status: 'Pending' as OrderStatus,
      items: [
        { id: 'm1', quantity: 1 },
        { id: 'm7', quantity: 1 },
      ],
    },
    {
      orderNumber: 'AR-1000',
      customerName: 'Priya Sharma',
      customerPhone: '+91 98111 22003',
      orderType: 'Takeaway' as const,
      createdAt: '2026-06-07T08:25:00+05:30',
      status: 'Ready' as OrderStatus,
      items: [
        { id: 'm4', quantity: 2 },
        { id: 'm11', quantity: 1 },
      ],
    },
    {
      orderNumber: 'AR-0998',
      customerName: 'Rohan Desai',
      customerPhone: '+91 98770 12210',
      orderType: 'Dine In' as const,
      tableLabel: 'Table 6',
      createdAt: '2026-06-06T19:15:00+05:30',
      status: 'Delivered' as OrderStatus,
      items: [
        { id: 'm2', quantity: 2 },
        { id: 'm8', quantity: 1 },
        { id: 'm12', quantity: 1 },
      ],
    },
    {
      orderNumber: 'AR-0992',
      customerName: 'Sneha Nair',
      customerPhone: '+91 98980 41230',
      orderType: 'Takeaway' as const,
      createdAt: '2026-06-03T16:45:00+05:30',
      status: 'Delivered' as OrderStatus,
      items: [
        { id: 'm3', quantity: 1 },
        { id: 'm11', quantity: 2 },
      ],
    },
    {
      orderNumber: 'AR-0985',
      customerName: 'Dev Kapoor',
      customerPhone: '+91 98888 65432',
      orderType: 'Dine In' as const,
      tableLabel: 'Table 1',
      createdAt: '2026-05-24T13:30:00+05:30',
      status: 'Cancelled' as OrderStatus,
      notes: 'Customer left before preparation',
      items: [
        { id: 'm15', quantity: 1 },
        { id: 'm10', quantity: 2 },
      ],
    },
  ];

  return seed.map((seedOrder, index) => {
    const items = buildOrderLineItems(
      seedOrder.items
        .map(({ id, quantity }) => {
          const item = inventoryMap.get(id);
          return item ? { item, quantity } : null;
        })
        .filter((item): item is { item: InventoryMenuItem; quantity: number } => item !== null)
    );

    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
    const invoice = buildInvoice(seedOrder.orderNumber, seedOrder.createdAt, subtotal);

    return {
      id: `seed-order-${index + 1}`,
      orderNumber: seedOrder.orderNumber,
      customerName: seedOrder.customerName,
      customerPhone: seedOrder.customerPhone,
      orderType: seedOrder.orderType,
      tableLabel: seedOrder.tableLabel,
      notes: seedOrder.notes,
      createdAt: seedOrder.createdAt,
      updatedAt: seedOrder.createdAt,
      status: seedOrder.status,
      items,
      subtotal: invoice.subtotal,
      tax: invoice.tax,
      total: invoice.total,
      invoice,
    };
  });
}

export function createSeedStockHistory(inventory: InventoryMenuItem[]): StockHistoryEntry[] {
  return inventory.slice(0, 6).map((item, index) => ({
    id: `seed-stock-${index + 1}`,
    itemId: item.id,
    itemName: item.name,
    previousQuantity: item.stockQuantity + 3,
    change: -3,
    newQuantity: item.stockQuantity,
    reason: 'Morning prep opening stock adjustment',
    createdAt: `2026-06-07T0${index + 8}:00:00+05:30`,
  }));
}

export function getDateKey(dateInput: string | Date): string {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isSameWeek(date: Date, compareDate: Date): boolean {
  const compareStart = new Date(compareDate);
  const day = compareStart.getDay();
  const diff = compareStart.getDate() - day + (day === 0 ? -6 : 1);
  compareStart.setDate(diff);
  compareStart.setHours(0, 0, 0, 0);

  const compareEnd = new Date(compareStart);
  compareEnd.setDate(compareStart.getDate() + 7);

  return date >= compareStart && date < compareEnd;
}

export function getReportSummaries(
  orders: CafeOrder[],
  today = new Date()
): {
  daily: ReportRangeSummary;
  weekly: ReportRangeSummary;
  monthly: ReportRangeSummary;
} {
  const deliveredOrders = orders.filter((order) => order.status === 'Delivered');

  const dailyOrders = deliveredOrders.filter(
    (order) => getDateKey(order.createdAt) === getDateKey(today)
  );
  const weeklyOrders = deliveredOrders.filter((order) =>
    isSameWeek(new Date(order.createdAt), today)
  );
  const monthlyOrders = deliveredOrders.filter((order) => {
    const date = new Date(order.createdAt);
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth()
    );
  });

  const buildSummary = (label: string, filteredOrders: CafeOrder[]): ReportRangeSummary => ({
    label,
    orderCount: filteredOrders.length,
    revenue: filteredOrders.reduce((sum, order) => sum + order.total, 0),
  });

  return {
    daily: buildSummary('Daily Sales', dailyOrders),
    weekly: buildSummary('Weekly Sales', weeklyOrders),
    monthly: buildSummary('Monthly Sales', monthlyOrders),
  };
}

export function getBestSellingProducts(orders: CafeOrder[]): ProductSalesSummary[] {
  const productMap = new Map<string, ProductSalesSummary>();

  orders
    .filter((order) => order.status === 'Delivered')
    .forEach((order) => {
      order.items.forEach((item) => {
        const existing = productMap.get(item.itemId);
        if (existing) {
          existing.quantity += item.quantity;
          existing.revenue += item.lineTotal;
          return;
        }

        productMap.set(item.itemId, {
          itemId: item.itemId,
          name: item.name,
          quantity: item.quantity,
          revenue: item.lineTotal,
        });
      });
    });

  return Array.from(productMap.values()).sort((a, b) => b.quantity - a.quantity);
}

export function formatInvoiceText(order: CafeOrder): string {
  const lines = [
    'Arambh Cafe Invoice',
    `Invoice: ${order.invoice.invoiceNumber}`,
    `Order: ${order.orderNumber}`,
    `Date: ${new Date(order.invoice.issuedAt).toLocaleString('en-IN')}`,
    `Customer: ${order.customerName}`,
    `Phone: ${order.customerPhone}`,
    `Order Type: ${order.orderType}`,
    '',
    'Items',
    ...order.items.map(
      (item) =>
        `${item.name} x${item.quantity} - Rs ${item.lineTotal.toLocaleString('en-IN')}`
    ),
    '',
    `Subtotal: Rs ${order.invoice.subtotal.toLocaleString('en-IN')}`,
    `Tax: Rs ${order.invoice.tax.toLocaleString('en-IN')}`,
    `Total: Rs ${order.invoice.total.toLocaleString('en-IN')}`,
    '',
    `Status: ${order.status}`,
  ];

  return lines.join('\n');
}
