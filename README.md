# Hilore India — Website

Marketing site for **Hilore India**, a garment export house (est. 2007, Ghaziabad).
Plain static HTML/CSS/JS — no build step, no framework, no backend.

## Structure

```
index.html            Homepage (hero, categories, craft, capabilities, founder, contact)
pages/                Category galleries: mens-wear, womens-wear, kids-wear, accessories
css/style.css         All styles (tech-pack visual language)
js/main.js            Ruler render, mobile nav, mailto contact form
images/               Self-hosted photos + hero video (all assets local, no external CDN)
vercel.json           Static hosting + cache headers
```

The contact form has **no backend** — it opens the visitor's email client via `mailto:`
to `info@hiloreindia.com`. Nothing to configure or maintain.

## Local preview

Any static server works, e.g.:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to Vercel (free)

This repo is the site root, so Vercel needs **zero build configuration**.

1. Push this repo to GitHub (already at `github.com/yashsharmahere/hiloreindia`).
2. In Vercel: **Add New → Project → Import** this repo.
3. Framework preset: **Other**. Build command: *(none)*. Output directory: *(leave default / root)*.
4. Click **Deploy**. You get a `*.vercel.app` URL immediately.

### Custom domain (hiloreindia.com)

1. Vercel → Project → **Settings → Domains → Add** `hiloreindia.com` (and `www.hiloreindia.com`).
2. Vercel shows the DNS records to set. At your domain registrar (where the domain is
   registered — **not** Framer anymore), point:
   - `hiloreindia.com` (apex) → Vercel's **A record** `76.76.21.21`, or an ALIAS/ANAME to `cname.vercel-dns.com`.
   - `www` → **CNAME** `cname.vercel-dns.com`.
3. Remove any old Framer DNS records (A/CNAME/nameserver delegation) so they don't conflict.
4. Wait for DNS to propagate (minutes to a few hours). Vercel issues HTTPS automatically.

> Migration note: once DNS points to Vercel and the site is verified, you can safely cancel
> the paid Framer plan. All images/video are self-hosted in this repo, so nothing depends on
> Framer's CDN after the switch.

## Open follow-ups (need assets)

- **Founder portrait** — the founder section currently shows a "PENDING" placeholder in
  `index.html`. Drop the photo into `images/` and replace the placeholder block.
- **Logo** — the header logo is a text recreation. A transparent/vector logo file can replace it.
- **Capability photos** — `complete-manufacturing.png`, `quality-assurance.png`,
  `fast-reliable.png` are generic; stronger owned photography would match the product galleries better.
