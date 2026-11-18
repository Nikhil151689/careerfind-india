'use client';

import React, { useEffect, useRef } from 'react';
import { ADSENSE_CONFIG, AdPlacement, isAdSenseActive, isPlacementActive } from '@/lib/adsense';

interface AdBannerProps {
  placement: AdPlacement;
  className?: string;
}

/**
 * Reusable Google AdSense banner component.
 *
 * Requirements:
 * 1. Responsive containers that match the website design.
 * 2. Clearly labeled as "Advertisement".
 * 3. Does not load advertisements or script until approved AdSense credentials are configured.
 * 4. Prevents layout shifts by reserving minimum height.
 * 5. Can be easily enabled/disabled per placement or globally.
 * 6. Kept separate from job cards, application buttons, and interactive content.
 */
export default function AdBanner({ placement, className = '' }: AdBannerProps) {
  const isApprovedAndActive = isAdSenseActive();
  const shouldRender = isPlacementActive(placement);
  const slotConfig = ADSENSE_CONFIG.slots[placement];
  const adPushedRef = useRef(false);

  useEffect(() => {
    // Only request real ad when approved and active
    if (isApprovedAndActive && typeof window !== 'undefined' && !adPushedRef.current) {
      try {
        // @ts-expect-error - adsbygoogle is injected by google script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adPushedRef.current = true;
      } catch (e) {
        // Suppress AdSense push errors if script is not ready or adblocker is present
      }
    }
  }, [isApprovedAndActive]);

  // If placement is disabled or not active (and placeholders are off), render nothing
  if (!shouldRender) {
    return null;
  }

  // Pre-configured dimensions and responsive classes for each placement
  const placementStyles: Record<AdPlacement, string> = {
    'homepage-top': 'w-full max-w-7xl mx-auto my-4 min-h-[90px] sm:min-h-[105px]',
    'homepage-infeed': 'w-full my-6 min-h-[120px]',
    'homepage-sidebar': 'w-full min-h-[280px] hidden lg:block',
    'job-details': 'w-full my-6 min-h-[120px] sm:min-h-[140px]',
    'blog-inarticle': 'w-full max-w-3xl mx-auto my-8 min-h-[120px]',
    'footer-banner': 'w-full max-w-7xl mx-auto my-6 min-h-[90px] sm:min-h-[105px]',
    'listing-infeed': 'w-full my-6 min-h-[120px]',
    'sidebar': 'w-full min-h-[280px] hidden lg:block',
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-200 border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-subtle ${
        placementStyles[placement] || ''
      } ${className}`}
      aria-label="Advertisement Container"
    >
      {/* Required clear label separating advertisement from site content */}
      <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/80">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {slotConfig?.label || 'Advertisement'}
        </span>
        <span className="text-[9px] text-slate-400 dark:text-slate-500">
          Google Sponsored
        </span>
      </div>

      {/* Ad slot area */}
      <div className="flex items-center justify-center p-3 min-h-[75px]">
        {isApprovedAndActive ? (
          <ins
            className="adsbygoogle block w-full text-center"
            style={{ display: 'block' }}
            data-ad-client={ADSENSE_CONFIG.clientId}
            data-ad-slot={slotConfig?.slotId}
            data-ad-format={slotConfig?.format || 'auto'}
            data-full-width-responsive={slotConfig?.responsive ? 'true' : 'false'}
          />
        ) : (
          /* Clean, non-intrusive reserved layout space shown only if NEXT_PUBLIC_ADSENSE_SHOW_PLACEHOLDERS is true */
          <div className="text-center py-4 px-3 w-full">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <span>Dedicated Ad Space</span>
              <span>&bull;</span>
              <code className="text-indigo-600 dark:text-indigo-400 font-mono text-[10px]">
                {placement}
              </code>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">
              Slot ID: <span className="font-mono">{slotConfig?.slotId || 'Configurable via ENV'}</span> &bull; Activates automatically upon Google AdSense approval.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
