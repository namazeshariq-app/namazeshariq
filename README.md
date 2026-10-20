# Namaz-e-Shariq | Modern Islamic Blogging & Prayer Times Platform

**Namaz-e-Shariq** is a modern, ultra-lightweight, high-speed Islamic blogging and prayer times portal built with **Next.js (App Router)**, **Tailwind CSS**, and architected natively for deployment on **Cloudflare Pages** and **Cloudflare D1 Database**.

---

## 🌟 Key Features

### 1. High-Performance & Lightweight Theme
- **Sub-110 KB First Load JS**: Zero bloated UI libraries. Built strictly with Tailwind CSS and tree-shaken Lucide icons for instantaneous PageSpeed & Core Web Vitals scores.
- **Clean Serene Aesthetic**: High-contrast, clean typography, soft emerald and slate styling designed for long-form reading comfort.
- **Live Solar Coordinate Calculation Engine**: Real-time astronomical calculation of **Fajr, Sunrise, Dhuhr, Asr (Hanafi & Shafi'i), Maghrib, Isha, and Tahajjud/Qiyam** without any third-party API dependencies or rate limits.

### 2. Comprehensive Admin Panel (`/admin`)
- **Secure Authentication**: Pure edge-compatible **Web Crypto PBKDF2 with SHA-256 (100,000 iterations + 16-byte cryptographically secure salt)**. Zero native C++ node-gyp dependencies.
- **Session Security**: Stateless, tamper-proof **Jose JWT tokens** stored in `httpOnly`, `SameSite=Lax`, `Secure` cookies.
- **Interactive Article & Content Editor**:
  - Split-screen / live markdown preview.
  - Dynamic **word counter** with target verification indicator (&gt;1,000 words).
  - Reading time estimator.
- **Full On-Page & Technical SEO Suite**:
  - Focus Keyword definition and live **Keyword Density Checker**.
  - **Meta Title** field with live Google snippet character counter (50–60 chars).
  - **Meta Description** field with live snippet character counter (150–160 chars).
  - Canonical URL configuration.
  - Structured Data Schema Type selector (`Article`, `BlogPosting`, `NewsArticle`, `FAQPage`).
  - **Dynamic FAQ Builder**: Add questions and answers that automatically generate Google Rich Snippet **`FAQPage` JSON-LD schema**.
- **Article & Category Management**: Draft/Publish toggling, view counters, categorization, and slug auto-generation.

### 3. SEO Pillars & Humanized High-Value Content (>1,000 Words Each)
All 5 seed pillar articles exceed 1,000 words of authentic, original, non-copyrighted, deeply researched content targeting the user's exact keyword list:

1. **Daily Namaz Rakats Master Guide** (*1,192 words*):
   - Targets: `namaz rakat` (110k volume), `isha namaz rakat` (49.5k volume), `namaz time` (135k volume).
   - Detailed table of Fard, Sunnah Mu'akkadah, Sunnah Ghayr Mu'akkadah, Nafl, and Witr for all 5 daily prayers plus Jumu'ah.
2. **Understanding Namaz Timings & Solar Science** (*1,313 words*):
   - Targets: `asr namaz time` (135k volume), `today maghrib namaz time` (90.5k volume), `fajr namaz time` (60.5k volume), `isha namaz time` (49.5k volume).
   - Detailed breakdown of solar noon, Zawal, true dawn vs false dawn, Hanafi (2x shadow) vs Shafi'i (1x shadow) Asr formulas, and the three prohibited prayer times.
3. **India City Prayer Timings Guide** (*1,093 words*):
   - Targets: `namaz timings in bangalore` (165k volume), `prayer time in bangalore` (165k volume), `namaz time in delhi` (90.5k volume), `prayer time in mumbai` (110k volume), `prayer time calicut` (90.5k volume), `prayer time in chennai` (49.5k volume), `prayer time kochi` (49.5k volume).
   - Comprehensive analysis of latitude shifts, Indian Standard Time (82.5°E) variations, and prayer while traveling on Indian Railways.
4. **Pakistan Prayer Times Master Guide** (*1,144 words*):
   - Targets: `namaz timing karachi` (550k volume), `namaz time karachi` (301k volume), `namaz timing lahore` (135k volume), `namaz timing peshawar` (110k volume).
   - University of Islamic Sciences Banuri Town 18°/18° standard, coastal twilight parameters, Qada Salah guide, and post-prayer authentic supplications.
5. **International Timetables: Bangladesh & UAE** (*1,075 words*):
   - Targets: `namaz time dhaka` (60.5k volume), `fajr namaz last time dhaka` (18.1k volume), `namaz timing sharjah` (33.1k volume), `eid namaz time dubai` (12.1k volume), `namaz time ajman` (12.1k volume).
   - Islamic Foundation Bangladesh guidelines, UAE Awqaf & IACAD unified tables, and Eid prayer timing/procedures.

### 4. Technical SEO Architecture
- **Dynamic XML Sitemap**: Automatically generates at `/sitemap.xml` listing static pages, all 13 city landing pages, and all blog posts with `changefreq` and `priority`.
- **Custom Robots.txt**: Configured at `/robots.txt` disallowing `/admin/` and referencing `sitemap.xml`.
- **JSON-LD Schema Markup**:
  - `WebSite` Schema with Searchbox Action
  - `BreadcrumbList` Schema on all subpages
  - `Article` / `BlogPosting` Schema with author, dates, and publisher
  - `FAQPage` Schema on pages with FAQs for Google SERP rich accordion snippets
- **Semantic HTML5**: Strict single `<h1>` per page, hierarchical `<h2>`/`<h3>` tags, and accessible ARIA attributes.
- **Strict Security Headers** (in `next.config.mjs`):
  - `X-Frame-Options: DENY` (Clickjacking prevention)
  - `X-Content-Type-Options: nosniff` (MIME sniffing prevention)
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (HSTS)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(self)`

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js (App Router, Server Components) |
| **Styling** | Tailwind CSS (Custom typography, lightweight tokens) |
| **Database** | Cloudflare D1 (SQLite) with automatic local dev fallback |
| **Deployment** | Cloudflare Pages / Workers |
| **Security & Auth** | Web Crypto API (PBKDF2/SHA-256) & Jose (JWT) |
| **Content Engine** | Marked (Markdown Parser) with custom typography |
| **Icons** | Lucide React |

---

## 🚀 Getting Started

### 1. Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Admin Credentials
- **URL**: `http://localhost:3000/admin/login`
- **Username**: `admin`
- **Password**: `AdminPassword2026!`
*(An &quot;Autofill Default Credentials&quot; button is also provided on the login page for instant access).*

### 3. Production Build
```bash
npm run build
npm start
```

---

## ☁️ Cloudflare Pages & D1 Deployment

The repository includes ready-to-use Cloudflare configuration:
- `wrangler.toml`: Configures the D1 database binding `DB`.
- `schema.sql`: Complete D1 SQLite schema with indexing on `slug`, `status`, and `published_at`.

### Steps to Deploy on Cloudflare:
1. **Create your D1 Database**:
   ```bash
   npx wrangler d1 create namaz_shariq_db
   ```
2. **Copy the `database_id`** into `wrangler.toml`:
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "namaz_shariq_db"
   database_id = "your-database-id-from-step-1"
   ```
3. **Execute the schema on D1**:
   ```bash
   npx wrangler d1 execute namaz_shariq_db --file=./schema.sql
   ```
4. **Deploy to Cloudflare Pages**:
   ```bash
   npx wrangler pages deploy .next
   ```
   Or connect your GitHub repository directly to Cloudflare Pages with build command `npm run build` and output directory `.next`.

---

## 📄 License
This project is created for high-value Islamic educational publishing. All rights reserved.
