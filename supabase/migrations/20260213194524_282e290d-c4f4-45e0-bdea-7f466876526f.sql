
-- Create public view without user_id
CREATE VIEW public.reviews_public
WITH (security_invoker = on) AS
  SELECT id, product_handle, rating, comment, created_at
  FROM public.reviews;

-- Replace the open SELECT policy with user-scoped one
DROP POLICY "Anyone can read reviews" ON public.reviews;
CREATE POLICY "Users read own reviews"
  ON public.reviews FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow anon to read the view (grant on view)
GRANT SELECT ON public.reviews_public TO anon, authenticated;
