'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { localStore, fetchCategories } from '@/lib/data-store';
import { Category } from '@/types/job';
import { FolderTree, ArrowLeft, PlusCircle, ExternalLink } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(localStore.getCategories());

  useEffect(() => {
    async function load() {
      const cats = await fetchCategories();
      if (cats && cats.length > 0) {
        setCategories(cats);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Admin Overview</span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Job Sectors & Categories ({categories.length})
          </h1>
          <p className="text-xs text-slate-500">
            Dedicated categories configured for the Indian recruitment market
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
            <tr>
              <th className="py-3 px-4">Order</th>
              <th className="py-3 px-4">Category Name</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Openings</th>
              <th className="py-3 px-4 text-right">View Public</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {categories.map((c, idx) => (
              <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                <td className="py-3 px-4 font-mono text-slate-400">{idx + 1}</td>
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  {c.name}
                </td>
                <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-[11px]">
                  /categories/{c.slug}
                </td>
                <td className="py-3 px-4 text-slate-500 max-w-xs truncate">
                  {c.description}
                </td>
                <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                  {c.job_count || 10}+
                </td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href={`/categories/${c.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:underline"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
