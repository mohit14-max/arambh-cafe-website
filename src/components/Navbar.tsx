import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Coffee, Bell, User, Search } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'Book a Table', path: '/booking' },
  { label: 'Events', path: '/events' },
  { label: 'Community', path: '/community' },
  { label: 'Reviews', path: '/reviews' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#fdf8f3] border-b border-[#e8d9cc] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#8d5930] rounded-full flex items-center justify-center">
              <Coffee className="w-4 h-4 text-[#fdf8f3]" />
            </div>
            <div>
              <span className="font-playfair text-xl font-semibold text-[#3c2a15] tracking-wide">Arambh</span>
              <span className="font-playfair text-xl font-light text-[#8d5930] ml-1">Café</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#8d5930] text-[#fdf8f3]'
                    : 'text-[#5e3921] hover:bg-[#f0e6d3] hover:text-[#3c2a15]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#8d5930] hover:bg-[#f0e6d3] rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-[#8d5930] hover:bg-[#f0e6d3] rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-2 bg-[#8d5930] text-[#fdf8f3] rounded-full text-sm font-medium hover:bg-[#744728] transition-colors"
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </Link>
            <Link
              to="/admin"
              className="px-3 py-2 border border-[#c8a87a] text-[#8d5930] rounded-full text-sm font-medium hover:bg-[#f0e6d3] transition-colors"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-[#5e3921] hover:bg-[#f0e6d3] rounded-lg"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c8a87a]" />
              <input
                type="text"
                placeholder="Search menu, events, community..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#f9edd9] border border-[#ddc9a8] rounded-full text-sm text-[#3c2a15] placeholder-[#c8a87a] focus:outline-none focus:border-[#8d5930]"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#fdf8f3] border-t border-[#e8d9cc] px-4 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#8d5930] text-[#fdf8f3]'
                    : 'text-[#5e3921] hover:bg-[#f0e6d3]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-[#e8d9cc]">
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center px-4 py-2.5 bg-[#8d5930] text-[#fdf8f3] rounded-lg text-sm font-medium"
              >
                My Profile
              </Link>
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center px-4 py-2.5 border border-[#c8a87a] text-[#8d5930] rounded-lg text-sm font-medium"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
