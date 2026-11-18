import { MetadataRoute } from 'next';
import { localStore } from '@/lib/data-store';
import { isJobExpired } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://careerfind-india.vercel.app';

  const staticRoutes = [
    '',
    '/jobs',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/advertise',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Categories
  const categories = localStore.getCategories().map((c) => ({
    url: `${siteUrl}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }));

  // Jobs - Strictly exclude expired or unverified/unpublished jobs per requirements
  const jobs = localStore
    .getAllJobsAdmin()
    .filter((j) => j.is_published && !isJobExpired(j.application_deadline))
    .map((j) => ({
      url: `${siteUrl}/jobs/${j.slug}`,
      lastModified: new Date(j.last_verified_at || j.posted_at || Date.now()),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    }));

  // Blog posts
  const blogs = localStore.getBlogPosts().map((b) => ({
    url: `${siteUrl}/blog/${b.slug}`,
    lastModified: new Date(b.published_at),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...categories, ...jobs, ...blogs];
}
