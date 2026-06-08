// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface PersonalInfo {
  name: string;
  role: string;
  roles: string[];
  email: string;
  phone: string;
  location: string;
  typewriterPhrases: string[];
  summary: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  codolio: string;
  leetcode: string;
  codeforces: string;
  hackerrank: string;
  twitter: string;
  instagram: string;
  email: string;
  phone: string;
  portfolio: string;
}

export type SocialPlatform = keyof SocialLinks;

export interface SocialLinkEntry {
  platform: SocialPlatform;
  label: string;
  url: string;
  display: string;
  external: boolean;
}

export interface ResumeConfig {
  downloadUrl: string;
}

export interface FlowStep {
  label: string;
  description?: string;
}

export interface ArchitectureLayer {
  name: string;
  description: string;
}

export interface ProjectCaseStudy {
  overview: string;
  problem: string;
  solution: string;
  architecture: ArchitectureLayer[];
  featureDetails: { title: string; description: string }[];
  workflow: FlowStep[];
  results: string[];
  lessonsLearned: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  live: string;
  github: string;
  category: "fullstack" | "ai" | "automation";
  caseStudySlug: string;
  featured: boolean;
  caseStudy: ProjectCaseStudy;
}

export interface SystemBuilt {
  name: string;
  description: string;
}

export interface DetailedExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  challenges: string[];
  responsibilities: string[];
  techStack: string[];
  impact: string[];
  systemsBuilt: SystemBuilt[];
  processFlow: FlowStep[];
}

export interface FounderProduct {
  name: string;
  description: string;
  url: string;
}

