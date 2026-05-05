/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { Job } from '../types';

export default function JobCard({ job }: { job: Job, key?: React.Key }) {
  const [applied, setApplied] = React.useState(false);
  const [isApplying, setIsApplying] = React.useState(false);

  const handleApply = async () => {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);

    setIsApplying(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, jobId: job.id })
      });
      if (response.ok) {
        setApplied(true);
      }
    } catch (error) {
      console.error("Error al postularse:", error);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-indigo-50 rounded flex items-center justify-center text-indigo-600 font-bold shrink-0 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors uppercase">
          {job.company.substring(0, 2)}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
              <p className="text-xs text-slate-600">{job.company}</p>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded">
              {job.type === 'Internship' ? 'Práctica' : 'Empleo'}
            </span>
          </div>
          
          <div className="mt-2 flex items-center gap-4 text-[10px] text-slate-400 font-medium">
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              {job.createdAt}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.requirements.map(req => (
              <span key={req} className="bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded text-[9px] font-semibold">
                {req}
              </span>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); handleApply(); }}
              disabled={applied || isApplying}
              className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                applied 
                  ? 'bg-green-100 text-green-700 cursor-default' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
              }`}
            >
              {isApplying ? 'Enviando...' : applied ? 'Postulado ✓' : 'Postularme'}
            </button>
            <button className="px-3 border border-slate-200 rounded-full hover:bg-slate-50">
              <span className="text-xs font-bold text-slate-600 tracking-tight leading-none italic">Guardar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
