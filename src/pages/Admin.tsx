import { useState } from 'react';
import {
  LayoutDashboard, UtensilsCrossed, Calendar, Star, ShoppingBag,
  Bell, ChevronRight, TrendingUp, Users, Package, AlertCircle,
  CheckCircle, Clock, X, Menu, Edit, Trash2, Eye, Plus
} from 'lucide-react';
import { adminStats, menuItems, cafeEvents, reviews } from '../data/mockData';

type AdminView = 'dashboard' | 'bookings' | 'menu' | 'stock' | 'reviews' | 'events' | 'analytics';

const navItems: { id: AdminView; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'bookings', label: 'Bookings', icon: <Calendar className="w-4 h-4" /> },
  { id: 'menu', label: 'Menu Items', icon: <UtensilsCrossed className="w-4 h-4" /> },
  { id: 'stock', label: 'Stock', icon: <Package className="w-4 h-4" /> },
  { id: 'reviews', label: 'Reviews', icon: <Star className="w-4 h-4" /> },
  { id: 'events', label: 'Events', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
];

const statusColors: Record<string, string> = {
  confirmed: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  pending: 'text-amber-600 bg-amber-50 border-amber-200',
  completed: 'text-blue-600 bg-blue-50 border-blue-200',
  cancelled: 'text-red-600 bg-red-50 border-red-200',
};

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Admin() {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stockStatuses, setStockStatuses] = useState<Record<string, string>>(
    Object.fromEntries(menuItems.map((m) => [m.id, m.stock]))
  );

  const maxRevenue = Math.max(...adminStats.weeklyRevenue);

  return (
    <div className="min-h-screen bg-[#f5f0eb] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-60 bg-[#1e140a] flex flex-col transform transition-transform lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-[#3c2a15]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#8d5930] rounded-full flex items-center justify-center">
              <span className="text-[#fdf8f3] text-xs font-bold">A</span>
            </div>
            <div>
              <p className="text-[#fdf8f3] font-semibold text-sm font-lato">Arambh Café</p>
              <p className="text-[#7a5838] text-xs font-lato">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveView(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition-colors font-lato ${
                activeView === item.id
                  ? 'bg-[#8d5930] text-[#fdf8f3]'
                  : 'text-[#c8a87a] hover:bg-[#3c2a15] hover:text-[#fdf8f3]'
              }`}
            >
              {item.icon}
              {item.label}
              {activeView === item.id && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#3c2a15]">
          <a href="/" className="block text-xs text-[#7a5838] hover:text-[#c8a87a] font-lato text-center transition-colors">
            ← Back to Website
          </a>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#e8d9cc] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#8d5930]">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-playfair font-semibold text-[#3c2a15] text-lg capitalize">{activeView}</h1>
              <p className="text-xs text-[#7a5838] font-lato">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-[#8d5930] hover:bg-[#f9edd9] rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 bg-[#8d5930] rounded-full flex items-center justify-center text-[#fdf8f3] font-semibold text-sm">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-6 overflow-y-auto">

          {/* ── DASHBOARD ──────────────────────────────────────── */}
          {activeView === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Today's Revenue", value: `₹${adminStats.todayRevenue.toLocaleString('en-IN')}`, icon: <TrendingUp className="w-5 h-5" />, color: 'text-emerald-600 bg-emerald-50', change: '+12.4%' },
                  { label: "Today's Orders", value: adminStats.todayOrders, icon: <ShoppingBag className="w-5 h-5" />, color: 'text-blue-600 bg-blue-50', change: '+8 since yesterday' },
                  { label: 'Active Bookings', value: adminStats.activeBookings, icon: <Calendar className="w-5 h-5" />, color: 'text-violet-600 bg-violet-50', change: '3 pending review' },
                  { label: 'Total Customers', value: adminStats.totalCustomers.toLocaleString('en-IN'), icon: <Users className="w-5 h-5" />, color: 'text-[#8d5930] bg-[#f9edd9]', change: '+24 this week' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-5 border border-[#e8d9cc]">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold font-playfair text-[#3c2a15]">{stat.value}</p>
                    <p className="text-xs text-[#7a5838] font-lato mt-0.5">{stat.label}</p>
                    <p className="text-xs text-emerald-600 font-lato mt-1">{stat.change}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-[#e8d9cc]">
                  <h2 className="font-playfair font-semibold text-[#3c2a15] mb-4">Weekly Revenue</h2>
                  <div className="flex items-end gap-2 h-36">
                    {adminStats.weeklyRevenue.map((rev, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-[#7a5838] font-lato">₹{Math.round(rev / 1000)}k</span>
                        <div
                          className={`w-full rounded-t-lg transition-all ${i === 6 ? 'bg-[#8d5930]' : 'bg-[#e8d9cc]'}`}
                          style={{ height: `${(rev / maxRevenue) * 100}px` }}
                        />
                        <span className="text-xs text-[#7a5838] font-lato">{weekDays[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Items */}
                <div className="bg-white rounded-2xl p-5 border border-[#e8d9cc]">
                  <h2 className="font-playfair font-semibold text-[#3c2a15] mb-4">Top Selling Items</h2>
                  <div className="space-y-3">
                    {adminStats.topItems.map((item, i) => (
                      <div key={item.name} className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-[#f9edd9] rounded-full flex items-center justify-center text-xs font-semibold text-[#8d5930] flex-shrink-0">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#3c2a15] truncate font-lato">{item.name}</p>
                          <p className="text-xs text-[#7a5838] font-lato">{item.orders} orders</p>
                        </div>
                        <span className="text-xs font-semibold text-[#8d5930] font-lato">₹{item.revenue.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl p-5 border border-[#e8d9cc]">
                  <h2 className="font-playfair font-semibold text-[#3c2a15] mb-4">Today's Bookings</h2>
                  <div className="space-y-3">
                    {adminStats.recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between py-2 border-b border-[#f0e6d3] last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#f9edd9] rounded-lg flex items-center justify-center text-xs font-semibold text-[#8d5930]">
                            {booking.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-[#3c2a15] font-lato">{booking.name}</p>
                            <p className="text-xs text-[#7a5838] font-lato">{booking.type} · {booking.people} pax · {booking.time}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-lato ${statusColors[booking.status]}`}>
                          {booking.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-2xl p-5 border border-[#e8d9cc]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-playfair font-semibold text-[#3c2a15]">Notifications</h2>
                    <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-200 font-lato">{adminStats.notifications.length} new</span>
                  </div>
                  <div className="space-y-3">
                    {adminStats.notifications.map((notif) => (
                      <div key={notif.id} className={`flex items-start gap-3 p-3 rounded-xl ${
                        notif.type === 'booking' ? 'bg-blue-50' :
                        notif.type === 'stock' ? 'bg-amber-50' :
                        notif.type === 'review' ? 'bg-emerald-50' : 'bg-violet-50'
                      }`}>
                        {notif.type === 'booking' ? <Calendar className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" /> :
                         notif.type === 'stock' ? <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" /> :
                         notif.type === 'review' ? <Star className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" /> :
                         <Bell className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />}
                        <div>
                          <p className="text-xs text-[#3c2a15] font-lato leading-relaxed">{notif.message}</p>
                          <p className="text-xs text-[#7a5838] font-lato mt-0.5">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── BOOKINGS ──────────────────────────────────────── */}
          {activeView === 'bookings' && (
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((f) => (
                  <button key={f} className="px-4 py-2 bg-white border border-[#e8d9cc] rounded-full text-sm text-[#5e3921] hover:border-[#8d5930] font-lato transition-colors">
                    {f}
                  </button>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-[#e8d9cc] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-lato">
                    <thead>
                      <tr className="border-b border-[#f0e6d3] bg-[#fdf8f3]">
                        <th className="text-left p-4 text-xs font-semibold text-[#7a5838] uppercase tracking-wide">Customer</th>
                        <th className="text-left p-4 text-xs font-semibold text-[#7a5838] uppercase tracking-wide">Type</th>
                        <th className="text-left p-4 text-xs font-semibold text-[#7a5838] uppercase tracking-wide">Date & Time</th>
                        <th className="text-left p-4 text-xs font-semibold text-[#7a5838] uppercase tracking-wide">People</th>
                        <th className="text-left p-4 text-xs font-semibold text-[#7a5838] uppercase tracking-wide">Status</th>
                        <th className="text-left p-4 text-xs font-semibold text-[#7a5838] uppercase tracking-wide">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminStats.recentBookings.map((booking, i) => (
                        <tr key={booking.id} className={`border-b border-[#f0e6d3] last:border-0 ${i % 2 === 0 ? '' : 'bg-[#fdf8f3]/40'}`}>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-[#8d5930] rounded-full flex items-center justify-center text-[#fdf8f3] text-xs font-semibold">
                                {booking.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-medium text-[#3c2a15] text-xs">{booking.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-xs text-[#5e3921]">{booking.type}</td>
                          <td className="p-4 text-xs text-[#5e3921]">Today · {booking.time}</td>
                          <td className="p-4 text-xs text-[#5e3921]">{booking.people}</td>
                          <td className="p-4">
                            <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[booking.status]}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-1.5">
                              <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              {booking.status === 'pending' && (
                                <>
                                  <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                  </button>
                                  <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── MENU ──────────────────────────────────────────── */}
          {activeView === 'menu' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#7a5838] font-lato">{menuItems.length} items in menu</p>
                <button className="flex items-center gap-2 bg-[#8d5930] text-[#fdf8f3] px-4 py-2 rounded-full text-sm font-medium font-lato hover:bg-[#744728] transition-colors">
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-[#e8d9cc]">
                    <div className="h-36 overflow-hidden relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-lato font-medium border ${
                        item.stock === 'available' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                        item.stock === 'low' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                        'bg-red-100 text-red-600 border-red-200'
                      }`}>
                        {item.stock}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-semibold text-[#3c2a15] text-sm font-lato">{item.name}</p>
                        <span className="text-[#8d5930] font-bold text-sm font-lato">₹{item.price}</span>
                      </div>
                      <p className="text-xs text-[#8d5930] font-lato mb-2">{item.category}</p>
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-[#e8d9cc] rounded-lg text-xs text-[#5e3921] hover:border-[#8d5930] font-lato transition-colors">
                          <Edit className="w-3 h-3" /> Edit
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-red-100 rounded-lg text-xs text-red-500 hover:bg-red-50 font-lato transition-colors">
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STOCK ──────────────────────────────────────────── */}
          {activeView === 'stock' && (
            <div className="bg-white rounded-2xl border border-[#e8d9cc] overflow-hidden">
              <div className="p-5 border-b border-[#f0e6d3] flex items-center justify-between">
                <h2 className="font-playfair font-semibold text-[#3c2a15]">Stock Management</h2>
                <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200 font-lato">
                  {Object.values(stockStatuses).filter(s => s === 'low').length} items low
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-lato">
                  <thead>
                    <tr className="border-b border-[#f0e6d3] bg-[#fdf8f3]">
                      <th className="text-left p-4 text-xs font-semibold text-[#7a5838] uppercase">Item</th>
                      <th className="text-left p-4 text-xs font-semibold text-[#7a5838] uppercase">Category</th>
                      <th className="text-left p-4 text-xs font-semibold text-[#7a5838] uppercase">Current Status</th>
                      <th className="text-left p-4 text-xs font-semibold text-[#7a5838] uppercase">Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((item) => (
                      <tr key={item.id} className="border-b border-[#f0e6d3] last:border-0 hover:bg-[#fdf8f3]/40">
                        <td className="p-4 font-medium text-[#3c2a15] text-xs">{item.name}</td>
                        <td className="p-4 text-xs text-[#5e3921]">{item.category}</td>
                        <td className="p-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full border font-lato ${
                            stockStatuses[item.id] === 'available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            stockStatuses[item.id] === 'low' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            'bg-red-50 text-red-600 border-red-200'
                          }`}>
                            {stockStatuses[item.id]}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={stockStatuses[item.id]}
                            onChange={(e) => setStockStatuses({ ...stockStatuses, [item.id]: e.target.value })}
                            className="text-xs border border-[#e8d9cc] rounded-lg px-2 py-1.5 text-[#3c2a15] focus:outline-none focus:border-[#8d5930] cursor-pointer bg-[#fdf8f3]"
                          >
                            <option value="available">Available</option>
                            <option value="low">Low Stock</option>
                            <option value="out">Out of Stock</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── REVIEWS ──────────────────────────────────────────── */}
          {activeView === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200 font-lato">
                  {adminStats.pendingReviews} pending moderation
                </span>
              </div>
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl p-5 border border-[#e8d9cc]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#8d5930] rounded-full flex items-center justify-center text-[#fdf8f3] text-xs font-semibold">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#3c2a15] font-lato">{review.name}</p>
                        <div className="flex items-center gap-2">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i} className="text-[#c8802e] text-xs">★</span>
                          ))}
                          <span className="text-xs text-[#7a5838] font-lato">{review.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-[#5e3921] font-lato mt-3 leading-relaxed line-clamp-2">{review.comment}</p>
                  <p className="text-xs text-[#c8a87a] font-lato mt-2">{new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              ))}
            </div>
          )}

          {/* ── EVENTS ──────────────────────────────────────────── */}
          {activeView === 'events' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#7a5838] font-lato">{cafeEvents.length} upcoming events</p>
                <button className="flex items-center gap-2 bg-[#8d5930] text-[#fdf8f3] px-4 py-2 rounded-full text-sm font-medium font-lato hover:bg-[#744728] transition-colors">
                  <Plus className="w-4 h-4" /> Create Event
                </button>
              </div>
              {cafeEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl p-5 border border-[#e8d9cc] flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-[#3c2a15] font-lato text-sm">{event.title}</h3>
                      <span className="text-xs bg-[#f9edd9] text-[#8d5930] px-2 py-0.5 rounded-full font-lato">{event.category}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#7a5838] font-lato">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.seats - event.seatsLeft}/{event.seats} seats</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── ANALYTICS ──────────────────────────────────────── */}
          {activeView === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'This Week', value: `₹${adminStats.weeklyRevenue.reduce((a, b) => a + b, 0).toLocaleString('en-IN')}`, change: '↑ 18% vs last week' },
                  { label: 'Avg Order Value', value: `₹${Math.round(adminStats.todayRevenue / adminStats.todayOrders)}`, change: '↑ 5% vs last week' },
                  { label: 'Repeat Customers', value: '68%', change: 'High loyalty rate' },
                ].map((card) => (
                  <div key={card.label} className="bg-white rounded-2xl p-5 border border-[#e8d9cc]">
                    <p className="text-xs text-[#7a5838] font-lato mb-1">{card.label}</p>
                    <p className="text-3xl font-playfair font-bold text-[#3c2a15]">{card.value}</p>
                    <p className="text-xs text-emerald-600 font-lato mt-1">{card.change}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#e8d9cc]">
                <h2 className="font-playfair font-semibold text-[#3c2a15] mb-4">Revenue Trend (This Week)</h2>
                <div className="flex items-end gap-3 h-40">
                  {adminStats.weeklyRevenue.map((rev, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs text-[#7a5838] font-lato">₹{Math.round(rev / 1000)}k</span>
                      <div
                        className={`w-full rounded-t-xl transition-all ${i === 6 ? 'bg-[#8d5930]' : 'bg-[#e8d9cc]'}`}
                        style={{ height: `${(rev / maxRevenue) * 120}px` }}
                      />
                      <span className="text-xs text-[#7a5838] font-lato">{weekDays[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-[#e8d9cc]">
                  <h2 className="font-playfair font-semibold text-[#3c2a15] mb-4">Category Breakdown</h2>
                  {[
                    { cat: 'Coffee', pct: 45 },
                    { cat: 'Snacks', pct: 28 },
                    { cat: 'Desserts', pct: 17 },
                    { cat: 'Cold Drinks', pct: 10 },
                  ].map((item) => (
                    <div key={item.cat} className="mb-3">
                      <div className="flex justify-between text-xs font-lato text-[#5e3921] mb-1">
                        <span>{item.cat}</span><span>{item.pct}%</span>
                      </div>
                      <div className="h-2 bg-[#f0e6d3] rounded-full overflow-hidden">
                        <div className="h-full bg-[#8d5930] rounded-full" style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-2xl p-5 border border-[#e8d9cc]">
                  <h2 className="font-playfair font-semibold text-[#3c2a15] mb-4">Booking Type Split</h2>
                  {[
                    { type: 'Table Booking', pct: 58 },
                    { type: 'Group Booking', pct: 27 },
                    { type: 'Gaming Session', pct: 15 },
                  ].map((item) => (
                    <div key={item.type} className="mb-3">
                      <div className="flex justify-between text-xs font-lato text-[#5e3921] mb-1">
                        <span>{item.type}</span><span>{item.pct}%</span>
                      </div>
                      <div className="h-2 bg-[#f0e6d3] rounded-full overflow-hidden">
                        <div className="h-full bg-[#c8802e] rounded-full" style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
