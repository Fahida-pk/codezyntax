# Run, build and deploy CodeZyntax

## 1. Run locally
1. Install Node.js LTS (nodejs.org). In VS Code open the project folder, then Terminal > New Terminal.
2. `npm install`
3. Copy `.env.example` to `.env`; fill VITE_EMAIL, VITE_WHATSAPP (digits with country code), VITE_FORM_ENDPOINT (e.g. your Formspree URL).
4. Put your logo at `public/logo.png` (and `public/favicon.ico`).
5. `npm run dev` and open the address shown. Test every page, the planner, the form, and mobile view (browser DevTools > device toolbar).

## 2. Build
`npm run build` creates the `dist` folder. Test it with `npm run preview`.

## 3. Back up the live site (before changing anything)
- cPanel/Hostinger: File Manager > open `public_html` > select all > Compress (zip) > Download the zip.
- Also export databases if any (phpMyAdmin > Export) and note the list of existing URLs.
- FTP: connect with FileZilla and download the whole web folder to your computer.

## 4. Deploy
1. Open File Manager (or FileZilla) at your domain's web folder, usually `public_html`.
2. Upload the CONTENTS of `dist` (not the folder itself), including the hidden `.htaccess`
   (File Manager > Settings > show hidden files).
3. Visit https://www.codezyntax.com and test pages, refresh on /services, the form, and mobile.
4. If anything breaks, delete the uploaded files and restore your backup zip.
Note: `.htaccess` is for Apache/LiteSpeed hosts. On Nginx or Vercel/Netlify, ask for the SPA rewrite rule.

## IMPORTANT: your current site is WordPress
The logo lives at /wp-content/uploads/..., so codezyntax.com runs on WordPress. Uploading this React build over `public_html` can hide or break WordPress pages, the admin login and any forms/plugins.
Safe order:
1. Take a full backup (files zip + database export via phpMyAdmin, or your host's backup tool).
2. Create a staging subdomain (e.g. new.codezyntax.com) in your hosting panel, upload `dist` there, and test everything.
3. Make a list of every existing URL that must keep working (Search Console or the WordPress sitemap) so redirects can be added.
4. Only then go live: either point the domain's document root to the new site, or replace the site files while KEEPING `wp-content`, `wp-admin`, `wp-includes` and the database (do not delete them) so the logo URL and an easy rollback remain.
5. If anything fails, restore the backup.

## Logo
Download https://www.codezyntax.com/wp-content/uploads/software_development_company_in_palakkad.webp and save it as `public/logo.webp` (unchanged). The site shows it on a white plate so its original colours stay intact. Until the file is added, it loads from the live URL.

## Brand colour (important)
The logo colour could not be read automatically. Brand blue lives in ONE place: the `--brand`, `--brand-strong`, `--brand-soft` and `--btn` variables at the top of `src/index.css` (space-separated RGB, e.g. `37 99 235`). Replace the light-mode values with your logo blue (use a colour picker on the logo, or ask your designer), and adjust the `.dark` values to a slightly lighter shade of the same blue.

## Theme toggle
Light/dark follows the visitor's system setting on first visit, then remembers their choice (localStorage key `cz-theme`).

## URLs
Menu paths: /, /#about, /service, /digital-marketing, /vcards, /#contact, /blog. Old /services paths redirect to /service.
