import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string): string {
  if (!dateString) return 'Ongoing';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';
  
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatTimeAgo(dateString?: string): string {
  if (!dateString) return 'Recently';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Recently';
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDate(dateString);
}

export function isJobExpired(deadline?: string): boolean {
  if (!deadline) return false;
  const deadlineDate = new Date(deadline);
  if (isNaN(deadlineDate.getTime())) return false;
  
  // End of deadline day (23:59:59)
  deadlineDate.setHours(23, 59, 59, 999);
  return new Date() > deadlineDate;
}

export function getDaysLeft(deadline?: string): number | null {
  if (!deadline) return null;
  const deadlineDate = new Date(deadline);
  if (isNaN(deadlineDate.getTime())) return null;
  
  deadlineDate.setHours(23, 59, 59, 999);
  const diff = deadlineDate.getTime() - new Date().getTime();
  if (diff <= 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatCurrencyLPA(val?: number): string {
  if (!val) return 'Competitive';
  if (val >= 100000) {
    const lpa = (val / 100000).toFixed(1).replace('.0', '');
    return `₹${lpa} LPA`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
}
