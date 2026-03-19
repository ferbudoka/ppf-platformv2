# PPF Navigator — GIF Project Preparation Facilities Navigator

A web-based tool of the **Global Infrastructure Facility (GIF)**, a G20 initiative supporting sustainable infrastructure in emerging markets. The PPF Navigator helps infrastructure professionals discover, filter, and connect with the right project preparation facility for their needs.

---

## What it is

Infrastructure projects in emerging markets often stall before reaching financial close due to inadequate preparation support. The PPF Navigator addresses this by aggregating 15+ multilateral and bilateral project preparation facilities into a single, searchable platform — acting as a map for navigating the global infrastructure project preparation ecosystem.

---

## Files

| File | Description |
|------|-------------|
| `index.html` | Landing page — introduces the platform, its mission, features, and filter framework |
| `project-support-finder.html` | The main dashboard — interactive database with filtering, map, and facility profiles |

Open `index.html` in a browser to start, then click **"Explore the Dashboard"** to access the full tool.

---

## What it does

### Landing Page (`index.html`)
- Introduces the GIF mission and the $15T global infrastructure gap
- Explains the three core value propositions: **Discover & Match**, **Navigate Eligibility**, and **Accelerate Preparation**
- Showcases the five filter dimensions users can apply
- Links through to the main dashboard

### Dashboard (`project-support-finder.html`)
The main application. Users can explore preparation facilities across five dimensions:

| Dimension | Options |
|-----------|---------|
| **Preparation Stage** | Project Identification, Screening, Feasibility Assessment, Design & Structuring, Contract Drafting, Tendering |
| **Support Instrument** | In-kind Technical Advisory, Pure Grants, Reimbursable Grants, Early-stage Equity |
| **Geography** | Filter by region or country |
| **Sector** | Energy, Transport, Digital, Water, Urban |
| **Preferred Provider** | MDB, Independent, National |

#### Key features
- **Interactive Map Explorer** — Leaflet.js map with cluster, heat, and point views; colour-coded regional overlays
- **Smart Filtering Engine** — combine multiple filters simultaneously; results update in real time across map, sidebar, grid, and table views
- **Detailed Facility Profiles** — eligibility criteria, funding envelopes, deadlines, and sector focus in slide-up detail panels
- **Multi-language Support** — full interface in English, Spanish, and French
- **Submit New Facilities** — structured form to contribute facilities not yet in the database
- **Light & Dark Modes** — toggle between dark cartographic and light analytical themes

---

## Tech stack

- Pure HTML, CSS, and JavaScript — no build step or backend required
- [Leaflet.js](https://leafletjs.com/) for the interactive map
- Google Fonts (Syne + DM Sans)
- Pexels video and Unsplash images for hero visuals

---

## Usage

1. Open `index.html` in any modern browser
2. Click **"Explore the Dashboard"** to go to the main tool
3. Use the filters to narrow down facilities by stage, instrument, geography, sector, or provider
4. Click a facility card or map marker to view its full profile

No installation, server, or internet connection is required beyond loading external fonts, map tiles, and hero media.

---

## About GIF

The Global Infrastructure Facility (GIF) is a G20 initiative that supports the preparation and structuring of complex infrastructure projects to attract private capital in emerging markets and developing economies. Learn more at [globalinfrafacility.org](https://www.globalinfrafacility.org/).
