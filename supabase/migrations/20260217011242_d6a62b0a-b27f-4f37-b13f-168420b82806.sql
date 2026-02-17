
CREATE POLICY "Block anonymous access to profiles"
ON public.profiles FOR SELECT
TO anon
USING (false);

CREATE POLICY "Block anonymous access to favorites"
ON public.favorites FOR SELECT
TO anon
USING (false);
