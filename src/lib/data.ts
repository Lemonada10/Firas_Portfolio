import type { Education, Job, Personal, Project, SkillGroup } from "@/types";

export const personal: Personal = {
  name: "Firas Al Haddad",
  headline:
    "Software Engineering Co-op student building scalable, real-world systems across data, backend, and full-stack.",
  email: "Firas.haddad.h@gmail.com",
  phone: "+1 (514) 699-7445",
  location: "Montreal, QC",
  school: "Concordia University",
  portfolioUrl: "https://firas-portfolio-zhdz.vercel.app/",
  linkedInUrl: "https://www.linkedin.com/in/firas-al-haddad-207a26280/",
  resumeUrl: "/CV/CV.pdf",
};

export const education: Education[] = [
  {
    id: "concordia",
    degree: "BEng — Software Engineering (Co-op)",
    school: "Concordia University",
    location: "Montreal, QC",
    start: "2023",
    end: "2027",
    details: "GPA: 3.4",
  },
  {
    id: "vanier",
    degree: "DEC — Pure & Applied Natural Sciences",
    school: "Vanier College",
    location: "Montreal, QC",
    start: "2020",
    end: "2023",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    icon: "code",
    items: ["Java", "JavaScript", "Python", "C++", "SQL"],
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    icon: "layers",
    items: [
      "PySpark",
      "Pandas",
      "React",
      "Node.js",
      "Spring Boot",
      "TensorFlow",
      "Tailwind CSS",
    ],
  },
  {
    id: "tools",
    title: "Applications & Tools",
    icon: "wrench",
    items: [
      "Visual Studio Code",
      "Databricks",
      "GitHub",
      "Jira",
      "Azure DevOps",
      "SAP",
      "Power BI",
    ],
  },
  {
    id: "courses",
    title: "Relevant Courses",
    icon: "book",
    items: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "System Hardware",
      "Databases",
    ],
  },
  {
    id: "languages-spoken",
    title: "Languages",
    icon: "globe",
    items: ["French", "English"],
  },
  {
    id: "extra",
    title: "Extracurricular",
    icon: "users",
    items: ["Tutor — Tutorax", "Volleyball Trainer — Vanier College"],
  },
];

