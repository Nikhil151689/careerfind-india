import { Job, Company, Category, BlogPost, JobFilterParams, Subscriber } from '@/types/job';
import { isSupabaseConfigured, getSupabaseClient } from './supabase';
import { slugify, isJobExpired } from './utils';

// ==============================================================================
// SEED DATA FOR PRODUCTION FALLBACK / LOCAL DEV
// ==============================================================================

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'c-it-software',
    name: 'IT & Software',
    slug: 'it-software',
    description: 'Software engineering, cloud, full-stack and IT consulting jobs',
    icon_name: 'Code2',
    badge_color: 'blue',
    display_order: 1,
    job_count: 24,
  },
  {
    id: 'c-data-analyst',
    name: 'Data Analyst',
    slug: 'data-analyst',
    description: 'Data analytics, business intelligence, SQL, Python and Tableau roles',
    icon_name: 'BarChart3',
    badge_color: 'indigo',
    display_order: 2,
    job_count: 12,
  },
  {
    id: 'c-ai-ml',
    name: 'AI & Machine Learning',
    slug: 'ai-machine-learning',
    description: 'Machine learning engineering, NLP, Generative AI & deep learning',
    icon_name: 'Cpu',
    badge_color: 'purple',
    display_order: 3,
    job_count: 8,
  },
  {
    id: 'c-network-engineer',
    name: 'Network Engineer',
    slug: 'network-engineer',
    description: 'Infrastructure, CCNA/CCNP, cloud networking and cybersecurity',
    icon_name: 'Network',
    badge_color: 'cyan',
    display_order: 4,
    job_count: 9,
  },
  {
    id: 'c-software-developer',
    name: 'Software Developer',
    slug: 'software-developer',
    description: 'Frontend, backend, mobile and system development positions',
    icon_name: 'Terminal',
    badge_color: 'blue',
    display_order: 5,
    job_count: 31,
  },
  {
    id: 'c-non-it-jobs',
    name: 'Non-IT Jobs',
    slug: 'non-it-jobs',
    description: 'Human resources, finance, sales, marketing and operations',
    icon_name: 'Users',
    badge_color: 'amber',
    display_order: 6,
    job_count: 15,
  },
  {
    id: 'c-government-jobs',
    name: 'Government Jobs',
    slug: 'government-jobs',
    description: 'PSU, banking, defense, SSC, UPSC and central/state government drives',
    icon_name: 'Landmark',
    badge_color: 'emerald',
    display_order: 7,
    job_count: 14,
  },
  {
    id: 'c-work-from-home',
    name: 'Work From Home',
    slug: 'work-from-home',
    description: '100% remote job opportunities across India',
    icon_name: 'Home',
    badge_color: 'violet',
    display_order: 8,
    job_count: 19,
  },
  {
    id: 'c-internships',
    name: 'Internships',
    slug: 'internships',
    description: 'Paid student & graduate internships in top tech and corporate firms',
    icon_name: 'GraduationCap',
    badge_color: 'rose',
    display_order: 9,
    job_count: 11,
  },
  {
    id: 'c-btech-fresher-jobs',
    name: 'B.Tech Fresher Jobs',
    slug: 'btech-fresher-jobs',
    description: 'Entry level campus & off-campus hiring for engineering freshers',
    icon_name: 'Sparkles',
    badge_color: 'teal',
    display_order: 10,
    job_count: 28,
  },
  {
    id: 'c-walk-in-interviews',
    name: 'Walk-in Interviews',
    slug: 'walk-in-interviews',
    description: 'Direct face-to-face recruitment drives and immediate joining drives',
    icon_name: 'MapPin',
    badge_color: 'orange',
    display_order: 11,
    job_count: 6,
  },
  {
    id: 'c-graduate-trainee',
    name: 'Graduate Trainee',
    slug: 'graduate-trainee',
    description: 'Management & engineering trainee programs across top Indian conglomerates',
    icon_name: 'Award',
    badge_color: 'sky',
    display_order: 12,
    job_count: 7,
  },
];

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-tcs',
    name: 'Tata Consultancy Services',
    slug: 'tcs',
    logo_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&auto=format&fit=crop&q=80',
    website_url: 'https://www.tcs.com/careers',
    industry: 'Information Technology',
    headquarters: 'Mumbai, Maharashtra',
    description: 'India’s largest multinational IT services and consulting company, part of the Tata Group.',
    verified: true,
  },
  {
    id: 'comp-infosys',
    name: 'Infosys',
    slug: 'infosys',
    logo_url: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=128&auto=format&fit=crop&q=80',
    website_url: 'https://www.infosys.com/careers',
    industry: 'Information Technology',
    headquarters: 'Bengaluru, Karnataka',
    description: 'Global leader in next-generation digital services and enterprise consulting.',
    verified: true,
  },
  {
    id: 'comp-microsoft',
    name: 'Microsoft India',
    slug: 'microsoft-india',
    logo_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80',
    website_url: 'https://careers.microsoft.com',
    industry: 'Technology & Cloud',
    headquarters: 'Hyderabad, Telangana',
    description: 'Microsoft India Development Center (IDC) is one of Microsoft’s premier engineering hubs worldwide.',
    verified: true,
  },
  {
    id: 'comp-google',
    name: 'Google India',
    slug: 'google-india',
    logo_url: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&auto=format&fit=crop&q=80',
    website_url: 'https://careers.google.com',
    industry: 'Internet & Software',
    headquarters: 'Bengaluru, Karnataka',
    description: 'Leading global search, cloud, AI, and consumer tech development centers in India.',
    verified: true,
  },
  {
    id: 'comp-flipkart',
    name: 'Flipkart',
    slug: 'flipkart',
    logo_url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=128&auto=format&fit=crop&q=80',
    website_url: 'https://www.flipkartcareers.com',
    industry: 'E-Commerce',
    headquarters: 'Bengaluru, Karnataka',
    description: 'India’s homegrown e-commerce powerhouse revolutionizing Indian digital commerce.',
    verified: true,
  },
  {
    id: 'comp-swiggy',
    name: 'Swiggy',
    slug: 'swiggy',
    logo_url: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=128&auto=format&fit=crop&q=80',
    website_url: 'https://careers.swiggy.com',
    industry: 'Food Tech & Quick Commerce',
    headquarters: 'Bengaluru, Karnataka',
    description: 'India’s top on-demand convenience and quick-delivery platform.',
    verified: true,
  },
  {
    id: 'comp-isro',
    name: 'ISRO (Indian Space Research Organisation)',
    slug: 'isro',
    logo_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=128&auto=format&fit=crop&q=80',
    website_url: 'https://www.isro.gov.in/Careers.html',
    industry: 'Government & Aerospace',
    headquarters: 'Bengaluru, Karnataka',
    description: 'National space agency of India under the Department of Space, Government of India.',
    verified: true,
  },
  {
    id: 'comp-sbi',
    name: 'State Bank of India',
    slug: 'sbi',
    logo_url: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=128&auto=format&fit=crop&q=80',
    website_url: 'https://sbi.co.in/web/careers',
    industry: 'Banking & Financial Services',
    headquarters: 'Mumbai, Maharashtra',
    description: 'India’s largest public sector bank and Fortune 500 financial institution.',
    verified: true,
  },
  {
    id: 'comp-hcl',
    name: 'HCLTech',
    slug: 'hcltech',
    logo_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=128&auto=format&fit=crop&q=80',
    website_url: 'https://www.hcltech.com/careers',
    industry: 'Information Technology',
    headquarters: 'Noida, Uttar Pradesh',
    description: 'Global technology company home to 220,000+ people across 60 countries.',
    verified: true,
  },
  {
    id: 'comp-lt',
    name: 'Larsen & Toubro (L&T)',
    slug: 'larsen-toubro',
    logo_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=128&auto=format&fit=crop&q=80',
    website_url: 'https://www.larsentoubro.com/corporate/careers',
    industry: 'Engineering & Infrastructure',
    headquarters: 'Mumbai, Maharashtra',
    description: 'Indian multinational conglomerate operating in technology, engineering, and manufacturing.',
    verified: true,
  },
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'TCS National Qualifier Test (NQT) - Ninja & Digital Cadre',
    slug: 'tcs-nqt-freshers-recruitment-2025-2026',
    company_id: 'comp-tcs',
    company: INITIAL_COMPANIES[0],
    category_id: 'c-btech-fresher-jobs',
    category: INITIAL_CATEGORIES[9],
    location: 'Pan India (Bengaluru, Pune, Hyderabad, Chennai, Delhi NCR)',
    work_mode: 'In-Office',
    job_type: 'Full-Time',
    experience_level: 'Fresher',
    experience_min: 0,
    experience_max: 1,
    salary_min: 360000,
    salary_max: 750000,
    salary_text: '₹3.6 - ₹7.5 LPA',
    qualification: 'B.E / B.Tech / M.E / M.Tech / MCA / M.Sc (CS/IT)',
    skills: ['Java', 'Python', 'C++', 'SQL', 'Data Structures', 'Algorithms'],
    description: 'Tata Consultancy Services is hiring fresh engineering and computer science graduates through the nationwide TCS NQT drive. High performers in the advanced test section are offered the Digital package (₹7.5 LPA) while others are offered the Ninja package (₹3.6 LPA).',
    responsibilities: [
      'Develop, test, and deploy enterprise applications across cloud and on-premise environments.',
      'Collaborate with agile sprint teams to deliver high quality code and technical documentation.',
      'Participate in continuous learning and skill upgrading via the TCS Elevate program.',
      'Contribute to bug fixes, system integrations, and client deliverable milestones.'
    ],
    eligibility_criteria: [
      'Minimum 60% or 6.0 CGPA throughout 10th, 12th, and Graduation.',
      'No active backlogs at the time of appearing for the process.',
      'Up to 2 years of permissible academic gap allowed with valid documentation.',
      'Year of Graduation: 2025 or 2026 batches.'
    ],
    application_deadline: '2026-12-31',
    official_apply_url: 'https://www.tcs.com/careers/india/entry-level-hiring',
    source_url: 'https://nextstep.tcs.com',
    last_verified_at: '2026-11-17T10:00:00Z',
    is_featured: true,
    is_fresher: true,
    is_government: false,
    is_wfh: false,
    is_walkin: false,
    is_internship: false,
    is_published: true,
    posted_at: '2026-11-15T08:30:00Z',
  },
  {
    id: 'job-2',
    title: 'Software Engineer II - Cloud & Distributed Systems',
    slug: 'microsoft-software-engineer-cloud-systems',
    company_id: 'comp-microsoft',
    company: INITIAL_COMPANIES[2],
    category_id: 'c-software-developer',
    category: INITIAL_CATEGORIES[4],
    location: 'Hyderabad, Telangana',
    work_mode: 'Hybrid',
    job_type: 'Full-Time',
    experience_level: '2-5 Years',
    experience_min: 2,
    experience_max: 5,
    salary_min: 1800000,
    salary_max: 3200000,
    salary_text: '₹18 - ₹32 LPA + Stock Options',
    qualification: 'B.Tech / M.Tech in Computer Science or related STEM field',
    skills: ['C#', '.NET Core', 'Azure', 'Microservices', 'Distributed Systems', 'Kubernetes'],
    description: 'Microsoft IDC Hyderabad is looking for an experienced Software Engineer II to architect scalable microservices powering Azure cloud computing platforms and mission-critical enterprise workloads.',
    responsibilities: [
      'Design and implement high-availability cloud services with sub-second latencies.',
      'Conduct code reviews, automate continuous delivery pipelines, and enforce zero-trust security.',
      'Troubleshoot complex production issues across multi-region Azure infrastructure.',
      'Collaborate with international engineering groups across Redmond and Europe.'
    ],
    eligibility_criteria: [
      '2+ years of professional software engineering experience building distributed systems.',
      'Solid foundation in algorithms, concurrency, and asynchronous programming.',
      'Prior hands-on experience with Microsoft Azure, AWS, or GCP.'
    ],
    application_deadline: '2026-12-20',
    official_apply_url: 'https://careers.microsoft.com',
    source_url: 'https://careers.microsoft.com/us/en/job/1762391',
    last_verified_at: '2026-11-16T14:00:00Z',
    is_featured: true,
    is_fresher: false,
    is_government: false,
    is_wfh: false,
    is_walkin: false,
    is_internship: false,
    is_published: true,
    posted_at: '2026-11-16T11:00:00Z',
  },
  {
    id: 'job-3',
    title: 'Machine Learning Engineer - Search & Recommendation',
    slug: 'google-ml-engineer-search-recommendation',
    company_id: 'comp-google',
    company: INITIAL_COMPANIES[3],
    category_id: 'c-ai-ml',
    category: INITIAL_CATEGORIES[2],
    location: 'Bengaluru, Karnataka',
    work_mode: 'Hybrid',
    job_type: 'Full-Time',
    experience_level: '2-5 Years',
    experience_min: 3,
    experience_max: 6,
    salary_min: 2800000,
    salary_max: 4800000,
    salary_text: '₹28 - ₹48 LPA + Equity',
    qualification: 'Master’s or Bachelor’s in CS, AI, Machine Learning or Mathematics',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'LLMs', 'Transformer Models', 'Vector Search'],
    description: 'Google India Engineering is seeking an ML Engineer to work on next-generation search relevance, generative intelligence models, and multilingual Indian language NLP engines.',
    responsibilities: [
      'Train, evaluate, and deploy deep learning models on large-scale distributed TPU clusters.',
      'Research and adapt state-of-the-art transformer architectures for low-latency inference.',
      'Collaborate with international research teams to publish and patent advancements.'
    ],
    eligibility_criteria: [
      'Strong track record in deep learning frameworks (TensorFlow, PyTorch, JAX).',
      'Proven expertise in NLP, Information Retrieval, or Computer Vision.',
      'Strong coding proficiency in Python and C++.'
    ],
    application_deadline: '2026-12-15',
    official_apply_url: 'https://careers.google.com',
    source_url: 'https://careers.google.com/jobs/results/93821034',
    last_verified_at: '2026-11-16T09:00:00Z',
    is_featured: true,
    is_fresher: false,
    is_government: false,
    is_wfh: false,
    is_walkin: false,
    is_internship: false,
    is_published: true,
    posted_at: '2026-11-14T10:00:00Z',
  },
  {
    id: 'job-4',
    title: 'Scientist / Engineer ‘SC’ (Computer Science & Electronics)',
    slug: 'isro-scientist-engineer-sc-recruitment-2025',
    company_id: 'comp-isro',
    company: INITIAL_COMPANIES[6],
    category_id: 'c-government-jobs',
    category: INITIAL_CATEGORIES[6],
    location: 'Bengaluru / Thiruvananthapuram / Sriharikota',
    work_mode: 'In-Office',
    job_type: 'Full-Time',
    experience_level: 'Fresher',
    experience_min: 0,
    experience_max: 2,
    salary_min: 900000,
    salary_max: 1200000,
    salary_text: 'Level 10 Pay Matrix (Approx. ₹85,000 - ₹1,05,000/month + Perks)',
    qualification: 'First Class B.E / B.Tech in CS / IT / Electronics with min 65% or 6.84 CGPA',
    skills: ['Embedded Systems', 'C/C++', 'RTOS', 'Linux Kernel', 'Satellite Telemetry'],
    description: 'Indian Space Research Organisation (ISRO) Centralised Recruitment Board (ICRB) invites applications for Scientist/Engineer ‘SC’ positions across ISRO centres for satellite mission software and payload telemetry.',
    responsibilities: [
      'Develop mission-critical flight software and real-time telemetry processing systems.',
      'Conduct hardware-in-the-loop (HIL) testing for launch vehicle flight control modules.',
      'Ensure absolute fault tolerance and adherence to aerospace software safety standards.'
    ],
    eligibility_criteria: [
      'Valid GATE score or clearance of ISRO Centralised Written Examination.',
      'Must be an Indian Citizen.',
      'Age limit: Not exceeding 28 years (relaxable for reserved categories).'
    ],
    application_deadline: '2026-12-10',
    official_apply_url: 'https://www.isro.gov.in/Careers.html',
    source_url: 'https://www.isac.gov.in',
    last_verified_at: '2026-11-15T15:00:00Z',
    is_featured: true,
    is_fresher: true,
    is_government: true,
    is_wfh: false,
    is_walkin: false,
    is_internship: false,
    is_published: true,
    posted_at: '2026-11-13T12:00:00Z',
  },
  {
    id: 'job-5',
    title: 'Senior Data Analyst - Growth & Customer Insights',
    slug: 'swiggy-senior-data-analyst-growth',
    company_id: 'comp-swiggy',
    company: INITIAL_COMPANIES[5],
    category_id: 'c-data-analyst',
    category: INITIAL_CATEGORIES[1],
    location: 'Bengaluru, Karnataka',
    work_mode: 'Hybrid',
    job_type: 'Full-Time',
    experience_level: '2-5 Years',
    experience_min: 2,
    experience_max: 4,
    salary_min: 1400000,
    salary_max: 2200000,
    salary_text: '₹14 - ₹22 LPA',
    qualification: 'Degree in Statistics, Engineering, Economics, or Mathematics',
    skills: ['SQL', 'Python', 'Tableau', 'Cohort Analysis', 'A/B Testing', 'Snowflake'],
    description: 'Join Swiggy’s Growth Analytics pod to analyze millions of consumer orders daily, optimize user retention cohorts, and define data-driven discounting and loyalty algorithms.',
    responsibilities: [
      'Build and maintain executive Tableau dashboards tracking daily active users and retention.',
      'Formulate hypotheses and lead end-to-end A/B test experiments for app features.',
      'Translate complex SQL data pipelines into clear business insights for product managers.'
    ],
    eligibility_criteria: [
      'Expertise in complex SQL queries (window functions, indexing, CTEs).',
      'Strong hands-on experience with statistical modeling and hypothesis testing in Python/R.',
      'Prior experience in e-commerce, quick commerce, or fintech is a big plus.'
    ],
    application_deadline: '2026-12-08',
    official_apply_url: 'https://careers.swiggy.com',
    source_url: 'https://careers.swiggy.com/jobs/analytics-sr-da',
    last_verified_at: '2026-11-17T09:00:00Z',
    is_featured: false,
    is_fresher: false,
    is_government: false,
    is_wfh: false,
    is_walkin: false,
    is_internship: false,
    is_published: true,
    posted_at: '2026-11-15T14:00:00Z',
  },
  {
    id: 'job-6',
    title: 'Full-Stack Developer (React & Node.js) - 100% Remote',
    slug: 'flipkart-full-stack-developer-remote',
    company_id: 'comp-flipkart',
    company: INITIAL_COMPANIES[4],
    category_id: 'c-work-from-home',
    category: INITIAL_CATEGORIES[7],
    location: 'Remote - Anywhere in India',
    work_mode: 'Work From Home',
    job_type: 'Full-Time',
    experience_level: '2-5 Years',
    experience_min: 2,
    experience_max: 5,
    salary_min: 1600000,
    salary_max: 2600000,
    salary_text: '₹16 - ₹26 LPA',
    qualification: 'B.Tech / MCA or equivalent practical experience',
    skills: ['React.js', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    description: 'Flipkart Commerce Cloud is looking for high-ownership Full-Stack Engineers to build developer tooling and merchant seller portals. This role is permanently remote anywhere in India.',
    responsibilities: [
      'Design responsive, accessible web applications using Next.js and Tailwind CSS.',
      'Implement resilient REST and GraphQL APIs using Node.js and PostgreSQL.',
      'Optimize Core Web Vitals to deliver ultra-fast loading across 2G/3G mobile networks in Tier 2/3 cities.'
    ],
    eligibility_criteria: [
      '3+ years of professional React and backend Node.js development experience.',
      'Demonstrated ability to write clean, type-safe code with unit and integration tests.',
      'Strong communication skills for asynchronous remote collaboration.'
    ],
    application_deadline: '2026-12-25',
    official_apply_url: 'https://www.flipkartcareers.com',
    source_url: 'https://www.flipkartcareers.com/job/remote-fs-eng',
    last_verified_at: '2026-11-17T11:00:00Z',
    is_featured: true,
    is_fresher: false,
    is_government: false,
    is_wfh: true,
    is_walkin: false,
    is_internship: false,
    is_published: true,
    posted_at: '2026-11-16T16:00:00Z',
  },
  {
    id: 'job-7',
    title: 'Probationary Officer (PO) - All India Recruitment',
    slug: 'sbi-probationary-officer-po-recruitment',
    company_id: 'comp-sbi',
    company: INITIAL_COMPANIES[7],
    category_id: 'c-government-jobs',
    category: INITIAL_CATEGORIES[6],
    location: 'Pan India (Branches across all states)',
    work_mode: 'In-Office',
    job_type: 'Full-Time',
    experience_level: 'Fresher',
    experience_min: 0,
    experience_max: 1,
    salary_min: 750000,
    salary_max: 950000,
    salary_text: '₹65,000 - ₹82,000/month (CTC approx ₹9.5 LPA)',
    qualification: 'Graduation in any discipline from a recognized University',
    skills: ['Banking Operations', 'Financial Analysis', 'Customer Relations', 'Credit Appraisal'],
    description: 'State Bank of India invites online applications from Indian citizens for appointment as Probationary Officers (PO). One of the most prestigious government banking careers in India.',
    responsibilities: [
      'Undergo comprehensive training across retail banking, rural credit, and forex operations.',
      'Manage branch accounting, customer service, and loan portfolio appraisals.',
      'Oversee cross-selling of financial products and maintain regulatory compliance.'
    ],
    eligibility_criteria: [
      'Must be a graduate in any discipline (B.A, B.Sc, B.Com, B.Tech, etc.) as of exam cutoff date.',
      'Age between 21 and 30 years with government category relaxations.',
      'Selection via Prelims, Mains, Psychometric Test, and Interview/Group Exercises.'
    ],
    application_deadline: '2026-12-12',
    official_apply_url: 'https://sbi.co.in/web/careers',
    source_url: 'https://sbi.co.in/web/careers/current-openings',
    last_verified_at: '2026-11-15T12:00:00Z',
    is_featured: true,
    is_fresher: true,
    is_government: true,
    is_wfh: false,
    is_walkin: false,
    is_internship: false,
    is_published: true,
    posted_at: '2026-11-12T09:00:00Z',
  },
  {
    id: 'job-8',
    title: 'Software Engineer Intern (6 Months - Summer 2025/2026)',
    slug: 'infosys-software-engineer-internship',
    company_id: 'comp-infosys',
    company: INITIAL_COMPANIES[1],
    category_id: 'c-internships',
    category: INITIAL_CATEGORIES[8],
    location: 'Mysuru / Bengaluru, Karnataka',
    work_mode: 'In-Office',
    job_type: 'Internship',
    experience_level: 'Fresher',
    experience_min: 0,
    experience_max: 0,
    salary_min: 30000,
    salary_max: 35000,
    salary_text: '₹30,000/month Stipend + PPO Opportunity',
    qualification: 'Pre-final or Final Year B.E / B.Tech / M.Tech / MCA students',
    skills: ['Java', 'Spring Boot', 'SQL', 'Git', 'HTML/CSS', 'Problem Solving'],
    description: 'Infosys InStep & Campus Connect is offering 6-month paid software internships. Top performers are directly extended full-time Specialist Programmer or Systems Engineer pre-placement offers (PPO).',
    responsibilities: [
      'Work alongside senior architects on real enterprise digital transformation projects.',
      'Complete world-class software development modules at the Infosys Mysuru Global Education Centre.',
      'Build automated test suites and deploy microservices.'
    ],
    eligibility_criteria: [
      'Current undergraduate or postgraduate student graduating in 2025 or 2026.',
      'Strong problem solving and foundational knowledge of object-oriented programming.',
      'Minimum 65% aggregate with zero active backlogs.'
    ],
    application_deadline: '2026-12-30',
    official_apply_url: 'https://www.infosys.com/careers/instep',
    source_url: 'https://www.infosys.com',
    last_verified_at: '2026-11-16T17:00:00Z',
    is_featured: false,
    is_fresher: true,
    is_government: false,
    is_wfh: false,
    is_walkin: false,
    is_internship: true,
    is_published: true,
    posted_at: '2026-11-14T15:00:00Z',
  },
  {
    id: 'job-9',
    title: 'Mega Walk-In Interview: Cloud Network & Systems Engineer',
    slug: 'hcltech-mega-walkin-cloud-network-engineer',
    company_id: 'comp-hcl',
    company: INITIAL_COMPANIES[8],
    category_id: 'c-walk-in-interviews',
    category: INITIAL_CATEGORIES[10],
    location: 'Noida, Uttar Pradesh (HCL Tech SEZ Campus)',
    work_mode: 'In-Office',
    job_type: 'Walk-In',
    experience_level: '0-2 Years',
    experience_min: 0,
    experience_max: 3,
    salary_min: 450000,
    salary_max: 800000,
    salary_text: '₹4.5 - ₹8.0 LPA (Spot Offers)',
    qualification: 'B.Tech / B.Sc / BCA with CCNA certification preferred',
    skills: ['Cisco Routers', 'TCP/IP', 'VPN', 'Firewalls', 'AWS VPC', 'Linux CLI'],
    description: 'HCLTech is conducting a Mega Walk-in Interview drive at Noida Campus for Network Engineers, Cloud Support Specialists, and Infrastructure Analysts. Candidates with 0-3 years experience are welcome for spot technical rounds.',
    responsibilities: [
      'Monitor, configure and troubleshoot enterprise switches, routers and SD-WAN networks.',
      'Manage incident tickets, service requests, and perform L1/L2 network diagnostics.',
      'Support hybrid cloud network tunnels between on-premise datacenters and AWS/Azure.'
    ],
    eligibility_criteria: [
      'Walk-in with updated resume, govt photo ID proof, and last 3 months salary slips (if experienced).',
      'CCNA or Network+ certification will be given strong preference.',
      'Readiness to work in rotational 24x7 enterprise support shifts.'
    ],
    application_deadline: '2026-12-05',
    official_apply_url: 'https://www.hcltech.com/careers',
    source_url: 'https://www.hcltech.com/careers/walkin-drives-india',
    last_verified_at: '2026-11-17T08:00:00Z',
    is_featured: true,
    is_fresher: true,
    is_government: false,
    is_wfh: false,
    is_walkin: true,
    is_internship: false,
    is_published: true,
    posted_at: '2026-11-16T08:00:00Z',
  },
  {
    id: 'job-10',
    title: 'Graduate Engineer Trainee (GET) - 2025/2026 Batch',
    slug: 'larsen-toubro-get-graduate-engineer-trainee',
    company_id: 'comp-lt',
    company: INITIAL_COMPANIES[9],
    category_id: 'c-graduate-trainee',
    category: INITIAL_CATEGORIES[11],
    location: 'Mumbai / Chennai / Hazira / Vadodara',
    work_mode: 'In-Office',
    job_type: 'Full-Time',
    experience_level: 'Fresher',
    experience_min: 0,
    experience_max: 1,
    salary_min: 600000,
    salary_max: 850000,
    salary_text: '₹6.0 - ₹8.5 LPA + Accommodation',
    qualification: 'B.E / B.Tech in Mechanical, Electrical, Civil, or Instrumentation Engineering',
    skills: ['Engineering Design', 'AutoCAD', 'Project Management', 'Quality Control', 'Safety Standards'],
    description: 'Larsen & Toubro is inducting top engineering talent through its prestigious Graduate Engineer Trainee (GET) program across Hydrocarbon, Heavy Civil Infrastructure, and Smart World divisions.',
    responsibilities: [
      'Execute engineering calculations, blueprint validations, and on-site project planning.',
      'Monitor construction schedules, vendor deliverables, and quality assurance benchmarks.',
      'Participate in state-of-the-art automation and IoT deployment at major national infrastructure projects.'
    ],
    eligibility_criteria: [
      'First attempt B.E / B.Tech graduate with minimum 65% aggregate throughout schooling and college.',
      'Age not more than 24 years on July 1st of the graduating year.',
      'Strong leadership qualities and physical fitness for project site assignments.'
    ],
    application_deadline: '2026-12-18',
    official_apply_url: 'https://www.larsentoubro.com/corporate/careers',
    source_url: 'https://www.larsentoubro.com/corporate/careers/campus-recruitment',
    last_verified_at: '2026-11-15T18:00:00Z',
    is_featured: false,
    is_fresher: true,
    is_government: false,
    is_wfh: false,
    is_walkin: false,
    is_internship: false,
    is_published: true,
    posted_at: '2026-11-15T07:00:00Z',
  },
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How to Crack the TCS NQT: Complete Syllabus & Preparation Strategy',
    slug: 'how-to-crack-tcs-nqt-preparation-guide',
    excerpt: 'Everything you need to know about TCS National Qualifier Test: section-wise marks distribution, coding questions, and tips to secure the Digital (₹7.5 LPA) package.',
    content: `The TCS National Qualifier Test (NQT) is India's premier mass hiring assessment for engineering and science graduates. Every year, hundreds of thousands of candidates from the 2025 and 2026 batches compete for placement across the Ninja (₹3.6 LPA), Digital (₹7.5 LPA), and Prime (₹9.0 LPA) cadres.

In this comprehensive guide, the CareerFind India editorial desk details the test architecture, scoring patterns, and preparation milestones to help you maximize your assessment score.

## 1. Exam Structure & Section Breakdown

The TCS NQT assessment is conducted on the TCS iON platform and is split into two mandatory parts:

### Part A: Foundation Section (Cognitive Skills)
- **Numerical Ability (20 questions, 25 minutes)**: Number systems, arithmetic progression, percentages, time-speed-distance, work-time, probability, and data interpretation.
- **Verbal Ability (25 questions, 25 minutes)**: Sentence completion, para-jumbles, error spotting, vocabulary in context, and reading comprehension passages.
- **Reasoning Ability (20 questions, 25 minutes)**: Blood relations, direction sense, seating arrangements, syllogisms, and coding-decoding puzzles.

### Part B: Advanced Section (Technical & Coding)
- **Advanced Quantitative Ability (10 questions, 20 minutes)**: Higher-level combinatorics, geometry, probability, logarithms, and functions.
- **Advanced Reasoning Ability (10 questions, 15 minutes)**: Complex logical puzzles, analytical arguments, and flowchart inferences.
- **Hands-on Coding (2 questions, 55 minutes)**: 
  - *Question 1 (Easy-Medium)*: String manipulation, arrays, or matrix rotations (e.g., finding the longest non-repeating substring).
  - *Question 2 (Medium-Hard)*: Dynamic programming, sliding window, recursion, or graph traversal.

## 2. Qualifying Cutoffs for Ninja, Digital & Prime

- **Prime Cadre (₹9.0 LPA)**: Top 2-3% national percentile, flawless performance on both Advanced Coding problems, and high accuracy in Advanced Quants.
- **Digital Cadre (₹7.5 LPA)**: Complete pass of all test cases on Question 1, at least partial or full pass on Question 2, and >75% in the Advanced aptitude section.
- **Ninja Cadre (₹3.6 LPA)**: Solid score across the Foundation section with at least one coding question passing sample test cases.

## 3. Top Coding Patterns to Master

TCS iON's compiler supports C, C++, Java, and Python. We strongly recommend writing code in Java (version 8+) or C++ (with STL) to avoid Python recursion depth limits on edge cases:

1. **Arrays & Hash Maps**: Two-sum variations, frequency counting, finding majority elements.
2. **Strings**: Anagram checks, palindrome verification with alphanumeric filters, run-length encoding.
3. **Dynamic Programming**: 0/1 Knapsack, Coin Change problem, Longest Common Subsequence (LCS).
4. **Number Theory**: Prime factorization (Sieve of Eratosthenes), GCD/LCM Euclidean algorithm, modulo arithmetic.

## 4. Technical & HR Interview Checklist

Once you qualify in the written test, TCS calls candidates for a combined panel interview covering three perspectives:

- **Technical Round**: Deep dive into your final-year academic project. Be prepared to explain your system architecture, database schema, and trade-offs. Core questions focus on OOPs principles (Polymorphism vs Encapsulation), normalization (1NF to BCNF), and basic SQL queries (INNER vs LEFT JOIN).
- **Managerial Round**: Situational questions regarding project deadlines, team conflict resolution, and willingness to adapt to new tech stacks.
- **HR Round**: Verification of marksheets, academic gap declarations, location preferences, and rotational shift willingness.`,
    cover_image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    author_name: 'CareerFind Editorial Team',
    author_role: 'CareerFind India Research & Editorial Desk',
    category: 'Exam Preparation',
    tags: ['TCS NQT', 'Fresher Jobs', 'Campus Placements', 'Coding Interviews'],
    read_time: '8 min read',
    is_published: true,
    published_at: '2026-11-14T09:00:00Z',
  },
  {
    id: 'blog-2',
    title: 'Resume Formats That Pass Indian ATS Scanners: 7 Proven Rules for Freshers',
    slug: 'resume-formats-that-pass-indian-ats-scanners',
    excerpt: 'Learn how top Indian IT companies screen resumes automatically, and discover 7 essential rules to ensure your resume reaches real recruiters.',
    content: `Applicant Tracking Systems (ATS) reject over 70% of resumes before a human recruiter ever sees them. In the competitive Indian job market where a single opening at Infosys, Wipro, or Google receives tens of thousands of applications, having an ATS-compliant resume is non-negotiable.

## 1. Single-Column Layout is King
Multi-column layouts with tables, text boxes, and fancy graphics frequently scramble the parsing algorithms used by Taleo, Workday, and Greenhouse. Stick to a clean single-column format with standard margin spacing (0.5 to 0.75 inches).

## 2. Standard Section Headers
Never invent creative section names like "What I Did" or "My Toolbox". ATS parsers look for exact standard tokens:
- **Education**
- **Work Experience / Internships**
- **Technical Skills**
- **Projects**
- **Certifications & Achievements**

## 3. Match Keywords Naturally
Parse the target job description. If the opening mentions "PostgreSQL", "Next.js", and "REST APIs", ensure those exact phrases appear in your skills and project bullets rather than generic synonyms.

## 4. Quantify Your Impact (The XYZ Formula)
Instead of writing "Built frontend for website", write:
> "Engineered responsive Next.js frontend with Tailwind CSS, reducing page load times by 40% for over 25,000 active users."

## 5. Clean Contact Information
Include your official email address, mobile number, GitHub profile, LinkedIn profile, and city/state (e.g., "Bengaluru, Karnataka"). Never include sensitive personal details like date of birth, marital status, or photograph for tech applications.

## 6. Project Presentation Guidelines
For each project, structure the entry as:
- **Project Title & Live Link / GitHub Link**
- **Technologies Used**: React, Node.js, Express, MongoDB, Docker
- **Bullet 1**: Problem statement and architecture implemented.
- **Bullet 2**: Measurable outcome or performance optimization achieved.

## 7. File Format Advice
Save and submit your resume as a standard text-based PDF or .docx. Never upload image-based PDFs or scanned documents that optical character recognition (OCR) might misinterpret.`,
    cover_image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80',
    author_name: 'CareerFind Editorial Team',
    author_role: 'CareerFind India Research & Editorial Desk',
    category: 'Resume & ATS Tips',
    tags: ['Resume Tips', 'ATS Friendly', 'Career Advice', 'Job Search'],
    read_time: '6 min read',
    is_published: true,
    published_at: '2026-11-12T11:00:00Z',
  },
  {
    id: 'blog-3',
    title: 'Top Core Java, Spring Boot, and SQL Interview Questions for Indian IT Drives',
    slug: 'top-core-java-spring-boot-sql-interview-questions',
    excerpt: 'Master the high-frequency technical interview questions asked by TCS, Infosys, Wipro, Cognizant, and product firms for software developer positions.',
    content: `Java remains the foundational enterprise backbone for the Indian IT ecosystem. Whether you are interviewing for mass recruitment drives or product-focused companies, mastering Core Java, Spring Boot, and relational SQL is mandatory.

Here is the curated set of high-frequency interview questions with technical clarity.

## Part 1: Core Java Foundations

### 1. Difference between String, StringBuilder, and StringBuffer
- **String**: Immutable. Any modification creates a new object in the String Constant Pool (SCP).
- **StringBuilder**: Mutable, not thread-safe. Faster performance in single-threaded operations.
- **StringBuffer**: Mutable, thread-safe (methods are synchronized). Suitable for multi-threaded access.

### 2. How does HashMap work internally in Java 8+?
HashMap uses an array of Nodes (buckets), where each Node contains key, value, hash, and next pointer. When keys hash to the same bucket index (collision), they form a linked list. In Java 8, when a bucket exceeds 8 elements (TREEIFY_THRESHOLD) and the array capacity is at least 64, the linked list converts to a Red-Black Tree, reducing lookup time from O(n) to O(log n).

### 3. Equals() and HashCode() Contract
If two objects are equal according to \`equals()\`, they MUST return the same \`hashCode()\`. However, two objects returning the same \`hashCode()\` are not guaranteed to be equal (hash collision).

## Part 2: Spring Boot Microservices

### 1. Key Annotations in Spring Boot
- \`@RestController\`: Combination of \`@Controller\` and \`@ResponseBody\`.
- \`@Autowired\`: Enables dependency injection by type.
- \`@Transactional\`: Manages database transaction boundaries automatically.

### 2. How does Spring Boot Auto-Configuration Work?
Spring Boot inspects the classpath for dependencies (e.g., \`h2-database\`, \`spring-web\`) via \`@EnableAutoConfiguration\` and conditionally registers pre-configured Spring beans using \`@ConditionalOnClass\` and \`@ConditionalOnMissingBean\`.

## Part 3: High-Frequency SQL Queries

### 1. Finding the Nth Highest Salary
\`\`\`sql
SELECT DISTINCT salary 
FROM employees 
ORDER BY salary DESC 
LIMIT 1 OFFSET (N - 1);
\`\`\`
Or using window functions:
\`\`\`sql
WITH RankedSalaries AS (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rank_num
  FROM employees
)
SELECT salary FROM RankedSalaries WHERE rank_num = 2;
\`\`\`

### 2. Inner Join vs Left Join
- **INNER JOIN**: Returns only rows that have matching values in both tables.
- **LEFT JOIN**: Returns all rows from the left table, and matched rows from the right table; unmatched rows contain NULL.`,
    cover_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    author_name: 'CareerFind Editorial Team',
    author_role: 'CareerFind India Research & Editorial Desk',
    category: 'Technical Interviews',
    tags: ['Java', 'Spring Boot', 'SQL', 'Technical Interview', 'Coding'],
    read_time: '9 min read',
    is_published: true,
    published_at: '2026-11-10T10:00:00Z',
  },
  {
    id: 'blog-4',
    title: 'Data Analyst & Business Intelligence Career Roadmap for Indian Freshers',
    slug: 'data-analyst-bi-career-roadmap-india',
    excerpt: 'Step-by-step roadmap to transition into Data Analytics in India: essential SQL skills, Python libraries, Power BI/Tableau portfolios, and compensation expectations.',
    content: `With Indian fintech, quick-commerce, and SaaS organizations processing millions of daily transactions, Data Analysts and BI Specialists are among the fastest-growing hiring categories in Bengaluru, Hyderabad, Gurugram, and Pune.

This practical roadmap guides fresh graduates and career changers on acquiring in-demand analytics skills.

## Phase 1: Advanced SQL Mastery (Weeks 1-4)
SQL is the absolute cornerstone of all analytics interviews:
- **Foundations**: SELECT, WHERE, GROUP BY, HAVING, ORDER BY.
- **Joins**: INNER, LEFT, RIGHT, FULL OUTER, CROSS, and SELF joins.
- **Window Functions**: ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD().
- **Subqueries & Common Table Expressions (CTEs)**: Writing modular and optimized analytical queries.

## Phase 2: Business Intelligence Tool (Weeks 5-8)
Choose either **Power BI** (highly demanded in enterprise IT and finance) or **Tableau** (favored in product firms and startups):
- Data modeling (Star schema vs Snowflake schema).
- DAX calculations (CALCULATE, RELATED, ALL, SUMX).
- Interactive KPI dashboards with dynamic drill-through filters.

## Phase 3: Exploratory Data Analysis with Python (Weeks 9-12)
- **Pandas**: Data cleaning, handling missing values, pivoting, group-bys.
- **NumPy**: Matrix operations and vector math.
- **Matplotlib & Seaborn**: Statistical charting (histograms, box plots, heatmaps).

## Phase 4: Capstone Projects That Recruiters Notice
Avoid generic Titanic or Iris datasets. Build real-world Indian problem-domain dashboards:
1. **Indian E-Commerce Delivery Analytics**: Analyze delivery SLA breaches, customer ratings, and logistics costs across Indian postal codes.
2. **UPI Digital Payment Fraud Detection**: Analyze synthetic transaction records to spot anomalous high-velocity UPI transfers.

Publish your datasets and interactive dashboards on GitHub and NovyPro to provide tangible proof of competence.`,
    cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    author_name: 'CareerFind Editorial Team',
    author_role: 'CareerFind India Research & Editorial Desk',
    category: 'Career Roadmaps',
    tags: ['Data Analyst', 'SQL', 'Power BI', 'Python', 'Analytics Roadmap'],
    read_time: '7 min read',
    is_published: true,
    published_at: '2026-11-09T08:30:00Z',
  },
  {
    id: 'blog-5',
    title: 'AI & Machine Learning Engineer Career Roadmap in India: From Foundations to Production',
    slug: 'ai-machine-learning-engineer-career-roadmap-india',
    excerpt: 'A structured blueprint for becoming an AI/ML Engineer in India: mathematical foundations, deep learning frameworks, LLMs, and real-world deployment skills.',
    content: `The Indian software landscape is witnessing an unprecedented shift toward Artificial Intelligence. Global Capability Centers (GCCs) and product startups in Bengaluru, Hyderabad, and Pune are actively investing in Generative AI, Retrieval-Augmented Generation (RAG), and applied machine learning models.

Here is the realistic curriculum to build an enterprise-grade AI skill set.

## 1. Mathematical Foundations
Machine learning algorithms are grounded in mathematical principles:
- **Linear Algebra**: Vectors, matrices, eigenvalues, SVD, and dot products.
- **Multivariate Calculus**: Gradients, partial derivatives, chain rule (backpropagation).
- **Probability & Statistics**: Bayes' theorem, normal distributions, p-values, hypothesis testing.

## 2. Machine Learning Essentials
Master classical algorithms using Python and Scikit-Learn:
- **Supervised Learning**: Linear/Logistic Regression, Random Forests, XGBoost, LightGBM.
- **Unsupervised Learning**: K-Means clustering, PCA (Principal Component Analysis).
- **Evaluation Metrics**: Precision, Recall, F1-Score, ROC-AUC, Mean Squared Error (MSE).

## 3. Deep Learning & Transformers
- **Frameworks**: PyTorch (industry standard) or TensorFlow/Keras.
- **Architectures**: Convolutional Neural Networks (CNNs) for vision, Recurrent/Transformer networks for text.
- **Attention Mechanism**: Self-attention, multi-head attention, and transformer encoders/decoders.

## 4. Modern Generative AI & LLM Engineering
- **Retrieval-Augmented Generation (RAG)**: Building knowledge-retrieval systems using LangChain, LlamaIndex, and Vector Databases (Pinecone, Chroma, pgvector).
- **Model Fine-Tuning**: LoRA and QLoRA on open-source weights (Llama 3, Mistral).
- **Production Serving**: Fast deployment via FastAPI, Docker, and ONNX Runtime.`,
    cover_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    author_name: 'CareerFind Editorial Team',
    author_role: 'CareerFind India Research & Editorial Desk',
    category: 'Career Roadmaps',
    tags: ['AI', 'Machine Learning', 'Python', 'PyTorch', 'Generative AI', 'Career Guide'],
    read_time: '8 min read',
    is_published: true,
    published_at: '2026-11-08T12:00:00Z',
  },
  {
    id: 'blog-6',
    title: 'How to Apply for Indian Government & PSU Jobs: Bank PO, SSC CGL & Engineering Drives',
    slug: 'how-to-prepare-apply-indian-government-psu-bank-exams',
    excerpt: 'A complete handbook on tracking, preparing for, and applying to Indian public sector openings: SBI PO, IBPS, SSC, UPSC, and GATE-based PSU recruitment.',
    content: `Government and Public Sector Undertaking (PSU) careers offer unparalleled job security, social prestige, and attractive pay structures governed by central/state pay commissions. However, navigating recruitment notifications, age criteria, and multi-tier exams requires strategic discipline.

Here is the complete candidate handbook for public sector opportunities.

## 1. Major Public Sector Categories in India

### Banking Sector (SBI & IBPS)
- **Positions**: Probationary Officer (PO), Specialist Officer (SO), and Clerical Cadres.
- **Exam Pattern**: Two-tier written exam (Prelims + Mains) followed by Group Exercises and Personal Interviews.
- **Key Focus**: Speed mathematics, English language, reasoning puzzles, and General & Financial Awareness.

### Staff Selection Commission (SSC CGL & CHSL)
- **Positions**: Assistant Section Officer (ASO), Income Tax Inspector, Central Excise Inspector.
- **Structure**: Computer-based Tier-I and Tier-II tests covering Quantitative Aptitude, Reasoning, English, and General Studies.

### Engineering PSUs via GATE
- **Organizations**: ISRO, DRDO, ONGC, NTPC, IOCL, BHEL, and PowerGrid.
- **Selection**: High percentile GATE score followed by GD and Technical Interview rounds.

## 2. Essential Documentation to Keep Ready
Public sector application portals are strict regarding paperwork:
1. **Valid Category Certificates**: EWS, OBC-NCL, SC, ST certificates issued in the central government format within the financial year.
2. **Academic Transcripts**: 10th marksheet (proof of date of birth), graduation degree certificate, and consolidated mark sheets.
3. **Identity Proof**: Aadhaar card, PAN card, or Voter ID with matching spellings across all records.

## 3. Official Portals to Bookmark
Never rely on unverified social media forwards. Always verify through:
- **SBI Careers**: sbi.co.in/web/careers
- **IBPS Official**: ibps.in
- **SSC Official**: ssc.gov.in
- **ISRO Careers**: isro.gov.in/Careers.html
- **Employment News Gazette**: employmentnews.gov.in`,
    cover_image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    author_name: 'CareerFind Editorial Team',
    author_role: 'CareerFind India Research & Editorial Desk',
    category: 'Government & PSU Jobs',
    tags: ['Government Jobs', 'Bank PO', 'SBI PO', 'SSC CGL', 'PSU Recruitment'],
    read_time: '7 min read',
    is_published: true,
    published_at: '2026-11-06T14:00:00Z',
  },
  {
    id: 'blog-7',
    title: 'IT Salary Trends in India: What Developers & Data Engineers Earn',
    slug: 'it-salary-trends-in-india-developer-guide',
    excerpt: 'A realistic breakdown of compensation packages across Service companies, Product unicorns, and Global Capability Centers (GCCs) in Bengaluru, Hyderabad & Pune.',
    content: `The Indian tech compensation ecosystem has undergone a significant transformation with the rapid expansion of Global Capability Centers (GCCs) across Bengaluru, Hyderabad, and Pune.

## Tier Breakdown for Indian Tech Roles

### 1. Entry Level (0-2 Years)
- **Mass IT Service Companies** (TCS Ninja, Infosys, Wipro, Cognizant): ₹3.6 - ₹4.5 LPA
- **Specialist & Digital Streams** (TCS Digital, Infosys SP): ₹7.0 - ₹9.5 LPA
- **Product Startups & Funded Unicorns**: ₹12.0 - ₹22.0 LPA
- **Tier-1 Tech & GCCs** (Google, Microsoft, Amazon, Uber): ₹24.0 - ₹45.0 LPA (including stock grants)

### 2. Mid Level (3-6 Years)
Full-Stack Developers proficient in Next.js, Node.js, and Cloud Infrastructure are witnessing high demand, with median offers averaging ₹18 to ₹28 LPA in Bengaluru and Hyderabad.

### 3. AI & Data Engineering Surge
Roles involving LLM fine-tuning, vector databases, and enterprise data pipelines are commanding a 35% salary premium over traditional web engineering.`,
    cover_image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    author_name: 'CareerFind Editorial Team',
    author_role: 'CareerFind India Research & Editorial Desk',
    category: 'Salary & Market Insights',
    tags: ['Salary Trends', 'Tech Jobs', 'Bengaluru IT', 'GCC India'],
    read_time: '6 min read',
    is_published: true,
    published_at: '2026-11-05T16:30:00Z',
  },
];

