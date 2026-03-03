import { useState } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { InteractiveStarRating } from './InteractiveStarRating';
import { useReviews } from '@/hooks/useReviews';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

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

export function CustomerReviews({ productHandle }: { productHandle: string }) {
  const { user } = useAuth();
  const { reviews, averageRating, ratingDistribution, upsertReview, userReview } = useReviews(productHandle);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill if user has existing review
  const effectiveRating = selectedRating || (userReview?.rating ?? 0);

  const handleSubmit = async () => {
    if (!user || effectiveRating === 0) return;
    setSubmitting(true);
    try {
      await upsertReview.mutateAsync({ userId: user.id, rating: effectiveRating, comment: comment.trim() || undefined });
      toast({ title: userReview ? 'Avis mis à jour' : 'Avis publié' });
      setSelectedRating(0);
      setComment('');
    } catch {
      toast({ title: 'Erreur', description: "Impossible de publier l'avis.", variant: 'destructive' });
    }
    setSubmitting(false);
  };

  return (
    <section className="border-t border-border pt-10 mt-10">
      <h2 className="font-serif text-xl sm:text-2xl font-medium mb-8">Avis Clients</h2>

      {/* Average rating */}
      <div className="flex flex-col items-center gap-1 mb-8">
        <StarRating count={5} filled={Math.round(averageRating)} />
        <p className="text-sm text-muted-foreground">
          {reviews.length === 0 ? '0 avis' : `${averageRating.toFixed(1)} / 5 — ${reviews.length} avis`}
        </p>
      </div>

      {/* Rating breakdown bars */}
      <div className="space-y-2 mb-8 max-w-2xl mx-auto">
        {ratingDistribution.map(({ stars, count }) => {
          const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
          return (
            <div key={stars} className="flex items-center gap-3">
              <StarRating count={5} filled={stars} />
              <div className="flex-1 h-3 bg-muted rounded-sm overflow-hidden">
                <div className="h-full bg-foreground/40 rounded-sm transition-all" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-sm text-muted-foreground w-6 text-right">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Review form */}
      <div className="max-w-2xl mx-auto mb-10">
        {!user ? (
          <div className="text-center border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-3">Connectez-vous pour laisser un avis</p>
            <Button asChild variant="outline" size="sm">
              <Link to="/auth">Se connecter</Link>
            </Button>
          </div>
        ) : (
          <div className="border border-border rounded-lg p-6 space-y-4">
            <p className="text-sm font-medium">{userReview ? 'Modifier votre avis' : 'Laisser un avis'}</p>
            <InteractiveStarRating value={effectiveRating} onChange={setSelectedRating} disabled={submitting} />
            <Textarea
              placeholder="Commentaire (optionnel)"
              value={comment || (userReview?.comment ?? '')}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
              disabled={submitting}
            />
            <Button onClick={handleSubmit} disabled={submitting || effectiveRating === 0} size="sm">
              {submitting ? 'Envoi...' : userReview ? 'Mettre à jour' : 'Publier'}
            </Button>
          </div>
        )}
      </div>

      {/* Reviews list */}
      {reviews.length > 0 && (
        <div className="max-w-2xl mx-auto space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-border pb-4">
              <div className="flex items-center gap-2 mb-1">
                <StarRating count={5} filled={review.rating} />
                <span className="text-xs text-muted-foreground">{new Date(review.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
              {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
