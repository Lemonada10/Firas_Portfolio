"use client";

import { useMemo } from "react";
import { useI18n } from "@/components/providers/language-provider";
import {
  certifications as enCertifications,
  education as enEducation,
  experience as enExperience,
  heroRotatingRoles as enHeroRotatingRoles,
  jobLabel as enJobLabel,
  personal as enPersonal,
  projects as enProjects,
  skillGroups as enSkillGroups,
} from "@/lib/data";
import {
  frCertifications,
  frEducation,
  frExperience,
  frHeroRotatingRoles,
  frJobLabel,
  frPersonal,
  frProjects,
} from "@/lib/i18n/content-fr";
import type { Certification, Education, Job, Personal, Project, SkillGroup } from "@/types";

/**
 * CV content in the active language. English is the base; French entries
 * override it field by field so a missing translation never blanks the UI.
 */
export function useContent() {
  const { locale, t } = useI18n();

  return useMemo(() => {
    const isFr = locale === "fr";
    const groupTitles = t.skills.groups as Record<string, string>;

    const personal: Personal = isFr
      ? { ...enPersonal, ...frPersonal }
      : enPersonal;

    const education: Education[] = enEducation.map((item) =>
      isFr && frEducation[item.id] ? { ...item, ...frEducation[item.id] } : item
    );

    const certifications: Certification[] = enCertifications.map((item) =>
      isFr && frCertifications[item.id] ? { ...item, ...frCertifications[item.id] } : item
    );

    const experience: Job[] = enExperience.map((job) =>
      isFr && frExperience[job.id] ? { ...job, ...frExperience[job.id] } : job
    );

    const projects: Project[] = enProjects.map((project) => {
      const fr = isFr ? frProjects[project.slug] : undefined;
      if (!fr) return project;
      const { galleryAlt, ...fields } = fr;
      return {
        ...project,
        ...fields,
        gallery: project.gallery?.map((image, i) => ({
          ...image,
          alt: galleryAlt[i] ?? image.alt,
        })),
      };
    });

    // Group titles live in the dictionary; skill names are proper nouns and stay put.
    const skillGroups: SkillGroup[] = enSkillGroups.map((group) => ({
      ...group,
      title: groupTitles[group.id] ?? group.title,
    }));

    return {
      personal,
      education,
      certifications,
      experience,
      projects,
      skillGroups,
      jobLabel: isFr ? { ...enJobLabel, ...frJobLabel } : enJobLabel,
      heroRotatingRoles: isFr ? frHeroRotatingRoles : enHeroRotatingRoles,
      getProjectBySlug: (slug: string) => projects.find((p) => p.slug === slug),
    };
  }, [locale, t]);
}
