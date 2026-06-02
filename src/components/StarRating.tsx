import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export default function StarRating({ rating, maxStars = 5, size = 'sm', showValue = false }: StarRatingProps) {
  const sizeMap = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
  const starSize = sizeMap[size];

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          return (
            <Star
              key={i}
              className={`${starSize} ${filled ? 'fill-[#c8802e] text-[#c8802e]' : partial ? 'fill-[#e8be83] text-[#e8be83]' : 'fill-[#e8d9cc] text-[#e8d9cc]'}`}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-[#5e3921] ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
