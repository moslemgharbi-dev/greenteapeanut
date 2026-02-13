

## Privacy Fix: Hide user_id from Public Review Reads

### Problem
The `reviews` table has a public SELECT policy (`true`) that exposes `user_id` for every review. This lets anyone track individual users' shopping behavior across products.

### Solution
Create a database view that excludes `user_id` from public reads, while keeping the full data accessible to authenticated users for their own reviews.

### Steps

1. **Create a public-safe view** (`reviews_public`) that excludes `user_id`:
   - Columns exposed: `id`, `product_handle`, `rating`, `comment`, `created_at`
   - Uses `security_invoker = on`

2. **Update RLS on the base `reviews` table**:
   - Change the SELECT policy from `true` (anyone reads all) to: authenticated users can only SELECT their own rows (`auth.uid() = user_id`)
   - Keep INSERT/UPDATE/DELETE policies unchanged

3. **Update `useReviews.ts` hook**:
   - Use `reviews_public` view for fetching all reviews (no `user_id` needed for display)
   - Use `reviews` table directly only for the upsert/delete mutations (already auth-gated)
   - For the "does current user have a review" check, do a separate query on the `reviews` table filtered by `auth.uid()`

4. **Update `CustomerReviews.tsx`**:
   - Adapt the `userReview` detection to use a separate authenticated query instead of filtering `user_id` from the public list

5. **Update `Profile.tsx`**:
   - Already queries `reviews` with `.eq('user_id', user.id)` -- this continues to work since authenticated users can SELECT their own rows

6. **Update `Review` interface** in `useReviews.ts`:
   - Split into `PublicReview` (without `user_id`) for display and keep full `Review` type for mutations

### Technical Details

**Migration SQL:**
```sql
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
```

**Hook changes:**
- `useReviews` fetches from `reviews_public` for the review list
- Adds a separate query for current user's existing review (from `reviews` table, auth-gated)
- Mutations remain unchanged (write to `reviews` table)

### Result
- Public visitors see reviews (ratings + comments) but cannot identify who wrote them
- Authenticated users can still detect and edit their own reviews
- Profile page continues to show the user's own reviews
- No user tracking across products is possible for unauthenticated or other users