// ==============================================================================
// IN-MEMORY MUTABLE REPOSITORY (FOR SEAMLESS DEMO & ZERO-CONFIG LOCAL DEV)
// ==============================================================================

class LocalJobStore {
  private jobs: Job[] = [...INITIAL_JOBS];
  private categories: Category[] = [...INITIAL_CATEGORIES];
  private companies: Company[] = [...INITIAL_COMPANIES];
  private blogs: BlogPost[] = [...INITIAL_BLOGS];
  private subscribers: Subscriber[] = [];

  // ---------------------------------------------------------------------------
  // JOBS
  // ---------------------------------------------------------------------------
  public getJobs(params: JobFilterParams = {}): { jobs: Job[]; total: number; totalPages: number } {
    let result = this.jobs.filter((j) => j.is_published && !isJobExpired(j.application_deadline));

    if (params.query) {
      const q = params.query.toLowerCase().trim();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company?.name.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q)) ||
          j.qualification.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q)
      );
    }

    if (params.location) {
      const loc = params.location.toLowerCase().trim();
      result = result.filter((j) => j.location.toLowerCase().includes(loc));
    }

    if (params.category) {
      const catSlug = params.category.toLowerCase();
      result = result.filter((j) => j.category?.slug.toLowerCase() === catSlug || j.category_id === catSlug);
    }

    if (params.experience) {
      const exp = params.experience.toLowerCase();
      if (exp === 'fresher') {
        result = result.filter((j) => j.is_fresher || j.experience_level === 'Fresher' || j.experience_min === 0);
      } else {
        result = result.filter((j) => j.experience_level.toLowerCase().includes(exp));
      }
    }

    if (params.jobType) {
      result = result.filter((j) => j.job_type.toLowerCase() === params.jobType?.toLowerCase());
    }

    if (params.workMode) {
      result = result.filter((j) => j.work_mode.toLowerCase() === params.workMode?.toLowerCase());
    }

    if (params.isFresher) {
      result = result.filter((j) => j.is_fresher);
    }

    if (params.isGovernment) {
      result = result.filter((j) => j.is_government);
    }

    if (params.isWfh) {
      result = result.filter((j) => j.is_wfh || j.work_mode === 'Work From Home' || j.work_mode === 'Remote');
    }

    if (params.isFeatured) {
      result = result.filter((j) => j.is_featured);
    }

    if (params.isInternship) {
      result = result.filter((j) => j.is_internship || j.job_type === 'Internship');
    }

    if (params.isWalkin) {
      result = result.filter((j) => j.is_walkin || j.job_type === 'Walk-In');
    }

    // Sorting
    if (params.sortBy === 'salary_desc') {
      result.sort((a, b) => (b.salary_max || 0) - (a.salary_max || 0));
    } else if (params.sortBy === 'deadline_asc') {
      result.sort((a, b) => {
        if (!a.application_deadline) return 1;
        if (!b.application_deadline) return -1;
        return new Date(a.application_deadline).getTime() - new Date(b.application_deadline).getTime();
      });
    } else {
      // Default: latest posted
      result.sort((a, b) => new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime());
    }

    const total = result.length;
    const limit = params.limit || 10;
    const page = params.page || 1;
    const offset = (page - 1) * limit;
    const paginated = result.slice(offset, offset + limit);

    return {
      jobs: paginated,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  public getAllJobsAdmin(): Job[] {
    return [...this.jobs].sort((a, b) => new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime());
  }

  public getJobBySlug(slug: string): Job | undefined {
    return this.jobs.find((j) => j.slug === slug);
  }

  public getJobById(id: string): Job | undefined {
    return this.jobs.find((j) => j.id === id);
  }

  public getRelatedJobs(currentJobId: string, categoryId?: string, limit: number = 3): Job[] {
    return this.jobs
      .filter((j) => j.id !== currentJobId && j.is_published && (!categoryId || j.category_id === categoryId))
      .slice(0, limit);
  }

  public createJob(jobData: Partial<Job>): Job {
    const company = this.companies.find((c) => c.id === jobData.company_id) || this.companies[0];
    const category = this.categories.find((c) => c.id === jobData.category_id);
    const newSlug = jobData.slug || slugify(`${company.name} ${jobData.title} ${Date.now()}`);

    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: jobData.title || 'Untitled Role',
      slug: newSlug,
      company_id: company.id,
      company,
      category_id: category?.id,
      category,
      location: jobData.location || 'Bengaluru, Karnataka',
      work_mode: jobData.work_mode || 'In-Office',
      job_type: jobData.job_type || 'Full-Time',
      experience_level: jobData.experience_level || '0-2 Years',
      experience_min: jobData.experience_min || 0,
      experience_max: jobData.experience_max || 2,
      salary_min: jobData.salary_min,
      salary_max: jobData.salary_max,
      salary_text: jobData.salary_text || 'Competitive',
      qualification: jobData.qualification || 'Graduate Degree',
      skills: jobData.skills || [],
      description: jobData.description || '',
      responsibilities: jobData.responsibilities || [],
      eligibility_criteria: jobData.eligibility_criteria || [],
      application_deadline: jobData.application_deadline,
      official_apply_url: jobData.official_apply_url || 'https://careers.google.com',
      source_url: jobData.source_url,
      last_verified_at: new Date().toISOString(),
      is_featured: !!jobData.is_featured,
      is_fresher: !!jobData.is_fresher,
      is_government: !!jobData.is_government,
      is_wfh: !!jobData.is_wfh,
      is_walkin: !!jobData.is_walkin,
      is_internship: !!jobData.is_internship,
      is_published: jobData.is_published !== undefined ? jobData.is_published : true,
      posted_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    this.jobs.unshift(newJob);
    return newJob;
  }

  public updateJob(id: string, updates: Partial<Job>): Job | null {
    const index = this.jobs.findIndex((j) => j.id === id);
    if (index === -1) return null;

    const existing = this.jobs[index];
    const company = updates.company_id ? this.companies.find((c) => c.id === updates.company_id) || existing.company : existing.company;
    const category = updates.category_id ? this.categories.find((c) => c.id === updates.category_id) || existing.category : existing.category;

    const updatedJob: Job = {
      ...existing,
      ...updates,
      company,
      category,
      updated_at: new Date().toISOString(),
    };

    this.jobs[index] = updatedJob;
    return updatedJob;
  }

  public deleteJob(id: string): boolean {
    const initialLen = this.jobs.length;
    this.jobs = this.jobs.filter((j) => j.id !== id);
    return this.jobs.length < initialLen;
  }

  public togglePublishJob(id: string): Job | null {
    const job = this.jobs.find((j) => j.id === id);
    if (!job) return null;
    job.is_published = !job.is_published;
    job.updated_at = new Date().toISOString();
    return job;
  }

  // ---------------------------------------------------------------------------
  // CATEGORIES & COMPANIES
  // ---------------------------------------------------------------------------
  public getCategories(): Category[] {
    return [...this.categories].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }

  public getCategoryBySlug(slug: string): Category | undefined {
    return this.categories.find((c) => c.slug === slug);
  }

  public getCompanies(): Company[] {
    return [...this.companies];
  }

  public getCompanyBySlug(slug: string): Company | undefined {
    return this.companies.find((c) => c.slug === slug);
  }

  // ---------------------------------------------------------------------------
  // BLOG POSTS
  // ---------------------------------------------------------------------------
  public getBlogPosts(): BlogPost[] {
    return [...this.blogs].filter((b) => b.is_published);
  }

  public getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this.blogs.find((b) => b.slug === slug && b.is_published);
  }

  // ---------------------------------------------------------------------------
  // SUBSCRIBERS
  // ---------------------------------------------------------------------------
  public addSubscriber(email: string, category_preferences: string[] = []): boolean {
    const cleanEmail = email.toLowerCase().trim();
    if (this.subscribers.some((s) => s.email === cleanEmail)) {
      return true; // Already subscribed
    }
    this.subscribers.push({
      id: `sub-${Date.now()}`,
      email: cleanEmail,
      category_preferences,
      is_active: true,
      subscribed_at: new Date().toISOString(),
    });
    return true;
  }

  public getSubscribers(): Subscriber[] {
    return [...this.subscribers];
  }

  // ---------------------------------------------------------------------------
  // STATS FOR ADMIN DASHBOARD
  // ---------------------------------------------------------------------------
  public getStats() {
    const totalJobs = this.jobs.length;
    const activeJobs = this.jobs.filter((j) => j.is_published && !isJobExpired(j.application_deadline)).length;
    const expiredJobs = this.jobs.filter((j) => isJobExpired(j.application_deadline)).length;
    const featuredJobs = this.jobs.filter((j) => j.is_featured).length;
    const totalCompanies = this.companies.length;
    const totalCategories = this.categories.length;
    const totalSubscribers = this.subscribers.length;

    return {
      totalJobs,
      activeJobs,
      expiredJobs,
      featuredJobs,
      totalCompanies,
      totalCategories,
      totalSubscribers,
    };
  }
}

