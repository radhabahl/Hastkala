# Hasta Kalā website

A production-ready, responsive static website for Hasta Kalā. It uses semantic HTML, modular CSS and small vanilla JavaScript enhancements, built with Vite.

## Run locally

```bash
npm install
npm run dev
```

Create a production build and preview it:

```bash
npm run build
npm run preview
```

The compiled site is written to `dist/` and is ready for Vercel or another static host. The build command is `npm run build` and the publish directory is `dist`.

## Enquiry form

The custom-styled form sends `name`, `email`, `interest` and `message` directly to Formspree. It includes browser validation, Formspree's `_gotcha` honeypot field, loading feedback and an AJAX success state.

The production site is configured through `VITE_FORM_ENDPOINT` in `.env`, currently set to `https://formspree.io/f/xljrqvzz`. Vite injects this public form endpoint into both the HTML form action and the JavaScript submission handler at build time.

## Vercel deployment

Vercel detects this as a Vite project. Use `npm run build` as the build command and `dist` as the output directory; no `vercel.json` is required for the current static site.

The supplied Formspree endpoint is already connected. To replace it later:

1. Create a form in Formspree and copy its endpoint, such as `https://formspree.io/f/your-form-id`.
2. Update `VITE_FORM_ENDPOINT` in `.env` for local builds.
3. If Vercel should use a different endpoint, add `VITE_FORM_ENDPOINT` under **Project Settings → Environment Variables** for Production and Preview.
4. Redeploy the site so Vite can include the value in the new build.

## Before launch

1. Add the final production domain as a canonical URL and use it for the Open Graph image URL.
2. Add the documentary URL when *Inheritance* is released.
3. Confirm current prices, availability, phone and email.
4. Connect and test the chosen form endpoint if email-app fallback is not preferred.
5. Add analytics only after updating the privacy notice and obtaining any consent required for the launch region.

## Source assets

The optimized WebP assets used by the site are in `public/images/`. The original embedded photos were extracted into `src/assets/source/` for traceability. The two scripts in `scripts/` reproduce that extraction and optimization pipeline.
