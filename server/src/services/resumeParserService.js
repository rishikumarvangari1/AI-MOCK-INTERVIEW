const crypto = require("node:crypto");
const path = require("node:path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { AppError } = require("../utils/errors");
const { DOMAINS } = require("../config/domains");

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const ALLOWED_EXTENSIONS = new Set([".pdf", ".docx", ".txt"]);
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "application/octet-stream", // Some browsers send generic octet-stream for .docx/.pdf; magic bytes verify real format
]);

const SKILL_DICTIONARY = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "SQL",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "Node.js",
  "Express",
  "Spring Boot",
  "Django",
  "FastAPI",
  "Flask",
  "GraphQL",
  "REST API",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "Azure",
  "Terraform",
  "CI/CD",
  "GitHub Actions",
  "Linux",
  "Git",
  "Jest",
  "Cypress",
  "Playwright",
  "PyTorch",
  "TensorFlow",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "LLM",
  "RAG",
  "LangChain",
  "Data Structures",
  "Algorithms",
  "System Design",
  "Microservices",
  "Kafka",
  "RabbitMQ",
  "Power BI",
  "Tableau",
  "Excel",
  "Spark",
  "Airflow",
  "BigQuery",
  "Snowflake",
  "OWASP",
  "OAuth",
  "JWT",
  "Agile",
  "Scrum",
];

const SECTION_PATTERNS = [
  { name: "Summary", regex: /\b(summary|objective|profile|about me)\b/i },
  { name: "Experience", regex: /\b(experience|employment|work history|internships?)\b/i },
  { name: "Projects", regex: /\b(projects?|portfolio)\b/i },
  { name: "Education", regex: /\b(education|academic|university|degree)\b/i },
  { name: "Skills", regex: /\b(skills|technologies|technical stack|competencies)\b/i },
  { name: "Certifications", regex: /\b(certifications?|licenses?|awards?|honors?)\b/i },
];

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "that", "this", "from", "have", "will", "your",
  "you", "are", "our", "work", "team", "role", "experience", "years", "using",
  "skills", "ability", "strong", "knowledge", "working", "build", "building",
  "develop", "developing", "design", "designing", "requirements", "preferred",
  "responsibilities", "qualifications", "including", "across", "within", "into",
  "about", "more", "than", "their", "they", "them", "must", "should", "good",
  "great", "plus", "bonus", "looking", "seeking", "join", "company", "product",
]);

function sanitizeFilename(originalName) {
  const base = path.basename(String(originalName || "resume.txt"));
  return base.replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 140) || "resume.txt";
}

function hasPdfMagicBytes(buffer) {
  return (
    Buffer.isBuffer(buffer) &&
    buffer.length >= 5 &&
    buffer.subarray(0, 5).toString("ascii") === "%PDF-"
  );
}

function hasDocxMagicBytes(buffer) {
  return (
    Buffer.isBuffer(buffer) &&
    buffer.length >= 4 &&
    buffer[0] === 0x50 &&
    buffer[1] === 0x4b &&
    (buffer[2] === 0x03 || buffer[2] === 0x05 || buffer[2] === 0x07) &&
    (buffer[3] === 0x04 || buffer[3] === 0x06 || buffer[3] === 0x08)
  );
}

function isPlainTextBuffer(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length === 0) return false;
  const sample = buffer.subarray(0, Math.min(buffer.length, 4096));
  for (let i = 0; i < sample.length; i += 1) {
    if (sample[i] === 0x00) return false;
  }
  return true;
}

