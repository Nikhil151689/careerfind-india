import React from 'react';
import { Job } from '@/types/job';
import { isJobExpired } from '@/lib/utils';

interface JobStructuredDataProps {
  job: Job;
  siteUrl?: string;
}

/**
 * Valid Schema.org/JobPosting & Schema.org/BreadcrumbList Structured Data
 * strictly adheres to Google Search Central guidelines:
 * - Omits or flags inactive postings if deadline has passed
 * - Includes valid hiringOrganization, jobLocation, datePosted, validThrough, etc.
 */
export default function JobStructuredData({ job, siteUrl = 'https://careerfind-india.vercel.app' }: JobStructuredDataProps) {
  const expired = isJobExpired(job.application_deadline);
  
  // Format dates strictly to ISO 8601
  const datePosted = new Date(job.posted_at || job.created_at || Date.now()).toISOString();
  
  // Default deadline 30 days from post date if not explicitly set
  const validThroughDate = job.application_deadline 
    ? new Date(job.application_deadline).toISOString()
    : new Date(new Date(datePosted).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

  // If expired or unpublished, DO NOT emit an active JobPosting schema to prevent Google Search penalties
  if (expired || !job.is_published) {
    return null;
  }

  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: `<p>${job.description}</p>`,
    identifier: {
      '@type': 'PropertyValue',
      name: job.company?.name || 'CareerFind India',
      value: job.id,
    },
    datePosted: datePosted,
    validThrough: validThroughDate,
    employmentType: job.job_type === 'Internship' ? 'INTERN' : job.job_type === 'Part-Time' ? 'PART_TIME' : job.job_type === 'Contract' ? 'CONTRACTOR' : 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company?.name || 'Recruiter',
      sameAs: job.company?.website_url || undefined,
      logo: job.company?.logo_url || undefined,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'IN',
      },
    },
    ...(job.is_wfh || job.work_mode === 'Work From Home' || job.work_mode === 'Remote' ? {
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: {
        '@type': 'Country',
        name: 'India',
      },
    } : {}),
    ...(job.salary_min && job.salary_max ? {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'INR',
        value: {
          '@type': 'QuantitativeValue',
          minValue: job.salary_min,
          maxValue: job.salary_max,
          unitText: 'YEAR',
        },
      },
    } : {}),
    qualifications: job.qualification,
    skills: job.skills.join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Jobs',
        item: `${siteUrl}/jobs`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: job.category?.name || 'Job Openings',
        item: job.category ? `${siteUrl}/categories/${job.category.slug}` : `${siteUrl}/jobs`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: job.title,
        item: `${siteUrl}/jobs/${job.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
