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
      "MAKESOFT is a 9-person Agile team project built across four sprints. The app covers the full navigation problem for Concordia students: finding buildings, getting outdoor walking/driving/transit directions, tracking the inter-campus shuttle service with live departure times, navigating indoors room-to-room across floors, and automatically routing to the next class by reading Google Calendar. The two campuses (SGW and Loyola) are fully supported with custom-styled building overlays on Google Maps.",
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
    location: "Montreal, QC",
    tagline:
      "Full-stack academic peer evaluation platform with dual-role auth, team management, and structured multi-criteria scoring.",
    description:
      "A web app where instructors create teams and students submit structured peer evaluations—rating teammates across Cooperation, Conceptual Contribution, Practical Contribution, and Work Ethic.",
    tech: ["React", "Java", "Spring Boot", "PostgreSQL", "Firebase Auth"],
    highlights: [
      "Instructor & student role dashboards",
      "Team creation & student assignment",
      "Multi-criteria peer evaluation (1–5 scale)",
    ],
    image: "/projects/peer-review/landing-hero.png",
    gallery: [
      { src: "/projects/peer-review/landing.png", alt: "Landing page — Peer Evaluation by MakeSoft" },
      { src: "/projects/peer-review/signup-student.png", alt: "Student sign-up form with Full Name, Student ID, Section, Email, and Password fields" },
      { src: "/projects/peer-review/signup-instructor.png", alt: "Instructor sign-up form with Full Name, Instructor Section, Email, and Password fields" },
      { src: "/projects/peer-review/login.png", alt: "Student login screen with email/password and social OAuth options" },
      { src: "/projects/peer-review/instructor-dashboard.png", alt: "Instructor dashboard showing team creation, unassigned students, and teams list" },
      { src: "/projects/peer-review/instructor-assign.png", alt: "Instructor assigning a student to a team via dropdown" },
      { src: "/projects/peer-review/instructor-assigned.png", alt: "Instructor view after assigning students — team members shown with Remove buttons" },
      { src: "/projects/peer-review/student-dashboard.png", alt: "Student dashboard showing team name, team members, and Evaluate buttons" },
      { src: "/projects/peer-review/eval-form.png", alt: "Peer evaluation form with 4 criteria and a 1–5 rating dropdown open" },
      { src: "/projects/peer-review/eval-form-filled.png", alt: "Completed peer evaluation form before submission" },
      { src: "/projects/peer-review/eval-submitted.png", alt: "Evaluation submitted confirmation with recorded scores" },
    ],
    overview:
      "Built as a team (MakeSoft), this web application streamlines peer evaluations in academic settings. Instructors sign up and receive a section code, then create named teams and assign enrolled students to them. Students see their team, view all teammates, and submit individual evaluations rating each person across four dimensions on a 1–5 scale with optional written comments. The platform enforces role separation throughout: instructors never evaluate and students cannot manage teams.",
    role:
      "Full-stack contributor — designed the React frontend with role-aware routing, implemented Spring Boot REST APIs for user management, team CRUD, and evaluation submission, modelled the PostgreSQL schema, and configured the Firebase Auth integration for social and email-based sign-in.",
    keyFeatures: [
      "Role-based access control: separate Instructor and Student dashboards with guarded routes.",
      "Instructor team management: create named teams, view unassigned students, assign/remove members.",
      "Student home: displays team name, lists teammates, and surfaces Evaluate buttons for peers (never for self).",
      "Peer evaluation form: four scored criteria (Cooperation, Conceptual Contribution, Practical Contribution, Work Ethic) each rated 1–5 with optional comments.",
      "Evaluation confirmation page: shows a per-criterion summary immediately after submission.",
      "Firebase Auth with email/password and social OAuth (GitHub, Google) plus instructor-mode sign-up with section codes.",
      "Animated particle background and dark UI built with Tailwind CSS for a polished, consistent look.",
    ],
    challenges: [
      "Keeping role-gated views clean without duplicating layout logic across instructor and student components.",
      "Preventing students from evaluating themselves while dynamically rendering the teammate list.",
      "Designing a section-code flow so instructors and students are always matched to the correct cohort.",
      "Structuring the evaluation schema to allow future criteria additions without breaking existing submissions.",
    ],
    learnings: [
      "How to model bi-directional relationships (student ↔ team ↔ evaluation) cleanly in a relational schema.",
      "Practical RBAC at the API and UI layer without over-engineering middleware.",
      "The UX value of immediate, per-criteria confirmation after form submission.",
      "Coordinating a multi-person team with sprint-based Agile practices and pull-request reviews.",
    ],
    githubUrl: "https://github.com/your-username/peer-review-app",
    demoUrl: null,
    imageAlt: "Peer Review Web Application — instructor dashboard showing team management",
  },
  {
    slug: "mindfulness-focus-tracker-ai",
    title: "Mindfulness & Focus Tracker AI",
    location: "Montreal, QC",
    tagline:
      "Browser-based real-time attention monitor using face-mesh AI — detects distraction and delivers gentle audio/visual cues to help users refocus.",
    description:
      "A webcam-powered focus coach that tracks gaze, head pose, and facial cues in real time, logs session metrics, and nudges users back on task with subtle beep alerts — no specialized hardware needed.",
    tech: ["React", "TensorFlow.js", "MediaPipe", "WebGL"],
    highlights: [
      "Live face-mesh attention tracking",
      "6.3% avg focus improvement with alerts",
      "Post-session survey & Excel export",
    ],
    image: "/projects/focus-tracker/active-session.png",
    gallery: [
      { src: "/projects/focus-tracker/login.png", alt: "Login screen — Welcome to Focus Tracker AI, name-based sign-in" },
      { src: "/projects/focus-tracker/home.png", alt: "Home dashboard — Start new session, View profile & history, Survey results" },
      { src: "/projects/focus-tracker/session-setup.png", alt: "Session setup — study goal, planned duration, background audio and alert preferences" },
      { src: "/projects/focus-tracker/active-session.png", alt: "Active focus session — live webcam feed with face-mesh overlay and real-time focus metrics" },
      { src: "/projects/focus-tracker/session-history.png", alt: "Session history — past sessions with focus %, distraction count, and planned duration" },
      { src: "/projects/focus-tracker/session-survey.png", alt: "Post-session survey — focus level, distraction source, mesh feedback, ease-of-use sliders" },
      { src: "/projects/focus-tracker/survey-results.png", alt: "Survey results page with Export to Excel button" },
    ],
    overview:
      "The Mindfulness & Focus Tracker AI is a fully browser-based attention monitoring system built by a 4-person team. Users log in with a nickname, configure a study session (subject, goal, planned duration, background audio, alert beeps), then start a focus session where a live webcam feed is processed client-side using TensorFlow.js — no video ever leaves the device. The system overlays a 3D face mesh on the webcam feed, analyses gaze direction, eye openness, and head pose to estimate attention in real time, and triggers a soft audio beep after a distraction is detected beyond a cool-down threshold. After the session, users complete a short survey rating focus level, distraction source, and UI preferences. All session data and survey results are stored locally and can be exported to Excel. A study with 10 participants showed an average 6.3% improvement in focus percentage when alert beeps were enabled.",
    role:
      "Co-developer — implemented the TensorFlow.js face-mesh attention detection pipeline, the session setup and live monitoring UI in React, the alert beep cool-down logic, the post-session survey flow, and the session history and Excel export feature.",
    keyFeatures: [
      "Real-time face-mesh attention estimation using TensorFlow.js and MediaPipe — gaze direction, eye openness, and head-turn detection.",
      "Soft audio alert beep triggered after a configurable cool-down when distraction is detected, minimising unnecessary interruptions.",
      "Session setup wizard: study subject, goal, planned duration (minutes or h:mm), background rain/white noise toggle, and alert toggle.",
      "Live metrics panel during session: focus % (live), session focus %, distraction count, timer, face-detected status, and FPS.",
      "Session history page listing all past sessions with focus %, distraction count, planned vs actual duration, and goal.",
      "Post-session survey with sliders and dropdowns: focus level, distraction level, distraction source, face-mesh effect, ease of use, mesh preference.",
      "Survey Results page with per-session breakdown and one-click Export to Excel.",
      "All processing fully local — no video data stored or transmitted, preserving user privacy.",
    ],
    challenges: [
      "Suppressing jitter and false-positive distraction events from noisy webcam input without adding perceptible latency.",
      "Designing a cool-down window for alerts that prevents notification fatigue while still catching genuine attention lapses.",
      "Keeping TensorFlow.js inference performant on consumer hardware — maintaining high FPS during a 60-minute session.",
      "Balancing the face-mesh overlay as a useful visual without itself becoming a source of distraction (70% of users ultimately wanted it optional).",
      "Capturing meaningful survey data after sessions without making the questionnaire feel burdensome.",
    ],
    learnings: [
      "How to build a stable real-time ML inference loop in the browser with TensorFlow.js and MediaPipe face landmarks.",
      "The Hawthorne effect and how to mitigate observation bias in HCI user studies.",
      "Designing feedback that is helpful without being intrusive — the difference between a gentle nudge and a disruptive alert.",
      "That distraction count and focus % are independent metrics: more distractions with alerts enabled can still yield higher focus time because recovery is faster.",
      "Iterative UX research: survey data directly drove the decision to make the mesh overlay optional in the next release.",
    ],
    githubUrl: "https://github.com/your-username/focus-tracker-ai",
    demoUrl: null,
    imageAlt: "Mindfulness & Focus Tracker AI — live session with face-mesh attention overlay",
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
