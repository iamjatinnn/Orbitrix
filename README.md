# 📊 Carousel Tracker

A polished, installable (PWA) habit tracker for Instagram carousel creators — track uploads, views, likes, saves, followers, monthly goals, growth charts, and sync across all your devices.

Everything runs in the browser. Data is saved offline (localStorage) and optionally synced to the cloud.

---

## 🚀 Deploy — Option A: Netlify (recommended — auto cloud sync, ZERO setup)

With Netlify you get a built-in serverless sync backend (Netlify Blobs). No database, no Firebase, no signup beyond Netlify itself.

### Easiest: drag & drop
1. Go to <https://app.netlify.com/drop>
2. Drag this **entire folder** onto the page.
3. ⚠️ Drag & drop does **not** build functions. For sync, use the Git or CLI method below instead. (The app still works fully offline via drag & drop.)

### Recommended: deploy with Git (sync works automatically)
1. Push this folder to a GitHub repo (see "Push to GitHub" below).
2. In Netlify: **Add new site → Import an existing project → pick your repo.**
3. Build settings are auto-detected from `netlify.toml`:
   - Publish directory: `.`
   - Functions directory: `netlify/functions`
4. Click **Deploy**. Done!
5. Open your new site → **Cloud Sync → Auto (this site)** → type any secret **Sync Code** → **Connect & Sync.**
6. On your phone/other devices, open the same site, use the **same sync code** → your data appears. ✅

### Or deploy with the Netlify CLI
```bash
npm install -g netlify-cli
cd deploy
netlify deploy --prod
```

> **Note on Netlify Blobs:** On modern Netlify, Blobs storage is enabled automatically for sites that have functions — no config needed. The `@netlify/blobs` package is listed in `package.json` and Netlify installs it during build.

---

## 🚀 Deploy — Option B: GitHub Pages (static; sync via Firebase)

GitHub Pages can't run serverless functions, so "Auto" sync won't work there. Use **Firebase mode** for sync instead (still free).

1. Create a repo and push these files (see below).
2. In your repo: **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. The included workflow (`.github/workflows/deploy-pages.yml`) deploys automatically on every push to `main`.
4. Your app appears at `https://<your-username>.github.io/<repo>/`.
5. For sync: open **Cloud Sync → Firebase**, follow the 4-step in-app guide, use the same URL + code on each device.

---

## 🐙 Push to GitHub

```bash
cd deploy
git init
git add .
git commit -m "Carousel Tracker app"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

---

## 📁 What's in here

| File | Purpose |
|------|---------|
| `index.html` | The entire app (UI + logic) |
| `manifest.json` | PWA manifest (install to home screen) |
| `sw.js` | Service worker (offline support) |
| `icon.png` | App icon |
| `netlify.toml` | Netlify build + function routing config |
| `package.json` | Declares the `@netlify/blobs` dependency |
| `netlify/functions/sync.mjs` | Serverless sync API (`/api/sync`) using Netlify Blobs |
| `.github/workflows/deploy-pages.yml` | Auto-deploy to GitHub Pages |

---

## ✨ Features
- 📦 Total / today / this-month carousel counts
- 👁️ 30-day views & ➕ followers tracking
- 🎯 Custom monthly goal with pace feedback
- 📈 Growth line chart (followers / views / carousels)
- 📊 7-day upload consistency bars + 🔥 streak
- 🏆 Best performer + searchable/sortable history
- 📱 Installable PWA (works offline)
- ☁️ Cross-device cloud sync (Auto on Netlify, or Firebase anywhere)
- ⬇️⬆️ Export / Import JSON backups

## 🔒 Privacy
Your data lives in your browser by default. Cloud sync stores data under your secret **Sync Code** — anyone with the same site URL + code can read it, so pick a long, hard-to-guess code (e.g. `arman-carousels-9f3kq2`).
