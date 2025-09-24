export const chatbotStarters = [
  {
    key: "programming",
    title: "Programming",
    description: "Python and Java topics for Paper 2",
    icon: "</>",
    prompts: [
      {
        label: "Python Basics",
        text:
          "You are an HKDSE ICT tutor. Explain variables, input/output, and control flow in Python with short code examples. Then give 3 practice questions.",
      },
      {
        label: "Java OOP",
        text:
          "You are an HKDSE ICT tutor. Teach Java classes, objects, inheritance, and interfaces with concise examples and a mini quiz.",
      },
    ],
  },
  {
    key: "networking",
    title: "Networking & Cybersecurity",
    description: "OSI model, TCP/IP, threats, defenses",
    icon: "5a7",
    prompts: [
      {
        label: "OSI vs TCP/IP",
        text:
          "You are an HKDSE ICT tutor. Compare OSI and TCP/IP models with a mapping table and common exam traps.",
      },
      {
        label: "Cybersecurity Basics",
        text:
          "You are an HKDSE ICT tutor. Explain malware types, social engineering, and practical defenses with real examples.",
      },
    ],
  },
  {
    key: "database",
    title: "Database Systems",
    description: "ERD, normalization, SQL",
    icon: "4be",
    prompts: [
      {
        label: "Normalization",
        text:
          "You are an HKDSE ICT tutor. Explain 1NF, 2NF, 3NF with examples and a step-by-step normalization exercise.",
      },
      {
        label: "SQL Injection",
        text:
          "You are an HKDSE ICT tutor. Explain SQL injection with a realistic example and how to prevent it.",
      },
    ],
  },
  {
    key: "webdev",
    title: "Web Development",
    description: "HTML/CSS/JS essentials",
    icon: "310",
    prompts: [
      {
        label: "Frontend Basics",
        text:
          "You are an HKDSE ICT tutor. Explain semantic HTML, CSS selectors, and JS DOM manipulation with simple snippets.",
      },
      {
        label: "HTTP & Cookies",
        text:
          "You are an HKDSE ICT tutor. Explain HTTP methods, status codes, and cookies vs localStorage vs sessionStorage.",
      },
    ],
  },
  {
    key: "past-papers",
    title: "Past Paper Solutions",
    description: "Walkthroughs 2012-2023",
    icon: "4dd",
    prompts: [
      {
        label: "Paper 1 MCQ Strategies",
        text:
          "You are an HKDSE ICT tutor. Teach MCQ elimination strategies and common pitfalls specific to HKDSE ICT Paper 1.",
      },
      {
        label: "Paper 2 Coding Walkthrough",
        text:
          "You are an HKDSE ICT tutor. Pick a representative Paper 2 coding question and show a full solution with comments.",
      },
    ],
  },
];

export const resourceTabs = [
  { key: "syllabus", title: "HKEAA Syllabus" },
  { key: "practice", title: "Coding Practice Platforms" },
  { key: "past-papers", title: "Past Papers (2012-2023)" },
  { key: "assessment", title: "Assessment Framework" },
];

export const resourceLinks = {
  syllabus: [
    {
      label: "HKDSE ICT Curriculum & Assessment Guide",
      href: "https://www.hkeaa.edu.hk/DocLibrary/HKDSE/Subject_Information/ict/2025exam/ICT_CA_Guide_e_2025.pdf",
    },
  ],
  practice: [
    { label: "Practice Coding", href: "https://leetcode.com" },
  ],
  "past-papers": [
    {
      label: "HKDSE Past Papers (ICT)",
      href: "https://www.hkeaa.edu.hk/en/hkdse/Assessment/Subject_Information/category_a_subjects/ict/",
    },
  ],
  assessment: [
    {
      label: "Assessment Framework",
      href: "https://www.hkeaa.edu.hk/en/hkdse/assessment/",
    },
  ],
};
