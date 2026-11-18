import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchBlogPostBySlug, fetchBlogPosts } from '@/lib/data-store';
import AdBanner from '@/components/ads/AdBanner';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Share2, 
  BookOpen,
  Briefcase
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await fetchBlogPostBySlug(params.slug);
  if (!post) {
    return { title: 'Article Not Found - CareerFind India' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://careerfind-india.vercel.app';
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} - CareerFind India`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      type: 'article',
      images: post.cover_image ? [{ url: post.cover_image }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await fetchBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allBlogs = await fetchBlogPosts();
  const otherPosts = allBlogs.filter((b) => b.id !== post.id).slice(0, 2);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://careerfind-india.vercel.app';
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image || undefined,
    datePublished: post.published_at,
    author: {
      '@type': 'Person',
      name: post.author_name,
      jobTitle: post.author_role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CareerFind India',
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800">
              {post.category}
            </span>
            <div className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.read_time}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(post.published_at)}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          {/* Author Byline */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center font-bold text-indigo-700 dark:text-indigo-300">
              {post.author_name[0]}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {post.author_name}
              </div>
              <div className="text-xs text-slate-500">
                {post.author_role}
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="rounded-3xl overflow-hidden shadow-lg max-h-[420px] w-full bg-slate-100 dark:bg-slate-800">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Main Content Body with In-Article Ad Placement */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-base leading-relaxed space-y-4">
          {post.content.split('\n\n').map((paragraph, index) => {
            const showInArticleAd = index === 2; // Injects after first major subsection
            return (
              <React.Fragment key={index}>
                {paragraph.startsWith('## ') ? (
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white pt-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                ) : paragraph.startsWith('### ') ? (
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                ) : paragraph.startsWith('> ') ? (
                  <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 dark:text-slate-300 my-4">
                    {paragraph.replace('> ', '')}
                  </blockquote>
                ) : (
                  <p className="leading-relaxed whitespace-pre-line">
                    {paragraph}
                  </p>
                )}

                {/* Google AdSense In-Article Placement */}
                {showInArticleAd && (
                  <div className="my-8 not-prose">
                    <AdBanner placement="blog-inarticle" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-slate-400" />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        {otherPosts.length > 0 && (
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              More Recommended Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherPosts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors space-y-2 block"
                >
                  <span className="text-xs text-indigo-600 font-semibold">{p.category}</span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
