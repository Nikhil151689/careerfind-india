/**
 * Google AdSense Configuration & Utility Module
 * CareerFind India
 * 
 * Complies with strict Google AdSense Publisher Policies:
 * - Transparent slot and publisher ID management via environment variables
 * - Clear labeling ("Advertisement")
 * - Isolated from navigation and interactive action buttons
 * - Disabled by default until publisher account is verified & approved
 * - Easy per-placement enable/disable toggles
 */

export type AdPlacement = 
  | 'homepage-top'
  | 'homepage-infeed'
  | 'homepage-sidebar'
  | 'job-details'
  | 'blog-inarticle'
  | 'footer-banner'
  | 'listing-infeed'
  | 'sidebar';

export interface AdSlotConfig {
  slotId: string;
  format: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive: boolean;
  label: string;
  enabled: boolean;
}

export const ADSENSE_CONFIG = {
  // Read from environment variable
  clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
  
  // Master toggle - only activated when approved by Google
  isEnabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true',
  
  // Clean non-intrusive layout placeholder during development review (never fake ads)
  showPlaceholders: process.env.NEXT_PUBLIC_ADSENSE_SHOW_PLACEHOLDERS === 'true',
  
  // Slot mappings with individual environment variable overrides and toggles
  slots: {
    'homepage-top': {
      slotId: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOMEPAGE_TOP || '1234567890',
      format: 'horizontal',
      responsive: true,
      label: 'Advertisement',
      enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLE_HOMEPAGE_TOP !== 'false',
    },
    'homepage-infeed': {
      slotId: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOMEPAGE_INFEED || '2345678901',
      format: 'fluid',
      responsive: true,
      label: 'Advertisement',
      enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLE_HOMEPAGE_INFEED !== 'false',
    },
    'homepage-sidebar': {
      slotId: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOMEPAGE_SIDEBAR || '3456789012',
      format: 'rectangle',
      responsive: true,
      label: 'Advertisement',
      enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLE_HOMEPAGE_SIDEBAR !== 'false',
    },
    'job-details': {
      slotId: process.env.NEXT_PUBLIC_ADSENSE_SLOT_JOB_DETAILS || '4567890123',
      format: 'auto',
      responsive: true,
      label: 'Advertisement',
      enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLE_JOB_DETAILS !== 'false',
    },
    'blog-inarticle': {
      slotId: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INARTICLE || '5678901234',
      format: 'fluid',
      responsive: true,
      label: 'Advertisement',
      enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLE_BLOG_INARTICLE !== 'false',
    },
    'footer-banner': {
      slotId: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER_BANNER || '6789012345',
      format: 'horizontal',
      responsive: true,
      label: 'Advertisement',
      enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLE_FOOTER_BANNER !== 'false',
    },
    // Aliases for search listings and sidebar
    'listing-infeed': {
      slotId: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOMEPAGE_INFEED || '2345678901',
      format: 'fluid',
      responsive: true,
      label: 'Advertisement',
      enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLE_HOMEPAGE_INFEED !== 'false',
    },
    'sidebar': {
      slotId: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOMEPAGE_SIDEBAR || '3456789012',
      format: 'rectangle',
      responsive: true,
      label: 'Advertisement',
      enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLE_HOMEPAGE_SIDEBAR !== 'false',
    },
  } as Record<AdPlacement, AdSlotConfig>,
};

/**
 * Checks if AdSense is actively configured, approved, and has a valid client ID
 */
export function isAdSenseActive(): boolean {
  return (
    ADSENSE_CONFIG.isEnabled &&
    !!ADSENSE_CONFIG.clientId &&
    ADSENSE_CONFIG.clientId.startsWith('ca-pub-') &&
    !ADSENSE_CONFIG.clientId.includes('XXXX')
  );
}

/**
 * Checks if a specific ad placement is currently allowed to render
 */
export function isPlacementActive(placement: AdPlacement): boolean {
  const slot = ADSENSE_CONFIG.slots[placement];
  if (!slot || !slot.enabled) return false;
  return isAdSenseActive() || ADSENSE_CONFIG.showPlaceholders;
}