// Global Singleton for the store
export const localStore = new LocalJobStore();

// ==============================================================================
// HELPER FUNCTIONS FOR SUPABASE DATA MAPPING
// ==============================================================================

function isValidUUID(id?: string): boolean {
  if (!id) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

// ==============================================================================
// PUBLIC ASYNC API (Integrates Supabase when available, falls back to store)
// ==============================================================================

export async function fetchJobs(params: JobFilterParams = {}): Promise<{ jobs: Job[]; total: number; totalPages: number }> {
  const supabase = getSupabaseClient();
  
  if (supabase && isSupabaseConfigured) {
    try {
      let query = supabase
        .from('jobs')
        .select('*, company:companies(*), category:categories(*)', { count: 'exact' })
        .eq('is_published', true);

      // Automatically hide expired jobs from public listings
      const today = new Date().toISOString().split('T')[0];
      query = query.or(`application_deadline.is.null,application_deadline.gte.${today}`);

      if (params.query) {
        const q = params.query.trim();
        const { data: matchingComps } = await supabase.from('companies').select('id').ilike('name', `%${q}%`);
        const compIds = (matchingComps || []).map((c) => c.id);
        if (compIds.length > 0) {
          query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%,location.ilike.%${q}%,company_id.in.(${compIds.join(',')})`);
        } else {
          query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%,location.ilike.%${q}%`);
        }
      }

      if (params.location) {
        query = query.ilike('location', `%${params.location.trim()}%`);
      }

      if (params.category) {
        const { data: cat } = await supabase.from('categories').select('id').eq('slug', params.category).maybeSingle();
        if (cat?.id) {
          query = query.eq('category_id', cat.id);
        }
      }

      if (params.experience) {
        if (params.experience.toLowerCase() === 'fresher') {
          query = query.or('experience_level.eq.Fresher,is_fresher.eq.true,experience_min.eq.0');
        } else {
          query = query.eq('experience_level', params.experience);
        }
      }
      if (params.workMode) {
        query = query.eq('work_mode', params.workMode);
      }
      if (params.jobType) {
        query = query.eq('job_type', params.jobType);
      }
      if (params.isFresher) {
        query = query.eq('is_fresher', true);
      }
      if (params.isGovernment) {
        query = query.eq('is_government', true);
      }
      if (params.isWfh) {
        query = query.eq('is_wfh', true);
      }
      if (params.isFeatured) {
        query = query.eq('is_featured', true);
      }
      if (params.isInternship) {
        query = query.eq('is_internship', true);
      }
      if (params.isWalkin) {
        query = query.eq('is_walkin', true);
      }

      const limit = params.limit || 10;
      const page = params.page || 1;
      const offset = (page - 1) * limit;

      query = query.order('posted_at', { ascending: false }).range(offset, offset + limit - 1);

      const { data, count, error } = await query;
      if (!error && data && data.length > 0) {
        return {
          jobs: data as Job[],
          total: count || data.length,
          totalPages: Math.max(1, Math.ceil((count || data.length) / limit)),
        };
      }
    } catch {
      // Fallback on connection error
    }
  }

  // Local fallback
  return localStore.getJobs(params);
}

