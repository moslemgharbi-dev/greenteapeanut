import { useState } from 'react';
import { Star } from 'lucide-react';

interface InteractiveStarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}

export function InteractiveStarRating({ value, onChange, disabled }: InteractiveStarRatingProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hovered || value);
        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            className="p-0.5 transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(star)}
            aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
          >
            <Star
              className={`h-6 w-6 transition-colors ${filled ? 'fill-foreground text-foreground' : 'fill-none text-foreground/30'}`}
            />
          </button>
        );
      })}
    </div>
  );
}
