/**
 * Drupal Headless API Layer
 * Fetches content from Drupal's JSON:API and maps it to the app's data model.
 * Falls back to static data if Drupal is unreachable or not yet configured.
 */

const DrupalAPI = (() => {

  const { baseUrl, apiPath, contentTypes, facilityFields, faqFields } = DRUPAL_CONFIG;
  const API = `${baseUrl}${apiPath}`;

  // ── Helpers ──────────────────────────────────────────────────────────────

  function endpoint(type, params = '') {
    return `${API}/${type}${params ? '?' + params : ''}`;
  }

  function attr(item, field) {
    return item?.attributes?.[field] ?? null;
  }

  // Fetch all pages of a JSON:API collection (handles Drupal pagination)
  async function fetchAll(url) {
    let results = [];
    let next = url;
    while (next) {
      const res = await fetch(next, {
        headers: { 'Accept': 'application/vnd.api+json' }
      });
      if (!res.ok) throw new Error(`Drupal API ${res.status}: ${next}`);
      const json = await res.json();
      results = results.concat(json.data || []);
      next = json.links?.next?.href || null;
    }
    return results;
  }

  // ── Facility mapping ─────────────────────────────────────────────────────

  function mapFacility(item) {
    const f = facilityFields;
    const a = (field) => attr(item, field);

    // support and eligibility may be plain text fields or multi-value
    const support = a(f.support);
    const eligibility = a(f.eligibility);

    return {
      id:             a(f.id),
      name:           a(f.name)           ?? '',
      org:            a(f.org)            ?? '',
      region:         a(f.region)         ?? '',
      country:        a(f.country)        ?? '',
      lat:            parseFloat(a(f.lat))  || 0,
      lng:            parseFloat(a(f.lng))  || 0,
      support:        Array.isArray(support) ? support : (support ? support.split(',').map(s => s.trim()) : []),
      sector:         a(f.sector)         ?? '',
      amount:         a(f.amount)         ?? 'Varies',
      deadline:       a(f.deadline)       ?? 'Rolling',
      status:         a(f.status)         ?? 'Open',
      year:           a(f.year)           ?? null,
      climateMandate: a(f.climateMandate) ?? '',
      geoScope:       a(f.geoScope)       ?? '',
      regionsCovered: a(f.regionsCovered) ?? '',
      desc:           a(f.desc)           ?? '',
      eligibility:    Array.isArray(eligibility) ? eligibility : (eligibility ? [eligibility] : []),
      icon:           a(f.icon)           ?? '🏗',
      color:          a(f.color)          ?? '#00c2c2',
      prepStages:     a(f.prepStages)     ?? '',
      inkind:         a(f.inkind)         ?? 'N',
      finInstr:       a(f.finInstr)       ?? 'N',
      pureGrant:      a(f.pureGrant)      ?? 'N',
      reimbursable:   a(f.reimbursable)   ?? 'N',
      equity:         a(f.equity)         ?? 'N',
      pcm:            a(f.pcm)            ?? '',
      thematic:       a(f.thematic)       ?? '',
      otherNonInfra:  a(f.otherNonInfra)  ?? '',
      allEMDEs:       a(f.allEMDEs)       ?? 'N',
      geoScope:       a(f.geoScope)       ?? '',
      // Stage flags
      s2: a(f.s2), s21: a(f.s21),
      s3: a(f.s3), s31: a(f.s31), s32: a(f.s32),
      s321: a(f.s321), s322: a(f.s322),
      s4: a(f.s4), s41: a(f.s41), s42: a(f.s42), s43: a(f.s43), s44: a(f.s44),
      // Sector flags
      secScope: a(f.secScope),
      secEnergy: a(f.secEnergy), secTransport: a(f.secTransport),
      secDigital: a(f.secDigital), secWater: a(f.secWater),
      secWaste: a(f.secWaste), secUrban: a(f.secUrban), secSocial: a(f.secSocial),
    };
  }

  // ── FAQ mapping ──────────────────────────────────────────────────────────

  function mapFAQ(item) {
    return {
      question: attr(item, faqFields.question) ?? '',
      answer:   attr(item, faqFields.answer)   ?? '',
      weight:   parseInt(attr(item, faqFields.weight)) || 0,
    };
  }

  // ── Public API ───────────────────────────────────────────────────────────

  async function fetchFacilities() {
    const params = 'sort=title&page[limit]=50';
    const items = await fetchAll(endpoint(contentTypes.facility, params));
    return items.map(mapFacility);
  }

  async function fetchFAQs() {
    const params = 'sort=field_weight&page[limit]=50';
    const items = await fetchAll(endpoint(contentTypes.faq, params));
    return items.map(mapFAQ).sort((a, b) => a.weight - b.weight);
  }

  return { fetchFacilities, fetchFAQs };

})();


/**
 * loadFacilities()
 * Used by project-support-finder.html and facilities.html.
 * Returns Drupal data or falls back to STATIC_FACILITIES if Drupal is unreachable.
 */
async function loadFacilities() {
  // Skip Drupal fetch if base URL is still the placeholder
  if (DRUPAL_CONFIG.baseUrl === 'https://your-drupal-site.com') {
    console.info('[PPF] Drupal not configured — using static data.');
    return typeof STATIC_FACILITIES !== 'undefined' ? STATIC_FACILITIES : [];
  }
  try {
    const data = await DrupalAPI.fetchFacilities();
    console.info(`[PPF] Loaded ${data.length} facilities from Drupal.`);
    return data.length ? data : (typeof STATIC_FACILITIES !== 'undefined' ? STATIC_FACILITIES : []);
  } catch (err) {
    console.warn('[PPF] Drupal fetch failed, falling back to static data.', err);
    return typeof STATIC_FACILITIES !== 'undefined' ? STATIC_FACILITIES : [];
  }
}

/**
 * loadFAQs()
 * Used by index.html.
 * Returns Drupal FAQ items or null (page renders its own static HTML as fallback).
 */
async function loadFAQs() {
  if (DRUPAL_CONFIG.baseUrl === 'https://your-drupal-site.com') {
    console.info('[PPF] Drupal not configured — using static FAQ.');
    return null;
  }
  try {
    const data = await DrupalAPI.fetchFAQs();
    console.info(`[PPF] Loaded ${data.length} FAQs from Drupal.`);
    return data.length ? data : null;
  } catch (err) {
    console.warn('[PPF] Drupal FAQ fetch failed, using static FAQ.', err);
    return null;
  }
}
