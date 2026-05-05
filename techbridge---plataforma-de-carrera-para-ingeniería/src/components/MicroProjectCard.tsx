/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Code, Zap } from 'lucide-react';
import { MicroExperience } from '../types';

export default function MicroProjectCard({ project }: { project: MicroExperience, key?: React.Key }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Proyecto Corto</span>
        <span className="bg-orange-100 text-orange-600 text-[10px] uppercase px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
          <Zap size={10} fill="currentColor" /> Gana dinero
        </span>
      </div>
      
      <h3 className="text-sm font-semibold text-slate-900 mb-1 leading-tight group-hover:text-blue-600">{project.title}</h3>
      <p className="text-[11px] text-slate-500 mb-3">{project.company} • {project.duration}</p>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm font-bold text-slate-800">{project.reward}</span>
        <button className="text-xs font-bold text-blue-600 hover:underline">
          Ver detalles
        </button>
      </div>
    </div>
  );
}