export interface FounderStory {
  headline: string;
  origin: string;
  problems: string[];
  products: FounderProduct[];
  technicalChallenges: string[];
  growth: string[];
  vision: string;
  milestones: FlowStep[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  color: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
}

export interface SystemArchitectureConfig {
  description: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface EngineeringPhase {
  phase: string;
  title: string;
  description: string;
  practices: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  socials: SocialLinks;
  resume: ResumeConfig;
  projects: PortfolioProject[];
  tools: Record<string, string[]>;
  experience: DetailedExperience[];
  founder: FounderStory;
  engineering: EngineeringPhase[];
  certifications: Certification[];
  navLinks: NavLink[];
  marqueeItems: string[];
  systemArchitecture: SystemArchitectureConfig;
  site: {
    url: string;
    description: string;
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const portfolioData: PortfolioData = {
  personal: {
    name: "Yash Mathur",
    role: "Software Developer · Full Stack Developer · AI Automation Builder",
    roles: [
      "Software Developer",
      "Full Stack Developer",
      "AI Automation Builder",
    ],
    email: "yashmathur1425@gmail.com",
    phone: "+91 8824141454",
    location: "Jaipur, Rajasthan, India",
    typewriterPhrases: [
      "Building Production Software",
      "Designing Automation Systems",
      "Shipping Full Stack Products",
      "Engineering AI Workflows",
    ],
    summary:
      "Computer Science undergraduate who builds real software systems — full-stack applications, AI automation pipelines, and production dashboards. Co-founder of Pramana15, where I design and ship products end-to-end: frontend interfaces, backend APIs, database architecture, and deployment.",
  },

  socials: {
    github: "https://github.com/Yash5247",
    linkedin: "https://www.linkedin.com/in/yash-mathur-965134284",
    codolio: "https://codolio.com/profile/Yash1410",
    leetcode: "",
    codeforces: "",
    hackerrank: "",
    twitter: "",
    instagram: "",
    email: "mailto:yashmathur1425@gmail.com",
    phone: "tel:+918824141454",
    portfolio: "https://pramana15.com",
  },

  resume: {
    downloadUrl: "/resume.pdf",
  },

  projects: [
    {
      id: "mrv-system",
      title: "Blockchain-based MRV System",
      tagline: "Monitoring, Reporting & Verification for supply chain traceability",
      description:
        "A web platform for monitoring, reporting, and verifying sustainability data with full record traceability across stakeholders.",
      features: [
        "Monitoring",
        "Reporting",
        "Verification",
        "Traceability",
      ],
      tech: ["React", "Supabase", "REST APIs", "JavaScript", "Vercel"],
      live: "https://oceara-web-platform-1.vercel.app/",
      github: "",
      category: "fullstack",
      caseStudySlug: "mrv-system",
      featured: true,
      caseStudy: {
        overview:
          "Built a Monitoring, Reporting, and Verification (MRV) system that gives stakeholders a single place to track records, validate submissions, and maintain audit-ready traceability across the supply chain.",
        problem:
          "Sustainability data was fragmented across spreadsheets and manual handoffs. Verification was slow, records were hard to audit, and stakeholders lacked real-time visibility into submission status.",
        solution:
          "Designed a centralized web platform with role-based dashboards, structured validation workflows, and a traceable record lifecycle from submission through verification.",
        architecture: [
          {
            name: "Dashboard Layer",
            description:
              "React-based interfaces for monitoring submissions, reviewing reports, and tracking verification status.",
          },
          {
            name: "API & Validation",
            description:
              "REST endpoints handling record intake, validation rules, and state transitions across the MRV workflow.",
          },
          {
            name: "Data & Integrity",
            description:
              "Supabase-backed storage with structured schemas ensuring record consistency and traceability.",
          },
          {
            name: "Deployment",
            description:
              "Production deployment on Vercel with environment-based configuration.",
          },
        ],
        featureDetails: [
          {
            title: "Monitoring",
            description:
              "Live dashboards showing submission status, pending reviews, and pipeline health across the verification flow.",
          },
          {
            title: "Reporting",
            description:
              "Structured report generation from validated records with filters for time range, category, and verification state.",
          },
          {
            title: "Verification",
            description:
              "Multi-step validation workflow where records move through defined states with reviewer accountability.",
          },
          {
            title: "Traceability",
            description:
              "Every record maintains a clear history — who submitted, when it was validated, and what changed at each step.",
          },
          {
            title: "Record Management",
            description:
              "CRUD operations with validation gates preventing incomplete or inconsistent data from entering the system.",
          },
          {
            title: "Stakeholder Visibility",
            description:
              "Role-specific views so operators, reviewers, and administrators each see the data relevant to their responsibilities.",
          },
        ],
        workflow: [
          { label: "Data Submission", description: "Stakeholder submits record" },
          { label: "Validation", description: "Rules engine checks integrity" },
          { label: "Review", description: "Reviewer verifies submission" },
          { label: "Reporting", description: "Approved data enters reports" },
          { label: "Traceability Log", description: "Full audit trail preserved" },
        ],
        results: [
          "Replaced manual spreadsheet tracking with a structured web platform.",
          "Established a repeatable validation workflow for record integrity.",
          "Gave stakeholders real-time visibility into submission and verification status.",
        ],
        lessonsLearned: [
          "Designing validation rules upfront prevents data quality issues downstream.",
          "Traceability requirements shape database schema decisions from day one.",
          "Role-based dashboards reduce complexity for non-technical stakeholders.",
        ],
      },
    },
    {
      id: "ai-chatbot",
      title: "AI Chatbot & Lead Automation System",
      tagline: "Intelligent lead capture with OpenAI-powered responses",
      description:
        "An automation platform combining AI chatbot responses, lead collection, and intelligent database routing for Pramana15.",
      features: [
        "OpenAI Integration",
        "Lead Automation",
        "REST APIs",
        "Database Routing",
      ],
      tech: ["React", "Node.js", "OpenAI API", "Supabase"],
      live: "https://automation.pramana15.com/",
      github: "",
      category: "ai",
      caseStudySlug: "ai-chatbot",
      featured: true,
      caseStudy: {
        overview:
          "Built an end-to-end lead automation system where AI handles initial conversations, captures structured lead data, and routes information to the correct database tables based on conversation context.",
        problem:
          "Manual lead follow-up was inconsistent. Incoming inquiries needed immediate responses, structured data capture, and reliable routing to the right internal records.",
        solution:
          "Engineered a chatbot layer on OpenAI APIs with backend orchestration that parses conversations, extracts lead fields, and writes to Supabase with context-aware routing logic.",
        architecture: [
          {
            name: "Chat Interface",
            description:
              "React frontend presenting the conversational UI and session state to users.",
          },
          {
            name: "AI Orchestration",
            description:
              "Node.js backend managing OpenAI API calls, prompt templates, and response parsing.",
          },
          {
            name: "Lead Pipeline",
            description:
              "Automation workflows that structure extracted data and trigger follow-up actions.",
          },
          {
            name: "Database Routing",
            description:
              "Supabase integration routing leads to appropriate tables based on conversation context.",
          },
        ],
        featureDetails: [
          {
            title: "Lead Collection",
            description:
              "Conversational forms that extract name, intent, and contact details without rigid form UX.",
          },
          {
            title: "AI Responses",
            description:
              "Context-aware replies powered by engineered prompts tuned for accuracy and tone.",
          },
          {
            title: "OpenAI Integration",
            description:
              "Structured API layer handling message history, token management, and response validation.",
          },
          {
            title: "Database Routing",
            description:
              "Logic layer determining which Supabase tables receive data based on lead type and intent.",
          },
          {
            title: "Automation Workflows",
            description:
              "Post-capture triggers for notifications, record creation, and pipeline updates.",
          },
          {
            title: "Prompt Engineering",
            description:
              "Iteratively refined system prompts to improve extraction accuracy and reduce hallucination.",
          },
        ],
        workflow: [
          { label: "User Message", description: "Visitor starts conversation" },
          { label: "AI Processing", description: "OpenAI generates response" },
          { label: "Lead Extraction", description: "Backend parses structured fields" },
          { label: "Validation", description: "Data checked before persistence" },
          { label: "Database Write", description: "Routed to correct Supabase table" },
          { label: "Automation Trigger", description: "Follow-up workflow initiated" },
        ],
        results: [
          "Automated initial lead response without manual intervention.",
          "Structured lead data captured directly from natural conversations.",
          "Reliable routing eliminated misfiled records across database tables.",
        ],
        lessonsLearned: [
          "Prompt design is as critical as backend architecture for AI products.",
          "Separating extraction logic from generation improves reliability.",
          "Database routing rules should be explicit, not inferred at runtime.",
        ],
      },
    },
    {
      id: "shortsos",
      title: "ShortsOS",
      tagline: "AI-assisted content generation and publishing workflows",
      description:
        "A content automation platform orchestrating AI-assisted generation, prompt pipelines, and publishing workflows for short-form content.",
      features: [
        "Content Generation",
        "Workflow Automation",
        "AI Processing",
      ],
      tech: ["React", "Node.js", "OpenAI API", "REST APIs"],
      live: "https://pramana15.com",
      github: "",
      category: "automation",
      caseStudySlug: "shortsos",
      featured: true,
      caseStudy: {
        overview:
          "ShortsOS automates the content creation pipeline — from ideation and AI-assisted drafting through review and publishing — reducing repetitive manual work in short-form content production.",
        problem:
          "Creating short-form content at scale required repetitive prompting, manual formatting, and disconnected tools across generation and publishing stages.",
        solution:
          "Built a unified platform with orchestrated prompt pipelines, backend automation, and a structured publishing workflow that connects generation to output.",
        architecture: [
          {
            name: "Content UI",
            description:
              "React interface for managing content batches, reviewing AI output, and triggering workflows.",
          },
          {
            name: "Prompt Pipelines",
            description:
              "Chained prompt templates that transform raw input into structured content stages.",
          },
          {
            name: "Backend Orchestration",
            description:
              "Node.js services coordinating OpenAI calls, caching, and workflow state.",
          },
          {
            name: "Publishing Layer",
            description:
              "REST APIs connecting generated content to publishing and distribution steps.",
          },
        ],
        featureDetails: [
          {
            title: "Content Generation",
            description:
              "AI-assisted drafting with templates tuned for short-form format and brand voice.",
          },
          {
            title: "Automation Workflows",
            description:
              "Multi-step pipelines that progress content from draft to review to ready-to-publish.",
          },
          {
            title: "AI-Assisted Processing",
            description:
              "OpenAI integration for rewriting, summarizing, and formatting content batches.",
          },
          {
            title: "Backend Orchestration",
            description:
              "Coordinated API calls managing rate limits, retries, and pipeline state.",
          },
          {
            title: "Prompt Pipelines",
            description:
              "Reusable prompt chains for consistent output quality across content types.",
          },
          {
            title: "Publishing Workflow",
            description:
              "Structured handoff from generated content to final publishing actions.",
          },
        ],
        workflow: [
          { label: "Input", description: "Topic or brief entered" },
          { label: "AI Draft", description: "Prompt pipeline generates content" },
          { label: "Review", description: "Human review and edits" },
          { label: "Refinement", description: "AI-assisted polish pass" },
          { label: "Publish", description: "Output routed to publishing step" },
        ],
        results: [
          "Consolidated fragmented content tools into a single workflow.",
          "Reduced repetitive prompting through reusable pipeline templates.",
          "Created a repeatable process from ideation to publish-ready output.",
        ],
        lessonsLearned: [
          "Workflow state machines make complex automation easier to debug.",
          "Human review gates are essential for AI-generated content quality.",
          "Prompt pipelines should be versioned like any other codebase.",
        ],
      },
    },
  ],

  tools: {
    Frontend: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS", "JavaScript"],
    Backend: ["Node.js", "Express.js", "REST APIs"],
    Database: ["SQL", "Supabase", "PostgreSQL"],
    "AI & Automation": [
      "OpenAI APIs",
      "Prompt Engineering",
      "LLM Workflows",
      "Automation Systems",
    ],
    "Tools & Deployment": [
      "Git",
      "GitHub",
      "Vercel",
      "Linux",
      "Docker",
      "CI/CD",
    ],
    Languages: ["JavaScript", "TypeScript", "Python", "C++"],
  },

  experience: [
    {
      id: "pramana15",
      company: "Pramana15",
      role: "Co-Founder & Software Developer",
      period: "2024 — Present",
      summary:
        "Co-founded Pramana15 and built the technical foundation for multiple production products — from AI chatbot automation to content pipelines and full-stack dashboards.",
      challenges: [
        "Shipping multiple products with a small team and limited resources.",
        "Designing database schemas that support evolving automation requirements.",
        "Balancing rapid iteration with maintainable backend architecture.",
        "Integrating OpenAI APIs reliably into production user flows.",
      ],
      responsibilities: [
        "Lead full-stack development across frontend, backend, and database layers.",
        "Architect REST APIs and integration points between services.",
        "Design and implement AI automation workflows and prompt systems.",
        "Build admin dashboards for monitoring leads, content, and system state.",
        "Manage deployment and production releases on Vercel.",
      ],
      techStack: [
        "React",
        "Node.js",
        "Supabase",
        "OpenAI API",
        "REST APIs",
        "Vercel",
        "JavaScript",
      ],
      impact: [
        "Shipped live products including lead automation and content platforms.",
        "Established reusable API patterns across Pramana15 product suite.",
        "Built end-to-end systems from database design through production deployment.",
      ],
      systemsBuilt: [
        {
          name: "Lead Automation System",
          description:
            "AI chatbot with OpenAI integration, lead extraction, and Supabase routing.",
        },
        {
          name: "Content Automation (ShortsOS)",
          description:
            "Prompt pipelines and publishing workflows for short-form content generation.",
        },
        {
          name: "MRV Platform",
          description:
            "Monitoring, reporting, and verification dashboards with traceable record management.",
        },
        {
          name: "Admin Dashboards",
          description:
            "Internal interfaces for monitoring automation state, leads, and content pipelines.",
        },
        {
          name: "API Integrations",
          description:
            "REST endpoints connecting frontend applications to backend services and databases.",
        },
      ],
      processFlow: [
        { label: "Requirements", description: "Define product scope and user flows" },
        { label: "System Design", description: "Schema, API contracts, architecture" },
        { label: "Build", description: "Frontend + backend implementation" },
        { label: "Integrate AI", description: "Prompt engineering and API wiring" },
        { label: "Deploy", description: "Production release on Vercel" },
        { label: "Iterate", description: "User feedback drives refinements" },
      ],
    },
    {
      id: "tata-power",
      company: "Tata Power",
      role: "Web Developer & AI/ML Intern",
      period: "2024",
      summary:
        "Worked on operational data systems for transformer fault identification, record processing, and consumer impact analysis — building backend logic and validation workflows for field operations data.",
      challenges: [
        "Processing large volumes of operational records with inconsistent formats.",
        "Mapping transformer faults to consumer impact across geographic regions.",
        "Building validation workflows that catch errors before they affect downstream analysis.",
        "Translating domain requirements from operations teams into working software logic.",
      ],
      responsibilities: [
        "Developed backend logic for operational record ingestion and processing.",
        "Built data validation workflows to ensure record integrity.",
        "Implemented fault identification pipelines connecting field data to analysis outputs.",
        "Created interfaces for reviewing processed records and validation status.",
        "Collaborated with teams to refine problem-solving approaches for edge cases.",
      ],
      techStack: [
        "Python",
        "JavaScript",
        "SQL",
        "REST APIs",
        "Data Processing",
      ],
      impact: [
        "Improved reliability of operational record processing through validation gates.",
        "Enabled structured fault-to-consumer impact mapping for operations teams.",
        "Reduced manual data cleanup through automated validation workflows.",
      ],
      systemsBuilt: [
        {
          name: "Fault Identification Pipeline",
          description:
            "Backend logic processing transformer fault data and classifying operational incidents.",
        },
        {
          name: "Record Processing System",
          description:
            "Workflows ingesting, cleaning, and structuring large operational datasets.",
        },
        {
          name: "Consumer Impact Mapping",
          description:
            "Logic connecting fault events to affected consumer regions and impact scope.",
        },
        {
          name: "Data Validation Workflows",
          description:
            "Multi-step validation catching format errors, missing fields, and inconsistencies.",
        },
      ],
      processFlow: [
        { label: "Raw Data Ingestion", description: "Field records enter system" },
        { label: "Validation", description: "Format and integrity checks" },
        { label: "Fault Analysis", description: "Identification logic runs" },
        { label: "Impact Mapping", description: "Consumer regions calculated" },
        { label: "Review Output", description: "Operations team validates results" },
      ],
    },
    {
      id: "oshvik",
      company: "OSHVIK",
      role: "Web Developer Intern",
      period: "2024",
      summary:
        "Built responsive web interfaces with component-based architecture, focusing on cross-device compatibility, frontend performance, and reusable UI patterns.",
      challenges: [
        "Ensuring consistent UI behavior across browsers and screen sizes.",
        "Building reusable components without over-abstracting early.",
        "Optimizing frontend performance on content-heavy pages.",
        "Maintaining design consistency across multiple page templates.",
      ],
      responsibilities: [
        "Developed responsive web pages using modern frontend practices.",
        "Built reusable UI components with clear prop interfaces.",
        "Optimized page load and rendering performance.",
        "Ensured cross-device compatibility through systematic testing.",
        "Collaborated on client-facing production web applications.",
      ],
      techStack: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Responsive Design",
      ],
      impact: [
        "Delivered production web interfaces meeting client requirements.",
        "Established reusable component patterns used across multiple pages.",
        "Improved page performance through targeted frontend optimizations.",
      ],
      systemsBuilt: [
        {
          name: "Component Library",
          description:
            "Reusable UI components — navigation, cards, forms — shared across pages.",
        },
        {
          name: "Responsive Layouts",
          description:
            "Mobile-first page structures adapting cleanly to tablet and desktop.",
        },
        {
          name: "Performance Optimizations",
          description:
            "Asset loading, lazy rendering, and CSS optimizations for faster pages.",
        },
      ],
      processFlow: [
        { label: "Design Review", description: "Analyze layout requirements" },
        { label: "Component Build", description: "Create reusable UI blocks" },
        { label: "Page Assembly", description: "Compose pages from components" },
        { label: "Responsive Test", description: "Verify across breakpoints" },
        { label: "Performance Pass", description: "Optimize and ship" },
      ],
    },
  ],

  founder: {
    headline: "Building Pramana15",
    origin:
      "Pramana15 started from a practical observation: small teams and businesses need production-grade software and automation, but often lack the engineering capacity to build it. I co-founded Pramana15 to solve that — building real products that combine full-stack development with AI-powered automation.",
    problems: [
      "Businesses lose leads because follow-up is manual and slow.",
      "Content creation at scale requires repetitive, disconnected tooling.",
      "Operational data lacks structure, validation, and traceability.",
      "Small teams need full-stack products without enterprise budgets.",
    ],
    products: [
      {
        name: "Lead Automation Platform",
        description:
          "AI chatbot with OpenAI integration, lead extraction, and Supabase routing — handling inbound conversations and structuring lead data automatically.",
        url: "https://automation.pramana15.com/",
      },
      {
        name: "ShortsOS",
        description:
          "Content generation and publishing automation for short-form media — prompt pipelines, AI-assisted drafting, and workflow orchestration.",
        url: "https://pramana15.com",
      },
      {
        name: "MRV System",
        description:
          "Monitoring, reporting, and verification platform for traceable record management across stakeholders.",
        url: "https://oceara-web-platform-1.vercel.app/",
      },
    ],
    technicalChallenges: [
      "Designing database schemas flexible enough for multiple product lines.",
      "Making OpenAI integrations reliable enough for production user flows.",
      "Shipping fast without accumulating unmanageable technical debt.",
      "Building automation that non-technical users can operate confidently.",
    ],
    growth: [
      "Started with a single automation prototype and iterated based on real usage.",
      "Expanded from one product to a suite of interconnected tools.",
      "Established consistent API and deployment patterns across products.",
      "Learned to scope features around actual user workflows, not assumptions.",
    ],
    vision:
      "Build Pramana15 into a product studio that ships practical software — automation tools, dashboards, and AI systems that solve real operational problems for teams that need engineering without hiring a full department.",
    milestones: [
      { label: "Idea", description: "Identified automation gaps in lead and content workflows" },
      { label: "First Product", description: "Shipped AI chatbot and lead automation system" },
      { label: "Expansion", description: "Built MRV platform and ShortsOS content pipeline" },
      { label: "Today", description: "Iterating on live products with real user feedback" },
    ],
  },

  engineering: [
    {
      phase: "01",
      title: "Planning",
      description:
        "Define the problem clearly. Map user flows, identify constraints, and decide what to build versus what to defer.",
      practices: [
        "User flow mapping",
        "Scope definition",
        "Constraint analysis",
        "Priority ranking",
      ],
    },
    {
      phase: "02",
      title: "System Design",
      description:
        "Design the architecture before writing code — API contracts, database schema, and service boundaries.",
      practices: [
        "API contract design",
        "Database schema planning",
        "Component architecture",
        "Integration mapping",
      ],
    },
    {
      phase: "03",
      title: "Frontend Development",
      description:
        "Build interfaces that are responsive, accessible, and aligned with the user flows defined in planning.",
      practices: [
        "Component-driven development",
        "Responsive layouts",
        "State management",
        "Performance optimization",
      ],
    },
    {
      phase: "04",
      title: "Backend Development",
      description:
        "Implement APIs, business logic, and service layers with clear error handling and validation.",
      practices: [
        "REST API design",
        "Input validation",
        "Error handling",
        "Service orchestration",
      ],
    },
    {
      phase: "05",
      title: "Database Design",
      description:
        "Structure data for integrity, query performance, and the relationships the product actually needs.",
      practices: [
        "Schema normalization",
        "Relationship modeling",
        "Migration planning",
        "Data validation rules",
      ],
    },
    {
      phase: "06",
      title: "Testing",
      description:
        "Verify critical paths work — API endpoints, validation logic, and user flows that matter most.",
      practices: [
        "API endpoint testing",
        "Validation verification",
        "Cross-browser checks",
        "Edge case review",
      ],
    },
    {
      phase: "07",
      title: "Deployment",
      description:
        "Ship to production with environment configuration, build verification, and release checks.",
      practices: [
        "Environment configuration",
        "Build verification",
        "Production release",
        "Post-deploy smoke tests",
      ],
    },
    {
      phase: "08",
      title: "Iteration",
      description:
        "Use real usage to refine — fix what breaks, improve what users struggle with, cut what nobody uses.",
      practices: [
        "User feedback loops",
        "Performance monitoring",
        "Feature refinement",
        "Technical debt management",
      ],
    },
  ],

  certifications: [
    {
      title: "NPTEL Elite Rank Holder",
      issuer: "NPTEL · IIT",
      year: "2024",
    },
    {
      title: "Full Stack Development",
      issuer: "Industry Certification",
      year: "2024",
    },
    {
      title: "DevOps Certification",
      issuer: "Industry Certification",
      year: "2024",
    },
  ],

  navLinks: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Pramana15", href: "#founder" },
    { label: "Architecture", href: "#architecture" },
    { label: "Process", href: "#process" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],

  systemArchitecture: {
    description:
      "Every product I build follows the same core pattern — a React frontend talking to a Node.js API layer, persisting data in Supabase, with OpenAI powering automation where needed.",
    nodes: [
      { id: "client", label: "Client / User", x: -4.2, y: 0, z: 0, color: "#6366f1" },
      { id: "frontend", label: "React Frontend", x: -2, y: 1.4, z: 0.5, color: "#818cf8" },
      { id: "api", label: "Node.js API", x: 0.2, y: 0, z: 0, color: "#a5b4fc" },
      { id: "database", label: "Supabase DB", x: 2.4, y: -1.2, z: -0.3, color: "#6366f1" },
      { id: "ai", label: "OpenAI Engine", x: 2.4, y: 1.3, z: 0.4, color: "#c4b5fd" },
      { id: "deploy", label: "Vercel Deploy", x: 4.2, y: 0, z: 0, color: "#4f46e5" },
    ],
    edges: [
      { from: "client", to: "frontend" },
      { from: "frontend", to: "api" },
      { from: "api", to: "database" },
      { from: "api", to: "ai" },
      { from: "database", to: "deploy" },
      { from: "ai", to: "deploy" },
    ],
  },

  marqueeItems: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Supabase",
    "OpenAI",
    "REST APIs",
    "JavaScript",
    "Python",
    "Tailwind CSS",
  ],

  site: {
    url: "",
    description:
      "Software developer building full-stack applications and AI automation systems. Co-founder of Pramana15.",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PLACEHOLDER_URLS = new Set(["", "#", "ADD_GITHUB_LINK", "ADD_LINK"]);

export function isValidUrl(url: string): boolean {
  const trimmed = url.trim();
  return trimmed.length > 0 && !PLACEHOLDER_URLS.has(trimmed);
}

type PersonalDisplayField = "email" | "phone" | "location" | "name" | "role";

const SOCIAL_META: Record<
  SocialPlatform,
  { label: string; external: boolean; displayFromPersonal?: PersonalDisplayField }
> = {
  github: { label: "GitHub", external: true },
  linkedin: { label: "LinkedIn", external: true },
  codolio: { label: "Codolio", external: true },
  leetcode: { label: "LeetCode", external: true },
  codeforces: { label: "Codeforces", external: true },
  hackerrank: { label: "HackerRank", external: true },
  twitter: { label: "Twitter / X", external: true },
  instagram: { label: "Instagram", external: true },
  email: { label: "Email", external: false, displayFromPersonal: "email" },
  phone: { label: "Phone", external: false, displayFromPersonal: "phone" },
  portfolio: { label: "Pramana15", external: true },
};

function getSocialDisplay(platform: SocialPlatform, url: string): string {
  const meta = SOCIAL_META[platform];
  if (meta.displayFromPersonal) {
    return portfolioData.personal[meta.displayFromPersonal];
  }
  if (platform === "email" && url.startsWith("mailto:")) {
    return url.replace("mailto:", "");
  }
  if (platform === "phone" && url.startsWith("tel:")) {
    return portfolioData.personal.phone;
  }
  return meta.label;
}

export function getSocialLink(platform: SocialPlatform): SocialLinkEntry | null {
  const url = portfolioData.socials[platform];
  if (!isValidUrl(url)) return null;

  const meta = SOCIAL_META[platform];
  return {
    platform,
    label: meta.label,
    url,
    display: getSocialDisplay(platform, url),
    external: meta.external,
  };
}

export function getActiveSocialLinks(
  platforms?: SocialPlatform[]
): SocialLinkEntry[] {
  const keys =
    platforms ?? (Object.keys(portfolioData.socials) as SocialPlatform[]);
  return keys
    .map((platform) => getSocialLink(platform))
    .filter((link): link is SocialLinkEntry => link !== null);
}

export function getStructuredDataSameAs(): string[] {
  return getActiveSocialLinks([
    "github",
    "linkedin",
    "codolio",
    "leetcode",
    "codeforces",
    "hackerrank",
    "twitter",
    "instagram",
    "portfolio",
  ]).map((link) => link.url);
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioData.projects.find((p) => p.caseStudySlug === slug);
}

export function getExperienceById(id: string): DetailedExperience | undefined {
  return portfolioData.experience.find((e) => e.id === id);
}

export function getFeaturedProjects(): PortfolioProject[] {
  return portfolioData.projects.filter((p) => p.featured);
}
