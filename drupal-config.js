/**
 * Drupal Headless CMS Configuration
 * Replace DRUPAL_BASE_URL with your Drupal site's URL.
 * All other settings map your Drupal content types and fields to the app's data model.
 */
const DRUPAL_CONFIG = {

  // ── Base URL of your Drupal installation ──────────────────────────────────
  baseUrl: 'https://your-drupal-site.com',   // ← change this

  // ── JSON:API path (default for Drupal 8/9/10) ─────────────────────────────
  apiPath: '/jsonapi',

  // ── Content type machine names ────────────────────────────────────────────
  contentTypes: {
    facility: 'node/ppf_facility',
    faq:      'node/ppf_faq',
  },

  // ── Drupal field → app field mappings ─────────────────────────────────────
  // Each key is what the app expects; each value is the Drupal JSON:API field name.
  facilityFields: {
    id:              'drupal_internal__nid',
    name:            'title',
    org:             'field_organisation',
    region:          'field_region',
    country:         'field_country',
    lat:             'field_latitude',
    lng:             'field_longitude',
    support:         'field_support_types',     // multi-value, returns array
    sector:          'field_sector',
    amount:          'field_funding_amount',
    deadline:        'field_deadline',
    status:          'field_status',
    year:            'field_year_established',
    climateMandate:  'field_climate_mandate',
    geoScope:        'field_geographic_scope',
    regionsCovered:  'field_regions_covered',
    desc:            'field_description',
    eligibility:     'field_eligibility',       // multi-value, returns array
    icon:            'field_emoji_icon',
    color:           'field_marker_color',
    // Preparation stage flags
    prepStages:      'field_prep_stages',
    // Instrument flags
    inkind:          'field_inkind',
    finInstr:        'field_fin_instr',
    pureGrant:       'field_pure_grant',
    reimbursable:    'field_reimbursable',
    equity:          'field_equity',
    // Stage flags
    s2: 'field_s2', s21: 'field_s21',
    s3: 'field_s3', s31: 'field_s31', s32: 'field_s32',
    s321: 'field_s321', s322: 'field_s322',
    s4: 'field_s4', s41: 'field_s41', s42: 'field_s42',
    s43: 'field_s43', s44: 'field_s44',
    // Sector flags
    secScope: 'field_sec_scope',
    secEnergy: 'field_sec_energy', secTransport: 'field_sec_transport',
    secDigital: 'field_sec_digital', secWater: 'field_sec_water',
    secWaste: 'field_sec_waste', secUrban: 'field_sec_urban',
    secSocial: 'field_sec_social',
    // Other
    thematic:       'field_thematic',
    pcm:            'field_pcm',
    otherNonInfra:  'field_other_non_infra',
    allEMDEs:       'field_all_emdes',
  },

  faqFields: {
    question: 'title',
    answer:   'field_answer',
    weight:   'field_weight',    // for ordering
  },

};
