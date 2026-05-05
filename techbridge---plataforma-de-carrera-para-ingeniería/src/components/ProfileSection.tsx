/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink, Github, Mail, MapPin, Award } from 'lucide-react';
import { MOCK_STUDENT } from '../mockData';

export default function ProfileSection() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner & Basic Info */}
      <div className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm relative">
        <div className="h-24 sm:h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <div className="px-6 pb-6">
          <div className="relative flex justify-between items-end -mt-10 sm:-mt-12 mb-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm">
               <div className="flex h-full w-full items-center justify-center bg-indigo-600 text-white text-3xl font-bold uppercase">
                 {user.name?.[0] || 'U'}
               </div>
            </div>
            <button className="px-6 py-1.5 border border-indigo-600 text-indigo-600 rounded-full font-bold text-sm hover:bg-indigo-50 transition-colors">
              Editar perfil
            </button>
          </div>
          
          <h1 className="text-2xl font-bold text-slate-900">{user.name || 'Usuario TechBridge'}</h1>
          <p className="text-slate-600 mt-0.5 text-sm">Estudiante de Ingeniería de Sistemas ({user.age || '--'} años)</p>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5"><MapPin size={14} /> Bogotá, Colombia</span>
            <span className="flex items-center gap-1.5"><Mail size={14} /> {user.email}</span>
            <span className="flex items-center gap-1.5 text-indigo-600"><ExternalLink size={14} /> linkedin.com/in/{user.name?.toLowerCase().replace(' ', '')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          {/* About */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4">Acerca de</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {MOCK_STUDENT.bio}
            </p>
          </div>

          {/* Projects */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-5">Proyectos destacados</h2>
            <div className="space-y-6">
              {MOCK_STUDENT.projects.map(project => (
                <div key={project.id} className="group cursor-pointer">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-indigo-600 group-hover:underline">{project.title}</h3>
                    <Github size={16} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                  </div>
                  <p className="text-xs text-slate-600 mt-2 mb-3 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider">#{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-4 space-y-6">
          {/* Skills */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Habilidades</h2>
            <div className="flex flex-wrap gap-2">
              {MOCK_STUDENT.skills.map(skill => (
                <span key={skill} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded text-[10px] font-bold">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Certificaciones</h2>
            <div className="space-y-4">
              {MOCK_STUDENT.certifications.map(cert => (
                <div key={cert} className="flex gap-3 items-center">
                  <div className="p-2 bg-slate-100 rounded">
                    <Award size={16} className="text-slate-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