function validateUploadedFile(file) {
  if (!file || !Buffer.isBuffer(file.buffer)) {
    throw new AppError(400, "Please upload a resume file.", "FILE_REQUIRED");
  }

  if (file.size > MAX_FILE_SIZE_BYTES || file.buffer.length > MAX_FILE_SIZE_BYTES) {
    throw new AppError(
      400,
      "Resume file must be 5 MB or smaller.",
      "FILE_TOO_LARGE"
    );
  }

  const safeName = sanitizeFilename(file.originalname);
  const ext = path.extname(safeName).toLowerCase();

  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new AppError(
      400,
      "Only PDF, DOCX, and TXT resume files are supported.",
      "UNSUPPORTED_FORMAT"
    );
  }

  if (file.mimetype && !ALLOWED_MIME_TYPES.has(file.mimetype.toLowerCase())) {
    throw new AppError(
      400,
      `Unsupported file MIME type: ${file.mimetype}`,
      "INVALID_MIME_TYPE"
    );
  }

  if (ext === ".pdf" && !hasPdfMagicBytes(file.buffer)) {
    throw new AppError(
      400,
      "File extension is .pdf, but its binary signature is not a valid PDF document.",
      "INVALID_FILE_SIGNATURE"
    );
  }

  if (ext === ".docx" && !hasDocxMagicBytes(file.buffer)) {
    throw new AppError(
      400,
      "File extension is .docx, but its binary signature is not a valid DOCX archive.",
      "INVALID_FILE_SIGNATURE"
    );
  }

  if (ext === ".txt" && !isPlainTextBuffer(file.buffer)) {
    throw new AppError(
      400,
      "Uploaded .txt file appears to contain binary content rather than plain text.",
      "INVALID_FILE_SIGNATURE"
    );
  }

  const fileHash = crypto
    .createHash("sha256")
    .update(file.buffer)
    .digest("hex");

  return {
    safeName,
    ext,
    fileHash,
    fileSizeBytes: file.buffer.length,
  };
}

