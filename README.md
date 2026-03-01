# DekhoDeal

Static affiliate website for `dekhodeal.website`.

## Pages
- `index.html` - Home page (info-only, no products)
- `products.html` - Text-only deal feed with affiliate links
- `legal.html` - Affiliate disclosure, disclaimer, privacy short, terms notes
- `contact.html` - Contact and business query details

## Assets
- `logo.svg` - Header logo
- `favicon.svg` - Site favicon
- `styles.css` - Shared responsive styles
- `script.js` - Shared JS (current year in footer)
- `sitemap.xml` - SEO sitemap
- `robots.txt` - Crawling rules
- `CNAME` - Custom domain for GitHub Pages

## Deploy (GitHub Pages)
1. Push all files to `main` branch.
2. GitHub repo -> Settings -> Pages.
3. Source: `Deploy from a branch`, Branch: `main`, Folder: `/ (root)`.
4. Verify custom domain: `dekhodeal.website`.
5. Enable HTTPS after certificate is issued.

## DNS for Root Domain
Add these `A` records for `@`:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Add `CNAME` for `www`:
- `Sarvesh772.github.io`

## Notes
- Keep products only on `products.html`.
- Use `rel="nofollow sponsored noopener"` for affiliate links.
- Update `sitemap.xml` `lastmod` when major content changes.
