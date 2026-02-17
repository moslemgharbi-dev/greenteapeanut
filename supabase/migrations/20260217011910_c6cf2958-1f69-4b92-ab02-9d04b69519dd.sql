
-- Profiles: allow insert only for own profile (trigger-based, but defense-in-depth)
CREATE POLICY "Users insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Profiles: allow delete own profile (GDPR)
CREATE POLICY "Users delete own profile"
ON public.profiles FOR DELETE
TO authenticated
USING (auth.uid() = id);

-- reviews_public is a VIEW, not a table — RLS doesn't apply to views.
-- It already excludes user_id. Mark it as security_invoker for safety.
ALTER VIEW public.reviews_public SET (security_invoker = on);
