import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Calendar } from 'lucide-react';
import { menuItems, cafeEvents, reviews, communityGroups } from '../data/mockData';
import StarRating from '../components/StarRating';
import StockBadge from '../components/StockBadge';

export default function Home() {
  const featuredItems = menuItems.filter((item) => item.isPopular).slice(0, 4);
  const upcomingEvents = cafeEvents.slice(0, 3);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <main>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/34338427/pexels-photo-34338427.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400')`,
          }}
        >
          <div className="absolute inset-0 bg-[#1e140a]/65" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold tracking-widest text-[#c8a87a] uppercase mb-5 font-lato">
              ☕ Now Open in Pune
            </span>
            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-[#fdf8f3] leading-tight mb-6">
              Where Every<br />
              <em className="italic text-[#d99b52]">Sip</em> Starts a<br />
              New Story
            </h1>
            <p className="text-[#d4b89a] text-lg leading-relaxed mb-8 font-lato max-w-lg">
              A cozy corner for conversations, community, and great coffee. Whether you're starting your day, finding your people, or just looking for a warm place to be — Arambh is where it begins.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-[#c8802e] hover:bg-[#b56a22] text-[#fdf8f3] px-7 py-3.5 rounded-full font-medium transition-colors font-lato"
              >
                Explore Our Menu
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-[#d4b89a] text-[#fdf8f3] hover:bg-[#fdf8f3]/10 px-7 py-3.5 rounded-full font-medium transition-colors font-lato"
              >
                Book a Table
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 flex flex-wrap gap-8">
              {[
                { value: '3,200+', label: 'Happy Customers' },
                { value: '4.8★', label: 'Average Rating' },
                { value: '50+', label: 'Events This Year' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-[#fdf8f3] font-playfair">{stat.value}</p>
                  <p className="text-sm text-[#c8a87a] font-lato">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#c8a87a]">
          <span className="text-xs font-lato tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#c8a87a] to-transparent" />
        </div>
      </section>

      {/* ── INTRO STRIP ────────────────────────────────────────── */}
      <section className="bg-[#8d5930] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-3 text-[#fdf8f3] text-sm font-lato">
            {['Free WiFi & Charging Points', 'Board Games Available', 'Pet Friendly Outdoor Seating', 'Takeaway & Dine-In', 'Group Bookings Welcome'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d99b52]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────── */}
      <section className="py-20 bg-[#fdf8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#8d5930] uppercase font-lato mb-3 block">Our Story</span>
              <h2 className="font-playfair text-4xl font-bold text-[#3c2a15] mb-6 leading-snug">
                More Than a Café.<br />A Place to <em className="italic text-[#8d5930]">Belong.</em>
              </h2>
              <p className="text-[#5e3921] leading-relaxed mb-5 font-lato">
                Arambh — meaning "a new beginning" in Sanskrit — was born from a simple idea: that the best conversations happen over a good cup of coffee. We built this space for students, creators, dreamers, and anyone who needs a warm corner to call their own.
              </p>
              <p className="text-[#5e3921] leading-relaxed mb-8 font-lato">
                Every detail here — from the hand-picked beans to the mismatched chairs we love — is a deliberate choice to make you feel at home. We're not just a café. We're a community.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link
                  to="/community"
                  className="inline-flex items-center gap-2 text-[#8d5930] font-medium hover:gap-3 transition-all font-lato group"
                >
                  Join our community
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 text-[#8d5930] font-medium hover:gap-3 transition-all font-lato group"
                >
                  See upcoming events
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 rounded-2xl overflow-hidden h-52">
                <img
                  src="https://images.pexels.com/photos/29833130/pexels-photo-29833130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Arambh Café interior with espresso machine"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-40">
                <img
                  src="https://images.pexels.com/photos/7898213/pexels-photo-7898213.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Café seating area"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-40">
                <img
                  src="https://images.pexels.com/photos/13006848/pexels-photo-13006848.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Café table with food"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED MENU ──────────────────────────────────────── */}
      <section className="py-20 bg-[#f9edd9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#8d5930] uppercase font-lato mb-3 block">What We Serve</span>
              <h2 className="font-playfair text-4xl font-bold text-[#3c2a15]">Our Most Loved</h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-[#8d5930] font-medium font-lato hover:gap-3 transition-all group"
            >
              Full Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#fdf8f3] rounded-2xl overflow-hidden border border-[#e8d9cc] hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.isBestSeller && (
                    <span className="absolute top-3 left-3 bg-[#8d5930] text-[#fdf8f3] text-xs font-semibold px-2.5 py-1 rounded-full font-lato">
                      Best Seller
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-playfair font-semibold text-[#3c2a15] text-base leading-tight">{item.name}</h3>
                    <span className="text-[#8d5930] font-semibold text-sm font-lato ml-2 flex-shrink-0">₹{item.price}</span>
                  </div>
                  <p className="text-xs text-[#7a5838] line-clamp-2 mb-3 font-lato leading-relaxed">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <StarRating rating={item.rating} showValue />
                    <StockBadge status={item.stock} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ────────────────────────────────────── */}
      <section className="py-20 bg-[#fdf8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#8d5930] uppercase font-lato mb-3 block">Happening at Arambh</span>
              <h2 className="font-playfair text-4xl font-bold text-[#3c2a15]">Upcoming Events</h2>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-[#8d5930] font-medium font-lato hover:gap-3 transition-all group"
            >
              All Events <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => {
              const dateObj = new Date(event.date);
              const day = dateObj.getDate();
              const month = dateObj.toLocaleString('en-IN', { month: 'short' });
              return (
                <div
                  key={event.id}
                  className="bg-[#fdf8f3] border border-[#e8d9cc] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#fdf8f3] rounded-xl px-3 py-2 text-center shadow-sm">
                      <p className="font-playfair font-bold text-xl text-[#8d5930] leading-none">{day}</p>
                      <p className="text-xs text-[#5e3921] font-lato uppercase tracking-wide">{month}</p>
                    </div>
                    <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full font-lato ${
                      event.category === 'Anime' ? 'bg-rose-100 text-rose-700' :
                      event.category === 'Gaming' ? 'bg-amber-100 text-amber-700' :
                      event.category === 'Music' ? 'bg-violet-100 text-violet-700' :
                      event.category === 'Books' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {event.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-playfair font-semibold text-[#3c2a15] text-base mb-1 leading-snug">{event.title}</h3>
                    <p className="text-xs text-[#7a5838] flex items-center gap-1.5 mb-3 font-lato">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.time}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#8d5930] font-lato">
                        {event.price === 'Free' ? 'Free Entry' : `₹${event.price}`}
                      </span>
                      <span className="text-xs text-[#7a5838] font-lato">{event.seatsLeft} seats left</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ──────────────────────────────────────────── */}
      <section className="py-20 bg-[#3c2a15] text-[#fdf8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-[#c8a87a] uppercase font-lato mb-3 block">Find Your People</span>
            <h2 className="font-playfair text-4xl font-bold text-[#fdf8f3] mb-4">The Arambh Community</h2>
            <p className="text-[#c8a87a] max-w-2xl mx-auto font-lato leading-relaxed">
              From bookworms to gamers, musicians to anime fans — Arambh is home to passionate communities. Join a group, make friends, and find your corner.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {communityGroups.map((group) => (
              <div
                key={group.id}
                className="bg-[#4a341b] rounded-2xl p-5 border border-[#5e3921] hover:border-[#8d5930] transition-colors group"
              >
                <div className="text-3xl mb-3">{group.emoji}</div>
                <h3 className="font-playfair font-semibold text-[#fdf8f3] text-base mb-1">{group.name}</h3>
                <p className="text-xs text-[#c8a87a] mb-3 font-lato leading-relaxed line-clamp-2">{group.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#8d5930] font-lato flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {group.members} members
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/community"
              className="inline-flex items-center gap-2 bg-[#8d5930] hover:bg-[#c8802e] text-[#fdf8f3] px-7 py-3.5 rounded-full font-medium transition-colors font-lato"
            >
              Explore Community
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f9edd9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#8d5930] uppercase font-lato mb-3 block">What Customers Say</span>
              <h2 className="font-playfair text-4xl font-bold text-[#3c2a15]">Real Stories,<br />Real Love</h2>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-4xl font-playfair font-bold text-[#8d5930]">4.8</p>
                <StarRating rating={4.8} size="md" />
                <p className="text-xs text-[#7a5838] font-lato mt-1">Based on 340+ reviews</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#fdf8f3] rounded-2xl p-6 border border-[#e8d9cc] hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="text-4xl text-[#e8d9cc] font-serif leading-none mb-3 select-none">"</div>
                <p className="text-sm text-[#5e3921] leading-relaxed font-lato line-clamp-3 flex-1">{review.comment}</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#f0e6d3]">
                  <div className="w-9 h-9 bg-[#8d5930] rounded-full flex items-center justify-center text-[#fdf8f3] font-semibold text-xs flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#3c2a15] text-sm truncate">{review.name}</p>
                    <StarRating rating={review.rating} />
                  </div>
                  {review.verified && (
                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-lato flex-shrink-0">✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 border border-[#c8a87a] text-[#8d5930] hover:bg-[#8d5930] hover:text-[#fdf8f3] hover:border-[#8d5930] px-7 py-3 rounded-full font-medium transition-all font-lato"
            >
              Read All Reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA / VISIT ────────────────────────────────────────── */}
      <section className="py-20 bg-[#fdf8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#8d5930] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-14">
                <span className="text-xs font-semibold tracking-widest text-[#d99b52] uppercase font-lato mb-4 block">Come Visit Us</span>
                <h2 className="font-playfair text-4xl font-bold text-[#fdf8f3] mb-5 leading-snug">
                  Your next favourite<br />café moment awaits.
                </h2>
                <p className="text-[#d4b89a] mb-8 font-lato leading-relaxed">
                  Reserve your spot, bring your friends, or walk in alone — we always have a table, a warm brew, and a good conversation waiting.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-2 bg-[#fdf8f3] text-[#8d5930] hover:bg-[#f9edd9] px-6 py-3 rounded-full font-medium transition-colors font-lato"
                  >
                    Book a Table
                  </Link>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-[#d4b89a] text-[#fdf8f3] hover:bg-[#fdf8f3]/10 px-6 py-3 rounded-full font-medium transition-colors font-lato"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img
                  src="https://images.pexels.com/photos/15362788/pexels-photo-15362788.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Arambh Café interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#8d5930]/40 to-transparent lg:from-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION MAP ───────────────────────────────────────── */}
      <section className="py-12 bg-[#f9edd9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-3xl font-bold text-[#3c2a15] mb-2">Find Arambh Café</h2>
            <p className="text-[#7a5838] font-lato text-sm">12, Koregaon Park Annexe, Near Pune Railway Station, Pune 411001</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#e8d9cc] shadow-sm">
            <iframe
              title="Arambh Café Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2657836247546!2d73.8737!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0!2sPune!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
