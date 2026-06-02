import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fdf8f3] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-[#f9edd9] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#e8d9cc]">
          <Coffee className="w-10 h-10 text-[#8d5930]" />
        </div>
        <h1 className="font-playfair text-6xl font-bold text-[#8d5930] mb-2">404</h1>
        <h2 className="font-playfair text-2xl font-semibold text-[#3c2a15] mb-4">Page Not Found</h2>
        <p className="text-[#5e3921] font-lato mb-8 leading-relaxed">
          Looks like this page wandered off for a coffee break. Let's get you back to familiar territory.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#8d5930] hover:bg-[#744728] text-[#fdf8f3] px-7 py-3.5 rounded-full font-medium transition-colors font-lato"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
