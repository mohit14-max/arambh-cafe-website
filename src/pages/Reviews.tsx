import { useState } from 'react';
import { ThumbsUp, Star } from 'lucide-react';
import { reviews, type Review } from '../data/mockData';
import StarRating from '../components/StarRating';

type ReviewCategory = 'All' | 'Food' | 'Atmosphere' | 'Service' | 'Overall';

const categoryColors: Record<string, string> = {
  Food: 'bg-amber-50 text-amber-700 border-amber-200',
  Atmosphere: 'bg-blue-50 text-blue-700 border-blue-200',
  Service: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Overall: 'bg-rose-50 text-rose-700 border-rose-200',
};

const ratingBreakdown = [
  { stars: 5, count: 210, total: 340 },
  { stars: 4, count: 89, total: 340 },
  { stars: 3, count: 28, total: 340 },
  { stars: 2, count: 8, total: 340 },
  { stars: 1, count: 5, total: 340 },
];

function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [marked, setMarked] = useState(false);

  return (
    <article className="bg-white rounded-2xl p-6 border border-[#e8d9cc] hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#8d5930] rounded-full flex items-center justify-center text-[#fdf8f3] font-semibold text-sm flex-shrink-0">
            {review.avatar}
          </div>
          <div>
            <p className="font-medium text-[#3c2a15] font-lato">{review.name}</p>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <StarRating rating={review.rating} />
              <span className={`text-xs px-2 py-0.5 rounded-full border font-lato ${categoryColors[review.category]}`}>
                {review.category}
              </span>
            </div>
          </div>
        </div>
        {review.verified && (
          <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200 font-lato flex-shrink-0">
            ✓ Verified Visit
          </span>
        )}
      </div>

      <p className="text-sm text-[#5e3921] leading-relaxed font-lato mb-4">{review.comment}</p>

      <div className="flex items-center justify-between pt-4 border-t border-[#f0e6d3]">
        <span className="text-xs text-[#c8a87a] font-lato">
          {new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <button
          onClick={() => { if (!marked) { setHelpful(helpful + 1); setMarked(true); } }}
          className={`flex items-center gap-1.5 text-xs font-lato transition-colors px-3 py-1.5 rounded-full border ${
            marked ? 'bg-[#f9edd9] text-[#8d5930] border-[#c8a87a]' : 'text-[#7a5838] border-[#e8d9cc] hover:border-[#c8a87a] hover:text-[#8d5930]'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          Helpful ({helpful})
        </button>
      </div>
    </article>
  );
}

export default function Reviews() {
  const [activeCategory, setActiveCategory] = useState<ReviewCategory>('All');
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const categories: ReviewCategory[] = ['All', 'Overall', 'Food', 'Atmosphere', 'Service'];
  const filtered = reviews.filter((r) => activeCategory === 'All' || r.category === activeCategory);

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <main className="min-h-screen bg-[#fdf8f3]">
      {/* Header */}
      <section className="bg-[#3c2a15] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold tracking-widest text-[#c8a87a] uppercase font-lato mb-3 block">What Customers Say</span>
          <h1 className="font-playfair text-5xl font-bold text-[#fdf8f3] mb-3">Customer Reviews</h1>
          <p className="text-[#c8a87a] font-lato max-w-xl">Real stories from real customers. Unfiltered and honest.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Rating Overview */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8d9cc] mb-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center text-center py-4">
            <p className="font-playfair text-7xl font-bold text-[#8d5930]">{avgRating}</p>
            <StarRating rating={parseFloat(avgRating)} size="lg" />
            <p className="text-sm text-[#7a5838] font-lato mt-2">Based on {reviews.length * 56} reviews</p>
          </div>
          <div className="space-y-2.5 py-2">
            {ratingBreakdown.map((rb) => (
              <div key={rb.stars} className="flex items-center gap-3">
                <span className="text-xs text-[#5e3921] w-3 font-lato font-medium">{rb.stars}</span>
                <Star className="w-3.5 h-3.5 fill-[#c8802e] text-[#c8802e]" />
                <div className="flex-1 h-2 bg-[#f0e6d3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#c8802e] rounded-full"
                    style={{ width: `${(rb.count / rb.total) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-[#7a5838] w-8 font-lato">{rb.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter & Write Review */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors font-lato ${
                  activeCategory === cat
                    ? 'bg-[#8d5930] text-[#fdf8f3]'
                    : 'bg-white border border-[#e8d9cc] text-[#5e3921] hover:border-[#8d5930]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-[#8d5930] hover:bg-[#744728] text-[#fdf8f3] rounded-full text-sm font-medium transition-colors font-lato flex-shrink-0"
          >
            Write a Review
          </button>
        </div>

        {/* Write Review Form */}
        {showForm && !submitted && (
          <div className="bg-white rounded-2xl p-6 border border-[#e8d9cc] mb-6">
            <h3 className="font-playfair text-xl font-semibold text-[#3c2a15] mb-5">Share Your Experience</h3>
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input type="text" required placeholder="Your name" className="px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm text-[#3c2a15] placeholder-[#c8a87a] focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3]" />
                <select className="px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm text-[#3c2a15] focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3] cursor-pointer">
                  <option>Overall Experience</option>
                  <option>Food & Drinks</option>
                  <option>Atmosphere</option>
                  <option>Service</option>
                </select>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-[#3c2a15] mb-2 font-lato">Your Rating</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(s)}
                      className="text-2xl transition-transform hover:scale-110"
                    >
                      <Star className={`w-7 h-7 transition-colors ${(hoverRating || rating) >= s ? 'fill-[#c8802e] text-[#c8802e]' : 'fill-[#e8d9cc] text-[#e8d9cc]'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                required
                rows={4}
                placeholder="Tell us about your experience at Arambh Café..."
                className="w-full px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm text-[#3c2a15] placeholder-[#c8a87a] focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3] resize-none mb-4"
              />

              <button type="submit" className="px-6 py-3 bg-[#8d5930] hover:bg-[#744728] text-[#fdf8f3] rounded-full text-sm font-medium transition-colors font-lato">
                Submit Review
              </button>
            </form>
          </div>
        )}

        {submitted && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6 text-center">
            <p className="text-emerald-700 font-lato font-medium">🎉 Thank you for your review! It'll appear after moderation.</p>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-3xl mb-3">💭</p>
            <p className="font-playfair text-xl text-[#3c2a15]">No reviews in this category yet</p>
          </div>
        )}
      </section>
    </main>
  );
}
