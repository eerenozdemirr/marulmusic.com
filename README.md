# Marulmusic

Marul'un Yüksek albüm deneyimi ve ilerideki kampanya/arşiv işleri için modern Vite + React sitesi.

## Scripts

- `npm run dev`: local development
- `npm run build`: TypeScript check + production build
- `npm run preview`: local production preview
- `npm run import:studio-notes -- tum_notlar.md`: local private notes import

## Environment

Set these on Vercel for the private Studio route:

- `STUDIO_PASSWORD`
- `STUDIO_SESSION_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Do not commit `.env`, `tum_notlar.md`, or exported private note content.

## Routes

- `/` redirects to `/yuksek`
- `/yuksek` is the album hub
- `/studio` is the private notes area
- `/yukseks` redirects to `/studio`

## Supabase

Run `supabase/schema.sql` in Supabase SQL Editor before importing notes.

