# Rhythmic Chaos — Site Guide

## Run locally

```bash
pnpm install        # or npm install
cp .env.example .env.local   # then fill in your values
pnpm dev            # http://localhost:3000
```

## Deploy on Vercel

1. Push the repo to GitHub.
2. Import it at vercel.com — Next.js is auto-detected, no config needed.
3. In Project → Settings → Environment Variables, add:
   - `RESEND_API_KEY` — from https://resend.com/api-keys
   - `CONTACT_EMAIL` — where contact-form messages go
   - `NEWSLETTER_EMAIL` — where subscriber notifications go
   - `RESEND_FROM_EMAIL` (optional) — verified sender, e.g. `Rhythmic Chaos <hello@yourdomain.com>`. Defaults to `onboarding@resend.dev` (works for testing).
4. Deploy. Update `site.url` in `app/data/site.ts` to your live domain (used for SEO/OG tags).

## Where to edit things

| What | File |
|---|---|
| Releases (add/edit songs, DSP links, covers, featured flags) | `app/data/releases.ts` |
| Artist name, tagline, socials, booking email, nav links | `app/data/site.ts` |
| Shows / events | `app/data/shows.ts` |
| Bio text | `app/components/sections/About.tsx` |
| Hero tagline / CTAs | `app/components/sections/Hero.tsx` |
| SEO metadata | `app/layout.tsx` |

## Adding a release

1. Add an entry to `app/data/releases.ts` (copy an existing one).
2. `slug` becomes the smart-link URL: `/music/<slug>` — share this link with fans.
3. Fill in whichever DSP links you have; empty ones are hidden automatically.
4. Cover: paste a URL (Spotify CDN works) or drop a file in `public/images/releases/` and use `/images/releases/name.jpg`.
5. Set `featured: true` to show it on the homepage (first 4 by date are shown).

## TODOs

- [ ] Add Apple Music / YouTube / SoundCloud links per release in `app/data/releases.ts`
- [ ] Add cover image for "To the End" (`public/images/releases/to-the-end.jpg`)
- [ ] Replace `bookingEmail` placeholder in `app/data/site.ts`
- [ ] Set `site.url` to your real domain
- [ ] Add Resend env vars in `.env.local` / Vercel
- [ ] Optional: connect newsletter to Resend Audiences or a database (see comments in `app/api/subscribe/route.ts`)