async function extractResumeText(file) {
  const { ext } = validateUploadedFile(file);

  let text = "";
  try {
    if (ext === ".pdf") {
      const result = await pdfParse(file.buffer);
      text = result.text || "";
    } else if (ext === ".docx") {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      text = result.value || "";
    } else if (ext === ".txt") {
      text = file.buffer.toString("utf8");
    }
  } catch {
    throw new AppError(
      422,
      "Unable to parse the uploaded file. Please ensure it is not corrupted or password-protected.",
      "PARSE_FAILED"
    );
  }

  const normalized = text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (normalized.length < 30) {
    throw new AppError(
      422,
      "No readable resume text was extracted. Scanned/image-only PDFs are not supported — please upload a text-based PDF, DOCX, or TXT file.",
      "EMPTY_RESUME_TEXT"
    );
  }

  return normalized;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseResumeStructure(resumeText) {
  const text = String(resumeText || "");
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasPhone = /(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/.test(
    text
  );
  const hasLinkedin = /linkedin\.com\/in\//i.test(text);
  const hasGithub = /github\.com\//i.test(text);

  const sections = SECTION_PATTERNS.filter((s) => s.regex.test(text)).map(
    (s) => s.name
  );

  const skills = SKILL_DICTIONARY.filter((skill) => {
    const escaped = escapeRegExp(skill);
    const pattern = /^[a-z0-9 ]+$/i.test(skill)
      ? new RegExp(`\\b${escaped}\\b`, "i")
      : new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`, "i");
    return pattern.test(text);
  });

  const bulletLines = lines.filter((line) => /^([•\-*▪–—]|\d+\.)\s+/.test(line));
  const quantifiedBulletCount = bulletLines.filter((line) =>
    /(\d+%|\$\d+|\d+\+|\d+x\b|\b\d{2,}\b)/i.test(line)
  ).length;

  const yearsMatch = text.match(/(\d{1,2})\+?\s+years?\s+of\s+experience/i);
  const experienceYearsEstimate = yearsMatch ? Number(yearsMatch[1]) : null;

  return {
    wordCount,
    characterCount: text.length,
    parsed: {
      contact: {
        hasEmail,
        hasPhone,
        hasLinkedin,
        hasGithub,
      },
      sections,
      skills,
      bulletCount: bulletLines.length,
      quantifiedBulletCount,
      experienceYearsEstimate,
    },
  };
}

function buildBaselineAtsReport(parsedInfo) {
  const { wordCount, parsed } = parsedInfo;

  // Completeness score
  let completeness = 20;
  if (parsed.contact.hasEmail) completeness += 15;
  if (parsed.contact.hasPhone) completeness += 10;
  if (parsed.contact.hasLinkedin || parsed.contact.hasGithub) completeness += 10;
  completeness += Math.min(45, parsed.sections.length * 9);

  // Formatting score
  let formatting = 55;
  if (wordCount >= 220 && wordCount <= 900) formatting += 25;
  else if (wordCount >= 120 && wordCount <= 1200) formatting += 12;
  if (parsed.bulletCount >= 4) formatting += 20;
  else if (parsed.bulletCount >= 1) formatting += 10;

  // Impact score
  const impactRatio =
    parsed.bulletCount > 0
      ? parsed.quantifiedBulletCount / parsed.bulletCount
      : 0;
  const impact = Math.min(
    100,
    Math.round(30 + Math.min(1, impactRatio * 2) * 55 + Math.min(15, parsed.quantifiedBulletCount * 3))
  );

  // Keywords score
  const keywords = Math.min(100, Math.round(25 + parsed.skills.length * 7));

  // Clarity score
  const clarity = Math.min(
    100,
    Math.round(50 + (parsed.sections.length >= 3 ? 25 : 10) + (wordCount <= 1000 ? 15 : 5))
  );

  const overallScore = Math.round(
    formatting * 0.2 +
      impact * 0.25 +
      keywords * 0.25 +
      completeness * 0.15 +
      clarity * 0.15
  );

  const strengths = [];
  const weaknesses = [];
  const missingInfo = [];
  const atsSuggestions = [];

  if (parsed.skills.length >= 6) {
    strengths.push(`Strong technical keyword density (${parsed.skills.length} recognized skills).`);
  } else {
    weaknesses.push("Limited recognizable technical keywords for automated ATS screening.");
    atsSuggestions.push("Add a dedicated Technical Skills section matching your target role.");
  }

  if (parsed.quantifiedBulletCount >= 3) {
    strengths.push(`Includes ${parsed.quantifiedBulletCount} quantified achievement bullets.`);
  } else {
    weaknesses.push("Few measurable metrics (%, $, latency, user scale) in bullet points.");
    atsSuggestions.push("Quantify project and experience bullets using STAR + measurable outcomes.");
  }

  if (!parsed.contact.hasEmail) missingInfo.push("Email address");
  if (!parsed.contact.hasPhone) missingInfo.push("Phone number");
  if (!parsed.contact.hasGithub && !parsed.contact.hasLinkedin) {
    missingInfo.push("LinkedIn or GitHub profile link");
  }
  if (!parsed.sections.includes("Projects") && !parsed.sections.includes("Experience")) {
    missingInfo.push("Experience or Projects section heading");
  }

  if (wordCount < 200) {
    weaknesses.push("Resume is quite short and may under-represent your technical depth.");
  } else if (wordCount > 1000) {
    atsSuggestions.push("Trim verbose paragraphs to keep resume concise (1–2 pages).");
  }

  return {
    overallScore,
    sectionScores: {
      formatting,
      impact,
      keywords,
      completeness,
      clarity,
    },
    strengths,
    weaknesses,
    missingInfo,
    atsSuggestions,
    recommendedRoles: [],
    actionPlan: atsSuggestions.slice(0, 4),
    analyzedAt: null,
  };
}

function extractKeywordsFromJobDescription(jobDescription) {
  const jd = String(jobDescription || "");
  const matchedKnown = SKILL_DICTIONARY.filter((skill) => {
    const escaped = escapeRegExp(skill);
    const pattern = /^[a-z0-9 ]+$/i.test(skill)
      ? new RegExp(`\\b${escaped}\\b`, "i")
      : new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`, "i");
    return pattern.test(jd);
  });

  if (matchedKnown.length >= 6) {
    return matchedKnown.slice(0, 25);
  }

  // Supplement with top frequent domain terms from JD
  const freq = new Map();
  const tokens = jd.match(/[A-Za-z][A-Za-z0-9.+#/-]{2,24}/g) || [];
  for (const token of tokens) {
    const lower = token.toLowerCase();
    if (STOP_WORDS.has(lower)) continue;
    if (/^\d+$/.test(lower)) continue;
    freq.set(lower, (freq.get(lower) || 0) + 1);
  }

  const extras = [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .filter((word) => !matchedKnown.some((k) => k.toLowerCase() === word))
    .slice(0, Math.max(0, 15 - matchedKnown.length));

  return [...matchedKnown, ...extras];
}

function computeKeywordMatch(resumeText, parsedSkills, jobDescription) {
  const jdKeywords = extractKeywordsFromJobDescription(jobDescription);
  const lowerResume = String(resumeText || "").toLowerCase();
  const skillSet = new Set((parsedSkills || []).map((s) => s.toLowerCase()));

  const matchedKeywords = [];
  const missingKeywords = [];

  for (const keyword of jdKeywords) {
    const lower = keyword.toLowerCase();
    const isMatched =
      skillSet.has(lower) || lowerResume.includes(lower);
    if (isMatched) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  }

  const matchScore = jdKeywords.length
    ? Math.round((matchedKeywords.length / jdKeywords.length) * 100)
    : 0;

  return {
    matchScore,
    matchedKeywords,
    missingKeywords,
    totalKeywordsEvaluated: jdKeywords.length,
  };
}

function compareResumeVersions(v1, v2) {
  const s1 = new Set((v1.parsed?.skills || []).map((s) => s.toLowerCase()));
  const s2 = new Set((v2.parsed?.skills || []).map((s) => s.toLowerCase()));

  const addedSkills = (v2.parsed?.skills || []).filter(
    (skill) => !s1.has(skill.toLowerCase())
  );
  const removedSkills = (v1.parsed?.skills || []).filter(
    (skill) => !s2.has(skill.toLowerCase())
  );

  const score1 = v1.atsReport?.overallScore ?? null;
  const score2 = v2.atsReport?.overallScore ?? null;
  const scoreDelta =
    score1 !== null && score2 !== null ? score2 - score1 : null;

  return {
    from: {
      id: String(v1._id),
      version: v1.version || 1,
      originalName: v1.originalName,
      atsScore: score1,
      wordCount: v1.wordCount || 0,
      skillCount: v1.parsed?.skills?.length || 0,
      quantifiedBullets: v1.parsed?.quantifiedBulletCount || 0,
      uploadedAt: v1.createdAt,
    },
    to: {
      id: String(v2._id),
      version: v2.version || 1,
      originalName: v2.originalName,
      atsScore: score2,
      wordCount: v2.wordCount || 0,
      skillCount: v2.parsed?.skills?.length || 0,
      quantifiedBullets: v2.parsed?.quantifiedBulletCount || 0,
      uploadedAt: v2.createdAt,
    },
    deltas: {
      atsScore: scoreDelta,
      wordCount: (v2.wordCount || 0) - (v1.wordCount || 0),
      skillCount:
        (v2.parsed?.skills?.length || 0) - (v1.parsed?.skills?.length || 0),
      quantifiedBullets:
        (v2.parsed?.quantifiedBulletCount || 0) -
        (v1.parsed?.quantifiedBulletCount || 0),
    },
    addedSkills,
    removedSkills,
  };
}

function computeResumeDomainRecommendations(resumeText, parsedSkills = []) {
  const lowerText = String(resumeText || "").toLowerCase();
  const skillSet = new Set((parsedSkills || []).map((s) => s.toLowerCase()));
  const limitedEvidence = parsedSkills.length < 3;

  const ranked = DOMAINS.map((domain) => {
    const focusTerms = domain.focus
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const supportingSkills = [];
    const missingSkills = [];

    for (const term of focusTerms) {
      const lowerTerm = term.toLowerCase();
      const matched =
        skillSet.has(lowerTerm) ||
        lowerText.includes(lowerTerm) ||
        [...skillSet].some(
          (s) =>
            (s.length >= 3 && lowerTerm.includes(s)) ||
            (lowerTerm.length >= 3 && s.includes(lowerTerm))
        );
      if (matched) {
        supportingSkills.push(term);
      } else {
        missingSkills.push(term);
      }
    }

    const ratio = focusTerms.length
      ? supportingSkills.length / focusTerms.length
      : 0;
    const matchPercentage = Math.min(
      96,
      Math.max(15, Math.round(18 + ratio * 78))
    );

    const rationale =
      supportingSkills.length > 0
        ? `Matched ${supportingSkills.length} of ${focusTerms.length} core ${domain.title} signals (${supportingSkills.slice(0, 4).join(", ")}).`
        : `Low direct skill overlap detected in your resume text for ${domain.title}.`;

    const uncertaintyNote = limitedEvidence
      ? "Resume contains limited detectable technical keywords; compatibility estimate has higher uncertainty."
      : supportingSkills.length <= 1
        ? "Only 1 matching indicator detected — add concrete projects and tools for stronger domain matching."
        : "";

    return {
      domainId: domain.id,
      domain: domain.title,
      matchPercentage,
      supportingSkills: supportingSkills.slice(0, 6),
      missingSkills: missingSkills.slice(0, 5),
      rationale,
      uncertaintyNote,
    };
  })
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 5);

  return ranked;
}

module.exports = {
  MAX_FILE_SIZE_BYTES,
  sanitizeFilename,
  validateUploadedFile,
  extractResumeText,
  parseResumeStructure,
  buildBaselineAtsReport,
  computeKeywordMatch,
  computeResumeDomainRecommendations,
  compareResumeVersions,
};