export async function fetchJobBySlug(slug: string): Promise<Job | null> {
  const supabase = getSupabaseClient();
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*, company:companies(*), category:categories(*)')
        .eq('slug', slug)
        .maybeSingle();
      if (!error && data) return data as Job;
    } catch {
      // fallback
    }
  }
  return localStore.getJobBySlug(slug) || null;
}

export async function fetchJobById(id: string): Promise<Job | null> {
  const supabase = getSupabaseClient();
  if (supabase && isSupabaseConfigured && isValidUUID(id)) {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*, company:companies(*), category:categories(*)')
        .eq('id', id)
        .maybeSingle();
      if (!error && data) return data as Job;
    } catch {
      // fallback
    }
  }
  return localStore.getJobById(id) || null;
}

export async function fetchRelatedJobs(currentJobId: string, categoryId?: string, limit: number = 3): Promise<Job[]> {
  const supabase = getSupabaseClient();
  if (supabase && isSupabaseConfigured) {
    try {
      let query = supabase
        .from('jobs')
        .select('*, company:companies(*), category:categories(*)')
        .eq('is_published', true)
        .limit(limit);

      if (isValidUUID(currentJobId)) {
        query = query.neq('id', currentJobId);
      }
      if (categoryId && isValidUUID(categoryId)) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as Job[];
      }
    } catch {
      // fallback
    }
  }
  return localStore.getRelatedJobs(currentJobId, categoryId, limit);
}

