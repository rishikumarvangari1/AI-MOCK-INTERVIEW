const FALLBACK_QUESTIONS = {
  python: [
    {
      text: "Explain the difference between a Python list, tuple, and generator expression, and when you would prefer a generator in production.",
      level: "beginner",
      topic: "Generators, Iterators & Decorators",
    },
    {
      text: "How does Python's Global Interpreter Lock (GIL) affect CPU-bound vs I/O-bound workloads, and what concurrency primitives solve each?",
      level: "intermediate",
      topic: "Concurrency & AsyncIO",
    },
    {
      text: "Design a reusable Python decorator that retries transient network failures with exponential backoff while preserving wrapped function metadata.",
      level: "advanced",
      topic: "Generators, Iterators & Decorators",
    },
  ],
  java: [
    {
      text: "Compare HashMap, LinkedHashMap, and ConcurrentHashMap in Java, including time complexity and thread-safety guarantees.",
      level: "beginner",
      topic: "Collections & Streams",
    },
    {
      text: "How does Spring Boot auto-configuration work under the hood, and how do you safely manage database transactions across service boundaries?",
      level: "intermediate",
      topic: "Spring Boot & REST APIs",
    },
    {
      text: "Walk through how you would diagnose a production JVM memory leak and high GC pause latency.",
      level: "advanced",
      topic: "JVM Internals & Garbage Collection",
    },
  ],
  javascript: [
    {
      text: "Explain lexical closures in JavaScript with a practical use case and a common pitfall to avoid.",
      level: "beginner",
      topic: "Execution Context & Closures",
    },
    {
      text: "Trace the execution order of synchronous code, microtasks (Promises), and macrotasks (setTimeout) in the JavaScript event loop.",
      level: "intermediate",
      topic: "Event Loop & Asynchronous JS",
    },
    {
      text: "How would you design a type-safe API client in TypeScript with automatic request cancellation and retry handling?",
      level: "advanced",
      topic: "TypeScript Type System",
    },
  ],
  react: [
    {
      text: "Explain how React reconciliation uses keys in lists and why using array indices as keys can introduce state bugs.",
      level: "beginner",
      topic: "React Rendering & Reconciliation",
    },
    {
      text: "When should you derive state during render instead of synchronizing it with useEffect? Give a concrete example.",
      level: "intermediate",
      topic: "Hooks, Effects & Custom Hooks",
    },
    {
      text: "Describe your process for diagnosing and fixing slow React renders and Core Web Vitals (LCP/INP) regressions.",
      level: "advanced",
      topic: "Performance Optimization & Memoization",
    },
  ],
  fullstack: [
    {
      text: "Design a secure authentication flow for a React + Express web application, comparing HTTP-only cookies vs Bearer tokens.",
      level: "beginner",
      topic: "Authentication & Web Security",
    },
    {
      text: "How do you prevent N+1 queries, race conditions, and duplicate record creation on retried POST requests?",
      level: "intermediate",
      topic: "Node.js & REST API Design",
    },
    {
      text: "Architect a scalable file-processing pipeline (e.g. resume parsing and AI analysis) that stays responsive under traffic spikes.",
      level: "advanced",
      topic: "System Design & Deployment",
    },
  ],
  "data-analyst": [
    {
      text: "Explain the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN, and how duplicate keys affect aggregations.",
      level: "beginner",
      topic: "SQL & Analytical Queries",
    },
    {
      text: "A product's weekly active users dropped 14% overnight. Walk through your structured investigation and validation steps.",
      level: "intermediate",
      topic: "KPI & Business Metrics Design",
    },
    {
      text: "How would you use SQL window functions (ROW_NUMBER, LAG, moving averages) to compute 30-day cohort retention?",
      level: "advanced",
      topic: "SQL & Analytical Queries",
    },
  ],
  "data-scientist": [
    {
      text: "Explain the bias-variance trade-off and how regularization (L1 vs L2) influences model generalization.",
      level: "beginner",
      topic: "Supervised Learning Algorithms",
    },
    {
      text: "For a highly imbalanced fraud detection dataset (0.5% positive), which metrics and validation splits would you choose and why?",
      level: "intermediate",
      topic: "Model Evaluation & Validation",
    },
    {
      text: "Design an A/B experiment to test a new ranking model, including sample size, guardrail metrics, and peeking hazards.",
      level: "advanced",
      topic: "Experimentation & A/B Testing",
    },
  ],
  "ai-ml": [
    {
      text: "Compare RAG (Retrieval-Augmented Generation) and fine-tuning. When is each approach preferred in production?",
      level: "beginner",
      topic: "RAG & Prompt Engineering",
    },
    {
      text: "How do you evaluate an LLM application for hallucination, latency, and prompt injection resilience before release?",
      level: "intermediate",
      topic: "MLOps, Monitoring & Safety",
    },
    {
      text: "Explain how attention complexity scales with sequence length and techniques used to optimize LLM serving throughput.",
      level: "advanced",
      topic: "Inference Optimization & Serving",
    },
  ],
  sql: [
    {
      text: "Explain the difference between WHERE and HAVING clauses and the logical evaluation order of a SELECT query.",
      level: "beginner",
      topic: "Joins, Subqueries & CTEs",
    },
    {
      text: "How do composite B-tree indexes work, and why does column order matter for equality vs range predicates?",
      level: "intermediate",
      topic: "Indexing & Query Execution Plans",
    },
    {
      text: "Compare READ COMMITTED, REPEATABLE READ, and SERIALIZABLE isolation levels and the anomalies each prevents.",
      level: "advanced",
      topic: "Transactions & Isolation Levels",
    },
  ],
  cloud: [
    {
      text: "Explain the principle of least privilege in cloud IAM and how you would scope permissions for an application backend.",
      level: "beginner",
      topic: "IAM & Cloud Security",
    },
    {
      text: "Design a multi-AZ web architecture with public load balancers, private app subnets, and managed databases.",
      level: "intermediate",
      topic: "Networking, VPCs & Load Balancing",
    },
    {
      text: "How do you design RPO/RTO targets and automated failover drills for a business-critical cloud service?",
      level: "advanced",
      topic: "High Availability & Disaster Recovery",
    },
  ],
  devops: [
    {
      text: "Explain the benefits of multi-stage Docker builds and running containers as non-root users.",
      level: "beginner",
      topic: "Containers & Docker",
    },
    {
      text: "Compare blue-green and canary deployment strategies, including automated rollback triggers.",
      level: "intermediate",
      topic: "CI/CD Pipelines & Release Strategies",
    },
    {
      text: "A Kubernetes service is experiencing CrashLoopBackOff and intermittent 502s. Walk through your triage workflow.",
      level: "advanced",
      topic: "Kubernetes Orchestration",
    },
  ],
  hr: [
    {
      text: "Tell me about yourself and what draws you specifically to this role and career track.",
      level: "beginner",
      topic: "Self Introduction & Career Story",
    },
    {
      text: "What is a constructive piece of feedback you received recently, and how did you act on it?",
      level: "intermediate",
      topic: "Handling Feedback & Deadlines",
    },
    {
      text: "Where do you want to grow over the next 2–3 years, and how does this role align with those goals?",
      level: "advanced",
      topic: "Career Trajectory & Questions",
    },
  ],
  behavioral: [
    {
      text: "Using the STAR method, describe a project you are most proud of and the specific impact your work delivered.",
      level: "beginner",
      topic: "Ownership & Initiative (STAR)",
    },
    {
      text: "Tell me about a time you disagreed with a teammate or stakeholder on a technical decision. How did you resolve it?",
      level: "intermediate",
      topic: "Conflict Resolution & Persuasion",
    },
    {
      text: "Describe a situation where requirements were ambiguous and a deadline was tight. How did you prioritize and communicate trade-offs?",
      level: "advanced",
      topic: "Prioritization Under Pressure",
    },
  ],
  "software-testing": [
    {
      text: "Explain the test pyramid and how you decide what belongs in unit, integration, and end-to-end tests.",
      level: "beginner",
      topic: "Test Pyramid & QA Strategy",
    },
    {
      text: "How do you prevent flaky Playwright/Cypress UI tests in CI while still catching real regressions?",
      level: "intermediate",
      topic: "UI Automation (Playwright/Cypress)",
    },
    {
      text: "Design a test plan (functional, security, performance, edge cases) for a file-upload and AI-analysis API.",
      level: "advanced",
      topic: "API & Integration Testing",
    },
  ],
  cybersecurity: [
    {
      text: "Explain XSS vs CSRF vulnerabilities and the concrete defenses you apply for each in modern web apps.",
      level: "beginner",
      topic: "OWASP Top 10 & AppSec",
    },
    {
      text: "How should an application securely handle password storage, JWT lifecycle, and secret rotation?",
      level: "intermediate",
      topic: "Authentication, Cryptography & TLS",
    },
    {
      text: "Walk through how you would threat-model and harden a multi-tenant SaaS API that processes uploaded user documents.",
      level: "advanced",
      topic: "Threat Modeling & Vulnerability Assessment",
    },
  ],
};

