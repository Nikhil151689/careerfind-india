'use client';

import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, AlertCircle, Share2, Copy, Check } from 'lucide-react';

interface ApplyButtonProps {
  applyUrl: string;
  sourceUrl?: string;
  jobTitle: string;
  companyName: string;
  isExpired?: boolean;
}

export default function ApplyButton({
  applyUrl,
  sourceUrl,
  jobTitle,
  companyName,
  isExpired = false,
}: ApplyButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${jobTitle} at ${companyName}`,
          text: `Check out this verified job opening: ${jobTitle} at ${companyName} on CareerFind India.`,
          url: window.location.href,
        });
      } catch {
        // Fallback to copy link
        copyLink();
      }
    } else {
      copyLink();
    }
  };

  const copyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isExpired) {
    return (
      <div className="space-y-3">
        <button
          disabled
          className="w-full py-3.5 px-6 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-500 font-bold text-center cursor-not-allowed"
        >
          Application Deadline Passed
        </button>
        <p className="text-xs text-center text-slate-500">
          This recruitment drive has concluded. Browse our latest active jobs.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main Apply Button */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-base shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 group"
        >
          <span>Apply on Official Portal</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        {/* Share and Copy row */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex-1 py-2.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Job</span>
          </button>
          <button
            onClick={copyLink}
            className="py-2.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            title="Copy Job Link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Security badge notice */}
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 flex items-start gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Verified Direct Link:</strong> You will be redirected to the genuine career portal of {companyName}. No registration fees required.
          </span>
        </div>
      </div>

      {/* Confirmation & Safety Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Leaving CareerFind India
                </h3>
                <p className="text-xs text-slate-500">Official Employer Redirection</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-2 text-xs text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <span>Anti-Fraud Candidate Security Notice</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                <li>Never pay any money for interview calls, aptitude tests, or offer letters.</li>
                <li>Legitimate employers like {companyName} never ask candidates for security deposits or laptop charges.</li>
                <li>Verify you are applying on the verified official domain before uploading sensitive documents.</li>
              </ul>
            </div>

            <div className="text-xs text-slate-500 break-all bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <strong>Target URL:</strong> {applyUrl}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <a
                href={applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
              >
                <span>Continue to Official Application</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
