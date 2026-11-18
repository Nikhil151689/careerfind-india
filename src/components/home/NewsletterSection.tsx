'use client';

import React, { useState } from 'react';
import { Mail, Bell, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [selectedPreference, setSelectedPreference] = useState('All Jobs');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const preferences = ['All Jobs', 'IT & Software', 'B.Tech Freshers', 'Government / PSU', 'Remote / WFH'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          preferences: [selectedPreference],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'You have successfully subscribed to job alerts!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-8 relative overflow-hidden shadow-2xl">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-purple-200">
          <Bell className="w-3.5 h-3.5 text-amber-400" />
          <span>Never Miss an Off-Campus or PSU Drive</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Get Instant Indian Job Alerts in Your Inbox
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Join thousands of Indian job seekers who receive notifications about verified campus recruitment, government exams, and remote tech openings.
        </p>

        {/* Preference Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {preferences.map((pref) => (
            <button
              key={pref}
              type="button"
              onClick={() => setSelectedPreference(pref)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                selectedPreference === pref
                  ? 'bg-white text-indigo-950 shadow-md scale-105'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              {pref}
            </button>
          ))}
        </div>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2 pt-2">
          <div className="relative flex-1">
            <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:bg-white/15 focus:border-purple-400 backdrop-blur-md"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Subscribing...</span>
              </>
            ) : (
              <span>Subscribe Free</span>
            )}
          </button>
        </form>

        {/* Status messages */}
        {status === 'success' && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-xs font-medium animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs font-medium animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>{message}</span>
          </div>
        )}

        <p className="text-[11px] text-slate-400">
          No spam, ever. Unsubscribe at any time with one click.
        </p>
      </div>
    </section>
  );
}
