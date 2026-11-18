# CareerFind India – Production-Ready Job Portal

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=flat&logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

**CareerFind India** is a modern, high-performance, production-ready Indian job portal built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase PostgreSQL. It is designed to bridge the gap between Indian job seekers, engineering freshers, government exam aspirants, and verified corporate/public sector employers with 100% genuine recruitment circulars.

---

## 🌟 Key Features

### 1. Modern & Premium Design
- **Color Palette**: Clean white background with deep navy blue (`#0f172a` / `#1e293b`) and purple accents (`#7c3aed` / `#6366f1`).
- **Dark Mode**: Seamless theme switching using `next-themes` with persistent state.
- **Mobile-First Responsive Layout**: Drawer navigation on mobile, responsive filter sidebars, and fluid job cards.
- **Micro-Interactions**: Hover transitions, badge glows, status indicators, and subtle loading skeletons.

### 2. Comprehensive Indian Job Categories
Dedicated categories tailored specifically for Indian graduates and job seekers:
- **IT & Software**
- **Data Analyst & BI**
- **AI & Machine Learning**
- **Network Engineer**
- **Software Developer**
- **Non-IT Jobs (HR, Sales, Operations)**
- **Government & PSU Jobs** (ISRO, SBI, DRDO, Banking)
- **Work From Home / Remote (Pan-India)**
- **Internships** (Paid Tech & Trainee internships)
- **B.Tech Fresher Jobs** (TCS NQT, Infosys Off-Campus, Campus drives)
- **Walk-in Interviews** (Direct spot offers)
- **Graduate Trainee** (L&T GET, Management Trainees)

### 3. Detailed Job Listings & Verified Data Model
Each verified job listing includes:
- Role Title & Employer Name
- Official Employer Logo & Headquarters
- Location (Bengaluru, Hyderabad, Pune, Mumbai, Delhi NCR, Remote)
- Compensation in INR (LPA / Monthly Stipend)
- Experience Bracket (Fresher, 0-2 yrs, 2-5 yrs, 5+ yrs)
- Work Mode (In-Office, Hybrid, Work From Home)
- Educational Qualifications (B.Tech/B.E, MCA, BCA, Degree)
- Required Technical Skills
- Responsibilities & Eligibility Criteria
- Application Deadline with real-time countdown badge
- Direct Official Employer Apply URL
- Official Notification Source Link
- Verification Date Badge (`Verified 2d ago`)

### 4. Search, Filter & Sorting System
- **Live Search**: Query by keyword, skill, or employer name.
- **Multi-parameter Filters**: Filter by category, location, work mode, employment type, fresher eligibility, and government tags.
- **Sorting**: Sort by Latest Posted, Highest Salary, or Ending Soonest.
- **Pagination**: Scalable server-rendered pagination.

### 5. Google AdSense Monetization Architecture
Strictly follows Google Publisher Policies:
- **5 Reusable Placements**:
  - `homepage-banner`: Top leaderboard
  - `listing-infeed`: In-feed native placement between job search results
  - `job-details`: In-page placement below qualifications
  - `sidebar`: Sticky sidebar placement
  - `blog-inarticle`: Contextual placement in career advice articles
- **Strict Compliance**:
  - Advertisements are completely segregated from interactive application buttons and job titles.
  - Clearly marked with "Advertisement" or "Sponsored" labels.
  - Controlled by environment variables (`NEXT_PUBLIC_ADSENSE_CLIENT_ID` and `NEXT_PUBLIC_ADSENSE_ENABLED`).
  - No fake ads; remains dormant until publisher approval is configured.

### 6. SEO & Schema.org Optimization
- **Dynamic SEO Metadata**: Tailored page titles, descriptions, and canonical URLs.
- **Valid Schema.org/JobPosting**: Adheres strictly to Google Search guidelines (`hiringOrganization`, `jobLocation`, `datePosted`, `validThrough`, `employmentType`, `baseSalary`).
- **Expired Job Handling**: Automatically omits or invalidates expired jobs in structured data to prevent Google Search penalties.
- **Breadcrumbs Schema**: Hierarchical `BreadcrumbList` for Google rich snippets.
- **XML Sitemap**: Auto-generated dynamic sitemap at `/sitemap.xml`.
- **Robots.txt**: Crawl configuration at `/robots.txt`.

