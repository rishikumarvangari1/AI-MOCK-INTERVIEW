export type Domain = {
  id: string;
  title: string;
  description: string;
  icon: string;
  focus: string;
  topics: string[];
  aliases: string[];
};

export type ResolvedDomain = Domain & {
  key: string;
  label: string;
};

export const DOMAINS: Domain[] = [
  {
    id: "python",
    title: "Python Developer",
    description: "Python, OOP, data structures, generators, decorators & AsyncIO",
    icon: "🐍",
    focus: "core Python, OOP, data structures, generators, decorators, AsyncIO, Django, FastAPI",
    topics: [
      "Core Python & Data Types",
      "OOP & Design Patterns",
      "Data Structures & Algorithms",
      "Generators, Iterators & Decorators",
      "Concurrency & AsyncIO",
      "Testing, Packaging & Performance",
    ],
    aliases: ["python-developer"],
  },
  {
    id: "java",
    title: "Java Developer",
    description: "Java, collections, multithreading, JVM internals & Spring Boot",
    icon: "☕",
    focus: "core Java, collections, multithreading, JVM, Spring Boot, Maven, Hibernate",
    topics: [
      "Core Java & OOP",
      "Collections & Streams",
      "Multithreading & Concurrency",
      "JVM Internals & Garbage Collection",
      "Spring Boot & REST APIs",
      "Persistence & Transactions",
    ],
    aliases: ["java-developer"],
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    description: "Frontend, backend APIs, databases, auth, caching & deployment",
    icon: "🌐",
    focus: "JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, SQL, REST API, Docker",
    topics: [
      "JavaScript & TypeScript",
      "React & Component Architecture",
      "Node.js & REST API Design",
      "Databases & Schema Modeling",
      "Authentication & Web Security",
      "System Design & Deployment",
    ],
    aliases: ["full-stack", "full-stack-developer"],
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "HTML5, CSS3, JavaScript, TypeScript, React, accessibility & performance",
    icon: "🎨",
    focus: "HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Vue, Angular, accessibility",
    topics: [
      "HTML Semantics & Accessibility",
      "Modern CSS & Responsive Layout",
      "JavaScript & Browser Runtime",
      "React State & Hooks",
      "Web Performance & Core Web Vitals",
      "Frontend Testing & Security",
    ],
    aliases: ["frontend-developer", "react", "react-developer", "ux-design"],
  },
  {
    id: "backend",
    title: "Backend Developer",
    description: "REST/GraphQL APIs, databases, caching, queues, auth & scalability",
    icon: "⚙️",
    focus: "Node.js, Express, Python, Java, Go, REST API, GraphQL, PostgreSQL, MongoDB, Redis, Microservices",
    topics: [
      "REST & API Architecture",
      "Databases & Query Optimization",
      "Caching & Message Queues",
      "Authentication & Authorization",
      "Scalability & System Design",
      "Observability & Reliability",
    ],
    aliases: ["backend-developer", "system-design", "nodejs"],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    description: "SQL, Excel, statistics, KPI design, Power BI & Tableau",
    icon: "📊",
    focus: "SQL, Excel, Python, Pandas, statistics, Power BI, Tableau, data visualization",
    topics: [
      "SQL & Analytical Queries",
      "Data Cleaning & Transformation",
      "Descriptive & Inferential Statistics",
      "KPI & Business Metrics Design",
      "Data Visualization & Dashboards",
      "Stakeholder Storytelling",
    ],
    aliases: ["data-analytics", "product-management"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Machine learning, statistics, experimentation & model evaluation",
    icon: "🔬",
    focus: "Python, Pandas, NumPy, Scikit-learn, Machine Learning, statistics, SQL, TensorFlow, PyTorch",
    topics: [
      "Probability & Statistics",
      "Feature Engineering & EDA",
      "Supervised Learning Algorithms",
      "Model Evaluation & Validation",
      "Experimentation & A/B Testing",
      "Production ML Considerations",
    ],
    aliases: ["data-science"],
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    description: "Production ML pipelines, feature stores, PyTorch, TensorFlow & MLOps",
    icon: "🧠",
    focus: "Python, PyTorch, TensorFlow, Scikit-learn, Machine Learning, Deep Learning, Docker, Kubernetes, MLOps",
    topics: [
      "ML Algorithms & Feature Pipelines",
      "Deep Learning Frameworks",
      "Training & Hyperparameter Tuning",
      "Model Serving & Latency Optimization",
      "Data Drift & MLOps Monitoring",
      "Distributed Training & Scaling",
    ],
    aliases: ["machine-learning-engineer", "machine-learning"],
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    description: "LLMs, RAG architectures, prompt engineering, evaluation & agents",
    icon: "🤖",
    focus: "Python, LLM, RAG, NLP, LangChain, PyTorch, Deep Learning, REST API, TypeScript",
    topics: [
      "Transformers & LLM Architecture",
      "RAG & Vector Retrieval",
      "Prompt Engineering & Structured Output",
      "LLM Evaluation & Guardrails",
      "Agentic Workflows & Tool Use",
      "Inference Latency & Cost Optimization",
    ],
    aliases: ["ai-ml", "ai-ml-engineer", "ai"],
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    description: "CI/CD pipelines, Docker, Kubernetes, Linux, Terraform & SRE",
    icon: "🚀",
    focus: "Docker, Kubernetes, CI/CD, GitHub Actions, Linux, Terraform, AWS, GCP, Azure, Git",
    topics: [
      "Linux & Shell Fundamentals",
      "Containers & Docker",
      "Kubernetes Orchestration",
      "CI/CD Pipelines & Release Strategies",
      "Monitoring, Logging & Alerting",
      "Incident Response & SRE",
    ],
    aliases: ["devops-engineer"],
  },
  {
    id: "cloud",
    title: "Cloud Engineer",
    description: "AWS/GCP/Azure architecture, VPC networking, IAM, IaC & FinOps",
    icon: "☁️",
    focus: "AWS, GCP, Azure, Terraform, Docker, Kubernetes, Linux, networking, IAM",
    topics: [
      "Cloud Compute & Storage",
      "Networking, VPCs & Load Balancing",
      "IAM & Cloud Security",
      "Infrastructure as Code",
      "High Availability & Disaster Recovery",
      "Cost Optimization & FinOps",
    ],
    aliases: ["cloud-engineer"],
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    description: "DSA, object-oriented design, system design, testing & clean code",
    icon: "💻",
    focus: "Data Structures, Algorithms, System Design, Git, OOP, Java, Python, JavaScript, C++, SQL",
    topics: [
      "Data Structures & Algorithms",
      "Object-Oriented Design",
      "System Design & Scalability",
      "Concurrency & Reliability",
      "Testing, Debugging & Code Quality",
      "Engineering Trade-Offs & Collaboration",
    ],
    aliases: ["software-engineering", "swe", "sde", "general"],
  },
  {
    id: "dba",
    title: "Database Administrator",
    description: "Database tuning, replication, backups, security & high availability",
    icon: "🏛️",
    focus: "SQL, PostgreSQL, MySQL, MongoDB, Redis, indexing, replication, backups, performance tuning",
    topics: [
      "Schema Architecture & Normalization",
      "Indexing & Execution Plan Tuning",
      "Backup, Recovery & Point-in-Time Restore",
      "Replication, Sharding & High Availability",
      "Transactions, Locks & Concurrency",
      "Database Security & Access Control",
    ],
    aliases: ["database-administrator", "database"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Analyst",
    description: "OWASP Top 10, AppSec, cryptography, threat modeling & incident response",
    icon: "🔐",
    focus: "OWASP, OAuth, JWT, Linux, networking, cryptography, incident response, threat modeling",
    topics: [
      "OWASP Top 10 & AppSec",
      "Authentication, Cryptography & TLS",
      "Network Security & Defense in Depth",
      "Threat Modeling & Vulnerability Assessment",
      "Detection & Incident Response",
      "Cloud & Container Security",
    ],
    aliases: ["cybersecurity-analyst", "cybersecurity-engineer", "security"],
  },
  {
    id: "web-developer",
    title: "Web Developer",
    description: "HTML, CSS, JavaScript, responsive UI, REST APIs & web fundamentals",
    icon: "🌍",
    focus: "HTML, CSS, JavaScript, React, Tailwind CSS, Node.js, REST API, Git, accessibility",
    topics: [
      "HTML5 & Semantic Markup",
      "CSS3, Flexbox & Grid",
      "DOM & Client-Side JavaScript",
      "HTTP, REST APIs & Fetch",
      "Responsive Design & Accessibility",
      "Web Security & Deployment",
    ],
    aliases: ["web-dev"],
  },
  {
    id: "cpp",
    title: "C++ Developer",
    description: "Modern C++, memory management, STL, pointers & multithreading",
    icon: "⚡",
    focus: "C++, Data Structures, Algorithms, memory management, STL, multithreading, Linux",
    topics: [
      "Memory Management & Smart Pointers",
      "OOP, Virtual Dispatch & Templates",
      "STL Containers & Algorithms",
      "Concurrency & Multithreading",
      "Move Semantics & Modern C++",
      "Debugging & Low-Level Performance",
    ],
    aliases: ["c++", "cpp-developer"],
  },
  {
    id: "javascript",
    title: "JavaScript Developer",
    description: "ESNext, closures, prototypes, event loop, async patterns & TypeScript",
    icon: "🟨",
    focus: "JavaScript, TypeScript, Node.js, React, HTML, CSS, REST API, Jest",
    topics: [
      "Execution Context & Closures",
      "Event Loop & Asynchronous JS",
      "Prototypes & Object Model",
      "TypeScript Type System",
      "Browser & DOM Performance",
      "Testing & Error Handling",
    ],
    aliases: ["javascript-developer", "js"],
  },
  {
    id: "sql",
    title: "SQL Developer",
    description: "Complex joins, CTEs, window functions, schema design & indexing",
    icon: "🗄️",
    focus: "SQL, PostgreSQL, MySQL, BigQuery, Snowflake, joins, window functions, indexing",
    topics: [
      "Joins, Subqueries & CTEs",
      "Window Functions & Aggregations",
      "Normalization & Schema Design",
      "Indexing & Query Execution Plans",
      "Transactions & Isolation Levels",
      "Data Integrity & Migrations",
    ],
    aliases: ["sql-developer"],
  },
  {
    id: "android",
    title: "Android Developer",
    description: "Kotlin/Java, Jetpack Compose, lifecycle, offline storage & performance",
    icon: "📱",
    focus: "Kotlin, Java, Android, Jetpack Compose, REST API, SQL, Git, mobile architecture",
    topics: [
      "Activity & Fragment Lifecycle",
      "Jetpack Compose & UI Architecture",
      "Coroutines & Asynchronous Work",
      "MVVM, State & Dependency Injection",
      "Networking, Caching & Local Storage",
      "App Performance, Memory & Testing",
    ],
    aliases: ["android-developer", "mobile"],
  },
  {
    id: "qa-engineer",
    title: "QA Engineer",
    description: "Test strategy, Playwright/Cypress automation, API & regression QA",
    icon: "🧪",
    focus: "Jest, Cypress, Playwright, CI/CD, REST API, SQL, Agile, JavaScript, Python",
    topics: [
      "Test Pyramid & QA Strategy",
      "API & Integration Testing",
      "UI Automation (Playwright/Cypress)",
      "Edge Cases & Exploratory Testing",
      "Performance & Load Testing",
      "Defect Triage & CI Quality Gates",
    ],
    aliases: ["software-testing", "qa", "testing", "hr", "behavioral"],
  },
  {
    id: "computer-operator",
    title: "Computer Operator",
    description: "OS operations, office automation, backups, troubleshooting & IT workflows",
    icon: "🖥️",
    focus: "Windows, Linux, Microsoft Office, Excel, data entry, system backups, networking basics, hardware troubleshooting",
    topics: [
      "Operating Systems & File Management",
      "Office Productivity & Spreadsheets",
      "Hardware, Peripherals & Networking Basics",
      "Data Backup, Security & Hygiene",
      "Batch Processing & System Monitoring",
      "Daily IT Operations & Troubleshooting",
    ],
    aliases: ["computer-operations", "it-operator"],
  },
  {
    id: "technical-support",
    title: "Technical Support Engineer",
    description: "Incident triage, SLA workflows, networking, OS diagnostics & customer care",
    icon: "🎧",
    focus: "ITSM, ticketing, Windows, Linux, DNS, TCP/IP, HTTP, SQL basics, debugging, customer communication",
    topics: [
      "Structured Troubleshooting & Root Cause Analysis",
      "Networking, DNS, HTTP & Connectivity",
      "Operating System & Application Diagnostics",
      "Ticketing, SLAs & Incident Escalation",
      "Log Inspection & Database Basics",
      "Customer Communication & De-escalation",
    ],
    aliases: ["tech-support", "support-engineer", "it-support"],
  },
];

export function resolveDomain(
  raw: string | null | undefined
): ResolvedDomain | null {
  const slug = (raw ?? "").toLowerCase().trim();

  if (!/^[a-z0-9 +.#-]{1,60}$/.test(slug)) {
    return null;
  }

  const normalizedSlug = slug.replace(/\s+/g, "-");

  const matchedDomain = DOMAINS.find(
    (domain) =>
      domain.id === normalizedSlug ||
      domain.title.toLowerCase() === slug ||
      domain.aliases.includes(normalizedSlug)
  );

  if (matchedDomain) {
    return {
      ...matchedDomain,
      key: matchedDomain.id,
      label: matchedDomain.title,
    };
  }

  const title = normalizedSlug.replace(
    /(^|-)(\w)/g,
    (_, separator, character) => (separator ? " " : "") + character.toUpperCase()
  );

  return {
    id: normalizedSlug,
    key: normalizedSlug,
    title,
    label: title,
    description: `Technical interview focused on ${title}`,
    icon: "✨",
    focus: `core concepts of ${title}`,
    topics: [
      `${title} Fundamentals`,
      "Core Concepts & Architecture",
      "Problem Solving & Debugging",
      "Best Practices & Testing",
      "Performance & Reliability",
      "Real-World Scenarios",
    ],
    aliases: [],
  };
}