export async function fetchCategories(): Promise<Category[]> {
  const supabase = getSupabaseClient();
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('categories').select('*').order('display_order');
      if (!error && data && data.length > 0) return data as Category[];
    } catch {
      // fallback
    }
  }
  return localStore.getCategories();
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = getSupabaseClient();
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (!error && data) return data as Category;
    } catch {
      // fallback
    }
  }
  return localStore.getCategoryBySlug(slug) || null;
}

export async function fetchCompanies(): Promise<Company[]> {
  const supabase = getSupabaseClient();
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('companies').select('*').order('name');
      if (!error && data && data.length > 0) return data as Company[];
    } catch {
      // fallback
    }
  }
  return localStore.getCompanies();
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const supabase = getSupabaseClient();
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').eq('is_published', true).order('published_at', { ascending: false });
      if (!error && data && data.length > 0) return data as BlogPost[];
    } catch {
      // fallback
    }
  }
  return localStore.getBlogPosts();
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabaseClient();
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).maybeSingle();
      if (!error && data) return data as BlogPost;
    } catch {
      // fallback
    }
  }
  return localStore.getBlogPostBySlug(slug) || null;
}

// -----------------------------------------------------------------------------
// ADMIN OPERATIONS (Synchronized with Supabase & Local Fallback Store)
// -----------------------------------------------------------------------------

