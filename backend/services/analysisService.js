const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be', 'been', 'being', 'have', 'has',
  'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
  'must', 'shall', 'can', 'need', 'dedicated', 'ability', 'work', 'working', 'team',
  'role', 'position', 'company', 'experience', 'years', 'year', 'including', 'using',
  'use', 'used', 'within', 'across', 'through', 'during', 'while', 'where', 'which',
  'that', 'this', 'these', 'those', 'you', 'your', 'we', 'our', 'they', 'their', 'it',
  'its', 'he', 'she', 'his', 'her', 'them', 'us', 'about', 'into', 'over', 'under',
  'between', 'such', 'other', 'more', 'most', 'some', 'any', 'all', 'each', 'both',
  'new', 'good', 'great', 'strong', 'excellent', 'preferred', 'required', 'plus',
  'well', 'also', 'etc', 'via', 'per', 'not', 'no', 'yes', 'if', 'then', 'than',
]);

const ACTION_VERBS = [
  'built', 'build', 'developed', 'develop', 'designed', 'design', 'implemented',
  'implement', 'created', 'create', 'led', 'lead', 'managed', 'manage', 'optimized',
  'optimize', 'automated', 'automate', 'deployed', 'deploy', 'improved', 'improve',
  'reduced', 'reduce', 'increased', 'increase', 'achieved', 'achieve', 'delivered',
  'deliver', 'collaborated', 'collaborate', 'analyzed', 'analyze', 'engineered',
  'engineer', 'architected', 'architect', 'maintained', 'maintain', 'resolved',
  'resolve', 'streamlined', 'streamline', 'integrated', 'integrate', 'configured',
  'configure', 'tested', 'test', 'debugged', 'debug', 'mentored', 'mentor',
];

const SKILL_CATEGORIES = {
  programmingLanguages: [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'golang', 'rust',
    'php', 'ruby', 'swift', 'kotlin', 'scala', 'r', 'matlab', 'sql', 'html', 'css',
  ],
  frameworks: [
    'react', 'react.js', 'reactjs', 'node', 'node.js', 'nodejs', 'express', 'express.js',
    'next.js', 'nextjs', 'vue', 'vue.js', 'angular', 'django', 'flask', 'spring',
    'spring boot', 'fastapi', 'laravel', 'tailwind', 'bootstrap', 'redux', 'vite',
  ],
  databases: [
    'mongodb', 'mysql', 'postgresql', 'postgres', 'sqlite', 'redis', 'firebase',
    'dynamodb', 'oracle', 'mssql', 'sql server', 'mariadb',
  ],
  developerTools: [
    'git', 'github', 'gitlab', 'docker', 'kubernetes', 'jenkins', 'aws', 'azure',
    'gcp', 'postman', 'jira', 'figma', 'linux', 'npm', 'webpack', 'vite', 'ci/cd',
    'terraform', 'nginx',
  ],
};

const SECTION_PATTERNS = {
  contactInfo: /\b(email|phone|mobile|linkedin|github|@|\+?\d{10,})\b/i,
  summary: /\b(summary|objective|profile|about me)\b/i,
  technicalSkills: /\b(skills|technical skills|tech stack|technologies)\b/i,
  projects: /\b(projects|project experience|personal projects|portfolio)\b/i,
  experience: /\b(experience|work history|employment|internship|internships)\b/i,
  education: /\b(education|degree|university|college|b\.?tech|b\.?e|m\.?tech|bachelor|master)\b/i,
  certifications: /\b(certification|certifications|certified|certificate)\b/i,
};

const normalizeText = (text) => text.toLowerCase().replace(/\s+/g, ' ').trim();

const tokenizeWords = (text) => {
  return normalizeText(text)
    .replace(/[^a-z0-9+#.\-/ ]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
};

const extractKeywords = (text) => {
  const words = tokenizeWords(text);
  const frequency = {};

  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  const sorted = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word);

  return { keywords: sorted.slice(0, 80), frequency };
};

const findSkillsInText = (text) => {
  const normalized = normalizeText(text);
  const result = {
    programmingLanguages: [],
    frameworks: [],
    databases: [],
    developerTools: [],
    other: [],
  };

  Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
    skills.forEach((skill) => {
      const pattern = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (pattern.test(normalized) && !result[category].includes(skill)) {
        result[category].push(skill);
      }
    });
  });

  return result;
};

