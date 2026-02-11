import { Star } from 'lucide-react';

const ratingRows = [5, 4, 3, 2, 1];

function StarRating({ count, filled }: { count: number; filled: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < filled ? 'fill-foreground text-foreground' : 'fill-none text-foreground/30'}`}
        />
      ))}
    </div>
  );
}

export function CustomerReviews() {
  return (
    <section className="border-t border-border pt-10 mt-10">
      <h2 className="font-serif text-xl sm:text-2xl font-medium mb-8">Avis Clients</h2>

      {/* Average rating */}
      <div className="flex flex-col items-center gap-1 mb-8">
        <StarRating count={5} filled={0} />
        <p className="text-sm text-muted-foreground">0 avis</p>
      </div>

      {/* Rating breakdown bars */}
      <div className="space-y-2 mb-6 max-w-2xl mx-auto">
        {ratingRows.map((stars) => (
          <div key={stars} className="flex items-center gap-3">
            <StarRating count={5} filled={stars} />
            <div className="flex-1 h-3 bg-muted rounded-sm overflow-hidden">
              <div className="h-full bg-muted-foreground/20 rounded-sm" style={{ width: '0%' }} />
            </div>
            <span className="text-sm text-muted-foreground w-6 text-right">0</span>
          </div>
        ))}
      </div>

    </section>
  );
}
