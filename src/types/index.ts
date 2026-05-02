export type SkillGroup = {
  id: string;
  title: string;
  icon: "code" | "layers" | "wrench" | "book" | "users" | "globe";
  items: string[];
};

export type Education = {
  id: string;
  degree: string;
  school: string;
  location: string;
  start: string;
  end: string;
  details?: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  bullets: string[];
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  tagline: string;
  description: string;
  tech: string[];
  highlights: string[];
  overview: string;
  role: string;
  keyFeatures: string[];
  challenges: string[];
  learnings: string[];
  githubUrl: string;
  demoUrl: string | null;
  imageAlt: string;
  /** Optional real hero image path (relative to /public, e.g. /projects/makesoft/banner.png) */
  image?: string;
  /** Optional gallery screenshots (paths relative to /public) */
  gallery?: { src: string; alt: string }[];
};

export type Personal = {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  school: string;
  portfolioUrl: string;
  linkedInUrl: string;
  /** Public URL path to the resume PDF (file lives under `public/`, e.g. `/CV/CV.pdf`). */
  resumeUrl: string;
};
