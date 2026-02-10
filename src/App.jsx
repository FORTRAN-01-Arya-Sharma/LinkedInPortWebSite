import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  Github, Linkedin, Mail, Cpu, ShoppingBag, Globe, Trophy, Code2,
  Zap, Terminal, Activity, ShieldCheck, ChevronRight, AlertTriangle,
  Dumbbell, Youtube, TrendingUp, Monitor, Database, ExternalLink, X, FileText, Phone, ArrowUpRight, Binary, Server, Menu
} from 'lucide-react';

// Images Import
import PortImg from './images/Port.png';
import GtaImg from './images/Gta.png';
import FitImg from './images/Fit.png';

// --- COMPONENT: THE SYSTEM BOOT SEQUENCE ---
const LoadingScreen = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const logs = ["[BOOT] INIT_V4", "[INFO] RAG_CORE_LOADED", "[INFO] DRACO_STABLE", "[INFO] 60FPS_SYNC", "[SUCCESS] READY"];

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onComplete, 800); return 100; }
        return p + 1;
      });
    }, 25);
    const logInterval = setInterval(() => setLogIndex(p => p < logs.length - 1 ? p + 1 : p), 450);
    return () => { clearInterval(interval); clearInterval(logInterval); };
  }, [onComplete]);

  return (
    <motion.div exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }} className="fixed inset-0 z-[100000] bg-dark flex flex-col items-center justify-center p-6">
      <motion.h2 className="text-8xl md:text-9xl font-black text-brand tracking-tighter mb-8 drop-shadow-[0_0_30px_rgba(0,242,234,0.3)]">{percent}%</motion.h2>
      <p className="font-mono text-xs text-gray-500 uppercase tracking-[0.4em] mb-10">{logs[logIndex]}</p>
      <div className="w-48 bg-white/5 h-[1px] overflow-hidden"><motion.div className="h-full bg-brand" initial={{ width: 0 }} animate={{ width: `${percent}%` }} /></div>
    </motion.div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const cursorRef = useRef(null);
  const fullText = "SOFTWARE ARCHITECT";

  // Typewriter
  useEffect(() => {
    if (isLoading) return;
    let timer = setTimeout(() => {
      const updatedText = isDeleting ? fullText.substring(0, displayText.length - 1) : fullText.substring(0, displayText.length + 1);
      setDisplayText(updatedText);
      if (!isDeleting && updatedText === fullText) { setIsDeleting(true); setTypingSpeed(2500); }
      else if (isDeleting && updatedText === '') { setIsDeleting(false); setTypingSpeed(500); }
      else { setTypingSpeed(isDeleting ? 50 : 150); }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isLoading]);

  // Magnetic Cursor (Z-INDEX FIXED)
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) { cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`; }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const data = {
    links: { linkedin: "https://linkedin.com/in/aryasharma-work", github: "https://github.com/aryasharma-work", instagram: "https://instagram.com/arya_sharma", email: "aryasharma.work@gmail.com", phone: "+91 98170 37928", leetcode: "https://leetcode.com/aryasharma", codechef: "https://codechef.com/users/aryasharma" },
    projects: [
      { id: '01', title: "3D Portfolio", desc: "Hardware-accelerated environment utilizing Draco compression.", img: PortImg, url: "#", repo: "#", color: "from-brand" },
      { id: '02', title: "AshStar AI", desc: "Gamified SaaS with 'Neural Memory' and Google Gemini logic.", img: GtaImg, url: "#", repo: "#", color: "from-accent" },
      { id: '03', title: "AshFit E-com", desc: "Decoupled architecture with <160ms TTFB automated syncing.", img: FitImg, url: "#", repo: "#", color: "from-orange-500" }
    ]
  };

  return (
    <div className="relative w-full overflow-hidden bg-dark">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full relative">
            
            {/* 1. MASTER CURSOR (Z-INDEX 1000000) */}
            <div ref={cursorRef} className="fixed top-0 left-0 w-10 h-10 border border-brand rounded-full pointer-events-none z-[1000000] -ml-5 -mt-5 transition-transform duration-75 ease-out hidden lg:flex items-center justify-center">
              <div className="w-1 h-1 bg-brand rounded-full" />
            </div>

            {/* 2. NAVIGATION */}
            <nav className="fixed top-0 w-full z-[50000] border-b border-white/5 bg-dark/80 backdrop-blur-2xl px-4 md:px-12 py-4">
              <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
                <div className="font-black tracking-tighter text-xl">ARYA SHARMA<span className="text-brand">()</span></div>
                <div className="hidden lg:flex gap-8 font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase">
                  {['HOME', 'ABOUT', 'SKILLS', 'PROJECTS', 'EXPERIENCE', 'CONTACT'].map(item => (
                    <a key={item} href={item === 'HOME' ? '#home' : `#${item.toLowerCase()}`} className="hover:text-brand transition-all">{item}</a>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setActiveModal('resume')} className="bg-white text-black px-4 py-2 rounded-full text-[9px] font-black hover:bg-brand transition-all">RESUME</button>
                  <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-white"><Menu size={20}/></button>
                </div>
              </div>
              <motion.div className="scroll-progress w-full" style={{ scaleX }} />
            </nav>

            <main className="max-w-screen-2xl mx-auto px-4 md:px-12 pt-28 lg:pt-40" id="home">
              
              {/* HERO */}
              <section className="min-h-[70vh] flex flex-col justify-center mb-40 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[90vw] aspect-square bg-brand/5 blur-[100px] -z-10 rounded-full animate-pulse" />
                <h1 className="fluid-heading font-black tracking-tighter mb-10 text-transparent bg-clip-text bg-gradient-to-r from-brand via-accent to-brand bg-[length:200%_auto] animate-text-flow">
                  {displayText}<span className="text-brand border-r-4 md:border-r-8 border-brand ml-1 animate-pulse" />
                </h1>
                <div className="flex gap-4 text-gray-500 font-mono text-[10px] uppercase">
                   <button onClick={() => setActiveModal('dev')} className="hover:text-brand transition-colors flex items-center gap-2"><Trophy size={14}/> Knight_1700+</button>
                   <a href={data.links.github} className="hover:text-brand flex items-center gap-2"><Github size={14}/> Source_Hub</a>
                </div>
              </section>

              {/* THE ARSENAL - WITH COLOR FLOW HEADING */}
              <section className="mb-40 scroll-mt-24" id="skills">
                 <h2 className="fluid-heading font-black mb-12 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-[length:200%_auto] animate-text-flow">
                   The_Arsenal
                 </h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: <Monitor className="text-brand" />, title: "Frontend", items: "React, Three.js, GSAP" },
                      { icon: <Server className="text-accent" />, title: "Backend", items: "Node, Express, JWT" },
                      { icon: <Binary className="text-green-400" />, title: "AI / RAG", items: "Gemini, Vector DB" },
                      { icon: <Database className="text-orange-400" />, title: "Data", items: "SQL, Mongo, Redis" }
                    ].map((s, i) => (
                      <div key={i} className="glass-panel p-8 group">
                        <div className="mb-4 p-3 bg-white/5 w-fit rounded-xl group-hover:bg-brand/10 transition-colors">{s.icon}</div>
                        <h4 className="font-bold text-lg mb-1 uppercase">{s.title}</h4>
                        <p className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">{s.items}</p>
                      </div>
                    ))}
                 </div>
              </section>

              {/* PROJECT VAULT - WITH SCANLINE & COLOR FLOW HEADING */}
              <section className="mb-40 scroll-mt-24 w-full overflow-hidden" id="projects">
   <h2 className="fluid-heading font-black mb-20 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-green-400 bg-[length:200%_auto] animate-text-flow">
     Project_Vault
   </h2>
   
   <div className="grid gap-20 lg:gap-40">
      {data.projects.map((p, i) => (
        <motion.div 
          key={p.id} 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center w-full`}
        >
           {/* IMAGE CONTAINER WITH ZOOM & SCANNING LINE */}
           <motion.div 
             className="relative group overflow-hidden rounded-[1.5rem] md:rounded-[3rem] border border-white/10 glass-panel aspect-video w-full cursor-pointer"
             whileHover="hoverState" // Linking parent hover to child animations
           >
              {/* The Actual Project Image with Zoom */}
              <motion.img 
                src={p.img} 
                onClick={() => window.open(p.url, '_blank')}
                variants={{
                  hoverState: { scale: 1.1 } // Little Zoom
                }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100" 
                alt={p.title} 
              />

              {/* 1. THE STATIC SCANLINE TEXTURE (Always there) */}
              <div className="scanlines-texture" />

              {/* 2. THE DYNAMIC NEON SCANNING LINE (Appears on Hover) */}
              <motion.div 
                variants={{
                  hoverState: { opacity: 1 }
                }}
                initial={{ opacity: 0 }}
                className="animate-scanning-line" 
              />

              {/* 3. VIGNETTE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent opacity-80 pointer-events-none" />

              {/* 4. CYBER GLOW BORDER */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand/40 transition-all duration-700 rounded-[1.5rem] md:rounded-[3rem] pointer-events-none" />
           </motion.div>

           {/* TEXT CONTENT */}
           <div className={i % 2 !== 0 ? 'lg:order-first' : ''}>
              <div className="font-mono text-brand mb-4 text-[10px] tracking-[0.4em] uppercase">Deployment_Sequence_00{p.id}</div>
              <h3 className="text-3xl md:text-7xl font-black mb-6 uppercase tracking-tighter leading-none break-words">
                {p.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-lg mb-10 leading-relaxed italic border-l-2 border-brand/20 pl-8">
                "{p.desc}"
              </p>
              <button 
                onClick={() => window.open(p.repo, '_blank')} 
                className="flex items-center gap-4 text-brand font-black uppercase text-xs tracking-widest group"
              >
                VIEW_SYSTEM_SOURCE <ChevronRight className="group-hover:translate-x-3 transition-transform" />
              </button>
           </div>
        </motion.div>
      ))}
   </div>
</section>

              {/* HISTORY - WITH COLOR FLOW HEADING */}
              <section className="mb-40 scroll-mt-24" id="experience">
                 <h2 className="fluid-heading font-black mb-12 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_auto] animate-text-flow">
                   History_<br/>Refactored
                 </h2>
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                       {[
                         { title: "Independent Architect", time: "24-Present", desc: "Refactored academic setbacks into engineering meritocracy. Earning technical validation through high-performance builds.", icon: <Zap size={20}/> },
                         { title: "Medical Resilience", time: "2021", desc: "Overcame severe health challenges that disrupted formal paths. Learned 'Graceful Failure'—the foundation of my architecture.", icon: <ShieldCheck size={20}/> }
                       ].map((log, i) => (
                          <div key={i} className="glass-panel p-8 md:p-14 relative group border-white/5">
                             <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-6"><div className="p-4 bg-white/5 rounded-2xl text-brand">{log.icon}</div><h4 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">{log.title}</h4></div>
                                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-4 py-1 rounded-full">{log.time}</span>
                             </div>
                             <p className="text-gray-400 text-sm md:text-base leading-relaxed italic">"{log.desc}"</p>
                          </div>
                       ))}
                    </div>
                    <div className="glass-panel p-8 border-red-500/20 bg-red-500/5 h-fit">
                       <div className="flex items-center gap-3 text-red-500 font-bold mb-6 uppercase text-xs tracking-widest"><AlertTriangle size={16}/> INCIDENT_LOG</div>
                       <p className="text-[9px] text-gray-400 font-mono uppercase leading-relaxed">Redis Thundering Herd outage resolved via Probabilistic Early Expiration and Semantic Locking protocols.</p>
                    </div>
                 </div>
              </section>

              {/* CONTACT - WITH COLOR FLOW HEADING */}
              <section className="py-20 lg:py-40 text-center border-t border-white/5 relative" id="contact">
                <h2 className="fluid-heading font-black mb-10 tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 bg-[length:200%_auto] animate-text-flow">
                  Invite_<br/>Contact
                </h2>
                <div className="flex flex-col md:flex-row justify-center gap-10 items-center px-4">
                  <a href={`mailto:${data.links.email}`} className="w-full md:w-auto px-16 py-8 bg-brand text-black font-black text-xl rounded-full hover:shadow-[0_0_80px_rgba(0,242,234,0.4)] transition-all uppercase tracking-tighter">Initiate_Protocol</a>
                  <div className="flex gap-6">
                    <a href={data.links.linkedin} target="_blank" className="p-6 glass-panel rounded-full hover:text-brand transition-colors"><Linkedin size={32}/></a>
                    <a href={data.links.github} target="_blank" className="p-6 glass-panel rounded-full hover:text-brand transition-colors"><Github size={32}/></a>
                    <a href={`tel:${data.links.phone}`} className="p-6 glass-panel rounded-full hover:text-brand transition-colors"><Phone size={32}/></a>
                  </div>
                </div>
                <footer className="mt-40 font-mono text-[8px] text-gray-700 uppercase tracking-[0.5em] flex flex-wrap justify-center gap-12">
                  <span>LOC: CHANDIGARH</span><span>System: V4.0.2_STABLE</span><span>Uptime: 99.99%</span>
                </footer>
              </section>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODALS (Z-INDEX 10000000) */}
      <AnimatePresence>
        {activeModal === 'dev' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[10000000] bg-dark/95 backdrop-blur-3xl flex items-center justify-center p-6">
            <div className="max-w-2xl w-full glass-panel p-10 md:p-16 relative">
              <button onClick={() => setActiveModal(null)} className="absolute top-10 right-10 text-gray-500 hover:text-brand transition-colors"><X size={32}/></button>
              <Trophy className="text-brand mb-10" size={56} />
              <h3 className="text-5xl font-black mb-12 tracking-tighter uppercase leading-none">Global_Ranking</h3>
              <div className="space-y-10 mt-16">
                <div className="flex justify-between border-b border-white/10 pb-6"><span className="text-xs uppercase text-gray-500">LeetCode Peak</span><span className="text-5xl font-black text-brand">1700+</span></div>
                <div className="grid sm:grid-cols-2 gap-4"><a href={data.links.leetcode} className="py-5 glass-panel text-center text-[10px] font-black uppercase hover:bg-brand/10">LEETCODE_URL</a><a href={data.links.codechef} className="py-5 glass-panel text-center text-[10px] font-black uppercase hover:bg-brand/10">CODECHEF_URL</a></div>
              </div>
            </div>
          </motion.div>
        )}
        {activeModal === 'resume' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[10000000] bg-dark/98 backdrop-blur-3xl p-6 md:p-20 flex flex-col items-center">
             <div className="w-full h-full max-w-4xl glass-panel relative p-1 overflow-hidden">
                <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 z-10 p-3 bg-dark rounded-full text-white border border-white/10"><X size={24}/></button>
                <iframe src="/resume.pdf" className="w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] border-none" title="Resume" />
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;