export const experience: Job[] = [
  {
    id: "pwc-2026",
    title: "Data Analyst Intern",
    company: "Pratt & Whitney Canada",
    location: "Longueuil, QC · On-site",
    period: "Apr 2026 – Present",
    current: true,
    bullets: [
      "Implementing and optimizing ETL pipelines and database management processes at scale.",
      "Collaborating with internal teams to integrate APIs and leverage Databricks for data processing.",
      "Analyzing and interpreting data to surface actionable insights for decision-makers.",
      "Building interactive reports, dashboards, and automations with Microsoft Power Platform (Power BI, Power Automate).",
      "Contributing to UI/UX improvements across dashboards and reporting tools.",
    ],
  },
  {
    id: "pwc",
    title: "Data Analyst Intern",
    company: "Pratt & Whitney Canada",
    location: "Longueuil, QC",
    period: "2025",
    bullets: [
      "Refactored legacy Databricks pipelines into a single modular PySpark codebase for maintainability.",
      "Built reusable functions and automated tests to keep data workflows organized and regression-safe.",
      "Unified 20+ sources into analytics-ready DataFrames feeding cleaner Power BI reporting.",
      "Re-engineered dashboards to surface clearer week-over-week performance signals for stakeholders.",
    ],
  },
  {
    id: "fonex",
    title: "Software Engineering Intern",
    company: "Fonex Data Systems",
    location: "Montreal, QC",
    period: "2025",
    bullets: [
      "Developed a Python BLE backend with bleak and asyncio to communicate with optical transceivers.",
      "Implemented a GATT layer to read/write SFP/QSFP EEPROM pages reliably.",
      "Designed a threaded connection manager bridging the BLE service and a Tkinter GUI.",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "concordia-campus-guide",
    title: "Concordia Campus Navigation App",
    location: "Montreal, QC",
    tagline:
      "A full-featured Android/IOS campus guide with indoor/outdoor navigation, shuttle tracking, and Google Calendar class routing.",
    description:
      "Team-built Android app (MAKESOFT) that helps Concordia students navigate both SGW and Loyola campuses — indoors and outdoors — with real-time shuttle schedules and class-aware routing.",
    tech: ["React Native", "Java", "Google Maps API", "Spring Boot", "PostgreSQL"],
    highlights: [
      "Indoor & outdoor directions",
      "Concordia shuttle integration",
      "Google Calendar class routing",
    ],
    image: "/projects/makesoft/banner.png",
    gallery: [
      { src: "/projects/makesoft/screen-sgw-map.png", alt: "SGW campus map with building markers" },
      { src: "/projects/makesoft/screen-loyola-map.png", alt: "Loyola campus map with building markers" },
      { src: "/projects/makesoft/screen-shuttle-route.png", alt: "Shuttle route from SGW to Loyola" },
      { src: "/projects/makesoft/screen-shuttle-departures.png", alt: "Next shuttle departure times" },
      { src: "/projects/makesoft/screen-directions.png", alt: "Outdoor turn-by-turn directions" },
      { src: "/projects/makesoft/screen-indoor-nav.png", alt: "Indoor floor-level navigation" },
      { src: "/projects/makesoft/screen-indoor-nav2.png", alt: "Indoor step-by-step navigation with room routing" },
      { src: "/projects/makesoft/screen-onboarding.png", alt: "App onboarding screen" },
      { src: "/projects/makesoft/screen-calendar.png", alt: "Google Calendar integration screen" },
    ],
    overview:
      "MAKESOFT is a 9-person Agile team project built across four sprints for SOEN 390. The app covers the full navigation problem for Concordia students: finding buildings, getting outdoor walking/driving/transit directions, tracking the inter-campus shuttle service with live departure times, navigating indoors room-to-room across floors, and automatically routing to the next class by reading Google Calendar. The two campuses (SGW and Loyola) are fully supported with custom-styled building overlays on Google Maps.",
    role:
      "Mobile developer and backend contributor — implemented outdoor directions with the Google Directions API, integrated the Concordia shuttle schedule (time-aware and location-aware), connected Google Calendar for class-based routing, and contributed to the indoor navigation pathfinding module.",
    keyFeatures: [
      "Interactive SGW & Loyola campus maps with custom building shapes and info pop-ups.",
      "Outdoor directions (walk, drive, transit) between any two campus buildings.",
      "Concordia Shuttle integration: next departures, real-time countdown, and routing via shuttle.",
      "Google Calendar sync — automatically generates directions to the user's next class.",
      "Indoor room-to-room navigation with floor plans, accessibility routing, and POIs (washrooms, elevators).",
      "Campus toggle for instant switching between SGW and Loyola views.",
    ],
    challenges: [
      "Stitching indoor floor-plan graphs with outdoor Google Maps routing into a seamless path.",
      "Making shuttle routing time-aware so it only suggests departures that are actually catchable.",
      "Parsing and normalizing Google Calendar events to reliably extract building and room codes.",
      "Coordinating a 9-person team across four 2-week Agile sprints with CI/CD and SonarQube gates.",
    ],
    learnings: [
      "How to model indoor navigation as a weighted graph and integrate it with an external maps SDK.",
      "Practical Agile at scale: sprint planning, burndown charts, retrospectives, and pull-request reviews.",
      "Trade-offs between client-side and server-side data fetching for real-time transit information.",
      "Accessibility-first design for users with mobility constraints in a navigation context.",
    ],
    githubUrl: "https://github.com/your-username/concordia-campus-guide",
    demoUrl: null,
    imageAlt: "MAKESOFT — Concordia Campus Navigation App banner",
  },
  {
    slug: "peer-review-web-app",
    title: "Peer Review Web Application",
    location: "Concordia, QC",
    tagline:
      "Full-stack academic platform with auth, roles, and CI/CD quality gates.",
    description:
      "A production-minded web app where students and instructors collaborate on structured peer reviews—with secure access and automated quality checks.",
    tech: ["React", "Java", "Spring Boot", "PostgreSQL"],
    highlights: [
      "RBAC for students & teachers",
      "CI/CD with SonarQube",
      "REST APIs & PostgreSQL",
    ],
    overview:
      "End-to-end platform for course-based peer review workflows. The system emphasizes clear separation between teaching staff and learners, predictable API contracts, and maintainable delivery pipelines so the codebase can evolve across semesters.",
    role: "Full-stack contributor — React frontend, Spring Boot services, PostgreSQL schema design, and pipeline configuration for builds, tests, and static analysis.",
    keyFeatures: [
      "JWT/session-based authentication patterns with role-gated routes and views.",
      "RESTful APIs for users, assignments, and review artifacts with consistent error handling.",
      "Automated CI/CD with build + test stages and SonarQube quality gates.",
      "PostgreSQL persistence with migrations-friendly structure (conceptually documented for extension).",
    ],
    challenges: [
      "Balancing RBAC complexity without brittle UI conditionals.",
      "Keeping API contracts stable while iterating on review workflows.",
      "Integrating SonarQube feedback into a fast inner dev loop.",
    ],
    learnings: [
      "How to structure Spring Boot modules for clarity at project scale.",
      "Practical trade-offs between permissive vs strict API validation.",
      "Operational value of automated quality checks before merge.",
    ],
    githubUrl: "https://github.com/your-username/peer-review-app",
    demoUrl: null,
    imageAlt: "Peer Review Web Application — UI preview placeholder",
  },
  {
    slug: "mindfulness-focus-tracker-ai",
    title: "Mindfulness & Focus Tracker AI",
    location: "Concordia, QC",
    tagline: "Real-time attention tracking with adaptive feedback in the browser.",
    description:
      "Browser-based focus coach that estimates attention from gaze, blinks, and head pose—then responds with gentle cues when focus drifts.",
    tech: ["React", "TensorFlow.js", "WebGL"],
    highlights: [
      "Real-time gaze & pose",
      "Adaptive thresholds",
      "WebGL-accelerated models",
    ],
    overview:
      "An applied ML front-end that runs inference locally to protect privacy and reduce latency. The experience is tuned for calm feedback: subtle prompts instead of noisy alerts, with calibration to individual setups.",
    role: "Frontend & ML integration — TensorFlow.js pipelines, performance tuning, and UX for calibration and sensitivity controls.",
    keyFeatures: [
      "Multi-signal attention estimation (gaze, blink rate, head pose).",
      "Configurable thresholds triggering on-screen and soft audio cues.",
      "Modular detection pipeline with adaptive calibration flows.",
      "WebGL-backed inference path for smoother frame-to-frame performance.",
    ],
    challenges: [
      "Managing jitter and false positives from noisy webcam input.",
      "Keeping CPU/GPU work bounded on consumer laptops.",
      "Designing feedback that helps without distracting.",
    ],
    learnings: [
      "How to structure client-side ML loops for stable frame times.",
      "Balancing model complexity with real-time UX constraints.",
      "Progressive enhancement: calibration as a first-class feature.",
    ],
    githubUrl: "https://github.com/your-username/focus-tracker-ai",
    demoUrl: "https://demo-placeholder.com",
    imageAlt: "Mindfulness & Focus Tracker — interface placeholder",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const heroRotatingRoles = [
  "Software Engineering Co-op @ Concordia",
  "Data & analytics pipelines",
  "Backend & full-stack systems",
  "Applied ML in the browser",
];