export async function fetchAllJobsAdmin(): Promise<Job[]> {
  const supabase = getSupabaseClient();
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*, company:companies(*), category:categories(*)')
        .order('posted_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as Job[];
      }
    } catch {
      // fallback
    }
  }
  return localStore.getAllJobsAdmin();
}

export async function fetchAdminStats() {
  const supabase = getSupabaseClient();
  if (supabase && isSupabaseConfigured) {
    try {
      const [jobsRes, companiesRes, categoriesRes, subRes] = await Promise.all([
        supabase.from('jobs').select('id, is_published, is_featured, application_deadline'),
        supabase.from('companies').select('id', { count: 'exact', head: true }),
        supabase.from('categories').select('id', { count: 'exact', head: true }),
        supabase.from('subscribers').select('id', { count: 'exact', head: true }),
      ]);

      if (!jobsRes.error && jobsRes.data) {
        const jobsList = jobsRes.data;
        const totalJobs = jobsList.length;
        const activeJobs = jobsList.filter((j) => j.is_published && !isJobExpired(j.application_deadline)).length;
        const expiredJobs = jobsList.filter((j) => isJobExpired(j.application_deadline)).length;
        const featuredJobs = jobsList.filter((j) => j.is_featured).length;
        const totalCompanies = companiesRes.count || 10;
        const totalCategories = categoriesRes.count || 12;
        const totalSubscribers = subRes.count || 1200;

        return {
          totalJobs,
          activeJobs,
          expiredJobs,
          featuredJobs,
          totalCompanies,
          totalCategories,
          totalSubscribers,
        };
      }
    } catch {
      // fallback
    }
  }
  return localStore.getStats();
}

