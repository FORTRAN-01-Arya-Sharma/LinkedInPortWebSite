import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  Github, Linkedin, Mail, Cpu, ShoppingBag, Globe, Trophy, Code2,
  Zap, Terminal, Activity, ShieldCheck, ChevronRight, AlertTriangle,
  Dumbbell, Youtube, TrendingUp, Monitor, Database, ExternalLink, X, FileText, Phone, ArrowUpRight, Binary, Server, Menu, Layers, Award, MessageSquare
} from 'lucide-react';

// Images Import
import PortImg from './images/Port.png';
import GtaImg from './images/Gta.png';
import FitImg from './images/Fit.png';

// --- COMPONENT: THE SYSTEM BOOT SEQUENCE ---
const LoadingScreen = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const logs = ["[BOOT] INITIALIZING_V4", "[INFO] RAG_CORE_STABLE", "[INFO] DRACO_MESH_OPTIMIZED", "[SUCCESS] SYSTEM_READY"];

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(p => { if (p >= 100) { clearInterval(interval); setTimeout(onComplete, 800); return 100; } return p + 1; });
    }, 20);
    const logInterval = setInterval(() => setLogIndex(p => p < logs.length - 1 ? p + 1 : p), 450);
    return () => { clearInterval(interval); clearInterval(logInterval); };
  }, [onComplete]);

  return (
    <motion.div exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }} className="fixed inset-0 z-[100000] bg-dark flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-8xl md:text-9xl font-black text-brand tracking-tighter mb-8">{percent}%</h2>
      <p className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.4em] mb-10">{logs[logIndex]}</p>
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

  // Typewriter Loop
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
  }, [displayText, isDeleting, isLoading, typingSpeed]);

  // Magnetic Cursor (Added pointer-events-none to fix non-working links)
  useEffect(() => {
    const moveCursor = (e) => { if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`; };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const data = {
    links: { 
      linkedin: "https://www.linkedin.com/in/arya-sharma-dev", 
      github: "https://github.com/FORTRAN-01-Arya-Sharma", 
      instagram: "https://instagram.com/arya_sharma", 
      email: "ashgrtz2003@gmail.com", 
      phone: "+91 98170 37928", 
      leetcode: "https://leetcode.com/u/fortran-01-arya-sharma/", 
      codechef: "https://www.codechef.com/users/aryasharma3012" 
    },
    skills: [
      { cat: "Languages", items: "JS (ES6+), TypeScript, Java, SQL, HTML5, CSS3", icon: <Binary className="text-brand"/> },
      { cat: "Frontend", items: "React.js, Redux, Tailwind, Three.js (R3F), GSAP, Framer, Lenis, Vite", icon: <Monitor className="text-accent"/> },
      { cat: "Backend", items: "Node.js, Express.js, RESTful APIs, JWT Auth, RBAC", icon: <Server className="text-green-400"/> },
      { cat: "Intelligent Systems", items: "Gemini API, LLM Orchestration, Prompt Engineering, Vector Embeddings", icon: <Cpu className="text-blue-400"/> },
      { cat: "Databases", items: "MongoDB (Atlas), PostgreSQL, MySQL, Redis", icon: <Database className="text-orange-400"/> },
      { cat: "DevOps & Tools", items: "Git/GitHub, Docker, Vercel, Postman, Render", icon: <Layers className="text-pink-400"/> }
    ],
    achievements: [
      { title: "LeetCode Ranking", val: "1600+", desc: "Knight Tier [Top 5% Global]", icon: <Trophy/> },
      { title: "DSA Problems", val: "700+", desc: "Solved across platforms", icon: <Code2/> },
      { title: "CodeChef Status", val: "3★", desc: "Active Contest Architect", icon: <Zap/> }
    ],
    projects: [
      { 
        id: '01', title: "Astra 3D Engine", 
        desc: "A hardware-accelerated 3D spatial ecosystem engineered using React Three Fiber. I implemented specialized math-based damping algorithms and Draco Mesh Compression to achieve a 70% reduction in geometry payload, maintaining a consistent 60 FPS interactive experience even on tiered mobile devices.", 
        img: PortImg, url: "https://portfolio-with-ai-assistant.vercel.app", repo: "https://github.com/FORTRAN-01-Arya-Sharma/PortfolioWithAIAssistant" 
      },
      { 
        id: '02', title: "AshStar AI Platform", 
        desc: "A production-grade, decoupled SaaS platform combining intelligent LLM orchestration via Google Gemini API. I engineered custom model redundancy logic (Pro/Flash failover) and a relational-style MongoDB 'Neural Memory' schema to manage 1,000+ session-persistent data points.", 
        img: GtaImg, url: "https://ash-star-with-ai-assistant.vercel.app", repo: "https://github.com/FORTRAN-01-Arya-Sharma/AshSTARWithAIAssistant" 
      },
      { 
        id: '03', title: "AshFit E-Commerce", 
        desc: "High-performance full-stack commerce ecosystem with a verified TTFB of <160ms. Hardened application security with JWT/RBAC middleware and designed automated inventory CRUD pipelines, reducing manual data overhead by 50% for live performance-apparel listings.", 
        img: FitImg, url: "https://ash-fit.vercel.app", repo: "https://github.com/FORTRAN-01-Arya-Sharma/AshFIT" 
      }
    ]
  };

  return (
    <div className="relative w-full overflow-hidden bg-dark">
       <div className="scanlines-overlay" />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full relative">
            
            {/* FIXED CURSOR: Added pointer-events-none so links are clickable */}
             <div ref={cursorRef} className="custom-cursor hidden lg:flex" />
                <div className="w-1 h-1 bg-brand rounded-full" />
            

            {/* NAVIGATION */}
            <nav className="fixed top-0 w-full z-[50000] border-b border-white/5 bg-dark/80 backdrop-blur-2xl px-4 md:px-12 py-4">
              <div className="max-w-screen-2xl mx-auto flex justify-between items-center w-full">
                <div className="font-black tracking-tighter text-xl cursor-pointer" onClick={() => window.scrollTo({top:0})}>ARYA SHARMA<span className="text-brand">()</span></div>
                <div className="hidden lg:flex gap-10 font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase">
                  {['HOME', 'ABOUT', 'SKILLS', 'PROJECTS', 'EXPERIENCE', 'CONTACT'].map(item => (
                    <a key={item} href={item === 'HOME' ? '#home' : `#${item.toLowerCase()}`} className="hover:text-brand transition-all">{item}</a>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setActiveModal('resume')} className="bg-white text-black px-4 py-2 rounded-full text-[9px] font-black hover:bg-brand transition-all">RESUME</button>
                  <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-white"><Menu size={24}/></button>
                </div>
              </div>
              <motion.div className="absolute bottom-0 left-0 h-[2px] bg-brand origin-left w-full" style={{ scaleX }} />
            </nav>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-[150] bg-dark flex flex-col p-10 lg:hidden">
                  <button onClick={() => setIsMenuOpen(false)} className="self-end mb-16"><X size={32}/></button>
                  <div className="flex flex-col gap-6 uppercase">
                    {['HOME', 'ABOUT', 'SKILLS', 'PROJECTS', 'EXPERIENCE', 'CONTACT'].map(item => (
                      <a key={item} href={item === 'HOME' ? '#home' : `#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-5xl font-black tracking-tighter">{item}</a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <main className="max-w-screen-2xl mx-auto px-4 md:px-12 pt-28 lg:pt-40" id="home">
              
              {/* HERO SECTION */}
              <section className="min-h-[70vh] flex flex-col justify-center mb-40 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[90vw] aspect-square bg-brand/5 blur-[100px] -z-10 rounded-full animate-pulse" />
                <h1 className="fluid-heading font-black tracking-tighter mb-12 text-transparent bg-clip-text bg-gradient-to-r from-brand via-accent to-brand bg-[length:200%_auto] animate-text-flow uppercase">
                  {displayText}<span className="text-brand border-r-4 md:border-r-8 border-brand ml-1 animate-pulse" />
                </h1>

                {/* DASHBOARD LINKS REFACTORED TO TACTILE BUTTONS */}
                <div className="flex flex-wrap gap-4 items-center">
                  <button 
                    onClick={() => setActiveModal('dev')}
                    className="group flex items-center gap-3 px-6 py-3 bg-white/5 border border-brand/20 rounded-full hover:border-brand/60 hover:bg-brand/10 transition-all duration-300"
                  >
                    <Trophy size={18} className="text-brand group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono font-bold tracking-widest text-gray-300 uppercase">
                      Knight_1600+
                    </span>
                  </button>

                  <a 
                    href={data.links.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="group flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:border-brand/40 hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <Github size={18} className="text-gray-400 group-hover:text-brand transition-colors" />
                    <span className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase group-hover:text-white">
                      GitHub_Hub
                    </span>
                    <ArrowUpRight size={14} className="text-gray-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </section>
              

              {/* ABOUT & ACHIEVEMENTS */}
              <section className="mb-40 scroll-mt-24" id="about">
                <h2 className="fluid-heading font-black mb-12 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_auto] animate-text-flow uppercase">History_Refactored</h2>
                <div className="grid lg:grid-cols-2 gap-10">
                   <div className="glass-panel p-10 md:p-14 border-brand/10">
                      <Terminal className="text-brand mb-8" size={32} />
                      <h3 className="text-3xl font-black uppercase mb-6 tracking-tight">The_Narrative</h3>
                      <p className="text-gray-400 leading-relaxed italic mb-8 border-l-2 border-brand/20 pl-6">"Academic setbacks and medical challenges refactored my entire life into a technical obsession. I turned adversity into engineering grit, mastering high-performance systems to prove Technical Meritocracy."</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                         <div className="flex items-center gap-4 group"><Dumbbell className="text-brand" size={24}/><div><div className="text-white font-bold text-xs uppercase">Fitness</div><div className="text-[8px] text-gray-500 font-mono">6_Day_Discipline</div></div></div>
                         <a href={data.links.instagram} target="_blank" className="flex items-center gap-4 group cursor-pointer"><Youtube className="text-accent" size={24}/><div><div className="text-white font-bold text-xs uppercase">Content</div><div className="text-[8px] text-gray-500 font-mono">System_Vlogs</div></div></a>
                         <div className="flex items-center gap-4 group"><TrendingUp className="text-orange-400" size={24}/><div><div className="text-white font-bold text-xs uppercase">Hustle</div><div className="text-[8px] text-gray-500 font-mono">AI_Consulting</div></div></div>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 gap-4">
                      {data.achievements.map((a, i) => (
                        <div key={i} className="glass-panel p-8 flex items-center justify-between group border-white/5 hover:border-brand/30">
                           <div className="flex items-center gap-8">
                              <div className="p-4 bg-white/5 rounded-2xl text-brand group-hover:scale-110 transition-transform">{a.icon}</div>
                              <div><h4 className="font-bold text-2xl tracking-tighter uppercase">{a.title}</h4><p className="text-xs text-gray-500 font-mono uppercase">{a.desc}</p></div>
                           </div>
                           <div className="text-3xl font-black text-brand tracking-tighter">{a.val}</div>
                        </div>
                      ))}
                   </div>
                </div>
              </section>

              {/* TECH STACK */}
              <section className="mb-40 scroll-mt-24" id="skills">
                 <h2 className="fluid-heading font-black mb-12 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-[length:200%_auto] animate-text-flow uppercase">The_Arsenal</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.skills.map((s, i) => (
                      <div key={i} className="glass-panel p-10 group border-white/5 hover:border-brand/40">
                         <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-brand/10 transition-colors">{s.icon}</div>
                         <h4 className="font-black text-xl mb-3 uppercase leading-none">{s.cat}</h4>
                         <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase leading-relaxed">{s.items}</p>
                      </div>
                    ))}
                 </div>
              </section>

              {/* PROJECTS */}
              <section className="mb-40 scroll-mt-24" id="projects">
                 <h2 className="fluid-heading font-black mb-20 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-green-400 bg-[length:200%_auto] animate-text-flow uppercase">Deployments</h2>
                 <div className="grid gap-20 lg:gap-40">
                    {data.projects.map((p, i) => (
                      <div key={p.id} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                         <motion.div whileHover="hoverState" className="relative group overflow-hidden rounded-[1.5rem] md:rounded-[3rem] border border-white/10 glass-panel aspect-video cursor-pointer">
                            <motion.img variants={{ hoverState: { scale: 1.1 } }} transition={{ duration: 0.8 }} src={p.img} onClick={() => window.open(p.url, '_blank')} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000" alt={p.title} />
                            <div className="animate-scanning-line group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent opacity-80 pointer-events-none" />
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand/40 transition-all rounded-[1.5rem] md:rounded-[3rem] pointer-events-none" />
                         </motion.div>
                         <div className={i % 2 !== 0 ? 'lg:order-first' : ''}>
                            <div className="font-mono text-brand mb-4 text-[10px] tracking-[0.4em] uppercase">Deployment_Sequence_00{p.id}</div>
                            <h3 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none break-words">{p.title}</h3>
                            <p className="text-gray-400 text-sm md:text-lg mb-10 leading-relaxed italic border-l-2 border-brand/20 pl-8">"{p.desc}"</p>
                            <button onClick={() => window.open(p.repo, '_blank')} className="flex items-center gap-4 text-brand font-black uppercase text-xs tracking-widest group">SOURCE_CODE <ChevronRight className="group-hover:translate-x-3 transition-transform" /></button>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>

              {/* FAILURES (POST-MORTEMS) */}
              <section className="mb-40 scroll-mt-24" id="engineering">
                 <h2 className="fluid-heading font-black mb-20 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-[length:200%_auto] animate-text-flow uppercase">Notable_Failures</h2>
                 <div className="grid gap-10">
                    {[
                      { id: "INC-001", title: "Redis Thundering Herd", impact: "System-wide 503 outage due to simultaneous cache expiration causing database spikes.", res: "Implemented Probabilistic Early Expiration (Jitter) and Semantic Locking." },
                      { id: "INC-002", title: "N+1 Query Cascade", impact: "Production API latency hit 1.8s during user burst events due to unoptimized fetching.", res: "Optimized SQL views and integrated batch-processing handlers." }
                    ].map(fail => (
                      <div key={fail.id} className="glass-panel p-10 md:p-16 border-red-500/10 hover:border-red-500/40">
                         <div className="text-red-500 font-mono text-xs mb-4 uppercase tracking-[0.4em]">{fail.id}</div>
                         <h3 className="text-3xl md:text-5xl font-black mb-10 uppercase tracking-tight">{fail.title}</h3>
                         <div className="grid md:grid-cols-2 gap-10 border-t border-white/5 pt-10 uppercase font-mono text-gray-400 text-xs">
                            <div><div className="text-red-500 font-black mb-2 tracking-widest">Impact_Report</div>{fail.impact}</div>
                            <div><div className="text-brand font-black mb-2 tracking-widest">Resolution</div>{fail.res}</div>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>

              {/* CONTACT / HANDSHAKE */}
              <section className="py-20 lg:py-40 text-center border-t border-white/5 relative" id="contact">
                <h2 className="fluid-heading font-black mb-12 tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-brand via-accent to-brand bg-[length:200%_auto] animate-text-flow uppercase">Initiate_<br/>Handshake</h2>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 text-left">
                  <div className="glass-panel p-8 border-brand/20 bg-brand/5 relative overflow-hidden">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="p-4 bg-brand/20 rounded-2xl text-brand"><Phone size={28} /></div>
                      <div>
                        <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.4em]">Direct_Voice_Link</h4>
                        <a href={`tel:${data.links.phone}`} className="text-2xl font-black text-white hover:text-brand transition-colors">{data.links.phone}</a>
                      </div>
                    </div>
                  </div>
                  <a href="https://wa.me/919817037928" target="_blank" rel="noreferrer" className="glass-panel p-8 group border-green-500/20 bg-green-500/5 flex items-center justify-between hover:border-green-500/50">
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-green-500/20 rounded-2xl text-green-400"><MessageSquare size={28} /></div>
                      <div><h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.4em]">Instant_Sync</h4><div className="text-2xl font-black text-white uppercase">WhatsApp</div></div>
                    </div>
                    <ArrowUpRight className="text-green-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                  <div className="glass-panel p-8 border-accent/20 bg-accent/5 md:col-span-2">
                     <div className="flex items-center gap-6">
                        <div className="p-4 bg-accent/20 rounded-2xl text-accent"><Mail size={28}/></div>
                        <div>
                           <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.4em]">Secure_Reply</h4>
                           <a href={`mailto:${data.links.email}`} className="text-xl md:text-2xl font-black text-white hover:text-accent transition-colors break-all">{data.links.email}</a>
                        </div>
                     </div>
                  </div>
                </div>
                <footer className="mt-40 font-mono text-[8px] text-gray-700 uppercase tracking-[0.5em] flex flex-wrap justify-center gap-12">
                  <span>LOC: IN_CHANDIGARH</span><span>System: V4.0.2_PRODUCTION</span><span>Uptime: 99.99%</span>
                </footer>
              </section>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODALS */}
      <AnimatePresence>
        {activeModal === 'dev' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[10000000] bg-dark/95 backdrop-blur-3xl flex items-center justify-center p-6"><div className="max-w-2xl w-full glass-panel p-10 md:p-16 relative"><button onClick={() => setActiveModal(null)} className="absolute top-10 right-10 text-gray-500 hover:text-brand transition-colors"><X size={32}/></button><Trophy className="text-brand mb-10" size={56} /><h3 className="text-5xl font-black mb-12 tracking-tighter uppercase leading-none font-sans">Ranking</h3><div className="space-y-10 mt-16 font-mono"><div className="flex justify-between border-b border-white/10 pb-6"><span className="text-xs uppercase text-gray-500">LeetCode Peak</span><span className="text-5xl font-black text-brand tracking-tighter">1600+</span></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><a href={data.links.leetcode} className="py-5 glass-panel text-center text-[10px] font-black uppercase hover:bg-brand/10 transition-colors" target="_blank" rel="noreferrer">LEETCODE_URL</a><a href={data.links.codechef} className="py-5 glass-panel text-center text-[10px] font-black uppercase hover:bg-brand/10 transition-colors" target="_blank" rel="noreferrer">CODECHEF_URL</a></div></div></div></motion.div>
        )}
        {activeModal === 'resume' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[10000000] bg-dark/98 backdrop-blur-3xl p-6 md:p-20 flex flex-col items-center"><div className="w-full h-full max-w-4xl glass-panel relative p-1 overflow-hidden shadow-2xl"><button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 z-10 p-3 bg-dark rounded-full text-white border border-white/10 hover:text-brand transition-all"><X size={24}/></button><iframe src="/resume.pdf" className="w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-2xl" title="Resume" /></div><a href="/resume.pdf" download className="mt-8 px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full hover:bg-brand transition-all">Download_PDF</a></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;