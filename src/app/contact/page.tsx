'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, ShieldAlert, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setFeedback(data.message || 'Your inquiry has been submitted successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setFeedback(data.error || 'Failed to submit inquiry.');
      }
    } catch {
      setStatus('error');
      setFeedback('An unexpected connection error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Contact CareerFind India
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Have an inquiry, need assistance with a job link, or want to report suspicious recruitment activity? Our support and grievance desk is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info & Grievance Desk */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Official Contact Desk
            </h2>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">General Support & Enquiries</div>
                  <a href="mailto:careerfindjobssupport@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs font-semibold">
                    careerfindjobssupport@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Fraud & Fake Job Reporting</div>
                  <a href="mailto:careerfindjobssupport@gmail.com" className="text-amber-600 dark:text-amber-400 hover:underline text-xs font-semibold">
                    careerfindjobssupport@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Digital Operations & Coverage</div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Online Job Information Portal<br />
                    Serving Job Seekers & Freshers Across Bengaluru, Hyderabad, Pune, Mumbai, Delhi NCR, and All India.<br />
                    All support correspondence is handled directly via email.
                  </p>
                </div>
              </div>
            </div>

            {/* Grievance Officer statutory notice */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
              <div className="font-bold text-slate-700 dark:text-slate-300">
                Grievance Officer (IT Rules, 2021)
              </div>
              <p>Email: <a href="mailto:careerfindjobssupport@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">careerfindjobssupport@gmail.com</a></p>
              <p>Acknowledgement within 24 hours; resolution within 15 days.</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Send us a Message
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. rahul.sharma@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Subject *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Question about TCS NQT link or job verification"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Message *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please provide details of your inquiry or grievance..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            {status === 'success' && (
              <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{feedback}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{feedback}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
