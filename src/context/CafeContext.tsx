import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  CafeOrder,
  CartItem,
  InventoryMenuItem,
  OrderStatus,
  StockHistoryEntry,
} from '../types/cafe';
import {
  ORDER_STATUSES,
  buildInitialInventory,
  createSeedOrders,
  createSeedStockHistory,
  getBestSellingProducts,
  getReportSummaries,
} from '../utils/cafe';

interface PlaceOrderInput {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  orderType: 'Dine In' | 'Takeaway';
  tableLabel?: string;
  notes?: string;
}

interface UpsertMenuInput {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stockQuantity: number;
  tags?: string[];
}

interface CafeContextValue {
  menu: InventoryMenuItem[];
  cart: CartItem[];
  orders: CafeOrder[];
  stockHistory: StockHistoryEntry[];
  orderStatuses: OrderStatus[];
  addToCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (input: PlaceOrderInput) => { ok: true } | { ok: false; message: string };
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateStockQuantity: (itemId: string, quantity: number, reason?: string) => void;
  upsertMenuItem: (input: UpsertMenuInput) => void;
  removeMenuItem: (itemId: string) => void;
  totalRevenue: number;
  pendingOrdersCount: number;
  completedOrdersCount: number;
  reportSummaries: ReturnType<typeof getReportSummaries>;
  bestSellingProducts: ReturnType<typeof getBestSellingProducts>;
  lowStockItems: InventoryMenuItem[];
}

interface CafePersistedState {
  menu: InventoryMenuItem[];
  orders: CafeOrder[];
  stockHistory: StockHistoryEntry[];
  cart: CartItem[];
}

const STORAGE_KEY = 'arambh-cafe-state-v1';

const CafeContext = createContext<CafeContextValue | null>(null);

function createInitialState(): CafePersistedState {
  const menu = buildInitialInventory();
  const orders = createSeedOrders(menu);
  const stockHistory = createSeedStockHistory(menu);

  return {
    menu,
    orders,
    stockHistory,
    cart: [],
  };
}

function getInitialState(): CafePersistedState {
  if (typeof window === 'undefined') {
    return createInitialState();
  }

  const rawState = window.localStorage.getItem(STORAGE_KEY);
  if (!rawState) {
    return createInitialState();
  }

  try {
    return JSON.parse(rawState) as CafePersistedState;
  } catch {
    return createInitialState();
  }
}

function calculateOrderNumber(orderCount: number): string {
  return `AR-${String(1001 + orderCount).padStart(4, '0')}`;
}

