/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Student {
  id: string;
  name: string;
  email: string;
  age: number;
  bio: string;
  skills: string[];
  portfolioUrl?: string;
  projects: Project[];
  certifications: string[];
  avatarUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Job {
  id: string;
  company: string;
  title: string;
  description: string;
  requirements: string[];
  type: 'Full-time' | 'Internship' | 'Part-time';
  location: string;
  createdAt: string;
}

export interface MicroExperience {
  id: string;
  company: string;
  title: string;
  description: string;
  duration: string;
  reward?: string;
  skillsRequired: string[];
  status: 'Open' | 'Closed';
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
