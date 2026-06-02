import { useState } from 'react';
import { Calendar, Clock, Users, MessageSquare, CheckCircle, Coffee, Gamepad, Layers } from 'lucide-react';

type BookingType = 'Table' | 'Group' | 'Gaming';

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
];

export default function Booking() {
  const [bookingType, setBookingType] = useState<BookingType>('Table');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    people: '2',
    occasion: '',
    request: '',
    gamePreference: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const bookingTypes = [
    {
      type: 'Table' as BookingType,
      icon: <Coffee className="w-5 h-5" />,
      label: 'Reserve a Table',
      desc: 'Perfect for 2–5 people. Great coffee and cozy conversations.',
    },
    {
      type: 'Group' as BookingType,
      icon: <Layers className="w-5 h-5" />,
      label: 'Group Booking',
      desc: 'Ideal for 6+ people. Reunions, celebrations, or team meets.',
    },
    {
      type: 'Gaming' as BookingType,
      icon: <Gamepad className="w-5 h-5" />,
      label: 'Gaming Session',
      desc: 'Book the games zone for board games or retro gaming sessions.',
    },
  ];

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#fdf8f3] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-emerald-200">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="font-playfair text-3xl font-bold text-[#3c2a15] mb-3">Booking Received!</h2>
          <p className="text-[#5e3921] font-lato leading-relaxed mb-2">
            Thank you, <strong>{formData.name}</strong>! Your {bookingType.toLowerCase()} booking for{' '}
            <strong>{formData.date}</strong> at <strong>{formData.time}</strong> has been received.
          </p>
          <p className="text-sm text-[#7a5838] font-lato mb-8">
            We'll send a confirmation to <strong>{formData.email}</strong> within 15 minutes. See you soon at Arambh!
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', date: '', time: '', people: '2', occasion: '', request: '', gamePreference: '' }); }}
              className="px-6 py-3 bg-[#8d5930] text-[#fdf8f3] rounded-full text-sm font-medium font-lato hover:bg-[#744728] transition-colors"
            >
              Make Another Booking
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdf8f3]">
      {/* Header */}
      <section className="bg-[#3c2a15] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold tracking-widest text-[#c8a87a] uppercase font-lato mb-3 block">Reserve Your Spot</span>
          <h1 className="font-playfair text-5xl font-bold text-[#fdf8f3] mb-3">Book a Table</h1>
          <p className="text-[#c8a87a] font-lato max-w-xl">
            Plan your visit in advance. We'll have your favourite spot ready and waiting.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Booking Type Selection */}
        <div className="mb-8">
          <h2 className="font-playfair text-xl font-semibold text-[#3c2a15] mb-4">What are you booking?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {bookingTypes.map((bt) => (
              <button
                key={bt.type}
                onClick={() => setBookingType(bt.type)}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  bookingType === bt.type
                    ? 'border-[#8d5930] bg-[#f9edd9]'
                    : 'border-[#e8d9cc] bg-white hover:border-[#c8a87a]'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${bookingType === bt.type ? 'bg-[#8d5930] text-[#fdf8f3]' : 'bg-[#f0e6d3] text-[#8d5930]'}`}>
                  {bt.icon}
                </div>
                <p className="font-semibold text-[#3c2a15] text-sm mb-1 font-lato">{bt.label}</p>
                <p className="text-xs text-[#7a5838] font-lato leading-relaxed">{bt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e8d9cc] p-6 sm:p-8 shadow-sm">
          <h2 className="font-playfair text-xl font-semibold text-[#3c2a15] mb-6">Your Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-[#3c2a15] mb-2 font-lato">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm text-[#3c2a15] placeholder-[#c8a87a] focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3c2a15] mb-2 font-lato">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 00000 00000"
                className="w-full px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm text-[#3c2a15] placeholder-[#c8a87a] focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3]"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-[#3c2a15] mb-2 font-lato">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm text-[#3c2a15] placeholder-[#c8a87a] focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-[#3c2a15] mb-2 font-lato flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#8d5930]" /> Date *
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm text-[#3c2a15] focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3]"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-[#3c2a15] mb-2 font-lato flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#8d5930]" /> Time *
              </label>
              <select
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm text-[#3c2a15] focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3] cursor-pointer"
              >
                <option value="">Select time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            {/* People */}
            <div>
              <label className="block text-sm font-medium text-[#3c2a15] mb-2 font-lato flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#8d5930]" /> Number of People *
              </label>
              <select
                name="people"
                required
                value={formData.people}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm text-[#3c2a15] focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3] cursor-pointer"
              >
                {bookingType === 'Group'
                  ? Array.from({ length: 15 }, (_, i) => i + 6).map((n) => (
                      <option key={n} value={n}>{n} people</option>
                    ))
                  : Array.from({ length: bookingType === 'Gaming' ? 6 : 5 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                    ))}
              </select>
            </div>
          </div>

          {/* Occasion (Group only) */}
          {bookingType === 'Group' && (
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#3c2a15] mb-2 font-lato">Occasion</label>
              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm text-[#3c2a15] focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3] cursor-pointer"
              >
                <option value="">Select occasion (optional)</option>
                <option value="Birthday">Birthday Celebration</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Reunion">Reunion</option>
                <option value="Team Outing">Team Outing</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          {/* Game Preference (Gaming only) */}
          {bookingType === 'Gaming' && (
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#3c2a15] mb-2 font-lato">Game Preference</label>
              <select
                name="gamePreference"
                value={formData.gamePreference}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm text-[#3c2a15] focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3] cursor-pointer"
              >
                <option value="">No preference</option>
                <option value="Board Games">Board Games (Catan, Codenames, etc.)</option>
                <option value="Card Games">Card Games (UNO, Rummy, etc.)</option>
                <option value="Retro Video Games">Retro Video Games</option>
                <option value="Mix">Mix of Everything</option>
              </select>
            </div>
          )}

          {/* Special Request */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#3c2a15] mb-2 font-lato flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-[#8d5930]" /> Special Requests
            </label>
            <textarea
              name="request"
              value={formData.request}
              onChange={handleChange}
              rows={3}
              placeholder="Any special setup, dietary needs, or requests for us..."
              className="w-full px-4 py-3 border border-[#e8d9cc] rounded-xl text-sm text-[#3c2a15] placeholder-[#c8a87a] focus:outline-none focus:border-[#8d5930] bg-[#fdf8f3] resize-none"
            />
          </div>

          {/* Info */}
          <div className="bg-[#f9edd9] rounded-xl p-4 mb-6 text-sm text-[#5e3921] font-lato leading-relaxed">
            <p className="font-semibold mb-1 text-[#3c2a15]">📋 Booking Notes</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-[#7a5838]">
              <li>Bookings are confirmed within 15 minutes via email/SMS.</li>
              <li>Tables are held for 15 minutes past your booking time.</li>
              <li>For groups of 10+, a partial advance may be required.</li>
              <li>Free cancellation up to 2 hours before the booking time.</li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full bg-[#8d5930] hover:bg-[#744728] text-[#fdf8f3] py-4 rounded-xl font-medium transition-colors font-lato text-sm"
          >
            Confirm Booking Request
          </button>
        </form>
      </section>
    </main>
  );
}
