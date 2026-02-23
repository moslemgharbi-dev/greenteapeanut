

## Typography A/B Testing for "WAEL BEN YAGHLANE"

We'll swap the brand font one at a time so you can see each option live and pick your favorite.

### Round 1: Cinzel

**What changes:**
1. **index.html** - Replace the Google Fonts link: swap `Cormorant+Garamond` for `Cinzel` (weights 400, 500, 600, 700)
2. **tailwind.config.ts** - Update `fontFamily.brand` from `["Cormorant Garamond", ...]` to `["Cinzel", "Georgia", "serif"]`

No other files change -- the Header and all components already use `font-brand`, so the new font propagates automatically.

After you see it live, tell me:
- **"Next"** to move to Bodoni Moda
- **"Keep this"** to stop here
- **"Next"** again after Bodoni Moda to try Tenor Sans

### Round 2: Bodoni Moda
Same two files, swapping to `Bodoni+Moda` from Google Fonts.

### Round 3: Tenor Sans
Same two files, swapping to `Tenor+Sans` from Google Fonts.

### Round 4 (if none fit): Revert to Cormorant Garamond
Restore the original configuration.

### Technical details
- Only 2 files are modified each round: `index.html` (font import) and `tailwind.config.ts` (font-brand definition)
- All components using `font-brand` class will automatically reflect the change
- Letter-spacing (`tracking-[0.15em]`) stays the same unless you want adjustments per font