const CODING_PROBLEMS = [
  {
    id: 1,
    text: "Two Sum Indices: Given an integer array `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. Optimize for better than O(n^2) time.",
    level: "beginner",
    topic: "Hash Maps & Time Complexity",
    sampleInput: "nums = [2, 7, 11, 15], target = 9",
    sampleOutput: "[0, 1]",
    testCases: [
      { input: "nums = [2, 7, 11, 15], target = 9", expected: "[0, 1]" },
      { input: "nums = [3, 2, 4], target = 6", expected: "[1, 2]" },
      { input: "nums = [3, 3], target = 6", expected: "[0, 1]" },
    ],
  },
  {
    id: 2,
    text: "Valid Balanced Brackets: Given a string containing `()[]{}`, determine whether the brackets are opened and closed in valid nested order. Handle empty strings and odd lengths cleanly.",
    level: "intermediate",
    topic: "Stacks & Edge Cases",
    sampleInput: 's = "{[()]}"',
    sampleOutput: "true",
    testCases: [
      { input: 's = "{[()]}"', expected: "true" },
      { input: 's = "([)]"', expected: "false" },
      { input: 's = ""', expected: "true" },
    ],
  },
  {
    id: 3,
    text: "LRU Cache Design: Implement an LRU (Least Recently Used) cache supporting `get(key)` and `put(key, value)` in O(1) average time complexity with a fixed capacity.",
    level: "advanced",
    topic: "Data Structures & O(1) Design",
    sampleInput: "capacity = 2; put(1,1), put(2,2), get(1), put(3,3), get(2)",
    sampleOutput: "1, -1",
    testCases: [
      { input: "capacity = 2; put(1,1), put(2,2), get(1) -> 1", expected: "1" },
      { input: "after put(3,3), get(2) -> -1 (evicted)", expected: "-1" },
    ],
  },
];

