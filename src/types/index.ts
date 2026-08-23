export type SkillRelated = {
  jobs?: string[];
  projects?: string[];
};

export type SkillGroup = {
  id: string;
  title: string;
  icon: "code" | "layers" | "wrench" | "book" | "users" | "globe" | "cloud" | "monitor";
  items: { name: string; related?: SkillRelated }[];
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

export type Certification = {
  id: string;
  name: string;
  status: string;
  expected?: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  bullets: string[];
  tech?: string[];
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
  githubUrl: string | null;
  demoUrl: string | null;
  imageAlt: string;
  featured?: boolean;
  extra?: boolean;
  image?: string;
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
  githubUrl?: string;
  resumeUrl: string;
};
