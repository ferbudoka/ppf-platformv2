# PPF Navigator — GIF Project Preparation Facilities Navigator

A web-based tool of the **Global Infrastructure Facility (GIF)**, a G20 initiative supporting sustainable infrastructure in emerging markets. The PPF Navigator helps infrastructure professionals discover, filter, and connect with the right project preparation facility for their needs.

**Created:** March 27, 2026  
**Last Updated:** April 12, 2026

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
- 6 filter dimensions explained (updated from 5):
  - Preparation Stage · Support Instrument · Geography · Sector · Type of Support · Eligible Applicants
- Each dimension card has hover tooltips per item — a floating popover box with a short explanation (does not expand the pill)
- Sector column color updated to indigo/violet (#818cf8)
- Grid layout: 6 columns on desktop, 3 on medium, 2 on small, 1 on mobile

**Features**
- 6 feature cards updated to reflect current platform state:
  - Interactive Map Explorer (137 facilities, HQ color-coding, cluster grid modal)
  - Six-Dimension Filter Engine
  - Detailed Facility Profiles
  - Full Facilities Directory (sortable table, 21 columns, CSV export)
  - Submit a PPF or Case Study
  - Light & Dark Modes

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
- Logo · Stats banner (Countries · Funds Available · Support Types) — centered absolutely
- Submit PPF button · Submit Case Study button · Back to Home

**Filters Panel (left sidebar)**
- Search bar
- 6 collapsible filter groups:
  - Preparation Stage (6 stages: Identification & Screening → Tender Process)
  - Type of Support (Advisory · Reimbursable · Pure Grant · Equity)
  - Infrastructure Sector (Infrastructure · Energy · Water · Finance · Health)
  - Geography / Region
  - Eligible Applicants (National Governments · Municipal Governments · SOE · Private Sector · MDB · Other)
- Reset All Filters button

**Interactive Map (center)**
- Satellite tile layer (Esri)
- Markers color-coded by **HQ location** (not operational region):
  - 🔵 North America · 🟠 Latin America · 🟡 Middle East · 🟢 Africa · 🟣 Europe · 🩵 Asia & Pacific
- Map legend (bottom-left) showing HQ location color key
- Cluster circles for co-located facilities
  - Clicking a cluster opens a **grid modal** (not zoom) — searchable, 3-column card layout
- Hover tooltips with fund info (capped at 6 items + "…and N more")
- Dark/Light mode toggle (bottom left)

**Fund Cards Grid (right)**
- Cards for each matching facility
- Click to open detail panel

**Fund Detail Panel**
- Full fund info: name, org, description, eligibility, amount, sector, region
- Contact · Save · Share · PDF buttons

**Submit Fund Modal**
- Multi-field form to propose a new facility
- Success confirmation screen

**Submit Case Study Modal**
- Multi-field form for project preparation success stories
- Success confirmation screen

---

### 3. Facilities Table (`facilities.html`)
**Header**
- Same banner as dashboard

**Search + Filters + Export**
- Live search by name/org/sector/region
- 4 filter dropdowns: Region · Sector · Support Type · Climate Mandate
- Export to CSV button (30 fields)

**Full Data Table**
- **137 facilities · 21 columns**
- Sortable columns (click header to sort ▲▼)
- Columns:
  1. Name
  2. Organisation
  3. Region
  4. Sector
  5. Support Types (color-coded pills)
  6–11. Preparation Stages: Identification · Pre-Feasibility · Design · Appraisal · Tendering · Market Sounding
     - ✓ green = Yes · ◑ amber = Partial · · grey = No
  12. PCM Mandate (Project Cycle Management — teal badge with level, e.g. "100%", "Included", "Strong")
  13. Year
  14. Amount
  15. Status
  16. Climate Mandate
  17. Geographic Scope
  18. Regions Covered
  19. HQ Location (color dot + city name)
  20. Description (truncated to 120 chars; full text on hover)
  21. Eligibility (bullet list)

**Footer**
- Same as home page

---

## What it is

Infrastructure projects in emerging markets often stall before reaching financial close due to inadequate preparation support. The PPF Navigator addresses this by aggregating 137 multilateral and bilateral project preparation facilities into a single, searchable platform — acting as a map for navigating the global infrastructure project preparation ecosystem.

---

## Files

| File | Description |
|------|-------------|
| `index.html` | Landing page — introduces the platform, its mission, features, and filter framework |
| `project-support-finder.html` | The main dashboard — interactive database with filtering, map, and facility profiles |
| `facilities.html` | Full data table of all 137 facilities with search, sort, filter, and CSV export |
| `ppf-data.js` | Shared facility dataset (137 facilities) — single source of truth loaded by both dashboard and facilities pages |
| `drupal-config.js` | Drupal headless CMS configuration (API endpoint settings) |
| `drupal-api.js` | Drupal JSON:API integration layer with static fallback to `ppf-data.js` |
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
5. Visit `facilities.html` for a sortable, exportable full directory

---

## Data Architecture

All 137 facility records are stored in `ppf-data.js` as a shared IIFE-wrapped dataset:

```javascript
(function(){
  const STATIC_FACILITIES = [ /* 137 facility objects */ ];
  window.PPF_STATIC_FACILITIES = STATIC_FACILITIES;
})();
```

Both `project-support-finder.html` and `facilities.html` load `ppf-data.js` and read from `window.PPF_STATIC_FACILITIES`. The Drupal API layer (`drupal-api.js`) falls back to this dataset when the CMS is not configured or unreachable.

Each facility object includes:
- Identity: `id`, `name`, `org`, `icon`, `color`
- Geography: `region`, `country`, `lat`, `lng`, `geoScope`, `regionsCovered`
- Support: `support[]`, `inkind`, `pureGrant`, `reimbursable`, `equity`
- Preparation stages: `s2`, `s3`, `s32`, `s4`, `s42`, `s43` (Y / Partial / N)
- PCM mandate: `pcm`
- Sector flags: `sector`, `secEnergy`, `secTransport`, `secDigital`, `secWater`, `secWaste`, `secUrban`, `secSocial`
- Climate: `climateMandate`
- Content: `desc`, `eligibility[]`, `prepStages`
- Meta: `year`, `amount`, `deadline`, `status`

---

## CMS Integration (Drupal Headless)

Fund and facility data is managed through a Drupal 10 backend. Editors can add, edit, or unpublish facilities via the Drupal admin without touching code. The frontend fetches data via Drupal's JSON:API at runtime.

See setup instructions in the conversation history for full Pantheon + GitHub Pages deployment steps.

---

## About GIF

The Global Infrastructure Facility (GIF) is a G20 initiative that supports the preparation and structuring of complex infrastructure projects to attract private capital in emerging markets and developing economies. Learn more at [globalinfrafacility.org](https://www.globalinfrafacility.org/).
