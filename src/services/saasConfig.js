/**
 * Sagamu SaaS Master Configuration & Feature Flags Engine
 * Controls sitewide module toggles, branding, paystack keys, and royal operational modes for Sagamu.
 */

const SAAS_CONFIG_KEY = 'sagamu_saas_master_config';

export const DEFAULT_SAAS_CONFIG = {
  // 1. Kingdom & Platform Identity
  identity: {
    kingdomName: 'Paramount Kingdom of Sagamu Remoland',
    tagline: 'Heartbeat of Remoland — City of 13 Confederate Quarters & Commercial Capital',
    reigningMonarch: 'His Royal Majesty Oba Babatunde Adewale Ajayi, CFR, FCA — The Akarigbo & Paramount Ruler of Remoland',
    officialEmail: 'secretariat@sagamuremo.ng',
    emergencyHotline: '+234 800 SAGAMU SOS (0800 724 268)',
    primaryColor: '#C9963A', // Royal Gold
    secondaryColor: '#0A0F1D', // Royal Mahogany
    currency: 'NGN (₦)',
    siteStatus: 'live', // live, maintenance, emergency
  },

  // 2. Global Module Toggles (Feature Flags)
  modules: {
    idCardSystem: { enabled: true, name: 'Digital Citizen ID Cards & QR Verification', icon: '🪪' },
    royalAudience: { enabled: true, name: 'Royal Audience Palace Booking Engine (Aafin Akarigbo)', icon: '👑' },
    landRegistry: { enabled: true, name: 'Digital Land Registry & Dispute Resolution', icon: '📜' },
    marketplace: { enabled: true, name: 'Community Marketplace & Sabo Kolanut Trade', icon: '🛒' },
    businessDirectory: { enabled: true, name: 'Verified Commercial Directory', icon: '🏪' },
    diasporaGiving: { enabled: true, name: 'Diaspora Projects & Paystack Giving', icon: '🎁' },
    scholarships: { enabled: true, name: 'STEM Scholarships & Education Grants', icon: '🎓' },
    securityDispatch: { enabled: true, name: 'Emergency Incident Dispatch & CCTV Network', icon: '🚨' },
    communityForum: { enabled: true, name: 'Civic Deliberation & Community Forum', icon: '💬' },
    heritageQuiz: { enabled: true, name: 'Heritage Trivia & Leaderboard Certificates', icon: '🧠' },
    palaceLiveTv: { enabled: true, name: 'Aakarigbo Palace TV & Live Ceremony Broadcast', icon: '📺' },
    bloodDonors: { enabled: true, name: 'Emergency Voluntary Blood Bank Registry (OOUTH)', icon: '🩸' },
  },

  // 3. Monetization & Payment Gateways
  payments: {
    paystackEnabled: true,
    paystackPublicKey: 'pk_test_d3a3d5b0c9a4561234567890abcdef12345678',
    idCardFeeNaira: 2500,
    marketplaceListingFeeNaira: 1000,
    landSearchFeeNaira: 5000,
  },

  // 4. Sitewide Live Announcement Banner
  broadcast: {
    enabled: true,
    type: 'royal',
    message: '👑 Welcome to the Official Portal of Sagamu Remoland. Seat of The Akarigbo. Annual Sagamu Day and civic registrations are active.',
    ctaLabel: 'Learn More',
    ctaLink: '/diaspora',
    expiresAt: null,
  },
};

/**
 * Get current SaaS Master Configuration
 */
export function getSaasConfig() {
  try {
    const raw = localStorage.getItem(SAAS_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_SAAS_CONFIG,
        ...parsed,
        identity: { ...DEFAULT_SAAS_CONFIG.identity, ...parsed.identity },
        modules: { ...DEFAULT_SAAS_CONFIG.modules, ...parsed.modules },
        payments: { ...DEFAULT_SAAS_CONFIG.payments, ...parsed.payments },
        broadcast: { ...DEFAULT_SAAS_CONFIG.broadcast, ...parsed.broadcast },
      };
    }
  } catch (err) {
    console.warn('Error reading SaaS config:', err);
  }
  return DEFAULT_SAAS_CONFIG;
}

/**
 * Save updated SaaS Master Configuration
 */
export function saveSaasConfig(newConfig) {
  try {
    localStorage.setItem(SAAS_CONFIG_KEY, JSON.stringify(newConfig));
    window.dispatchEvent(new CustomEvent('saas-config-updated', { detail: newConfig }));
    return true;
  } catch (err) {
    console.error('Error saving SaaS config:', err);
    return false;
  }
}

/**
 * Check if a specific module/feature flag is active
 */
export function isModuleEnabled(moduleKey) {
  const config = getSaasConfig();
  return config.modules[moduleKey]?.enabled !== false;
}
