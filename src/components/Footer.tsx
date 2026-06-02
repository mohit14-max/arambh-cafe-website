import { Link } from 'react-router-dom';
import { Coffee, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#3c2a15] text-[#e8d9cc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#8d5930] rounded-full flex items-center justify-center">
                <Coffee className="w-4 h-4 text-[#fdf8f3]" />
              </div>
              <span className="font-playfair text-xl font-semibold text-[#fdf8f3]">Arambh Café</span>
            </div>
            <p className="text-sm text-[#c8a87a] leading-relaxed mb-5 font-lato">
              Where every sip starts a new story. Your neighbourhood café for great coffee, warm conversations, and new beginnings.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-[#5e3921] hover:bg-[#8d5930] rounded-full flex items-center justify-center transition-colors" aria-label="Instagram">
                <span className="text-[#e8d9cc] text-xs font-bold">IG</span>
              </a>
              <a href="#" className="w-9 h-9 bg-[#5e3921] hover:bg-[#8d5930] rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
                <span className="text-[#e8d9cc] text-xs font-bold">FB</span>
              </a>
              <a href="#" className="w-9 h-9 bg-[#5e3921] hover:bg-[#8d5930] rounded-full flex items-center justify-center transition-colors" aria-label="Twitter">
                <span className="text-[#e8d9cc] text-xs font-bold">TW</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-[#fdf8f3] font-medium text-base mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Food Menu', path: '/menu' },
                { label: 'Book a Table', path: '/booking' },
                { label: 'Upcoming Events', path: '/events' },
                { label: 'Community', path: '/community' },
                { label: 'Customer Reviews', path: '/reviews' },
                { label: 'My Profile', path: '/profile' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#c8a87a] hover:text-[#fdf8f3] transition-colors font-lato"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-playfair text-[#fdf8f3] font-medium text-base mb-4">Opening Hours</h3>
            <ul className="space-y-2.5 text-sm font-lato">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#8d5930] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#fdf8f3] font-medium">Mon – Thu</p>
                  <p className="text-[#c8a87a]">8:00 AM – 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#8d5930] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#fdf8f3] font-medium">Fri – Sat</p>
                  <p className="text-[#c8a87a]">8:00 AM – 11:30 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#8d5930] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#fdf8f3] font-medium">Sunday</p>
                  <p className="text-[#c8a87a]">9:00 AM – 10:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact & Map */}
          <div>
            <h3 className="font-playfair text-[#fdf8f3] font-medium text-base mb-4">Find Us</h3>
            <ul className="space-y-3 text-sm font-lato">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8d5930] mt-0.5 flex-shrink-0" />
                <span className="text-[#c8a87a] leading-relaxed">
                  12, Koregaon Park Annexe,<br />Near Pune Railway Station,<br />Pune, Maharashtra 411001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8d5930] flex-shrink-0" />
                <a href="tel:+912012345678" className="text-[#c8a87a] hover:text-[#fdf8f3] transition-colors">
                  +91 20 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8d5930] flex-shrink-0" />
                <a href="mailto:hello@arambhcafe.in" className="text-[#c8a87a] hover:text-[#fdf8f3] transition-colors">
                  hello@arambhcafe.in
                </a>
              </li>
            </ul>

            {/* Map Embed Placeholder */}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 text-xs text-[#8d5930] hover:text-[#c8a87a] transition-colors underline underline-offset-2"
            >
              <MapPin className="w-3.5 h-3.5" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#5e3921]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#7a5838] font-lato">
            © 2025 Arambh Café. All rights reserved.
          </p>
          <p className="text-xs text-[#7a5838] font-lato">
            Made with ☕ in Pune, India
          </p>
        </div>
      </div>
    </footer>
  );
}
