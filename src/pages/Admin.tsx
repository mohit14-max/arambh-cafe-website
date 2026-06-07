import { useMemo, useState } from 'react';
import {
  Bell,
  Calendar,
  ChevronRight,
  LayoutDashboard,
  Menu,
  Package,
  Plus,
  ShoppingBag,
  Star,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { cafeEvents, reviews } from '../data/mockData';
import InvoiceButton from '../components/InvoiceButton';
import OrderStatusBadge from '../components/OrderStatusBadge';
import StockBadge from '../components/StockBadge';
import { useCafe } from '../context/CafeContext';
import type { OrderStatus } from '../types/cafe';
import { getStockStatus } from '../utils/cafe';

type AdminView =
  | 'dashboard'
  | 'orders'
  | 'menu'
  | 'stock'
  | 'reports'
  | 'reviews'
  | 'events';

const navItems: { id: AdminView; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: 'orders', label: 'Orders', icon: <ShoppingBag className="h-4 w-4" /> },
  { id: 'menu', label: 'Menu Items', icon: <Calendar className="h-4 w-4" /> },
  { id: 'stock', label: 'Inventory', icon: <Package className="h-4 w-4" /> },
  { id: 'reports', label: 'Reports', icon: <TrendingUp className="h-4 w-4" /> },
  { id: 'reviews', label: 'Reviews', icon: <Star className="h-4 w-4" /> },
  { id: 'events', label: 'Events', icon: <Users className="h-4 w-4" /> },
];

const initialDraft = {
  name: '',
  description: '',
  price: 0,
  category: 'Coffee',
  image: '',
  stockQuantity: 0,
};

