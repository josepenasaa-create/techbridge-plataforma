/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Job, MicroExperience, Student } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    company: 'TechFlow Solutions',
    title: 'Desarrollador Junior Fullstack',
    description: 'Buscamos estudiante de últimos semestres para unirse al equipo de desarrollo web.',
    requirements: ['React', 'Node.js', 'SQL'],
    type: 'Full-time',
    location: 'Remoto (Colombia)',
    createdAt: '2024-05-01'
  },
  {
    id: '2',
    company: 'SoftBridge Eng',
    title: 'Pasante de QA Automation',
    description: 'Prácticas profesionales para aprender pruebas automatizadas en entornos ágiles.',
    requirements: ['Inglés B1', 'Lógica de programación'],
    type: 'Internship',
    location: 'Bogotá, CO',
    createdAt: '2024-05-04'
  }
];

export const MOCK_MICRO_PROJECTS: MicroExperience[] = [
  {
    id: 'm1',
    company: 'StartUp XYZ',
    title: 'Refactorización de landing page',
    description: 'Mejorar el rendimiento de una landing page existente usando Tailwind CSS.',
    duration: '2 semanas',
    reward: '$250.000 COP',
    skillsRequired: ['HTML', 'CSS', 'Tailwind'],
    status: 'Open'
  },
  {
    id: 'm2',
    company: 'Fintech App',
    title: 'Script de migración de datos',
    description: 'Crear un script en Python para migrar 1k registros de Excel a Firestore.',
    duration: '1 semana',
    reward: '$150.000 COP',
    skillsRequired: ['Python', 'NoSQL'],
    status: 'Open'
  }
];

export const MOCK_STUDENT: Student = {
  id: 's1',
  name: 'Juan Pérez',
  email: 'juan.perez@nexus.edu',
  age: 22,
  bio: 'Apasionado por el desarrollo de software y la arquitectura de sistemas. Estudiante de 8vo semestre.',
  skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'PostgreSQL'],
  certifications: ['AWS Cloud Practitioner', 'Scrum Master'],
  projects: [
    {
      id: 'p1',
      title: 'E-commerce API',
      description: 'REST API construida con Express y JWT para autenticación.',
      technologies: ['Node.js', 'Express', 'JWT']
    }
  ]
};
