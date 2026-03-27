

## Fix Favicon — Remove Old Default Icon

**Problem**: Google is showing the old Lovable favicon because `public/favicon.ico` still exists. Browsers (and crawlers like Google) automatically request `/favicon.ico` by default, which overrides the `favicon.png` referenced in the HTML.

**Fix**:
1. **Delete** `public/favicon.ico` — this removes the default Lovable icon that Google is picking up.
2. The existing `index.html` already references `/favicon.png` correctly, so no HTML changes needed.

After publishing, Google will eventually re-crawl and pick up the correct custom favicon (this can take days/weeks).

