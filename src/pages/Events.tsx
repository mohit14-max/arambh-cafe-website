import { useState } from 'react';
import { Calendar, Clock, Users, Tag } from 'lucide-react';
import { cafeEvents, type CafeEvent } from '../data/mockData';

type EventCategory = 'All' | 'Gaming' | 'Anime' | 'Music' | 'Social' | 'Books';

const categoryColors: Record<string, string> = {
  Anime: 'bg-rose-100 text-rose-700 border-rose-200',
  Gaming: 'bg-amber-100 text-amber-700 border-amber-200',
  Music: 'bg-violet-100 text-violet-700 border-violet-200',
  Books: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Social: 'bg-blue-100 text-blue-700 border-blue-200',
};

const categoryEmojis: Record<string, string> = {
  Anime: '🌸',
  Gaming: '🎮',
  Music: '🎵',
  Books: '📚',
  Social: '🤝',
};

function EventCard({ event }: { event: CafeEvent }) {
  const [registered, setRegistered] = useState(false);
  const dateObj = new Date(event.date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-IN', { month: 'long' });
  const year = dateObj.getFullYear();
  const seatsPercent = Math.round(((event.seats - event.seatsLeft) / event.seats) * 100);

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-[#e8d9cc] hover:shadow-lg transition-shadow group">
      <div className="relative h-52 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/95 rounded-xl px-3 py-2 text-center shadow-sm">
          <p className="font-playfair font-bold text-xl text-[#8d5930] leading-none">{day}</p>
          <p className="text-xs text-[#5e3921] font-lato uppercase tracking-wide">{dateObj.toLocaleString('en-IN', { month: 'short' })}</p>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border font-lato ${categoryColors[event.category]}`}>
            {categoryEmojis[event.category]} {event.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h2 className="font-playfair font-semibold text-[#3c2a15] text-lg mb-2 leading-snug">{event.title}</h2>
        <p className="text-sm text-[#7a5838] font-lato leading-relaxed mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-[#5e3921] font-lato">
            <Calendar className="w-3.5 h-3.5 text-[#8d5930]" />
            {day} {month} {year}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#5e3921] font-lato">
            <Clock className="w-3.5 h-3.5 text-[#8d5930]" />
            {event.time}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#5e3921] font-lato">
            <Users className="w-3.5 h-3.5 text-[#8d5930]" />
            {event.seatsLeft} of {event.seats} seats remaining
          </div>
          <div className="flex items-center gap-2 text-xs text-[#5e3921] font-lato">
            <Tag className="w-3.5 h-3.5 text-[#8d5930]" />
            Hosted by <span className="font-medium">{event.host}</span>
          </div>
        </div>

        {/* Seat Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-[#7a5838] font-lato mb-1">
            <span>{event.seats - event.seatsLeft} registered</span>
            <span>{seatsPercent}% full</span>
          </div>
          <div className="h-1.5 bg-[#f0e6d3] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${seatsPercent > 80 ? 'bg-red-400' : seatsPercent > 60 ? 'bg-amber-400' : 'bg-emerald-500'}`}
              style={{ width: `${seatsPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#8d5930] font-playfair">
            {event.price === 'Free' ? 'Free Entry' : `₹${event.price}`}
          </span>
          <button
            onClick={() => setRegistered(!registered)}
            disabled={event.seatsLeft === 0}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all font-lato ${
              event.seatsLeft === 0
                ? 'bg-[#f0e6d3] text-[#c8a87a] cursor-not-allowed'
                : registered
                ? 'bg-emerald-600 text-white'
                : 'bg-[#8d5930] hover:bg-[#744728] text-[#fdf8f3]'
            }`}
          >
            {event.seatsLeft === 0 ? 'Full' : registered ? '✓ Registered' : 'Register'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Events() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>('All');
  const categories: EventCategory[] = ['All', 'Gaming', 'Anime', 'Music', 'Social', 'Books'];

  const filtered = cafeEvents.filter(
    (e) => activeCategory === 'All' || e.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-[#fdf8f3]">
      {/* Header */}
      <section className="bg-[#3c2a15] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold tracking-widest text-[#c8a87a] uppercase font-lato mb-3 block">What's On</span>
          <h1 className="font-playfair text-5xl font-bold text-[#fdf8f3] mb-3">Events at Arambh</h1>
          <p className="text-[#c8a87a] font-lato max-w-xl">
            From anime nights to live music, gaming tournaments to book clubs — there's always something happening here.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
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
              {cat !== 'All' && categoryEmojis[cat]}
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        <p className="text-sm text-[#7a5838] mb-6 font-lato">
          <span className="font-semibold text-[#3c2a15]">{filtered.length}</span> upcoming event{filtered.length !== 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🎭</p>
            <p className="font-playfair text-xl text-[#3c2a15] mb-2">No events in this category right now</p>
            <p className="text-[#7a5838] font-lato text-sm">Check back soon or explore other categories</p>
          </div>
        )}
      </section>

      {/* Host Event CTA */}
      <section className="bg-[#f9edd9] py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold text-[#3c2a15] mb-4">Want to host an event at Arambh?</h2>
          <p className="text-[#5e3921] font-lato mb-8 leading-relaxed">
            We welcome community-led events — workshops, screenings, jam sessions, and more. Reach out and let's make it happen together.
          </p>
          <a
            href="mailto:events@arambhcafe.in"
            className="inline-flex items-center gap-2 bg-[#8d5930] hover:bg-[#744728] text-[#fdf8f3] px-7 py-3.5 rounded-full font-medium transition-colors font-lato"
          >
            Propose an Event
          </a>
        </div>
      </section>
    </main>
  );
}
