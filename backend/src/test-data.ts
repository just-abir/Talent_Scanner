// test-data.ts

export const resume = {
  basicInfo: {
    fullName: "John Doe",
    email: "john.doe@gmail.com",
    phone: "+1 555-123-4567",
    location: "New York, USA",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    portfolio: "https://johndoe.dev",
  },

  title: "Software Engineer",

  summary:
    "Software Engineer with 3+ years of experience building scalable web applications and RESTful APIs. Strong background in backend development, database design, authentication, and cloud deployment. Experienced in working with modern JavaScript/TypeScript technologies and building maintainable production-ready systems.",

  skills: {
    programmingLanguages: ["JavaScript", "TypeScript", "Python", "C++"],

    frontend: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS"],

    backend: [
      "Node.js",
      "Express.js",
      "REST API",
      "GraphQL",
      "JWT Authentication",
    ],

    databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],

    toolsAndCloud: ["Git", "GitHub", "Docker", "AWS", "Vercel", "Postman"],
  },

  workExperience: [
    {
      company: "Tech Solutions Inc.",
      position: "Software Engineer",
      location: "New York, USA",
      startDate: "2024-01",
      endDate: "Present",

      responsibilities: [
        "Developed scalable REST APIs using Node.js, Express.js, and TypeScript.",
        "Designed and optimized MongoDB and PostgreSQL database schemas.",
        "Implemented JWT-based authentication and role-based authorization.",
        "Integrated third-party APIs and cloud services.",
        "Collaborated with frontend developers to build full-stack applications.",
        "Improved API performance and reduced response time through query optimization.",
      ],

      achievements: [
        "Improved API response time by approximately 35%.",
        "Built authentication infrastructure used across multiple applications.",
        "Helped migrate legacy JavaScript services to TypeScript.",
      ],
    },

    {
      company: "WebWorks Ltd.",
      position: "Junior Software Engineer",
      location: "Remote",
      startDate: "2023-01",
      endDate: "2023-12",

      responsibilities: [
        "Developed frontend applications using React.js.",
        "Created backend APIs using Node.js and Express.js.",
        "Implemented responsive UI components using Tailwind CSS.",
        "Worked with Git and GitHub for version control.",
        "Fixed bugs and improved existing application features.",
      ],

      achievements: [
        "Developed reusable React components that reduced development time.",
        "Implemented several REST API endpoints for internal applications.",
      ],
    },
  ],

  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "New York University",
      location: "New York, USA",
      startYear: 2019,
      endYear: 2023,
      cgpa: "3.7/4.0",

      coursework: [
        "Data Structures and Algorithms",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
      ],
    },
  ],

  projects: [
    {
      name: "Job Management Platform",
      description:
        "A full-stack platform for managing job postings, applications, and candidate profiles.",
      technologies: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB"],
    },

    {
      name: "URL Shortener",
      description:
        "A URL shortening service with analytics, custom aliases, QR code generation, and click tracking.",
      technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    },
  ],
};

// --------------------------------------------------
// SELF DESCRIPTION
// --------------------------------------------------

export const selfDescription = {
  short:
    "I am a software engineer focused on building scalable and maintainable web applications.",

  detailed:
    "I am a Software Engineer with a strong interest in backend and full-stack development. I enjoy designing APIs, working with databases, implementing authentication systems, and solving complex software engineering problems. I have experience working with JavaScript, TypeScript, Node.js, Express.js, React, MongoDB, and PostgreSQL. I focus on writing clean, maintainable code and building reliable applications that can scale with user and business requirements.",

  strengths: [
    "Problem solving",
    "Backend development",
    "API design",
    "Database design",
    "System architecture",
    "Debugging",
    "Team collaboration",
    "Learning new technologies",
  ],

  careerGoal:
    "My goal is to become a strong backend/full-stack software engineer and work on scalable systems that solve real-world problems.",
};

// --------------------------------------------------
// JOB DESCRIPTION
// --------------------------------------------------

export const jobDescription = {
  position: "Backend Software Engineer",

  company: "InnovateTech",

  location: "Remote",

  employmentType: "Full-time",

  hiringMessage:
    "We are looking for a passionate Backend Software Engineer to join our engineering team and help us build scalable, reliable, and high-performance backend systems.",

  responsibilities: [
    "Design, develop, and maintain scalable backend services.",
    "Build and maintain RESTful APIs.",
    "Design and optimize database schemas and queries.",
    "Implement authentication and authorization systems.",
    "Write clean, maintainable, and testable code.",
    "Identify and fix performance and reliability issues.",
    "Collaborate with frontend engineers, designers, and product managers.",
    "Participate in code reviews and technical discussions.",
    "Write unit and integration tests.",
    "Monitor and improve production applications.",
  ],

  requiredSkills: [
    "Strong knowledge of JavaScript or TypeScript",
    "Experience with Node.js",
    "Experience with Express.js or similar backend frameworks",
    "Strong understanding of REST APIs",
    "Experience with MongoDB or PostgreSQL",
    "Understanding of authentication and authorization",
    "Knowledge of Git and GitHub",
    "Understanding of asynchronous programming",
    "Strong problem-solving skills",
  ],

  preferredSkills: [
    "Experience with Docker",
    "Experience with Redis",
    "Experience with AWS or other cloud platforms",
    "Knowledge of GraphQL",
    "Experience with CI/CD pipelines",
    "Knowledge of microservices architecture",
    "Experience with automated testing",
    "Understanding of system design",
  ],

  qualifications: [
    "Bachelor's degree in Computer Science or related field, or equivalent experience.",
    "2+ years of professional software development experience.",
    "Strong communication and collaboration skills.",
  ],

  benefits: [
    "Remote-friendly work environment",
    "Competitive salary",
    "Professional development opportunities",
    "Flexible working hours",
    "Health and wellness benefits",
  ],
};

// --------------------------------------------------
// COMPLETE TEST DATA
// --------------------------------------------------

export const testData = {
  resume,
  selfDescription,
  jobDescription,
};
