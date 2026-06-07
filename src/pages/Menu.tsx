import { useMemo, useState } from 'react';
import { Minus, Plus, Search, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { userProfile, type MenuCategory } from '../data/mockData';
import StarRating from '../components/StarRating';
import StockBadge from '../components/StockBadge';
import OrderStatusBadge from '../components/OrderStatusBadge';
import InvoiceButton from '../components/InvoiceButton';
import { useCafe } from '../context/CafeContext';
import { getStockStatus } from '../utils/cafe';

const categories: MenuCategory[] = ['Coffee', 'Snacks', 'Desserts', 'Cold Drinks'];
const categoryEmojis: Record<MenuCategory, string> = {
  Coffee: 'Coffee',
  Snacks: 'Snacks',
  Desserts: 'Desserts',
  'Cold Drinks': 'Cold Drinks',
};

export default function Menu() {
  const {
    menu,
    cart,
    orders,
    addToCart,
    updateCartQuantity,
    placeOrder,
  } = useCafe();
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>('All');
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'available' | 'low' | 'out'>('all');
  const [customerName, setCustomerName] = useState(userProfile.name);
  const [customerPhone, setCustomerPhone] = useState(userProfile.phone);
  const [orderType, setOrderType] = useState<'Dine In' | 'Takeaway'>('Dine In');
  const [tableLabel, setTableLabel] = useState('Table 2');
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const filtered = menu.filter((item) => {
    const status = getStockStatus(item.stockQuantity);
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchStock = stockFilter === 'all' || status === stockFilter;
    return matchCat && matchSearch && matchStock;
  });

  const cartDetails = useMemo(() => {
    return cart
      .map((cartItem) => {
        const item = menu.find((menuItem) => menuItem.id === cartItem.itemId);
        if (!item) {
          return null;
        }

        return {
          ...item,
          quantity: cartItem.quantity,
          lineTotal: cartItem.quantity * item.price,
        };
      })
      .filter(
        (
          item
        ): item is (typeof menu)[number] & { quantity: number; lineTotal: number } => item !== null
      );
  }, [cart, menu]);

  const subtotal = cartDetails.reduce((sum, item) => sum + item.lineTotal, 0);
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));
  const latestOrder = orders.find((order) => order.customerName === userProfile.name);

  const handlePlaceOrder = () => {
    const result = placeOrder({
      customerName,
      customerPhone,
      orderType,
      tableLabel: orderType === 'Dine In' ? tableLabel : undefined,
      notes,
    });

    if (!result.ok) {
      setFeedback(result.message);
      return;
    }

    setNotes('');
    setFeedback('Order placed successfully. Your bill has been generated automatically.');
  };

  return (
    <main className="min-h-screen bg-[#fdf8f3]">
      <section className="bg-[#3c2a15] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-3 block font-lato text-xs font-semibold uppercase tracking-widest text-[#c8a87a]">
            What's Brewing
          </span>
          <h1 className="mb-3 font-playfair text-5xl font-bold text-[#fdf8f3]">Our Menu</h1>
          <p className="max-w-xl font-lato text-[#c8a87a]">
            Crafted with care, sourced with love. Every item on our menu is made fresh and now
            available for direct ordering.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <div>
          <div className="mb-8 grid gap-4 xl:grid-cols-[minmax(0,1fr)_200px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c8a87a]" />
              <input
                type="text"
                placeholder="Search drinks, food, desserts..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-xl border border-[#e8d9cc] bg-white py-3 pl-11 pr-4 text-sm text-[#3c2a15] placeholder-[#c8a87a] focus:border-[#8d5930] focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-[#8d5930]" />
              <select
                value={stockFilter}
                onChange={(event) => setStockFilter(event.target.value as typeof stockFilter)}
                className="w-full cursor-pointer rounded-xl border border-[#e8d9cc] bg-white px-4 py-3 text-sm text-[#3c2a15] focus:border-[#8d5930] focus:outline-none"
              >
                <option value="all">All Items</option>
                <option value="available">Available</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`rounded-full px-5 py-2.5 font-lato text-sm font-medium transition-colors ${
                activeCategory === 'All'
                  ? 'bg-[#8d5930] text-[#fdf8f3]'
                  : 'border border-[#e8d9cc] bg-white text-[#5e3921] hover:border-[#8d5930] hover:text-[#8d5930]'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2.5 font-lato text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-[#8d5930] text-[#fdf8f3]'
                    : 'border border-[#e8d9cc] bg-white text-[#5e3921] hover:border-[#8d5930] hover:text-[#8d5930]'
                }`}
              >
                {categoryEmojis[category]}
              </button>
            ))}
          </div>

          {latestOrder && (
            <div className="mb-8 rounded-2xl border border-[#e8d9cc] bg-white p-5">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-playfair text-xl font-semibold text-[#3c2a15]">
                    Your Latest Order
                  </p>
                  <p className="font-lato text-sm text-[#7a5838]">
                    {latestOrder.orderNumber} · {new Date(latestOrder.createdAt).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <OrderStatusBadge status={latestOrder.status} />
                  <InvoiceButton order={latestOrder} />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {latestOrder.items.map((item) => (
                  <div
                    key={`${latestOrder.id}-${item.itemId}`}
                    className="rounded-xl bg-[#fdf8f3] p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-lato text-sm font-medium text-[#3c2a15]">{item.name}</p>
                        <p className="font-lato text-xs text-[#7a5838]">
                          {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                      <p className="font-lato text-sm font-semibold text-[#8d5930]">
                        ₹{item.lineTotal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="mb-6 font-lato text-sm text-[#7a5838]">
            Showing <span className="font-semibold text-[#3c2a15]">{filtered.length}</span> item
            {filtered.length !== 1 ? 's' : ''}
          </p>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="mb-4 text-4xl">☕</p>
              <p className="mb-2 font-playfair text-xl text-[#3c2a15]">Nothing found</p>
              <p className="font-lato text-sm text-[#7a5838]">Try a different search or filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((item) => {
                const status = getStockStatus(item.stockQuantity);
                const cartItem = cart.find((entry) => entry.itemId === item.id);
                const inCart = cartItem?.quantity ?? 0;

                return (
                  <article
                    key={item.id}
                    className={`group overflow-hidden rounded-2xl border border-[#e8d9cc] bg-white transition-shadow hover:shadow-lg ${
                      status === 'out' ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 right-3">
                        <StockBadge status={status} />
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <h2 className="font-playfair text-base font-semibold leading-tight text-[#3c2a15]">
                          {item.name}
                        </h2>
                        <span className="flex-shrink-0 font-lato text-base font-bold text-[#8d5930]">
                          ₹{item.price}
                        </span>
                      </div>

                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="rounded-full bg-[#f9edd9] px-2 py-0.5 font-lato text-xs text-[#8d5930]">
                          {item.category}
                        </span>
                        <span className="font-lato text-xs text-[#7a5838]">
                          {item.stockQuantity} in stock
                        </span>
                      </div>

                      <p className="line-clamp-2 mb-3 font-lato text-xs leading-relaxed text-[#7a5838]">
                        {item.description}
                      </p>

                      <div className="mb-3 flex items-center justify-between">
                        <StarRating rating={item.rating} showValue />
                      </div>

                      {item.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-[#f9edd9] px-2 py-0.5 font-lato text-xs text-[#7a5838]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {status === 'out' ? (
                        <button
                          disabled
                          className="mt-4 w-full cursor-not-allowed rounded-xl bg-[#f0e6d3] py-2.5 font-lato text-sm font-medium text-[#c8a87a]"
                        >
                          Out of Stock
                        </button>
                      ) : (
                        <div className="mt-4 flex items-center gap-2">
                          {inCart > 0 ? (
                            <div className="flex flex-1 items-center justify-between rounded-xl border border-[#e8d9cc] px-3 py-2">
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, inCart - 1)}
                                className="rounded-lg p-1 text-[#8d5930] transition-colors hover:bg-[#f9edd9]"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="font-lato text-sm font-semibold text-[#3c2a15]">
                                {inCart}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, inCart + 1)}
                                className="rounded-lg p-1 text-[#8d5930] transition-colors hover:bg-[#f9edd9]"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => addToCart(item.id)}
                              className="w-full rounded-xl bg-[#8d5930] py-2.5 font-lato text-sm font-medium text-[#fdf8f3] transition-colors hover:bg-[#744728]"
                            >
                              Add to Order
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-[#e8d9cc] bg-white p-5 lg:sticky lg:top-24">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-[#f9edd9] p-2 text-[#8d5930]">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-playfair text-2xl font-semibold text-[#3c2a15]">Your Order</h2>
              <p className="font-lato text-sm text-[#7a5838]">
                {cartDetails.length} menu item{cartDetails.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <input
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Customer name"
                className="rounded-xl border border-[#e8d9cc] bg-[#fdf8f3] px-4 py-3 font-lato text-sm text-[#3c2a15] focus:border-[#8d5930] focus:outline-none"
              />
              <input
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                placeholder="Phone number"
                className="rounded-xl border border-[#e8d9cc] bg-[#fdf8f3] px-4 py-3 font-lato text-sm text-[#3c2a15] focus:border-[#8d5930] focus:outline-none"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <select
                value={orderType}
                onChange={(event) => setOrderType(event.target.value as 'Dine In' | 'Takeaway')}
                className="rounded-xl border border-[#e8d9cc] bg-[#fdf8f3] px-4 py-3 font-lato text-sm text-[#3c2a15] focus:border-[#8d5930] focus:outline-none"
              >
                <option value="Dine In">Dine In</option>
                <option value="Takeaway">Takeaway</option>
              </select>
              {orderType === 'Dine In' && (
                <input
                  value={tableLabel}
                  onChange={(event) => setTableLabel(event.target.value)}
                  placeholder="Table number"
                  className="rounded-xl border border-[#e8d9cc] bg-[#fdf8f3] px-4 py-3 font-lato text-sm text-[#3c2a15] focus:border-[#8d5930] focus:outline-none"
                />
              )}
            </div>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              placeholder="Notes for the cafe team"
              className="w-full rounded-xl border border-[#e8d9cc] bg-[#fdf8f3] px-4 py-3 font-lato text-sm text-[#3c2a15] focus:border-[#8d5930] focus:outline-none"
            />

            {cartDetails.length === 0 ? (
              <div className="rounded-2xl bg-[#fdf8f3] px-4 py-10 text-center">
                <p className="font-playfair text-lg text-[#3c2a15]">Your cart is empty</p>
                <p className="mt-1 font-lato text-sm text-[#7a5838]">
                  Add items from the menu to start an order.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartDetails.map((item) => (
                  <div key={item.id} className="rounded-xl bg-[#fdf8f3] p-3">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-lato text-sm font-medium text-[#3c2a15]">{item.name}</p>
                        <p className="font-lato text-xs text-[#7a5838]">₹{item.price} each</p>
                      </div>
                      <p className="font-lato text-sm font-semibold text-[#8d5930]">
                        ₹{item.lineTotal}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="rounded-lg border border-[#e8d9cc] p-1 text-[#8d5930] transition-colors hover:bg-white"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-lato text-sm font-semibold text-[#3c2a15]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="rounded-lg border border-[#e8d9cc] p-1 text-[#8d5930] transition-colors hover:bg-white"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-lato text-xs text-[#7a5838]">
                        {item.stockQuantity} left
                      </span>
                    </div>
                  </div>
                ))}

                <div className="space-y-2 rounded-xl border border-[#e8d9cc] p-4">
                  <div className="flex items-center justify-between font-lato text-sm text-[#7a5838]">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between font-lato text-sm text-[#7a5838]">
                    <span>Tax</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#f0e6d3] pt-2 font-lato text-base font-semibold text-[#3c2a15]">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                {feedback && (
                  <div className="rounded-xl bg-[#f9edd9] px-4 py-3 font-lato text-sm text-[#5e3921]">
                    {feedback}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="w-full rounded-xl bg-[#8d5930] py-3 font-lato text-sm font-medium text-[#fdf8f3] transition-colors hover:bg-[#744728]"
                >
                  Place Order & Generate Bill
                </button>
              </div>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