export function CafeProvider({ children }: { children: ReactNode }) {
  const initialState = useMemo(() => getInitialState(), []);
  const [menu, setMenu] = useState<InventoryMenuItem[]>(initialState.menu);
  const [orders, setOrders] = useState<CafeOrder[]>(initialState.orders);
  const [stockHistory, setStockHistory] = useState<StockHistoryEntry[]>(initialState.stockHistory);
  const [cart, setCart] = useState<CartItem[]>(initialState.cart);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ menu, orders, stockHistory, cart })
    );
  }, [menu, orders, stockHistory, cart]);

  const addStockHistoryEntry = (
    item: InventoryMenuItem,
    previousQuantity: number,
    nextQuantity: number,
    reason: string,
    orderId?: string
  ) => {
    setStockHistory((current) => [
      {
        id: `stock-${Date.now()}-${item.id}-${current.length + 1}`,
        itemId: item.id,
        itemName: item.name,
        previousQuantity,
        change: nextQuantity - previousQuantity,
        newQuantity: nextQuantity,
        reason,
        createdAt: new Date().toISOString(),
        orderId,
      },
      ...current,
    ]);
  };

  const addToCart = (itemId: string) => {
    const item = menu.find((menuItem) => menuItem.id === itemId);
    if (!item || item.stockQuantity <= 0) {
      return;
    }

    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.itemId === itemId);
      if (!existing) {
        return [...current, { itemId, quantity: 1 }];
      }

      const nextQuantity = Math.min(existing.quantity + 1, item.stockQuantity);
      return current.map((cartItem) =>
        cartItem.itemId === itemId ? { ...cartItem, quantity: nextQuantity } : cartItem
      );
    });
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    const item = menu.find((menuItem) => menuItem.id === itemId);
    if (!item) {
      return;
    }

    if (quantity <= 0) {
      setCart((current) => current.filter((cartItem) => cartItem.itemId !== itemId));
      return;
    }

    setCart((current) =>
      current.map((cartItem) =>
        cartItem.itemId === itemId
          ? { ...cartItem, quantity: Math.min(quantity, item.stockQuantity) }
          : cartItem
      )
    );
  };

  const clearCart = () => setCart([]);

  const placeOrder = (input: PlaceOrderInput) => {
    if (cart.length === 0) {
      return { ok: false as const, message: 'Add at least one item to place an order.' };
    }

    const menuMap = new Map(menu.map((item) => [item.id, item]));
    const unavailable = cart.find((cartItem) => {
      const item = menuMap.get(cartItem.itemId);
      return !item || item.stockQuantity < cartItem.quantity;
    });

    if (unavailable) {
      return { ok: false as const, message: 'One or more items are no longer in stock.' };
    }

    const createdAt = new Date().toISOString();
    const orderNumber = calculateOrderNumber(orders.length);
    const items = cart.map((cartItem) => {
      const item = menuMap.get(cartItem.itemId)!;
      return {
        itemId: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: cartItem.quantity,
        lineTotal: item.price * cartItem.quantity,
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
    const tax = Number((subtotal * 0.05).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));
    const orderId = `order-${Date.now()}`;

    const nextOrder: CafeOrder = {
      id: orderId,
      orderNumber,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail,
      orderType: input.orderType,
      tableLabel: input.tableLabel,
      notes: input.notes,
      createdAt,
      updatedAt: createdAt,
      status: 'Pending',
      items,
      subtotal,
      tax,
      total,
      invoice: {
        invoiceNumber: `INV-${orderNumber}`,
        issuedAt: createdAt,
        subtotal,
        tax,
        total,
      },
    };

    setMenu((currentMenu) =>
      currentMenu.map((item) => {
        const cartItem = cart.find((entry) => entry.itemId === item.id);
        if (!cartItem) {
          return item;
        }

        const nextQuantity = item.stockQuantity - cartItem.quantity;
        addStockHistoryEntry(
          item,
          item.stockQuantity,
          nextQuantity,
          `Auto-reduced for order ${orderNumber}`,
          orderId
        );

        return { ...item, stockQuantity: nextQuantity };
      })
    );

    setOrders((current) => [nextOrder, ...current]);
    setCart([]);

    return { ok: true as const };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  const updateStockQuantity = (itemId: string, quantity: number, reason = 'Manual admin stock update') => {
    setMenu((current) =>
      current.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        addStockHistoryEntry(item, item.stockQuantity, quantity, reason);
        return { ...item, stockQuantity: Math.max(0, quantity) };
      })
    );
  };

  const upsertMenuItem = (input: UpsertMenuInput) => {
    if (input.id) {
      setMenu((current) =>
        current.map((item) =>
          item.id === input.id
            ? {
                ...item,
                name: input.name,
                description: input.description,
                price: input.price,
                category: input.category,
                image: input.image,
                stockQuantity: Math.max(0, input.stockQuantity),
                tags: input.tags ?? item.tags,
              }
            : item
        )
      );
      return;
    }

    setMenu((current) => [
      {
        id: `m${Date.now()}`,
        name: input.name,
        description: input.description,
        price: input.price,
        category: input.category,
        image: input.image,
        stockQuantity: Math.max(0, input.stockQuantity),
        rating: 4.5,
        tags: input.tags,
      },
      ...current,
    ]);
  };

  const removeMenuItem = (itemId: string) => {
    setMenu((current) => current.filter((item) => item.id !== itemId));
    setCart((current) => current.filter((item) => item.itemId !== itemId));
  };

  const completedOrdersCount = orders.filter((order) => order.status === 'Delivered').length;
  const pendingOrdersCount = orders.filter((order) =>
    ['Pending', 'Accepted', 'Preparing', 'Ready'].includes(order.status)
  ).length;
  const totalRevenue = orders
    .filter((order) => order.status === 'Delivered')
    .reduce((sum, order) => sum + order.total, 0);
  const reportSummaries = getReportSummaries(orders);
  const bestSellingProducts = getBestSellingProducts(orders);
  const lowStockItems = menu.filter((item) => item.stockQuantity <= 5);

  const value: CafeContextValue = {
    menu,
    cart,
    orders,
    stockHistory,
    orderStatuses: ORDER_STATUSES,
    addToCart,
    updateCartQuantity,
    clearCart,
    placeOrder,
    updateOrderStatus,
    updateStockQuantity,
    upsertMenuItem,
    removeMenuItem,
    totalRevenue,
    pendingOrdersCount,
    completedOrdersCount,
    reportSummaries,
    bestSellingProducts,
    lowStockItems,
  };

  return <CafeContext.Provider value={value}>{children}</CafeContext.Provider>;
}

export function useCafe() {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error('useCafe must be used within CafeProvider');
  }

  return context;
}