export async function createJobAsync(jobData: Partial<Job>): Promise<Job> {
  const localJob = localStore.createJob(jobData);
  const supabase = getSupabaseClient();

  if (supabase && isSupabaseConfigured) {
    try {
      // 1. Resolve Company UUID if needed
      let targetCompanyId = jobData.company_id;
      if (!isValidUUID(targetCompanyId)) {
        const compSlug = jobData.company?.slug || (jobData.company_id ? jobData.company_id.replace('comp-', '') : '');
        const { data: dbComp } = await supabase.from('companies').select('id').eq('slug', compSlug).maybeSingle();
        if (dbComp?.id) {
          targetCompanyId = dbComp.id;
        } else {
          const { data: firstComp } = await supabase.from('companies').select('id').limit(1).maybeSingle();
          if (firstComp?.id) {
            targetCompanyId = firstComp.id;
          }
        }
      }

      // 2. Resolve Category UUID if needed
      let targetCategoryId = jobData.category_id;
      if (targetCategoryId && !isValidUUID(targetCategoryId)) {
        const catSlug = jobData.category?.slug || targetCategoryId.replace('c-', '');
        const { data: dbCat } = await supabase.from('categories').select('id').eq('slug', catSlug).maybeSingle();
        if (dbCat?.id) {
          targetCategoryId = dbCat.id;
        } else {
          targetCategoryId = undefined;
        }
      }

      if (targetCompanyId && isValidUUID(targetCompanyId)) {
        const payload: Record<string, unknown> = {
          title: jobData.title || 'Untitled Role',
          slug: jobData.slug || slugify(`${jobData.title} ${Date.now()}`),
          company_id: targetCompanyId,
          category_id: targetCategoryId && isValidUUID(targetCategoryId) ? targetCategoryId : null,
          location: jobData.location || 'Bengaluru, Karnataka',
          work_mode: jobData.work_mode || 'In-Office',
          job_type: jobData.job_type || 'Full-Time',
          experience_level: jobData.experience_level || '0-2 Years',
          experience_min: Number(jobData.experience_min) || 0,
          experience_max: Number(jobData.experience_max) || 2,
          salary_text: jobData.salary_text || 'Competitive',
          qualification: jobData.qualification || 'Graduate Degree',
          skills: Array.isArray(jobData.skills) ? jobData.skills : [],
          description: jobData.description || '',
          responsibilities: Array.isArray(jobData.responsibilities) ? jobData.responsibilities : [],
          eligibility_criteria: Array.isArray(jobData.eligibility_criteria) ? jobData.eligibility_criteria : [],
          application_deadline: jobData.application_deadline || null,
          official_apply_url: jobData.official_apply_url || 'https://',
          source_url: jobData.source_url || null,
          is_featured: !!jobData.is_featured,
          is_fresher: !!jobData.is_fresher,
          is_government: !!jobData.is_government,
          is_wfh: !!jobData.is_wfh,
          is_walkin: !!jobData.is_walkin,
          is_internship: !!jobData.is_internship,
          is_published: jobData.is_published !== undefined ? jobData.is_published : true,
          posted_at: new Date().toISOString(),
        };

        const { data: inserted, error } = await supabase
          .from('jobs')
          .insert(payload)
          .select('*, company:companies(*), category:categories(*)')
          .maybeSingle();

        if (!error && inserted) {
          return inserted as Job;
        }
      }
    } catch (err) {
      console.error('Supabase createJob error:', err);
    }
  }

  return localJob;
}

