/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Briefcase, Code, MessageSquare, Home, Send, Sparkles, AlertCircle, Zap, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_JOBS, MOCK_MICRO_PROJECTS, MOCK_STUDENT } from './mockData';
import JobCard from './components/JobCard';
import MicroProjectCard from './components/MicroProjectCard';
import ProfileSection from './components/ProfileSection';
import Login from './components/Login';
import Register from './components/Register';
import { ChatMessage } from './types';
import { getInterviewFeedback } from './services/geminiService';

// --- Protected Route Wrapper ---
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  return <>{children}</>;
};

// --- Dashboard View ---
const Dashboard = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : {};
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar Info */}
      <div className="hidden lg:block lg:col-span-3 space-y-4">
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
           <div className="h-14 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
           <div className="p-4 text-center -mt-8">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full mx-auto border-2 border-white flex items-center justify-center font-bold text-xl mb-2 shadow-sm">
                {user.name?.[0] || 'U'}
              </div>
              <h3 className="font-bold text-sm tracking-tight text-slate-900">{user.name || 'Usuario'}</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-tight">Estudiante de Ingeniería ({user.age || '--'} años)</p>
           </div>
           <div className="border-t border-slate-100 p-4 pt-1 pb-4">
              <div className="mt-4 border-t border-slate-100 pt-4 text-[11px] space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Perfil completo</span>
                  <span className="font-bold text-indigo-600">85%</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full">
                  <div className="bg-indigo-600 h-1 rounded-full w-[85%]"></div>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Main Feed */}
      <div className="col-span-1 lg:col-span-6 space-y-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 border border-slate-200 uppercase">
             {user.name?.[0] || 'U'}
          </div>
          <button className="flex-1 text-left px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-slate-500 font-medium hover:bg-white hover:border-blue-600 transition-all text-sm outline-none">
            ¿En qué estás trabajando hoy, {user.name?.split(' ')[0] || 'estudiante'}?
          </button>
        </div>

        <div className="space-y-4 font-sans">
          <h2 className="text-slate-500 text-[11px] font-bold uppercase tracking-wider px-1">Recomendado para ti</h2>
          {MOCK_JOBS.slice(0, 1).map(job => <JobCard key={job.id} job={job} />)}
          
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Micro-Experiencia destacada</h2>
              <Link to="/micro-experiences" className="text-xs font-bold text-blue-600 hover:underline">Ver todas</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {MOCK_MICRO_PROJECTS.map(proj => <MicroProjectCard key={proj.id} project={proj} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block lg:col-span-3 space-y-4">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
            TechBridge IA <Sparkles size={14} className="text-indigo-600" />
          </h3>
          <p className="text-[11px] text-slate-600 leading-normal">
            Practica tu próxima entrevista con nuestro chatbot y mejora tus oportunidades laborales hoy mismo.
          </p>
          <Link to="/interview" className="mt-4 block text-center py-2 px-4 bg-indigo-600 text-white rounded-full text-xs font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-sm">
            Simular Entrevista
          </Link>
        </div>
        
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <h4 className="text-[10px] font-bold uppercase text-slate-500 mb-3 tracking-widest">Habilidades sugeridas</h4>
          <div className="flex flex-wrap gap-2">
            {['React', 'Node.js', 'MySQL', 'UI Design'].map(s => (
              <span key={s} className="bg-blue-50 text-blue-700 text-[10px] px-2 py-1 rounded font-bold">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Navbar Component ---
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-full gap-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex flex-shrink-0 items-center gap-1 group">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white font-black text-xl shadow-indigo-100 shadow-lg group-hover:bg-indigo-700 transition-all">TB</div>
              <span className="font-black text-xl tracking-tighter text-slate-900 hidden sm:block">Tech<span className="text-indigo-600">Bridge</span></span>
            </Link>
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Buscar vacantes, micro-proyectos..." 
                className="bg-slate-100 border-none rounded-md px-4 py-2 text-sm w-64 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 sm:space-x-8">
            <IconLink to="/" icon={<Home size={22} />} label="Inicio" />
            <IconLink to="/jobs" icon={<Briefcase size={22} />} label="Empleos" />
            <IconLink to="/micro-experiences" icon={<Code size={22} />} label="Proyectos" />
            <IconLink to="/interview" icon={<MessageSquare size={22} />} label="Entrevistas" />
            <IconLink to="/profile" icon={<User size={22} />} label="Yo" />
            <button 
              onClick={handleLogout}
              className="flex flex-col items-center text-slate-500 hover:text-red-500 transition-colors group"
            >
              <LogOut size={22} />
              <span className="text-[10px] mt-1 hidden md:block font-medium">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Interview Simulator View ---
const InterviewSimulator = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: '¡Hola! Soy el reclutador virtual de TechBridge. Estoy aquí para ayudarte a practicar. ¿Para qué rol te gustaría prepararte hoy? (ej. Desarrollador Junior, Frontend React, Intern Backend)' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const feedback = await getInterviewFeedback(newMessages);
    setMessages([...newMessages, { role: 'model', content: feedback || 'Lo siento, hubo un error analizando tu respuesta.' }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[75vh] min-h-[550px] flex flex-col bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm">
            <MessageSquare size={20} />
          </div>
          <div>
            <h2 className="font-bold text-sm">Simulador IA</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] opacity-70 font-bold uppercase tracking-widest leading-none">Coach de Entrevistas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] px-4 py-3 rounded-xl text-xs leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none font-sans'
            }`}>
              {m.content}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-xl rounded-tl-none shadow-sm flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="relative flex items-center gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu respuesta..."
            className="flex-1 bg-slate-100 border-none rounded-full px-5 py-2.5 text-xs focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all placeholder:text-slate-400 outline-none"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center flex-shrink-0 active:scale-95 shadow-md"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-2 font-medium">Presiona Enter para enviar tu respuesta</p>
      </div>
    </div>
  );
};

// --- Jobs View ---
const JobsView = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', company: '', type: 'Full-time', location: 'Remoto', requirements: '' });

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob)
      });
      const data = await res.json();
      if (res.ok) {
        setShowPostModal(false);
        setNewJob({ title: '', company: '', type: 'Full-time', location: 'Remoto', requirements: '' });
        fetchJobs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : {};
  const isAdmin = user.role === 'admin';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 px-1">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Vacantes Disponibles</h1>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-1">Conecta con las mejores empresas de tecnología</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setShowPostModal(true)}
            className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-blue-50 transition-all shadow-sm"
          >
            + Publicar Vacante (Empresa)
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3,4].map(n => <div key={n} className="h-40 bg-white rounded-lg animate-pulse border border-slate-200"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      )}

      {/* Modal Simulado de Publicación */}
      <AnimatePresence>
        {showPostModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-xl p-6 shadow-2xl"
            >
              <h2 className="text-lg font-bold mb-4">Nueva Vacante</h2>
              <form onSubmit={handleCreateJob} className="space-y-3">
                <input required placeholder="Título del puesto" className="w-full bg-slate-50 border p-2 rounded text-sm outline-none" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
                <input required placeholder="Empresa" className="w-full bg-slate-50 border p-2 rounded text-sm outline-none" value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} />
                <div className="flex gap-2">
                  <select className="flex-1 bg-slate-50 border p-2 rounded text-sm outline-none font-medium" value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}>
                    <option>Full-time</option>
                    <option>Internship</option>
                    <option>Part-time</option>
                  </select>
                  <input required placeholder="Ubicación" className="flex-1 bg-slate-50 border p-2 rounded text-sm outline-none" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} />
                </div>
                <textarea required placeholder="Habilidades (separadas por coma)" className="w-full bg-slate-50 border p-2 rounded text-sm outline-none h-20" value={newJob.requirements} onChange={e => setNewJob({...newJob, requirements: e.target.value})} />
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setShowPostModal(false)} className="flex-1 py-2 text-slate-500 font-bold text-xs uppercase">Cancelar</button>
                  <button type="submit" className="flex-[2] py-2 bg-blue-600 text-white rounded font-bold text-xs uppercase tracking-widest">Publicar Ahora</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Micro-Experiences View ---
const MicroExperiencesView = () => (
  <div className="max-w-5xl mx-auto space-y-6">
    <div className="bg-slate-900 p-8 rounded-lg text-white relative overflow-hidden shadow-md">
      <div className="relative z-10">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Micro-Experiencia <span className="bg-orange-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ml-2 tracking-widest">Gana Dinero</span>
        </h1>
        <p className="text-slate-300 mt-2 max-w-md text-sm leading-relaxed font-medium">
          Realiza proyectos ágiles para empresas reales. Construye portafolio verificable y genera ingresos extras.
        </p>
      </div>
      <div className="absolute -top-4 -right-4 p-8 opacity-10">
        <Code size={160} className="text-blue-500" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {MOCK_MICRO_PROJECTS.map(proj => <MicroProjectCard key={proj.id} project={proj} />)}
    </div>
  </div>
);

// --- Main App Component ---
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F3F2EF] font-sans text-[#191919] antialiased">
        <Navbar />

        {/* Auth Warning (Demo placeholder) */}
        {!process.env.GEMINI_API_KEY && (
          <div className="bg-[#FFF8E1] border-b border-[#FFE082] text-amber-900 px-4 py-2 text-[10px] font-bold flex items-center justify-center gap-2 uppercase tracking-wide">
            <AlertCircle size={12} />
            ADVERTENCIA: Configura GEMINI_API_KEY en el panel de secretos para usar la IA.
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
              <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
              
              <Route path="/" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><PageWrapper><ProfileSection /></PageWrapper></ProtectedRoute>} />
              <Route path="/jobs" element={<ProtectedRoute><PageWrapper><JobsView /></PageWrapper></ProtectedRoute>} />
              <Route path="/micro-experiences" element={<ProtectedRoute><PageWrapper><MicroExperiencesView /></PageWrapper></ProtectedRoute>} />
              <Route path="/interview" element={<ProtectedRoute><PageWrapper><InterviewSimulator /></PageWrapper></ProtectedRoute>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

function IconLink({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className={`flex flex-col items-center group transition-all relative pt-1 h-16 justify-center ${isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}>
      <div className="relative">
        {icon}
        {isActive && <motion.div layoutId="nav-pill" className="absolute -bottom-1 -left-1 -right-1 h-0.5 bg-indigo-600 rounded-full" />}
      </div>
      <span className="text-[10px] mt-1.5 hidden md:block font-bold uppercase tracking-wider">{label}</span>
    </Link>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
