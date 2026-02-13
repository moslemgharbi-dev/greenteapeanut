import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PublicReview {
  id: string;
  product_handle: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Review extends PublicReview {
  user_id: string;
}

export function useReviews(productHandle: string) {
  const queryClient = useQueryClient();
  const queryKey = ['reviews', productHandle];

  // Fetch public reviews (no user_id exposed)
  const { data: reviews = [], isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews_public' as any)
        .select('*')
        .eq('product_handle', productHandle)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as unknown as PublicReview[];
    },
  });

  // Fetch current user's own review (auth-gated, from base table)
  const { data: userReview = null } = useQuery({
    queryKey: ['my-review', productHandle],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_handle', productHandle)
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) throw error;
      return data as Review | null;
    },
  });

  const upsertReview = useMutation({
    mutationFn: async ({ userId, rating, comment }: { userId: string; rating: number; comment?: string }) => {
      const { error } = await supabase
        .from('reviews')
        .upsert(
          { user_id: userId, product_handle: productHandle, rating, comment: comment || null },
          { onConflict: 'user_id,product_handle' }
        );
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ['my-review', productHandle] });
    },
  });

  const deleteReview = useMutation({
    mutationFn: async (reviewId: string) => {
      const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ['my-review', productHandle] });
    },
  });

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
  }));

  return { reviews, isLoading, upsertReview, deleteReview, averageRating, ratingDistribution, userReview };
}