export async function updateJobAsync(id: string, updates: Partial<Job>): Promise<Job | null> {
  const localUpdated = localStore.updateJob(id, updates);
  const supabase = getSupabaseClient();

  if (supabase && isSupabaseConfigured && isValidUUID(id)) {
    try {
      const payload: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
      };

      if (updates.title) payload.title = updates.title;
      if (updates.slug) payload.slug = updates.slug;
      if (updates.location) payload.location = updates.location;
      if (updates.work_mode) payload.work_mode = updates.work_mode;
      if (updates.job_type) payload.job_type = updates.job_type;
      if (updates.experience_level) payload.experience_level = updates.experience_level;
      if (updates.experience_min !== undefined) payload.experience_min = Number(updates.experience_min);
      if (updates.experience_max !== undefined) payload.experience_max = Number(updates.experience_max);
      if (updates.salary_text) payload.salary_text = updates.salary_text;
      if (updates.qualification) payload.qualification = updates.qualification;
      if (updates.skills) payload.skills = updates.skills;
      if (updates.description) payload.description = updates.description;
      if (updates.responsibilities) payload.responsibilities = updates.responsibilities;
      if (updates.eligibility_criteria) payload.eligibility_criteria = updates.eligibility_criteria;
      if (updates.application_deadline !== undefined) payload.application_deadline = updates.application_deadline || null;
      if (updates.official_apply_url) payload.official_apply_url = updates.official_apply_url;
      if (updates.source_url !== undefined) payload.source_url = updates.source_url || null;
      if (updates.is_featured !== undefined) payload.is_featured = updates.is_featured;
      if (updates.is_fresher !== undefined) payload.is_fresher = updates.is_fresher;
      if (updates.is_government !== undefined) payload.is_government = updates.is_government;
      if (updates.is_wfh !== undefined) payload.is_wfh = updates.is_wfh;
      if (updates.is_walkin !== undefined) payload.is_walkin = updates.is_walkin;
      if (updates.is_internship !== undefined) payload.is_internship = updates.is_internship;
      if (updates.is_published !== undefined) payload.is_published = updates.is_published;

      if (updates.company_id && isValidUUID(updates.company_id)) {
        payload.company_id = updates.company_id;
      }
      if (updates.category_id && isValidUUID(updates.category_id)) {
        payload.category_id = updates.category_id;
      }

      const { data: updated, error } = await supabase
        .from('jobs')
        .update(payload)
        .eq('id', id)
        .select('*, company:companies(*), category:categories(*)')
        .maybeSingle();

      if (!error && updated) {
        return updated as Job;
      }
    } catch (err) {
      console.error('Supabase updateJob error:', err);
    }
  }

  return localUpdated;
}

export async function deleteJobAsync(id: string): Promise<boolean> {
  const localResult = localStore.deleteJob(id);
  const supabase = getSupabaseClient();

  if (supabase && isSupabaseConfigured && isValidUUID(id)) {
    try {
      const { error } = await supabase.from('jobs').delete().eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.error('Supabase deleteJob error:', err);
    }
  }

  return localResult;
}

export async function togglePublishJobAsync(id: string, currentStatus?: boolean): Promise<boolean> {
  const localUpdated = localStore.togglePublishJob(id);
  const newStatus = currentStatus !== undefined ? !currentStatus : (localUpdated?.is_published ?? true);

  const supabase = getSupabaseClient();
  if (supabase && isSupabaseConfigured && isValidUUID(id)) {
    try {
      await supabase.from('jobs').update({ is_published: newStatus, updated_at: new Date().toISOString() }).eq('id', id);
    } catch (err) {
      console.error('Supabase togglePublish error:', err);
    }
  }

  return newStatus;
}
