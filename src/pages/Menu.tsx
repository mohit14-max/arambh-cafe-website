import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { menuItems, type MenuCategory } from '../data/mockData';
import StarRating from '../components/StarRating';
import StockBadge from '../components/StockBadge';

const categories: MenuCategory[] = ['Coffee', 'Snacks', 'Desserts', 'Cold Drinks'];
const categoryEmojis: Record<MenuCategory, string> = {
  Coffee: '☕',
  Snacks: '🥪',
  Desserts: '🍰',
  'Cold Drinks': '🥤',
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>('All');
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'available' | 'low' | 'out'>('all');

  const filtered = menuItems.filter((item) => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
    const matchStock = stockFilter === 'all' || item.stock === stockFilter;
    return matchCat && matchSearch && matchStock;
  });

  return (
    <main className="min-h-screen bg-[#fdf8f3]">
      {/* Header */}
      <section className="bg-[#3c2a15] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold tracking-widest text-[#c8a87a] uppercase font-lato mb-3 block">What's Brewing</span>
          <h1 className="font-playfair text-5xl font-bold text-[#fdf8f3] mb-3">Our Menu</h1>
          <p className="text-[#c8a87a] font-lato max-w-xl">Crafted with care, sourced with love. Every item on our menu is made fresh and served with a smile.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c8a87a]" />
            <input
              type="text"
              placeholder="Search drinks, food, desserts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#e8d9cc] rounded-xl text-sm text-[#3c2a15] placeholder-[#c8a87a] focus:outline-none focus:border-[#8d5930]"
            />
          </div>
          {/* Stock Filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#8d5930]" />
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as typeof stockFilter)}
              className="px-4 py-3 bg-white border border-[#e8d9cc] rounded-xl text-sm text-[#3c2a15] focus:outline-none focus:border-[#8d5930] cursor-pointer"
            >
              <option value="all">All Items</option>
              <option value="available">Available</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors font-lato ${
              activeCategory === 'All'
                ? 'bg-[#8d5930] text-[#fdf8f3]'
                : 'bg-white border border-[#e8d9cc] text-[#5e3921] hover:border-[#8d5930] hover:text-[#8d5930]'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors font-lato flex items-center gap-2 ${
                activeCategory === cat
                  ? 'bg-[#8d5930] text-[#fdf8f3]'
                  : 'bg-white border border-[#e8d9cc] text-[#5e3921] hover:border-[#8d5930] hover:text-[#8d5930]'
              }`}
            >
              <span>{categoryEmojis[cat]}</span>
              {cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-[#7a5838] mb-6 font-lato">
          Showing <span className="font-semibold text-[#3c2a15]">{filtered.length}</span> item{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Menu Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">☕</p>
            <p className="font-playfair text-xl text-[#3c2a15] mb-2">Nothing found</p>
            <p className="text-[#7a5838] font-lato text-sm">Try a different search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <article
                key={item.id}
                className={`bg-white rounded-2xl overflow-hidden border border-[#e8d9cc] hover:shadow-lg transition-shadow group ${item.stock === 'out' ? 'opacity-70' : ''}`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    {item.isBestSeller && (
                      <span className="bg-[#8d5930] text-[#fdf8f3] text-xs font-semibold px-2.5 py-1 rounded-full font-lato">
                        Best Seller
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <StockBadge status={item.stock} />
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-1 gap-2">
                    <h2 className="font-playfair font-semibold text-[#3c2a15] text-base leading-tight">{item.name}</h2>
                    <span className="text-[#8d5930] font-bold text-base font-lato flex-shrink-0">₹{item.price}</span>
                  </div>

                  <span className="inline-block text-xs text-[#8d5930] bg-[#f9edd9] px-2 py-0.5 rounded-full mb-2 font-lato">
                    {item.category}
                  </span>

                  <p className="text-xs text-[#7a5838] leading-relaxed mb-3 line-clamp-2 font-lato">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <StarRating rating={item.rating} showValue />
                  </div>

                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-[#f9edd9] text-[#7a5838] px-2 py-0.5 rounded-full font-lato">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    disabled={item.stock === 'out'}
                    className={`mt-4 w-full py-2.5 rounded-xl text-sm font-medium transition-colors font-lato ${
                      item.stock === 'out'
                        ? 'bg-[#f0e6d3] text-[#c8a87a] cursor-not-allowed'
                        : 'bg-[#8d5930] hover:bg-[#744728] text-[#fdf8f3]'
                    }`}
                  >
                    {item.stock === 'out' ? 'Currently Unavailable' : 'Add to Order'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
