# PPF Navigator — GIF Project Preparation Facilities Navigator

A web-based tool of the **Global Infrastructure Facility (GIF)**, a G20 initiative supporting sustainable infrastructure in emerging markets. The PPF Navigator helps infrastructure professionals discover, filter, and connect with the right project preparation facility for their needs.

**Created:** March 27, 2026

---

## Site Outline

### 1. Home Page (`index.html`)
**Navigation**
- Logo (top left)
- Links: Mission · How It Works · Features · FAQ
- CTA button: Explore the Dashboard

**Hero**
- Looping video background (videos 2 → 3 → 1)
- Headline + subheading
- Primary CTA button
- Scroll indicator

**Mission**
- Image (left) + text (right)
- 3 pillars: Discover & Match · Navigate Eligibility · Accelerate Preparation

**How It Works**
- 5 filter dimensions explained: Preparation Stage · Support Instrument · Region · Sector · Project Size

**Features**
- 3 feature cards: built for infrastructure professionals

**Bottom CTA**
- Final call to action to open the dashboard

**FAQ**
- 8 collapsible questions about the platform

**Footer**
- Links: Dashboard · All Facilities · Mission · FAQ
- Legal / copyright

---

### 2. Dashboard (`project-support-finder.html`)
**Header**
- Logo · Stats banner (Countries · Funds Available · Support Types)
- Submit Fund button · Back to Home

**Filters Panel (left sidebar)**
- Search bar
- Filter pills: Stage · Region · Support Type · Sector · Instrument
- Reset All Filters button

**Interactive Map (center)**
- Satellite tile layer (Esri)
- Fund markers with zoom-adaptive sizing
- Cluster circles for co-located funds (click to expand)
- Hover tooltips with fund info
- Dark/Light mode toggle (bottom left)

**Fund Cards Grid (right)**
- Cards for each matching facility
- Click to open detail panel

**Fund Detail Panel**
- Full fund info: name, org, description, eligibility, amount, sector, region
- Contact button

**Submit Fund Modal**
- Multi-field form to propose a new facility
- Success confirmation screen

---

### 3. Facilities Table (`facilities.html`)
**Header**
- Same banner as dashboard

**Search + Export**
- Live search by name/org
- Export to CSV button

**Full Data Table**
- 14 facilities · 12 columns
- Sortable columns (click header to sort ▲▼)
- All facility data: name, org, type, sector, region, amount, status, etc.

**Footer**
- Same as home page

---

## What it is

Infrastructure projects in emerging markets often stall before reaching financial close due to inadequate preparation support. The PPF Navigator addresses this by aggregating 15+ multilateral and bilateral project preparation facilities into a single, searchable platform — acting as a map for navigating the global infrastructure project preparation ecosystem.

---

## Files

| File | Description |
|------|-------------|
| `index.html` | Landing page — introduces the platform, its mission, features, and filter framework |
| `project-support-finder.html` | The main dashboard — interactive database with filtering, map, and facility profiles |
| `facilities.html` | Full data table of all facilities with search, sort, and CSV export |
| `drupal-config.js` | Drupal headless CMS configuration (API endpoint settings) |
| `drupal-api.js` | Drupal JSON:API integration layer |
| `backup-clean/` | Clean backup of all pages as of March 27, 2026 |

---

## Tech Stack

- Pure HTML, CSS, and JavaScript — no build step required
- [Leaflet.js](https://leafletjs.com/) for the interactive map
- Google Fonts (Syne + DM Sans)
- Esri World Imagery for satellite map tiles
- Drupal 10 (headless CMS via JSON:API) for content management

---

## Usage

1. Open `index.html` in any modern browser
2. Click **"Explore the Dashboard"** to go to the main tool
3. Use the filters to narrow down facilities by stage, instrument, geography, sector, or provider
4. Click a facility card or map marker to view its full profile

---

## CMS Integration (Drupal Headless)

Fund and facility data is managed through a Drupal 10 backend. Editors can add, edit, or unpublish facilities via the Drupal admin without touching code. The frontend fetches data via Drupal's JSON:API at runtime.

See setup instructions in the conversation history for full Pantheon + GitHub Pages deployment steps.

---

## About GIF

The Global Infrastructure Facility (GIF) is a G20 initiative that supports the preparation and structuring of complex infrastructure projects to attract private capital in emerging markets and developing economies. Learn more at [globalinfrafacility.org](https://www.globalinfrafacility.org/).
