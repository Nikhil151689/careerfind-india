-- ==============================================================================
-- CareerFind India - Seed Data
-- Realistic sample dataset of leading Indian companies, job categories & listings
-- ==============================================================================

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description, icon_name, badge_color, display_order)
VALUES
    ('c1111111-1111-1111-1111-111111111101', 'IT & Software', 'it-software', 'Software engineering, cloud, full-stack and IT consulting jobs', 'Code2', 'blue', 1),
    ('c1111111-1111-1111-1111-111111111102', 'Data Analyst', 'data-analyst', 'Data analytics, business intelligence, SQL and Tableau roles', 'BarChart3', 'indigo', 2),
    ('c1111111-1111-1111-1111-111111111103', 'AI & Machine Learning', 'ai-machine-learning', 'Machine learning engineering, NLP, Generative AI & deep learning', 'Cpu', 'purple', 3),
    ('c1111111-1111-1111-1111-111111111104', 'Network Engineer', 'network-engineer', 'Infrastructure, CCNA/CCNP, cloud networking and cybersecurity', 'Network', 'cyan', 4),
    ('c1111111-1111-1111-1111-111111111105', 'Software Developer', 'software-developer', 'Frontend, backend, mobile and system development positions', 'Terminal', 'blue', 5),
    ('c1111111-1111-1111-1111-111111111106', 'Non-IT Jobs', 'non-it-jobs', 'Human resources, finance, sales, marketing and operations', 'Users', 'amber', 6),
    ('c1111111-1111-1111-1111-111111111107', 'Government Jobs', 'government-jobs', 'PSU, banking, defense, SSC, UPSC and central/state government drives', 'Landmark', 'emerald', 7),
    ('c1111111-1111-1111-1111-111111111108', 'Work From Home', 'work-from-home', '100% remote job opportunities across India', 'Home', 'violet', 8),
    ('c1111111-1111-1111-1111-111111111109', 'Internships', 'internships', 'Paid student & graduate internships in top tech and corporate firms', 'GraduationCap', 'rose', 9),
    ('c1111111-1111-1111-1111-111111111110', 'B.Tech Fresher Jobs', 'btech-fresher-jobs', 'Entry level campus & off-campus hiring for engineering freshers', 'Sparkles', 'teal', 10),
    ('c1111111-1111-1111-1111-111111111111', 'Walk-in Interviews', 'walk-in-interviews', 'Direct face-to-face recruitment drives and immediate joining drives', 'MapPin', 'orange', 11),
    ('c1111111-1111-1111-1111-111111111112', 'Graduate Trainee', 'graduate-trainee', 'Management & engineering trainee programs across top Indian conglomerates', 'Award', 'sky', 12)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Companies