const flattenSkills = (skillsObj) => {
  return [
    ...skillsObj.programmingLanguages,
    ...skillsObj.frameworks,
    ...skillsObj.databases,
    ...skillsObj.developerTools,
    ...skillsObj.other,
  ];
};

const countActionVerbs = (text) => {
  const normalized = normalizeText(text);
  return ACTION_VERBS.filter((verb) => new RegExp(`\\b${verb}\\b`, 'i').test(normalized)).length;
};

const countMeasurableAchievements = (text) => {
  const patterns = [
    /\b\d+%\b/g,
    /\b\d+\+\b/g,
    /\$\d+/g,
    /\b(increased|decreased|reduced|improved|saved|grew|boosted)\b[^.\n]{0,40}\b\d+/gi,
    /\b\d+\s*(users|customers|projects|requests|ms|seconds|minutes|hours|days|months)\b/gi,
  ];

  let count = 0;
  patterns.forEach((pattern) => {
    const matches = text.match(pattern);
    if (matches) count += matches.length;
  });

  return count;
};

const analyzeSections = (text) => {
  const sections = {};

  Object.entries(SECTION_PATTERNS).forEach(([section, pattern]) => {
    const found = pattern.test(text);

    if (!found) {
      sections[section] = 'missing';
      return;
    }

    const sectionRegex = new RegExp(`${pattern.source}.{0,120}`, 'i');
    const snippet = text.match(sectionRegex)?.[0] || '';

    if (snippet.length < 25) {
      sections[section] = 'needs_improvement';
    } else {
      sections[section] = 'found';
    }
  });

  if (sections.contactInfo === 'found') {
    const hasEmail = /\S+@\S+\.\S+/.test(text);
    const hasPhone = /\+?\d[\d\s\-()]{8,}\d/.test(text);
    if (!hasEmail && !hasPhone) {
      sections.contactInfo = 'needs_improvement';
    }
  }

  return sections;
};

const buildRecommendations = ({
  resumeText,
  jobDescription,
  sections,
  missingKeywords,
  missingSkills,
  actionVerbCount,
  measurableCount,
  scoreBreakdown,
}) => {
  const recommendations = [];

  if (sections.contactInfo === 'missing') {
    recommendations.push('Add a clear contact section with your email, phone, and LinkedIn or GitHub profile.');
  } else if (sections.contactInfo === 'needs_improvement') {
    recommendations.push('Make your contact details easier to find at the top of the resume.');
  }

  if (sections.summary === 'missing') {
    recommendations.push('Add a short professional summary tailored to this role.');
  }

  if (sections.projects === 'missing') {
    recommendations.push('Include a Projects section with 2-3 relevant projects and measurable outcomes.');
  } else if (sections.projects === 'needs_improvement') {
    recommendations.push('Expand project descriptions with technologies used, your role, and results.');
  }

  if (sections.experience === 'missing') {
    recommendations.push('Add an Experience or Internship section if you have relevant work history.');
  }

  if (sections.education === 'missing') {
    recommendations.push('Include an Education section with degree, institution, and graduation timeline.');
  }

  if (actionVerbCount < 5) {
    recommendations.push('Use stronger action verbs such as built, implemented, optimized, and delivered in bullet points.');
  }

  if (measurableCount < 2) {
    recommendations.push('Add measurable achievements like percentages, user counts, performance gains, or time saved.');
  }

  if (missingKeywords.length > 0) {
    const topMissing = missingKeywords.slice(0, 5).join(', ');
    recommendations.push(
      `The job description mentions these keywords not clearly present in your resume: ${topMissing}. Add them only if you genuinely have that experience.`
    );
  }

  if (missingSkills.length > 0) {
    const topSkills = missingSkills.slice(0, 5).join(', ');
    recommendations.push(
      `These requested skills were not detected in your resume: ${topSkills}. Mention them only if you truly possess them.`
    );
  }

  if (scoreBreakdown.lengthReadability < 60) {
    recommendations.push('Improve readability by using concise bullet points and avoiding long dense paragraphs.');
  }

  const repeatedWords = tokenizeWords(resumeText).reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  const repetitive = Object.entries(repeatedWords)
    .filter(([word, count]) => count >= 8 && !STOP_WORDS.has(word))
    .map(([word]) => word);

  if (repetitive.length > 0) {
    recommendations.push(
      `Reduce repetitive wording around: ${repetitive.slice(0, 3).join(', ')}. Vary your phrasing to keep the resume engaging.`
    );
  }

  if (jobDescription.length > 500 && scoreBreakdown.keywordMatch < 50) {
    recommendations.push('Tailor your resume bullets to mirror important terms from this specific job description.');
  }

  return [...new Set(recommendations)].slice(0, 10);
};