### 7. Secure Admin Control Center
- **Protected Routes**: `/admin`, `/admin/jobs`, `/admin/jobs/new`, `/admin/jobs/edit/[id]`, `/admin/categories`, `/admin/subscribers`.
- **Authentication**: Integrated with Supabase Auth (`admin_profiles` table) + instant Review Mode for demo testing.
- **Listing Management**: Add new verified jobs, edit details, toggle publish/unpublish, and remove obsolete drives.
- **Anti-Fraud Controls**: Mandatory official source URL and verification timestamps.

### 8. Statutory & Candidate Advisory Pages
- **About Us**: Mission, verification methodology, and standards.
- **Contact Us**: Interactive support desk + Grievance Officer details under Indian IT Rules, 2021.
- **Privacy Policy**: Compliant with the Indian Information Technology Act and DPDP Act 2023.
- **Terms & Conditions**: Intermediary rules and liability terms.
- **Recruitment Disclaimer**: Explicit notice that candidates must never pay money for job offers.
- **Advertise With Us**: Media kit specifications and brand partnership information.
- **Career Advice Blog**: ATS formatting guides, TCS NQT preparation, and Indian IT salary trends.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router, Server Components, Route Handlers) |
| **Language** | TypeScript (Strict mode enabled) |
| **Styling** | Tailwind CSS 3.4 with custom brand tokens |
| **Icons** | Lucide React |
| **Database** | Supabase (PostgreSQL with Row Level Security & Indexes) |
| **Authentication** | Supabase Auth + Admin Profile role checking |
| **Themes** | `next-themes` (Dark/Light mode) |
| **Deployment** | Vercel (Production zero-config edge deployment) |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v18.17.0` or later
- npm or pnpm / yarn

### 2. Clone and Install
```bash
git clone <repository-url>
cd "job portal"
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your variables in `.env.local`:
```env
# Public domain URL (used for canonical tags and OpenGraph)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase Credentials (supports publishable or anon key format)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Google AdSense Monetization (set when approved by Google)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ENABLED=false
NEXT_PUBLIC_ADSENSE_SHOW_PLACEHOLDERS=false
```

> **Note on Zero-Config Demo Mode & Graceful Fallback:**
> The app includes a built-in repository store pre-loaded with leading Indian enterprises (TCS, Infosys, Microsoft India, Google India, ISRO, SBI, Flipkart, Swiggy, HCLTech, L&T). The application runs completely out-of-the-box in local development with automatic fallback to prevent any downtime or crashes.

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Database Setup

When you are ready to connect a live Supabase PostgreSQL database:

1. Open your Supabase project dashboard at [https://supabase.com/dashboard](https://supabase.com/dashboard).
2. Navigate to the **SQL Editor** in the left sidebar.
3. Click **New Query**, copy the entire contents of `supabase/setup_all.sql` (or `supabase/schema.sql` followed by `supabase/seed.sql`), and click **Run**. This turnkey script will create:
   - `companies` table with performance indexes
   - `categories` table with display orders
   - `jobs` table with full-text search indexes & foreign keys
   - `blog_posts` table
   - `subscribers` table for email newsletters
   - `admin_profiles` table linked to Supabase `auth.users` with auto-registration trigger
   - Row Level Security (RLS) policies allowing public reads and authenticated admin writes
   - Auto-updating `updated_at` triggers
   - Pre-seeds initial verified job openings from top Indian recruiters
4. In **Authentication > Users**, create an admin user with an email and password.
5. In `.env.local`, ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or `NEXT_PUBLIC_SUPABASE_ANON_KEY`) match your project.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Sign in to [Vercel](https://vercel.com/) and click **New Project**.
3. Select your repository.
4. Add the environment variables:
   - `NEXT_PUBLIC_SITE_URL`: Your production domain (e.g., `https://careerfindindia.com`)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (if approved)
   - `NEXT_PUBLIC_ADSENSE_ENABLED` (`true` once approved)
5. Click **Deploy**. Vercel will automatically build and deploy your application.

---

## 🛡️ Anti-Fraud & Ethics Commitment

CareerFind India operates strictly under recruitment ethics:
- We never ask candidates for money, training charges, or registration fees.
- All "Apply Now" buttons direct users strictly to official employer domains.
- Job postings explicitly warn users about fraudulent job scams.
- Official source circulars and last-verified timestamps are transparently displayed for every opening.

---

## 📄 License
This project is licensed under the MIT License.