export default function Admin() {
  const {
    menu,
    orders,
    stockHistory,
    orderStatuses,
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
  } = useCafe();
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [draftItem, setDraftItem] = useState(initialDraft);

  const dashboardInventoryStatus = useMemo(() => {
    const outCount = menu.filter((item) => item.stockQuantity === 0).length;
    return `${lowStockItems.length} low · ${outCount} out`;
  }, [lowStockItems.length, menu]);

  const topPendingOrders = orders.slice(0, 6);

  const startEdit = (itemId: string) => {
    const item = menu.find((menuItem) => menuItem.id === itemId);
    if (!item) {
      return;
    }

    setEditingItemId(itemId);
    setDraftItem({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      stockQuantity: item.stockQuantity,
    });
  };

  const resetDraft = () => {
    setEditingItemId(null);
    setDraftItem(initialDraft);
  };

  const saveMenuItem = () => {
    if (!draftItem.name || !draftItem.description || !draftItem.image) {
      return;
    }

    upsertMenuItem({
      id: editingItemId ?? undefined,
      ...draftItem,
      price: Number(draftItem.price),
      stockQuantity: Number(draftItem.stockQuantity),
    });
    resetDraft();
  };

  return (
    <div className="flex min-h-screen bg-[#f5f0eb]">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-[#1e140a] transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="border-b border-[#3c2a15] p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8d5930]">
              <span className="text-xs font-bold text-[#fdf8f3]">A</span>
            </div>
            <div>
              <p className="font-lato text-sm font-semibold text-[#fdf8f3]">Arambh Cafe</p>
              <p className="font-lato text-xs text-[#7a5838]">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                setSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-5 py-3 font-lato text-sm transition-colors ${
                activeView === item.id
                  ? 'bg-[#8d5930] text-[#fdf8f3]'
                  : 'text-[#c8a87a] hover:bg-[#3c2a15] hover:text-[#fdf8f3]'
              }`}
            >
              {item.icon}
              {item.label}
              {activeView === item.id && <ChevronRight className="ml-auto h-3.5 w-3.5" />}
            </button>
          ))}
        </nav>

        <div className="border-t border-[#3c2a15] p-4">
          <a
            href="/"
            className="block text-center font-lato text-xs text-[#7a5838] transition-colors hover:text-[#c8a87a]"
          >
            Back to Website
          </a>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#e8d9cc] bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="text-[#8d5930] lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-playfair text-lg font-semibold capitalize text-[#3c2a15]">
                {activeView}
              </h1>
              <p className="font-lato text-xs text-[#7a5838]">
                {new Date().toLocaleDateString('en-IN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-full p-2 text-[#8d5930] transition-colors hover:bg-[#f9edd9]">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8d5930] text-sm font-semibold text-[#fdf8f3]">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          {activeView === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                {[
                  {
                    label: 'Total Orders',
                    value: orders.length,
                    color: 'text-blue-600 bg-blue-50',
                    icon: <ShoppingBag className="h-5 w-5" />,
                  },
                  {
                    label: 'Pending Orders',
                    value: pendingOrdersCount,
                    color: 'text-amber-600 bg-amber-50',
                    icon: <Calendar className="h-5 w-5" />,
                  },
                  {
                    label: 'Completed Orders',
                    value: completedOrdersCount,
                    color: 'text-emerald-600 bg-emerald-50',
                    icon: <Users className="h-5 w-5" />,
                  },
                  {
                    label: 'Revenue',
                    value: `₹${Math.round(totalRevenue).toLocaleString('en-IN')}`,
                    color: 'text-[#8d5930] bg-[#f9edd9]',
                    icon: <TrendingUp className="h-5 w-5" />,
                  },
                  {
                    label: 'Inventory Status',
                    value: dashboardInventoryStatus,
                    color: 'text-violet-600 bg-violet-50',
                    icon: <Package className="h-5 w-5" />,
                  },
                ].map((card) => (
                  <div key={card.label} className="rounded-2xl border border-[#e8d9cc] bg-white p-5">
                    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${card.color}`}>
                      {card.icon}
                    </div>
                    <p className="font-playfair text-2xl font-bold text-[#3c2a15]">{card.value}</p>
                    <p className="mt-0.5 font-lato text-xs text-[#7a5838]">{card.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-[#e8d9cc] bg-white p-5 lg:col-span-2">
                  <h2 className="mb-4 font-playfair font-semibold text-[#3c2a15]">Order Queue</h2>
                  <div className="space-y-3">
                    {topPendingOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col gap-3 rounded-xl border border-[#f0e6d3] p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-lato text-sm font-semibold text-[#3c2a15]">
                            {order.orderNumber} · {order.customerName}
                          </p>
                          <p className="font-lato text-xs text-[#7a5838]">
                            {order.items.length} items · ₹{order.total.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <OrderStatusBadge status={order.status} />
                          <select
                            value={order.status}
                            onChange={(event) =>
                              updateOrderStatus(order.id, event.target.value as OrderStatus)
                            }
                            className="rounded-lg border border-[#e8d9cc] bg-[#fdf8f3] px-3 py-2 font-lato text-xs text-[#3c2a15] focus:border-[#8d5930] focus:outline-none"
                          >
                            {orderStatuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-[#e8d9cc] bg-white p-5">
                  <h2 className="mb-4 font-playfair font-semibold text-[#3c2a15]">Low Stock</h2>
                  <div className="space-y-3">
                    {lowStockItems.length === 0 ? (
                      <p className="font-lato text-sm text-[#7a5838]">Everything is stocked well.</p>
                    ) : (
                      lowStockItems.map((item) => (
                        <div key={item.id} className="rounded-xl bg-[#fdf8f3] p-3">
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <p className="font-lato text-sm font-medium text-[#3c2a15]">{item.name}</p>
                            <StockBadge status={getStockStatus(item.stockQuantity)} />
                          </div>
                          <p className="font-lato text-xs text-[#7a5838]">
                            {item.stockQuantity} units remaining
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'orders' && (
            <div className="rounded-2xl border border-[#e8d9cc] bg-white">
              <div className="border-b border-[#f0e6d3] p-5">
                <h2 className="font-playfair font-semibold text-[#3c2a15]">Order Management</h2>
                <p className="mt-1 font-lato text-sm text-[#7a5838]">
                  Track status, review bills, and monitor every order.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full font-lato text-sm">
                  <thead>
                    <tr className="bg-[#fdf8f3] text-left text-xs uppercase tracking-wide text-[#7a5838]">
                      <th className="p-4">Order</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-t border-[#f0e6d3] align-top">
                        <td className="p-4">
                          <p className="font-medium text-[#3c2a15]">{order.orderNumber}</p>
                          <p className="text-xs text-[#7a5838]">
                            {new Date(order.createdAt).toLocaleString('en-IN')}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="text-[#3c2a15]">{order.customerName}</p>
                          <p className="text-xs text-[#7a5838]">{order.customerPhone}</p>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            {order.items.map((item) => (
                              <p key={`${order.id}-${item.itemId}`} className="text-xs text-[#5e3921]">
                                {item.name} × {item.quantity}
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-[#8d5930]">
                          ₹{order.total.toLocaleString('en-IN')}
                        </td>
                        <td className="p-4">
                          <div className="space-y-2">
                            <OrderStatusBadge status={order.status} />
                            <select
                              value={order.status}
                              onChange={(event) =>
                                updateOrderStatus(order.id, event.target.value as OrderStatus)
                              }
                              className="block rounded-lg border border-[#e8d9cc] bg-[#fdf8f3] px-3 py-2 text-xs text-[#3c2a15] focus:border-[#8d5930] focus:outline-none"
                            >
                              {orderStatuses.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td className="p-4">
                          <InvoiceButton order={order} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeView === 'menu' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#e8d9cc] bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-playfair font-semibold text-[#3c2a15]">Digital Menu Management</h2>
                    <p className="mt-1 font-lato text-sm text-[#7a5838]">
                      Add items or update prices, images, descriptions, and stock.
                    </p>
                  </div>
                  <button
                    onClick={resetDraft}
                    className="flex items-center gap-2 rounded-full bg-[#8d5930] px-4 py-2 font-lato text-sm font-medium text-[#fdf8f3] transition-colors hover:bg-[#744728]"
                  >
                    <Plus className="h-4 w-4" />
                    New Item
                  </button>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    value={draftItem.name}
                    onChange={(event) => setDraftItem({ ...draftItem, name: event.target.value })}
                    placeholder="Item name"
                    className="rounded-xl border border-[#e8d9cc] bg-[#fdf8f3] px-4 py-3 text-sm focus:border-[#8d5930] focus:outline-none"
                  />
                  <input
                    value={draftItem.image}
                    onChange={(event) => setDraftItem({ ...draftItem, image: event.target.value })}
                    placeholder="Image URL"
                    className="rounded-xl border border-[#e8d9cc] bg-[#fdf8f3] px-4 py-3 text-sm focus:border-[#8d5930] focus:outline-none"
                  />
                  <input
                    value={draftItem.category}
                    onChange={(event) => setDraftItem({ ...draftItem, category: event.target.value })}
                    placeholder="Category"
                    className="rounded-xl border border-[#e8d9cc] bg-[#fdf8f3] px-4 py-3 text-sm focus:border-[#8d5930] focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={draftItem.price}
                      onChange={(event) =>
                        setDraftItem({ ...draftItem, price: Number(event.target.value) })
                      }
                      placeholder="Price"
                      className="rounded-xl border border-[#e8d9cc] bg-[#fdf8f3] px-4 py-3 text-sm focus:border-[#8d5930] focus:outline-none"
                    />
                    <input
                      type="number"
                      value={draftItem.stockQuantity}
                      onChange={(event) =>
                        setDraftItem({ ...draftItem, stockQuantity: Number(event.target.value) })
                      }
                      placeholder="Stock"
                      className="rounded-xl border border-[#e8d9cc] bg-[#fdf8f3] px-4 py-3 text-sm focus:border-[#8d5930] focus:outline-none"
                    />
                  </div>
                  <textarea
                    value={draftItem.description}
                    onChange={(event) =>
                      setDraftItem({ ...draftItem, description: event.target.value })
                    }
                    rows={3}
                    placeholder="Description"
                    className="md:col-span-2 rounded-xl border border-[#e8d9cc] bg-[#fdf8f3] px-4 py-3 text-sm focus:border-[#8d5930] focus:outline-none"
                  />
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={saveMenuItem}
                    className="rounded-xl bg-[#8d5930] px-4 py-2.5 font-lato text-sm font-medium text-[#fdf8f3] transition-colors hover:bg-[#744728]"
                  >
                    {editingItemId ? 'Save Item' : 'Add Item'}
                  </button>
                  {editingItemId && (
                    <button
                      onClick={resetDraft}
                      className="rounded-xl border border-[#c8a87a] px-4 py-2.5 font-lato text-sm font-medium text-[#8d5930] transition-colors hover:bg-[#f9edd9]"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {menu.map((item) => (
                  <div key={item.id} className="overflow-hidden rounded-2xl border border-[#e8d9cc] bg-white">
                    <div className="relative h-36 overflow-hidden">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      <div className="absolute bottom-3 right-3">
                        <StockBadge status={getStockStatus(item.stockQuantity)} />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-1 flex items-start justify-between gap-3">
                        <p className="font-lato text-sm font-semibold text-[#3c2a15]">{item.name}</p>
                        <span className="font-lato text-sm font-bold text-[#8d5930]">₹{item.price}</span>
                      </div>
                      <p className="mb-2 font-lato text-xs text-[#7a5838]">{item.category}</p>
                      <p className="line-clamp-2 mb-3 font-lato text-xs text-[#7a5838]">{item.description}</p>
                      <p className="mb-4 font-lato text-xs text-[#7a5838]">
                        Stock quantity: {item.stockQuantity}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(item.id)}
                          className="flex-1 rounded-lg border border-[#e8d9cc] px-3 py-2 font-lato text-xs text-[#5e3921] transition-colors hover:border-[#8d5930]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeMenuItem(item.id)}
                          className="flex-1 rounded-lg border border-red-100 px-3 py-2 font-lato text-xs text-red-500 transition-colors hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'stock' && (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
              <div className="rounded-2xl border border-[#e8d9cc] bg-white">
                <div className="border-b border-[#f0e6d3] p-5">
                  <h2 className="font-playfair font-semibold text-[#3c2a15]">Inventory / Stock System</h2>
                  <p className="mt-1 font-lato text-sm text-[#7a5838]">
                    Update stock, monitor quantities, and track availability.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full font-lato text-sm">
                    <thead>
                      <tr className="bg-[#fdf8f3] text-left text-xs uppercase tracking-wide text-[#7a5838]">
                        <th className="p-4">Item</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Quantity</th>
                        <th className="p-4">Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menu.map((item) => (
                        <tr key={item.id} className="border-t border-[#f0e6d3]">
                          <td className="p-4 font-medium text-[#3c2a15]">{item.name}</td>
                          <td className="p-4 text-[#5e3921]">{item.category}</td>
                          <td className="p-4">
                            <StockBadge status={getStockStatus(item.stockQuantity)} />
                          </td>
                          <td className="p-4 text-[#5e3921]">{item.stockQuantity}</td>
                          <td className="p-4">
                            <input
                              type="number"
                              defaultValue={item.stockQuantity}
                              onBlur={(event) =>
                                updateStockQuantity(
                                  item.id,
                                  Number(event.target.value),
                                  'Manual admin stock update'
                                )
                              }
                              className="w-24 rounded-lg border border-[#e8d9cc] bg-[#fdf8f3] px-3 py-2 text-xs focus:border-[#8d5930] focus:outline-none"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-[#e8d9cc] bg-white p-5">
                <h2 className="mb-4 font-playfair font-semibold text-[#3c2a15]">Stock History</h2>
                <div className="space-y-3">
                  {stockHistory.slice(0, 10).map((entry) => (
                    <div key={entry.id} className="rounded-xl bg-[#fdf8f3] p-3">
                      <div className="mb-1 flex items-center justify-between gap-3">
                        <p className="font-lato text-sm font-medium text-[#3c2a15]">{entry.itemName}</p>
                        <span
                          className={`font-lato text-xs font-semibold ${
                            entry.change >= 0 ? 'text-emerald-600' : 'text-red-500'
                          }`}
                        >
                          {entry.change >= 0 ? '+' : ''}
                          {entry.change}
                        </span>
                      </div>
                      <p className="font-lato text-xs text-[#7a5838]">{entry.reason}</p>
                      <p className="mt-1 font-lato text-xs text-[#7a5838]">
                        {entry.previousQuantity} → {entry.newQuantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'reports' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[reportSummaries.daily, reportSummaries.weekly, reportSummaries.monthly].map((summary) => (
                  <div key={summary.label} className="rounded-2xl border border-[#e8d9cc] bg-white p-5">
                    <p className="font-lato text-xs text-[#7a5838]">{summary.label}</p>
                    <p className="font-playfair text-3xl font-bold text-[#3c2a15]">
                      ₹{Math.round(summary.revenue).toLocaleString('en-IN')}
                    </p>
                    <p className="mt-1 font-lato text-xs text-[#7a5838]">
                      {summary.orderCount} delivered order{summary.orderCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-[#e8d9cc] bg-white p-5">
                  <h2 className="mb-4 font-playfair font-semibold text-[#3c2a15]">Best Selling Products</h2>
                  <div className="space-y-3">
                    {bestSellingProducts.slice(0, 6).map((item) => (
                      <div key={item.itemId} className="flex items-center justify-between rounded-xl bg-[#fdf8f3] p-3">
                        <div>
                          <p className="font-lato text-sm font-medium text-[#3c2a15]">{item.name}</p>
                          <p className="font-lato text-xs text-[#7a5838]">{item.quantity} units sold</p>
                        </div>
                        <p className="font-lato text-sm font-semibold text-[#8d5930]">
                          ₹{Math.round(item.revenue).toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-[#e8d9cc] bg-white p-5">
                  <h2 className="mb-4 font-playfair font-semibold text-[#3c2a15]">Low Stock Products</h2>
                  <div className="space-y-3">
                    {lowStockItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between rounded-xl bg-[#fdf8f3] p-3">
                        <div>
                          <p className="font-lato text-sm font-medium text-[#3c2a15]">{item.name}</p>
                          <p className="font-lato text-xs text-[#7a5838]">{item.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-lato text-sm font-semibold text-[#8d5930]">{item.stockQuantity}</p>
                          <p className="font-lato text-xs text-[#7a5838]">units left</p>
                        </div>
                      </div>
                    ))}
                    {lowStockItems.length === 0 && (
                      <p className="font-lato text-sm text-[#7a5838]">No low stock products right now.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'reviews' && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-[#e8d9cc] bg-white p-5">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-lato text-sm font-medium text-[#3c2a15]">{review.name}</p>
                      <p className="font-lato text-xs text-[#7a5838]">{review.category}</p>
                    </div>
                    <span className="font-lato text-xs text-[#8d5930]">{review.rating}/5</span>
                  </div>
                  <p className="font-lato text-sm leading-relaxed text-[#5e3921]">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {activeView === 'events' && (
            <div className="space-y-4">
              {cafeEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col gap-4 rounded-2xl border border-[#e8d9cc] bg-white p-5 sm:flex-row sm:items-center"
                >
                  <div className="h-16 w-16 overflow-hidden rounded-xl">
                    <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <h3 className="font-lato text-sm font-semibold text-[#3c2a15]">{event.title}</h3>
                      <span className="rounded-full bg-[#f9edd9] px-2 py-0.5 font-lato text-xs text-[#8d5930]">
                        {event.category}
                      </span>
                    </div>
                    <p className="font-lato text-xs text-[#7a5838]">
                      {event.date} · {event.time} · {event.seatsLeft} seats left
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
