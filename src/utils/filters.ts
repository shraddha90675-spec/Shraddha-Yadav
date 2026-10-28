/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProjectItem, SkillItem } from '../data/portfolioData';

export function filterProjects(
  projects: ProjectItem[],
  selectedCategory: string,
  searchQuery: string
): ProjectItem[] {
  const query = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;

    const matchesQuery =
      !query ||
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.technologies.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });
}

export function filterSkillsByCategory(
  skills: SkillItem[],
  category: string
): SkillItem[] {
  if (category === 'All') return skills;
  return skills.filter((s) => s.category === category);
}

export function calculateSkillStats(skills: SkillItem[]) {
  if (!skills.length) return { average: 0, count: 0, advancedCount: 0 };
  const total = skills.reduce((sum, s) => sum + s.level, 0);
  const advancedCount = skills.filter((s) => s.level >= 85).length;
  return {
    average: Math.round(total / skills.length),
    count: skills.length,
    advancedCount
  };
}
