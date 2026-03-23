export type HighlightCategory = {
  id: string;
  label: string;
  eyebrow: string;
  summary: string;
  detail: string;
  bullets: string[];
  signal: string;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  dates: string;
  location: string;
  categoryId: string;
  summary: string;
  highlights: string[];
};

export type ProfileSiteModel = {
  name: string;
  title: string;
  location: string;
  summary: string;
  currentMission: string;
  contact: {
    email: string;
    linkedin: string;
    phone: string;
  };
  stats: Array<{
    label: string;
    value: string;
  }>;
  categories: HighlightCategory[];
  experience: ExperienceEntry[];
  certifications: string[];
  education: string[];
  languages: string[];
  signatureStrengths: string[];
  toolbelt: string[];
  starterQuestions: string[];
};

export const profile: ProfileSiteModel = {
  name: "Clyde Dumpa",
  title:
    "Technical Consultant building calm, stable systems across support, integration, and workplace IT.",
  location: "Espoo, Uusimaa, Finland",
  summary:
    "Over 15 years across SaaS operations, technical support, Windows administration, Microsoft 365 migrations, and customer-facing delivery. Clyde currently leads technical integration work at RELEX Solutions and has spent his career turning messy production issues into reliable outcomes.",
  currentMission:
    "Leading integration work at RELEX Solutions while combining implementation discipline, support depth, and customer-facing clarity.",
  contact: {
    email: "clyde.dumpa@icloud.com",
    linkedin: "https://www.linkedin.com/in/clydedumpa",
    phone: "+358451254980",
  },
  stats: [
    { label: "Years in IT", value: "15+" },
    { label: "Customer regions", value: "NA + EU" },
    { label: "Current focus", value: "RELEX integrations" },
  ],
  categories: [
    {
      id: "consulting",
      label: "Technical Consulting",
      eyebrow: "Current lane",
      summary:
        "Leads implementation work for RELEX customers by connecting business requirements to technical delivery.",
      detail:
        "This is where architecture, delivery, and customer trust meet. Clyde owns integrations, data adapter design, ETL work, database mappings, and secure file movement for supply chain software rollouts.",
      bullets: [
        "Primary technical contact for customer IT teams and implementation stakeholders",
        "Builds adapters and ETL flows with Python, Ruby, Java, and SQL",
        "Supports upgrades, migrations, and technical health checks after go-live",
      ],
      signal: "Best fit for teams that need steady implementation leadership without drama.",
    },
    {
      id: "support",
      label: "Application Support",
      eyebrow: "Production mode",
      summary:
        "Handles live-environment support with a bias for speed, clarity, and operational calm.",
      detail:
        "Clyde has worked deep in production support: responding to infrastructure alerts, resolving missing data issues, improving scheduled runs, and keeping SaaS environments healthy for global customers.",
      bullets: [
        "Monitors software and hardware infrastructure in live environments",
        "Triage across disk, memory, server load, and application performance issues",
        "Combines customer communication with practical root-cause troubleshooting",
      ],
      signal: "Strong when reliability matters more than flashy architecture slides.",
    },
    {
      id: "workplace",
      label: "Workplace IT",
      eyebrow: "Foundation layer",
      summary:
        "Built a long track record in Windows support, Exchange, Microsoft 365 migrations, and helpdesk escalation.",
      detail:
        "Before SaaS consulting, Clyde spent years solving the real-world issues that slow people down: email migrations, permissions, mobile setup, antivirus problems, printer failures, and workstation support across North American businesses.",
      bullets: [
        "Hands-on with Windows administration, Exchange, M365, and user support",
        "Experienced across remote helpdesk, escalation, and cross-platform troubleshooting",
        "Known for translating technical fixes into customer confidence",
      ],
      signal: "Ideal for support-heavy environments where uptime and user empathy both matter.",
    },
    {
      id: "teaching",
      label: "Teaching and Enablement",
      eyebrow: "Multiplier effect",
      summary:
        "Brings a teacher's mindset to support, onboarding, and technical communication.",
      detail:
        "Clyde taught Computer Science and IT subjects at university level, coached newer support staff, and built support tools that made troubleshooting easier for teams and end users.",
      bullets: [
        "Former faculty member in Computer Science and Information Technology",
        "Created web-based support guidance and coached new hires",
        "Explains complex technical topics in a way non-specialists can use",
      ],
      signal: "A strong choice when a role demands both execution and mentorship.",
    },
  ],
  experience: [
    {
      company: "RELEX Solutions",
      role: "Technical Consultant",
      dates: "Feb 2026 - Present",
      location: "Helsinki, Finland",
      categoryId: "consulting",
      summary:
        "Leads technical integration projects for RELEX Plan, acting as the bridge between customer IT teams and implementation stakeholders.",
      highlights: [
        "Designed custom adapters and ETL flows in Python, Ruby, Java, and SQL",
        "Handled database mappings, API integrations, and secure file transfer design",
        "Supported system upgrades, version migrations, and health checks",
      ],
    },
    {
      company: "RELEX Solutions",
      role: "Application Support Analyst",
      dates: "Mar 2024 - Feb 2026",
      location: "Helsinki, Finland",
      categoryId: "support",
      summary:
        "Supported global production environments, infrastructure monitoring, and SaaS maintenance for RELEX customers.",
      highlights: [
        "Responded to infrastructure alerts and application support requests",
        "Maintained and upgraded RELEX software environments",
        "Investigated missing data, scheduled run failures, and performance issues",
      ],
    },
    {
      company: "Archway Computer",
      role: "Remote IT Helpdesk Support",
      dates: "Apr 2014 - Sep 2021",
      location: "California, United States",
      categoryId: "workplace",
      summary:
        "Delivered remote workstation and server support for small and medium businesses across the United States.",
      highlights: [
        "Led Microsoft 365 email migrations and profile restoration work",
        "Handled permission troubleshooting across desktop and mobile devices",
        "Earned strong client feedback through clear, reliable support",
      ],
    },
    {
      company: "Xerox",
      role: "IT Helpdesk Support",
      dates: "May 2013 - Jan 2014",
      location: "Global Marriott support",
      categoryId: "workplace",
      summary:
        "Supported Marriott employees globally across Exchange, Windows, mobile setup, and escalation handling.",
      highlights: [
        "Managed Exchange console tasks and Windows support",
        "Built a web-based support tool for scripts and troubleshooting guidance",
        "Tracked service quality with follow-up calls and reporting",
      ],
    },
    {
      company: "Convergys",
      role: "Technical Support Representative - Microsoft Windows",
      dates: "Nov 2011 - May 2013",
      location: "Cebu, Philippines",
      categoryId: "support",
      summary:
        "Provided Level 2 support for North American Windows users dealing with OS, virus, and network problems.",
      highlights: [
        "Supported Windows XP, Vista, 7, and 8 customers",
        "Coached new hires and contributed end-of-day performance reporting",
        "Handled escalations requiring deeper troubleshooting",
      ],
    },
    {
      company: "La Salle University - Ozamiz",
      role: "Faculty Teacher, Computer Studies Department",
      dates: "Apr 2010 - Oct 2011",
      location: "Ozamis, Philippines",
      categoryId: "teaching",
      summary:
        "Taught core Computer Science and IT subjects while helping drive web and IT initiatives within the university.",
      highlights: [
        "Guided students in Computer Science and Information Technology subjects",
        "Helped create the annual ICT convention website",
        "Focused on motivating students toward long-term IT careers",
      ],
    },
    {
      company: "Dell Technologies",
      role: "Senior Technical Assistant",
      dates: "Nov 2008 - Feb 2009",
      location: "Pasay, Philippines",
      categoryId: "workplace",
      summary:
        "Supported North American Dell customers with malware removal, networking, and printer setup.",
      highlights: [
        "Focused on Windows XP and Vista software support",
        "Improved customer trust in Dell support through reliable assistance",
      ],
    },
    {
      company: "eTelecare Global Solutions",
      role: "Technical Support Representative II",
      dates: "Apr 2007 - May 2008",
      location: "Muntinlupa City, Philippines",
      categoryId: "workplace",
      summary:
        "Diagnosed power, boot, and startup issues and guided customers on hardware replacement and upgrades.",
      highlights: [
        "Recommended upgrades that improved machine performance",
        "Contributed to stronger Dell product advocacy through positive support experiences",
      ],
    },
  ],
  certifications: [
    "ITIL V3",
    "Certificate of Completion: Basic life support and first aid training",
    "CCNA Bootcamp 200-120",
  ],
  education: [
    "Bachelor of Science in Computer Science",
    "Bachelor in Theology, Religion and Society - The Norwegian School of Theology (MF)",
    "Professional Caregiving - St. Augustine School of Nursing",
  ],
  languages: [
    "English",
    "Tagalog",
    "Cebuano",
    "Finnish (limited working proficiency)",
  ],
  signatureStrengths: [
    "Production calm under pressure",
    "Customer-facing technical delivery",
    "Microsoft 365 and Windows support depth",
    "Integration thinking across data, APIs, and operations",
  ],
  toolbelt: [
    "Python",
    "Ruby",
    "Java",
    "SQL",
    "Microsoft 365",
    "Windows administration",
    "Jira",
    "GitLab",
    "Confluence",
  ],
  starterQuestions: [
    "What kinds of technical problems do you solve best?",
    "How would you describe your consulting style to a hiring manager?",
    "Which parts of your background make you strong in production support?",
  ],
};