function getLevelForPosition(index, total) {
  if (total >= 10) {
    if (index < 3) return "beginner";
    if (index < 6) return "intermediate";
    return "advanced";
  }
  if (index === 0) return "beginner";
  if (index < Math.ceil(total * 0.6)) return "intermediate";
  return "advanced";
}

function getFallbackQuestions(domainId, count = 10, interviewType = "technical", domainTitle = "") {
  const { resolveDomain } = require("./domains");
  const resolved = resolveDomain(domainId);
  const label = domainTitle || resolved?.title || "Software Engineering";
  const topics = resolved?.topics || [
    "Core Fundamentals",
    "Architecture & Design",
    "Debugging & Problem Solving",
    "Testing & Reliability",
    "Performance & Security",
    "Real-World Scenarios",
  ];

  if (interviewType === "coding") {
    return CODING_PROBLEMS.slice(0, Math.min(count, CODING_PROBLEMS.length)).map(
      (item, idx) => ({
        ...item,
        id: idx + 1,
        domain: label,
        expectedConcepts: [item.topic, "Time & Space Complexity", "Edge Cases"],
        referenceAnswer: `Provide a clean algorithm for ${item.topic} handling all listed edge cases with optimal time and space complexity.`,
        evaluationCriteria:
          "Assess algorithmic correctness, complexity trade-offs, edge-case handling, and code clarity.",
        source: "fallback_bank",
      })
    );
  }

  const base =
    FALLBACK_QUESTIONS[domainId] ||
    FALLBACK_QUESTIONS[resolved?.id] ||
    [];

  // Domain-specific progressive templates to guarantee 10 distinct domain-relevant questions
  const domainTemplates = [
    {
      text: `Explain the core fundamentals of ${topics[0] || label} and why they matter in day-to-day ${label} work.`,
      level: "beginner",
      topic: topics[0] || label,
      expectedConcepts: [topics[0] || label, "core terminology", "basic usage"],
      referenceAnswer: `A strong answer clearly defines ${topics[0] || label}, explains its core building blocks, and gives a concrete example of how a ${label} applies it in production.`,
    },
    {
      text: `What are the most common mistakes beginners make with ${topics[1] || label}, and how do you avoid them?`,
      level: "beginner",
      topic: topics[1] || label,
      expectedConcepts: [topics[1] || label, "pitfalls", "best practices"],
      referenceAnswer: `A thorough answer identifies 2–3 concrete pitfalls in ${topics[1] || label} and explains actionable safeguards or conventions to prevent them.`,
    },
    {
      text: `Compare two key approaches or tools commonly used in ${topics[2] || label}. When would you choose one over the other?`,
      level: "beginner",
      topic: topics[2] || label,
      expectedConcepts: ["trade-offs", "selection criteria", topics[2] || label],
      referenceAnswer: `Explain the strengths, limitations, and decision criteria between primary tools/patterns in ${topics[2] || label} with a realistic use case.`,
    },
    {
      text: `Walk through how you structure, test, and maintain code or workflows involving ${topics[3] || label}.`,
      level: "intermediate",
      topic: topics[3] || label,
      expectedConcepts: ["maintainability", "testing", topics[3] || label],
      referenceAnswer: `Describe modular design, automated verification, error handling, and operational practices for ${topics[3] || label}.`,
    },
    {
      text: `How do you optimize performance and reliability when working with ${topics[4] || label} under increasing workload?`,
      level: "intermediate",
      topic: topics[4] || label,
      expectedConcepts: ["profiling", "bottlenecks", "reliability", topics[4] || label],
      referenceAnswer: `Discuss measuring before optimizing, identifying bottlenecks, caching/batching or resource management, and monitoring regressions in ${topics[4] || label}.`,
    },
    {
      text: `Describe security, data-integrity, or compliance practices every ${label} must enforce around ${topics[5] || label}.`,
      level: "intermediate",
      topic: topics[5] || label,
      expectedConcepts: ["validation", "least privilege", "auditability"],
      referenceAnswer: `Cover input validation, access control, safe error handling, secret hygiene, and verification checks relevant to ${topics[5] || label}.`,
    },
    {
      text: `At an advanced level, how would you architect a resilient, scalable system centered on ${topics[0] || label} and ${topics[3] || label}?`,
      level: "advanced",
      topic: topics[0] || label,
      expectedConcepts: ["scalability", "fault tolerance", "trade-offs", "observability"],
      referenceAnswer: `Present component boundaries, failure modes, scaling bottlenecks, observability metrics, and clear engineering trade-offs.`,
    },
    {
      text: `Explain an advanced debugging or root-cause analysis methodology you would use when a critical ${label} workflow fails intermittently in production.`,
      level: "advanced",
      topic: topics[4] || label,
      expectedConcepts: ["reproduction", "logs & metrics", "isolation", "postmortem"],
      referenceAnswer: `Outline hypothesis-driven triage using logs, metrics, recent deploys, safe mitigation/rollback, root cause verification, and preventive tests.`,
    },
    {
      text: `Practical Scenario: A high-priority stakeholder reports a sudden regression in a ${label} deliverable right before release. Walk through your step-by-step response.`,
      level: "advanced",
      topic: topics[5] || "Real-World Scenarios",
      expectedConcepts: ["impact triage", "communication", "rollback or hotfix", "verification"],
      referenceAnswer: `Demonstrate structured triage: assess blast radius, communicate clearly with stakeholders, contain/fix safely, verify with targeted tests, and document lessons learned.`,
    },
    {
      text: `Project Problem-Solving: Describe a challenging real-world ${label} problem you solved (or would solve) involving ${topics[2] || label}. What constraints existed and why did you pick your final design?`,
      level: "advanced",
      topic: topics[2] || "Real-World Scenarios",
      expectedConcepts: ["requirements", "constraints", "alternatives considered", "measurable outcome"],
      referenceAnswer: `Clearly state the problem context, technical constraints, alternatives evaluated, implementation decisions, and measurable outcome.`,
    },
  ];

  const seen = new Set();
  const combined = [];
  for (const item of [...base, ...domainTemplates]) {
    if (seen.has(item.text)) continue;
    seen.add(item.text);
    combined.push(item);
    if (combined.length >= count) break;
  }

  return combined.map((item, idx) => ({
    id: idx + 1,
    text: item.text,
    domain: label,
    level: item.level || getLevelForPosition(idx, count),
    topic: item.topic || topics[idx % topics.length] || label,
    expectedConcepts: item.expectedConcepts || [item.topic || label, "Practical understanding", "Trade-offs"],
    referenceAnswer:
      item.referenceAnswer ||
      `A complete answer explains ${item.topic || label} clearly, covers key technical mechanisms, and illustrates them with a practical ${label} example.`,
    evaluationCriteria:
      item.evaluationCriteria ||
      "Evaluate semantic understanding (50%), technical accuracy (20%), completeness (15%), clarity (10%), and practical application (5%).",
    source: "fallback_bank",
  }));
}

module.exports = {
  FALLBACK_QUESTIONS,
  CODING_PROBLEMS,
  getFallbackQuestions,
};