INSERT INTO public.companies (id, name, slug, logo_url, website_url, industry, headquarters, description, verified)
VALUES
    ('a1111111-1111-1111-1111-111111111101', 'Tata Consultancy Services', 'tcs', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&auto=format&fit=crop&q=80', 'https://www.tcs.com/careers', 'Information Technology', 'Mumbai, Maharashtra', 'India’s largest multinational IT services and consulting company, part of the Tata Group.', true),
    ('a1111111-1111-1111-1111-111111111102', 'Infosys', 'infosys', 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=128&auto=format&fit=crop&q=80', 'https://www.infosys.com/careers', 'Information Technology', 'Bengaluru, Karnataka', 'Global leader in next-generation digital services and enterprise consulting.', true),
    ('a1111111-1111-1111-1111-111111111103', 'Microsoft India', 'microsoft-india', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80', 'https://careers.microsoft.com', 'Technology & Cloud', 'Hyderabad, Telangana', 'Microsoft India Development Center (IDC) is one of Microsoft’s premier engineering hubs.', true),
    ('a1111111-1111-1111-1111-111111111104', 'Google India', 'google-india', 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&auto=format&fit=crop&q=80', 'https://careers.google.com', 'Internet & Software', 'Bengaluru, Karnataka', 'Leading global search, cloud, AI, and consumer tech development centers in India.', true),
    ('a1111111-1111-1111-1111-111111111105', 'Flipkart', 'flipkart', 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=128&auto=format&fit=crop&q=80', 'https://www.flipkartcareers.com', 'E-Commerce', 'Bengaluru, Karnataka', 'India’s homegrown e-commerce powerhouse revolutionizing Indian digital commerce.', true),
    ('a1111111-1111-1111-1111-111111111106', 'Swiggy', 'swiggy', 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=128&auto=format&fit=crop&q=80', 'https://careers.swiggy.com', 'Food Tech & Quick Commerce', 'Bengaluru, Karnataka', 'India’s top on-demand convenience and quick-delivery platform.', true),
    ('a1111111-1111-1111-1111-111111111107', 'ISRO (Indian Space Research Organisation)', 'isro', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=128&auto=format&fit=crop&q=80', 'https://www.isro.gov.in/Careers.html', 'Government & Aerospace', 'Bengaluru, Karnataka', 'National space agency of India under the Department of Space, Government of India.', true),
    ('a1111111-1111-1111-1111-111111111108', 'State Bank of India', 'sbi', 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=128&auto=format&fit=crop&q=80', 'https://sbi.co.in/web/careers', 'Banking & Financial Services', 'Mumbai, Maharashtra', 'India’s largest public sector bank and Fortune 500 financial institution.', true),
    ('a1111111-1111-1111-1111-111111111109', 'HCLTech', 'hcltech', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=128&auto=format&fit=crop&q=80', 'https://www.hcltech.com/careers', 'Information Technology', 'Noida, Uttar Pradesh', 'Global technology company home to 220,000+ people across 60 countries.', true),
    ('a1111111-1111-1111-1111-111111111110', 'Larsen & Toubro (L&T)', 'larsen-toubro', 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=128&auto=format&fit=crop&q=80', 'https://www.larsentoubro.com/corporate/careers', 'Engineering & Construction', 'Mumbai, Maharashtra', 'Indian multinational conglomerate operating in technology, engineering, and manufacturing.', true)
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Verified Job Listings
INSERT INTO public.jobs (
    id, title, slug, company_id, category_id, location, work_mode, job_type,
    experience_level, experience_min, experience_max, salary_min, salary_max, salary_text,
    qualification, skills, description, responsibilities, eligibility_criteria,
    application_deadline, official_apply_url, source_url, is_featured, is_fresher,
    is_government, is_wfh, is_walkin, is_internship, is_published, posted_at, last_verified_at
)
VALUES
(
    'd1111111-1111-1111-1111-111111111101',
    'TCS National Qualifier Test (NQT) - Ninja & Digital Cadre',
    'tcs-nqt-freshers-recruitment-2025-2026',
    'a1111111-1111-1111-1111-111111111101',
    'c1111111-1111-1111-1111-111111111110',
    'Pan India (Bengaluru, Pune, Hyderabad, Chennai, Delhi NCR)',
    'In-Office',
    'Full-Time',
    'Fresher',
    0, 1,
    360000, 750000,
    '₹3.6 - ₹7.5 LPA',
    'B.E / B.Tech / M.E / M.Tech / MCA / M.Sc (CS/IT)',
    ARRAY['Java', 'Python', 'C++', 'SQL', 'Data Structures', 'Algorithms'],
    'Tata Consultancy Services is hiring fresh engineering and computer science graduates through the nationwide TCS NQT drive. High performers are offered the Digital package (₹7.5 LPA) while others are offered the Ninja package (₹3.6 LPA).',
    ARRAY[
        'Develop, test, and deploy enterprise applications across cloud and on-premise environments.',
        'Collaborate with agile sprint teams to deliver high quality code and documentation.',
        'Participate in continuous learning and skill upgrading via TCS Elevate program.'
    ],
    ARRAY[
        'Minimum 60% or 6.0 CGPA throughout 10th, 12th, and Graduation.',
        'No active backlogs at the time of appearing for the process.',
        'Up to 2 years of permissible academic gap.'
    ],
    CURRENT_DATE + INTERVAL '45 days',
    'https://www.tcs.com/careers/india/entry-level-hiring',
    'https://nextstep.tcs.com',
    true, true, false, false, false, false, true,
    NOW() - INTERVAL '2 days',
    NOW()
),
(
    'd1111111-1111-1111-1111-111111111102',
    'Software Engineer II - Cloud & Distributed Systems',
    'microsoft-software-engineer-cloud-systems',
    'a1111111-1111-1111-1111-111111111103',
    'c1111111-1111-1111-1111-111111111105',
    'Hyderabad, Telangana',
    'Hybrid',
    'Full-Time',
    '2-5 Years',
    2, 5,
    1800000, 3200000,
    '₹18 - ₹32 LPA + Stock Options',
    'B.Tech / M.Tech in Computer Science or related STEM field',
    ARRAY['C#', '.NET Core', 'Azure', 'Microservices', 'Distributed Systems', 'Kubernetes'],
    'Microsoft IDC Hyderabad is looking for an experienced Software Engineer II to architect scalable microservices powering Azure cloud computing platforms and mission-critical enterprise workloads.',
    ARRAY[
        'Design and implement high-availability cloud services with sub-second latencies.',
        'Conduct code reviews, automate continuous delivery pipelines, and enforce zero-trust security.',
        'Troubleshoot complex production issues across multi-region Azure infrastructure.'
    ],
    ARRAY[
        '2+ years of professional software engineering experience building distributed systems.',
        'Solid foundation in algorithms, concurrency, and asynchronous programming.',
        'Prior hands-on experience with Microsoft Azure, AWS, or GCP.'
    ],
    CURRENT_DATE + INTERVAL '30 days',
    'https://careers.microsoft.com/us/en/job/1762391',
    'https://careers.microsoft.com',
    true, false, false, false, false, false, true,
    NOW() - INTERVAL '1 day',
    NOW()
),
(
    'd1111111-1111-1111-1111-111111111103',
    'Machine Learning Engineer - Search & Recommendation',
    'google-ml-engineer-search-recommendation',
    'a1111111-1111-1111-1111-111111111104',
    'c1111111-1111-1111-1111-111111111103',
    'Bengaluru, Karnataka',
    'Hybrid',
    'Full-Time',
    '2-5 Years',
    3, 6,
    2800000, 4800000,
    '₹28 - ₹48 LPA + Equity',
    'Master’s or Bachelor’s in CS, AI, Machine Learning or Mathematics',
    ARRAY['Python', 'TensorFlow', 'PyTorch', 'LLMs', 'Transformer Models', 'Vector Search'],
    'Google India Engineering is seeking an ML Engineer to work on next-generation search relevance, generative intelligence models, and multilingual Indian language NLP engines.',
    ARRAY[
        'Train, evaluate, and deploy deep learning models on large-scale distributed TPU clusters.',
        'Research and adapt state-of-the-art transformer architectures for low-latency inference.',
        'Collaborate with international research teams to publish and patent advancements.'
    ],
    ARRAY[
        'Strong track record in deep learning frameworks (TensorFlow, PyTorch, JAX).',
        'Proven expertise in NLP, Information Retrieval, or Computer Vision.',
        'Strong coding proficiency in Python and C++.'
    ],
    CURRENT_DATE + INTERVAL '25 days',
    'https://careers.google.com/jobs/results/93821034',
    'https://careers.google.com',
    true, false, false, false, false, false, true,
    NOW() - INTERVAL '3 days',
    NOW()
),
(
    'd1111111-1111-1111-1111-111111111104',
    'Scientist / Engineer ‘SC’ (Computer Science & Electronics)',
    'isro-scientist-engineer-sc-recruitment-2025',
    'a1111111-1111-1111-1111-111111111107',
    'c1111111-1111-1111-1111-111111111107',
    'Bengaluru / Thiruvananthapuram / Sriharikota',
    'In-Office',
    'Full-Time',
    'Fresher',
    0, 2,
    900000, 1200000,
    'Level 10 Pay Matrix (Approx. ₹85,000 - ₹1,05,000/month + Perks)',
    'First Class B.E / B.Tech in CS / IT / Electronics with min 65% or 6.84 CGPA',
    ARRAY['Embedded Systems', 'C/C++', 'RTOS', 'Linux Kernel', 'Satellite Telemetry'],
    'Indian Space Research Organisation (ISRO) Centralised Recruitment Board (ICRB) invites applications for Scientist/Engineer ‘SC’ positions across ISRO centres for satellite mission software and payload telemetry.',
    ARRAY[
        'Develop mission-critical flight software and real-time telemetry processing systems.',
        'Conduct hardware-in-the-loop (HIL) testing for launch vehicle flight control modules.',
        'Ensure absolute fault tolerance and adherence to aerospace software safety standards.'
    ],
    ARRAY[
        'Valid GATE score or clearance of ISRO Centralised Written Examination.',
        'Must be an Indian Citizen.',
        'Age limit: Not exceeding 28 years (relaxable for reserved categories).'
    ],
    CURRENT_DATE + INTERVAL '20 days',
    'https://www.isro.gov.in/Careers.html',
    'https://www.isac.gov.in',
    true, true, true, false, false, false, true,
    NOW() - INTERVAL '4 days',
    NOW()
),
(
    'd1111111-1111-1111-1111-111111111105',
    'Senior Data Analyst - Growth & Customer Insights',
    'swiggy-senior-data-analyst-growth',
    'a1111111-1111-1111-1111-111111111106',
    'c1111111-1111-1111-1111-111111111102',
    'Bengaluru, Karnataka',
    'Hybrid',
    'Full-Time',
    '2-5 Years',
    2, 4,
    1400000, 2200000,
    '₹14 - ₹22 LPA',
    'Degree in Statistics, Engineering, Economics, or Mathematics',
    ARRAY['SQL', 'Python', 'Tableau', 'Cohort Analysis', 'A/B Testing', 'Snowflake'],
    'Join Swiggy’s Growth Analytics pod to analyze millions of consumer orders daily, optimize user retention cohorts, and define data-driven discounting and loyalty algorithms.',
    ARRAY[
        'Build and maintain executive Tableau dashboards tracking daily active users and retention.',
        'Formulate hypotheses and lead end-to-end A/B test experiments for app features.',
        'Translate complex SQL data pipelines into clear business insights for product managers.'
    ],
    ARRAY[
        'Expertise in complex SQL queries (window functions, indexing, CTEs).',
        'Strong hands-on experience with statistical modeling and hypothesis testing in Python/R.',
        'Prior experience in e-commerce, quick commerce, or fintech is a big plus.'
    ],
    CURRENT_DATE + INTERVAL '18 days',
    'https://careers.swiggy.com/jobs/analytics-sr-da',
    'https://careers.swiggy.com',
    false, false, false, false, false, false, true,
    NOW() - INTERVAL '2 days',
    NOW()
),
(
    'd1111111-1111-1111-1111-111111111106',
    'Full-Stack Developer (React & Node.js) - 100% Remote',
    'flipkart-full-stack-developer-remote',
    'a1111111-1111-1111-1111-111111111105',
    'c1111111-1111-1111-1111-111111111108',
    'Remote - Anywhere in India',
    'Work From Home',
    'Full-Time',
    '2-5 Years',
    2, 5,
    1600000, 2600000,
    '₹16 - ₹26 LPA',
    'B.Tech / MCA or equivalent practical experience',
    ARRAY['React.js', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    'Flipkart Commerce Cloud is looking for high-ownership Full-Stack Engineers to build developer tooling and merchant seller portals. This role is permanently remote anywhere in India.',
    ARRAY[
        'Design responsive, accessible web applications using Next.js and Tailwind CSS.',
        'Implement resilient REST and GraphQL APIs using Node.js and PostgreSQL.',
        'Optimize Core Web Vitals to deliver ultra-fast loading across 2G/3G mobile networks in Tier 2/3 cities.'
    ],
    ARRAY[
        '3+ years of professional React and backend Node.js development experience.',
        'Demonstrated ability to write clean, type-safe code with unit and integration tests.',
        'Strong communication skills for asynchronous remote collaboration.'
    ],
    CURRENT_DATE + INTERVAL '35 days',
    'https://www.flipkartcareers.com/job/remote-fs-eng',
    'https://www.flipkartcareers.com',
    true, false, false, true, false, false, true,
    NOW() - INTERVAL '1 day',
    NOW()
),
(
    'd1111111-1111-1111-1111-111111111107',
    'Probationary Officer (PO) - All India Recruitment',
    'sbi-probationary-officer-po-recruitment',
    'a1111111-1111-1111-1111-111111111108',
    'c1111111-1111-1111-1111-111111111107',
    'Pan India (Selected branches across all states)',
    'In-Office',
    'Full-Time',
    'Fresher',
    0, 1,
    750000, 950000,
    '₹65,000 - ₹82,000/month (CTC approx ₹9.5 LPA including allowances & housing)',
    'Graduation in any discipline from a recognized University',
    ARRAY['Banking Operations', 'Financial Analysis', 'Customer Relations', 'Credit Appraisal'],
    'State Bank of India invites online applications from Indian citizens for appointment as Probationary Officers (PO). One of the most prestigious government banking careers in India.',
    ARRAY[
        'Undergo comprehensive training across retail banking, rural credit, and forex operations.',
        'Manage branch accounting, customer service, and loan portfolio appraisals.',
        'Oversee cross-selling of financial products and maintain regulatory compliance.'
    ],
    ARRAY[
        'Must be a graduate in any discipline (B.A, B.Sc, B.Com, B.Tech, etc.) as of exam cutoff date.',
        'Age between 21 and 30 years with government category relaxations.',
        'Selection via Prelims, Mains, Psychometric Test, and Interview/Group Exercises.'
    ],
    CURRENT_DATE + INTERVAL '22 days',
    'https://sbi.co.in/web/careers/current-openings',
    'https://ibpsonline.ibps.in',
    true, true, true, false, false, false, true,
    NOW() - INTERVAL '5 days',
    NOW()
),
(
    'd1111111-1111-1111-1111-111111111108',
    'Software Engineer Intern (6 Months - Summer 2025/2026)',
    'infosys-software-engineer-internship',
    'a1111111-1111-1111-1111-111111111102',
    'c1111111-1111-1111-1111-111111111109',
    'Mysuru / Bengaluru, Karnataka',
    'In-Office',
    'Internship',
    'Fresher',
    0, 0,
    25000, 35000,
    '₹30,000/month Stipend + PPO Opportunity',
    'Pre-final or Final Year B.E / B.Tech / M.Tech / MCA students',
    ARRAY['Java', 'Spring Boot', 'SQL', 'Git', 'HTML/CSS', 'Problem Solving'],
    'Infosys InStep & Campus Connect is offering 6-month paid software internships. Top performers are directly extended full-time Specialist Programmer or Systems Engineer pre-placement offers (PPO).',
    ARRAY[
        'Work alongside senior architects on real enterprise digital transformation projects.',
        'Complete world-class software development modules at the Infosys Mysuru Global Education Centre.',
        'Build automated test suites and deploy microservices.'
    ],
    ARRAY[
        'Current undergraduate or postgraduate student graduating in 2025 or 2026.',
        'Strong problem solving and foundational knowledge of object-oriented programming.',
        'Minimum 65% aggregate with zero active backlogs.'
    ],
    CURRENT_DATE + INTERVAL '40 days',
    'https://www.infosys.com/careers/instep',
    'https://www.infosys.com',
    false, true, false, false, false, true, true,
    NOW() - INTERVAL '3 days',
    NOW()
),
(
    'd1111111-1111-1111-1111-111111111109',
    'Mega Walk-In Interview: Cloud Network & Systems Engineer',
    'hcltech-mega-walkin-cloud-network-engineer',
    'a1111111-1111-1111-1111-111111111109',
    'c1111111-1111-1111-1111-111111111111',
    'Noida, Uttar Pradesh (HCL Tech SEZ Campus)',
    'In-Office',
    'Walk-In',
    '0-2 Years',
    0, 3,
    450000, 800000,
    '₹4.5 - ₹8.0 LPA (Immediate Spot Offers)',
    'B.Tech / B.Sc / BCA with CCNA certification preferred',
    ARRAY['Cisco Routers', 'TCP/IP', 'VPN', 'Firewalls', 'AWS VPC', 'Linux CLI'],
    'HCLTech is conducting a Mega Walk-in Interview drive at Noida Campus for Network Engineers, Cloud Support Specialists, and Infrastructure Analysts. Candidates with 0-3 years experience are welcome for spot technical rounds.',
    ARRAY[
        'Monitor, configure and troubleshoot enterprise switches, routers and SD-WAN networks.',
        'Manage incident tickets, service requests, and perform L1/L2 network diagnostics.',
        'Support hybrid cloud network tunnels between on-premise datacenters and AWS/Azure.'
    ],
    ARRAY[
        'Walk-in with updated resume, govt photo ID proof, and last 3 months salary slips (if experienced).',
        'CCNA or Network+ certification will be given strong preference.',
        'Readiness to work in rotational 24x7 enterprise support shifts.'
    ],
    CURRENT_DATE + INTERVAL '12 days',
    'https://www.hcltech.com/careers/walkin-drives-india',
    'https://www.hcltech.com',
    true, true, false, false, true, false, true,
    NOW() - INTERVAL '1 day',
    NOW()
),
(
    'd1111111-1111-1111-1111-111111111110',
    'Graduate Engineer Trainee (GET) - 2025/2026 Batch',
    'larsen-toubro-get-graduate-engineer-trainee',
    'a1111111-1111-1111-1111-111111111110',
    'c1111111-1111-1111-1111-111111111112',
    'Mumbai / Chennai / Hazira / Vadodara',
    'In-Office',
    'Full-Time',
    'Fresher',
    0, 1,
    600000, 850000,
    '₹6.0 - ₹8.5 LPA + Medical & Accommodation',
    'B.E / B.Tech in Mechanical, Electrical, Civil, or Instrumentation Engineering',
    ARRAY['Engineering Design', 'AutoCAD', 'Project Management', 'Quality Control', 'Safety Standards'],
    'Larsen & Toubro is inducting top engineering talent through its prestigious Graduate Engineer Trainee (GET) program across Hydrocarbon, Heavy Civil Infrastructure, and Smart World divisions.',
    ARRAY[
        'Execute engineering calculations, blueprint validations, and on-site project planning.',
        'Monitor construction schedules, vendor deliverables, and quality assurance benchmarks.',
        'Participate in state-of-the-art automation and IoT deployment at major national infrastructure projects.'
    ],
    ARRAY[
        'First attempt B.E / B.Tech graduate with minimum 65% aggregate throughout schooling and college.',
        'Age not more than 24 years on July 1st of the graduating year.',
        'Strong leadership qualities and physical fitness for project site assignments.'
    ],
    CURRENT_DATE + INTERVAL '28 days',
    'https://www.larsentoubro.com/corporate/careers/campus-recruitment',
    'https://www.larsentoubro.com',
    false, true, false, false, false, false, true,
    NOW() - INTERVAL '2 days',
    NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- 4. Insert Career Advice Blog Articles
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image, author_name, author_role, category, tags, read_time, is_published, published_at)
VALUES
(
    'b1111111-1111-1111-1111-111111111101',
    'How to Crack the TCS NQT 2025/2026: Complete Syllabus & Preparation Strategy',
    'how-to-crack-tcs-nqt-preparation-guide',
    'Everything you need to know about TCS National Qualifier Test: section-wise marks distribution, coding questions, and tips to secure the Digital (₹7.5 LPA) package.',
    'The TCS National Qualifier Test (NQT) is India’s largest mass hiring assessment for engineering graduates. In this comprehensive guide, our recruitment specialists break down the exact strategy to clear both the Foundation and Advanced sections...\n\n### 1. Structure of the Exam\nThe test consists of Cognitive Skills (Numerical, Verbal, Reasoning Ability) and Advanced Technical Skills (Advanced Quantitative, Advanced Reasoning, and Hands-on Coding).\n\n### 2. Digital vs Ninja Cutoffs\nTo qualify for the coveted Digital cadre (₹7.5 LPA), candidates must score above 80% in the Advanced Coding and Quantitative sections.\n\n### 3. Key Topics to Practice\n- Dynamic Programming and Array manipulations\n- Time and space complexity optimization\n- Probability, Permutations & Combinations, and Data Interpretation.',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    'Priya Sharma',
    'Campus Recruitment Specialist',
    'Exam Preparation',
    ARRAY['TCS NQT', 'Fresher Jobs', 'Campus Placements', 'Coding Interviews'],
    '7 min read',
    true,
    NOW() - INTERVAL '4 days'
),
(
    'b1111111-1111-1111-1111-111111111102',
    'Resume Formats That Pass Indian ATS Scanners in 2025',
    'resume-formats-that-pass-indian-ats-scanners',
    'Learn how top Indian IT companies screen resumes automatically, and discover 7 essential rules to ensure your resume reaches real recruiters.',
    'Applicant Tracking Systems (ATS) reject over 70% of resumes before a human recruiter ever sees them. In the competitive Indian job market where a single opening at Infosys, Wipro, or Google receives over 10,000 applications, having an ATS-compliant resume is non-negotiable...\n\n### Key Rules:\n1. Use standard single-column layouts without nested tables.\n2. Keep standard headers: "Education", "Work Experience", "Projects", "Technical Skills".\n3. Match exact keywords found in the job description.\n4. Quantify your achievements using metrics (e.g. "Improved API response times by 35%").',
    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80',
    'Vikram Mehta',
    'Senior Technical Recruiter',
    'Resume & ATS Tips',
    ARRAY['Resume Tips', 'ATS Friendly', 'Career Advice', 'Job Search'],
    '5 min read',
    true,
    NOW() - INTERVAL '6 days'
),
(
    'b1111111-1111-1111-1111-111111111103',
    'IT Salary Trends in India: What Developers & Data Engineers Earn in 2025/2026',
    'it-salary-trends-in-india-developer-guide',
    'A realistic breakdown of compensation packages across Service companies, Product unicorns, and Global Capability Centers (GCCs) in Bengaluru, Hyderabad & Pune.',
    'The Indian tech compensation ecosystem has undergone a significant transformation with the rapid expansion of Global Capability Centers (GCCs) across Bengaluru, Hyderabad, and Pune...\n\n### Fresher Tier:\n- Service IT Firms: ₹3.5 LPA - ₹4.5 LPA\n- Digital Specialist Tracks: ₹7.0 LPA - ₹9.5 LPA\n- Product Tier-1 & Unicorns: ₹16 LPA - ₹28 LPA\n\n### 3-5 Years Experienced:\nFull-Stack Developers with Next.js/React and Go/Java command ₹18 - ₹30 LPA across Tier-1 hubs.',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    'Ananya Sen',
    'HR & Compensation Analyst',
    'Salary & Market Insights',
    ARRAY['Salary Trends', 'Tech Jobs', 'Bengaluru IT', 'GCC India'],
    '6 min read',
    true,
    NOW() - INTERVAL '10 days'
)
ON CONFLICT (slug) DO NOTHING;
