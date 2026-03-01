# Content Update Guide

## Add New Deal (products page)
Open `products.html` and copy this block inside `.text-feed`:

```html
<hr class="post-sep" />
<article class="deal-post">
  <h2>Deal Title Here</h2>
  <p><strong>Deal Price:</strong> Rs 999</p>
  <p><strong>Buy Here:</strong> <a href="https://your-link" target="_blank" rel="nofollow sponsored noopener">https://your-link</a></p>
</article>
```

## Multi-Link Deal Format

```html
<hr class="post-sep" />
<article class="deal-post">
  <h2>Brand Collection Offer</h2>
  <ul class="text-links">
    <li><strong>Variant 1:</strong> <a href="https://link1" target="_blank" rel="nofollow sponsored noopener">https://link1</a></li>
    <li><strong>Variant 2:</strong> <a href="https://link2" target="_blank" rel="nofollow sponsored noopener">https://link2</a></li>
  </ul>
</article>
```

## Update Legal/Contact
- Edit `legal.html` for policy text changes.
- Edit `contact.html` for email/business updates.

## After Any Major Update
1. Update `sitemap.xml` `lastmod` date.
2. Push changes to GitHub.
3. Hard refresh browser (`Ctrl+F5`) to clear cache.