export const analyzeResumeAgainstJob = (resumeText, jobDescription) => {
  const resumeKeywordsData = extractKeywords(resumeText);
  const jobKeywordsData = extractKeywords(jobDescription);

  const resumeKeywordSet = new Set(resumeKeywordsData.keywords);
  const jobKeywordSet = new Set(jobKeywordsData.keywords);

  const matchedKeywords = jobKeywordsData.keywords.filter((keyword) => resumeKeywordSet.has(keyword));
  const missingKeywords = jobKeywordsData.keywords.filter((keyword) => !resumeKeywordSet.has(keyword));

  const keywordMatchPercentage =
    jobKeywordsData.keywords.length === 0
      ? 0
      : Math.round((matchedKeywords.length / jobKeywordsData.keywords.length) * 100);

  const resumeSkills = findSkillsInText(resumeText);
  const jobSkills = findSkillsInText(jobDescription);

  const resumeSkillList = flattenSkills(resumeSkills);
  const jobSkillList = flattenSkills(jobSkills);

  const matchedSkills = jobSkillList.filter((skill) =>
    resumeSkillList.some((resumeSkill) => resumeSkill.toLowerCase() === skill.toLowerCase())
  );

  const missingSkills = jobSkillList.filter(
    (skill) => !resumeSkillList.some((resumeSkill) => resumeSkill.toLowerCase() === skill.toLowerCase())
  );

  const additionalSkills = resumeSkillList.filter(
    (skill) => !jobSkillList.some((jobSkill) => jobSkill.toLowerCase() === skill.toLowerCase())
  );

  const sections = analyzeSections(resumeText);
  const actionVerbCount = countActionVerbs(resumeText);
  const measurableCount = countMeasurableAchievements(resumeText);
  const wordCount = tokenizeWords(resumeText).length;

  const sectionValues = Object.values(sections);
  const foundSections = sectionValues.filter((value) => value === 'found').length;
  const partialSections = sectionValues.filter((value) => value === 'needs_improvement').length;

  const scoreBreakdown = {
    keywordMatch: Math.min(100, keywordMatchPercentage),
    technicalSkills:
      jobSkillList.length === 0
        ? resumeSkillList.length > 0
          ? 80
          : 40
        : Math.round((matchedSkills.length / jobSkillList.length) * 100),
    resumeSections: Math.round(((foundSections + partialSections * 0.5) / sectionValues.length) * 100),
    contactInfo: sections.contactInfo === 'found' ? 100 : sections.contactInfo === 'needs_improvement' ? 50 : 0,
    actionVerbs: Math.min(100, Math.round((actionVerbCount / 8) * 100)),
    measurableAchievements: Math.min(100, Math.round((measurableCount / 4) * 100)),
    lengthReadability:
      wordCount >= 180 && wordCount <= 900
        ? 100
        : wordCount < 180
          ? Math.max(30, Math.round((wordCount / 180) * 100))
          : Math.max(40, 100 - Math.round(((wordCount - 900) / 600) * 60)),
  };

  const weights = {
    keywordMatch: 0.25,
    technicalSkills: 0.2,
    resumeSections: 0.15,
    contactInfo: 0.1,
    actionVerbs: 0.1,
    measurableAchievements: 0.1,
    lengthReadability: 0.1,
  };

  const overallScore = Math.round(
    Object.entries(weights).reduce((total, [key, weight]) => {
      return total + scoreBreakdown[key] * weight;
    }, 0)
  );

  const recommendations = buildRecommendations({
    resumeText,
    jobDescription,
    sections,
    missingKeywords: missingKeywords.slice(0, 15),
    missingSkills,
    actionVerbCount,
    measurableCount,
    scoreBreakdown,
  });

  const keywordFrequency = {};
  matchedKeywords.forEach((keyword) => {
    keywordFrequency[keyword] = resumeKeywordsData.frequency[keyword] || 0;
  });

  return {
    overallScore,
    scoreBreakdown,
    keywords: {
      matched: matchedKeywords.slice(0, 30),
      missing: missingKeywords.slice(0, 30),
      matchPercentage: keywordMatchPercentage,
      frequency: keywordFrequency,
    },
    skills: {
      resumeSkills,
      jobSkills,
      matched: matchedSkills,
      missing: missingSkills,
      additional: additionalSkills,
    },
    sections,
    recommendations,
  };
};
