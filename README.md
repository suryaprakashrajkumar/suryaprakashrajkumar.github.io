# Academic Portfolio Website

A minimal academic homepage for Suryaprakash Rajkumar, PhD Researcher at Concordia University.

The site is maintained on `main` and served through GitHub Pages at https://suryaprakashrajkumar.github.io/.

## Local preview

Run `python3 -m http.server 8000` from this directory, then open http://localhost:8000.

The page uses plain HTML and CSS, system fonts, and native expandable research figures. No build step or JavaScript is required. Publications, manuscripts, and posters share one list with small type labels, ordered newest first with undated manuscripts at the top; existing citation details and research links are retained.

The CV PDF is not present in this repository. The contact section offers an email request until a PDF is available.

## Search visibility

The homepage includes a canonical URL, search description, ProfilePage/Person JSON-LD structured data, and Open Graph/Twitter sharing metadata. `robots.txt` allows crawling and points to `sitemap.xml`. These files use `https://suryaprakashrajkumar.github.io/`; update all absolute URLs if you move to a custom domain.

After publishing:

1. Add the site as a URL-prefix property in [Google Search Console](https://search.google.com/search-console/). Use the exact verification file or HTML meta tag Google supplies; no verification token is included in this repository.
2. Submit `https://suryaprakashrajkumar.github.io/sitemap.xml` under Sitemaps, then inspect the homepage URL and request indexing.
3. Check the deployed page with [Rich Results Test](https://search.google.com/test/rich-results) and [PageSpeed Insights](https://pagespeed.web.dev/). Structured data does not guarantee enhanced search results.
4. Track impressions, clicks, and queries in Search Console. Keep the bio, paper dates, submission statuses, and external profile links current.

Keep the meta description, social descriptions, and structured data aligned with visible content when updating the page. The current technical SEO setup is locally checked; live indexing, rankings, and Core Web Vitals need verification after deployment. The portrait is approximately 1.2 MB, so compressing it is a potential performance improvement.

The stylesheet URL includes a content version (`styles.css?v=...`) to avoid reusing cached CSS after a redesign. Update this value when changing `styles.css`; use the first 12 characters of its SHA-256 hash.
