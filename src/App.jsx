import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  Github, Linkedin, Mail, Cpu, ShoppingBag, Globe, Trophy, Code2,
  Zap, Terminal, Activity, ShieldCheck, ChevronRight, AlertTriangle,
  Dumbbell, Youtube, TrendingUp, Monitor, Database, ExternalLink, X, FileText, Phone, ArrowUpRight, Binary, Server, Menu
} from 'lucide-react';

// Images Import - Ensure these exist in src/images/
import PortImg from './images/Port.png';
import GtaImg from './images/Gta.png';
import FitImg from './images/Fit.png';

const App = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const cursorRef = useRef(null);

  const fullText = "SOFTWARE ARCHITECT";

  // 1. Typewriter + Flow Animation Logic
  useEffect(() => {
    let timer = setTimeout(() => {
      const updatedText = isDeleting
        ? fullText.substring(0, displayText.length - 1)
        : fullText.substring(0, displayText.length + 1);

      setDisplayText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setTypingSpeed(2500); 
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setTypingSpeed(500);
      } else {
        setTypingSpeed(isDeleting ? 50 : 150);
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting]);

  // 2. Custom Cursor Logic
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const data = {
    links: {
      linkedin: "https://linkedin.com/in/aryasharma-work",
      github: "https://github.com/aryasharma-work",
      instagram: "https://instagram.com/arya_sharma",
      email: "aryasharma.work@gmail.com",
      phone: "+91 98170 37928",
      leetcode: "https://leetcode.com/aryasharma",
      codechef: "https://codechef.com/users/aryasharma"
    },
    projects: [
      { id: '01', title: "3D Portfolio Ecosystem", desc: "Hardware-accelerated R3F environment with math-based damping and Draco compression.", img: PortImg, url: "https://portfolio-v1.arya.dev", repo: "https://github.com/arya/3d-portfolio" },
      { id: '02', title: "AshStar AI Platform", desc: "Gamified interface using Google Gemini API. Built 'Neural Memory' MongoDB schemas.", img: GtaImg, url: "https://ashstar.ai", repo: "https://github.com/arya/ashstar" },
      { id: '03', title: "AshFit E-Commerce", desc: "Decoupled architecture with <160ms TTFB. Orchestrated 25+ RESTful endpoints.", img: FitImg, url: "https://ashfit.arya.dev", repo: "https://github.com/arya/ashfit" }
    ]
  };

  return (
    <div className="relative w-full overflow-hidden bg-dark" id="home">
      {/* CYBER CURSOR */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-10 h-10 border border-brand/50 rounded-full pointer-events-none z-[10000] -ml-5 -mt-5 transition-transform duration-100 ease-out hidden lg:flex items-center justify-center">
        <div className="w-1 h-1 bg-brand rounded-full" />
      </div>

      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-dark/80 backdrop-blur-2xl px-4 md:px-12 py-4">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <div className="font-black tracking-tighter text-xl">ARYA SHARMA<span className="text-brand">()</span></div>
          
          <div className="hidden lg:flex gap-10 font-mono text-[10px] tracking-[0.4em] text-gray-500 uppercase">
            {['HOME', 'ABOUT', 'SKILLS', 'PROJECTS', 'EXPERIENCE', 'CONTACT'].map(item => (
              <a key={item} href={item === 'HOME' ? '#home' : `#${item.toLowerCase()}`} className="hover:text-brand transition-all">{item}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setActiveModal('resume')} className="bg-white text-black px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand transition-all flex items-center gap-2">
              <FileText size={14} /> <span className="hidden sm:inline">RESUME</span>
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-white"><Menu size={24}/></button>
          </div>
        </div>
        <motion.div className="absolute bottom-0 left-0 h-[2px] bg-brand origin-left" style={{ scaleX }} />
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-[150] bg-dark flex flex-col p-10 lg:hidden">
            <button onClick={() => setIsMenuOpen(false)} className="self-end mb-16"><X size={32}/></button>
            <div className="flex flex-col gap-8">
              {['HOME', 'ABOUT', 'PROJECTS', 'EXPERIENCE', 'CONTACT'].map(item => (
                <a key={item} href={item === 'HOME' ? '#home' : `#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-5xl font-black mb-2 tracking-tighter uppercase">{item}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-screen-2xl mx-auto px-4 md:px-12 pt-28 lg:pt-40">

        {/* HERO DASHBOARD */}
        <section className="min-h-[70vh] lg:min-h-[85vh] flex flex-col justify-center mb-32 lg:mb-48 relative w-full overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[90vw] aspect-square bg-brand/5 blur-[120px] -z-10 rounded-full animate-pulse" />
          
          <div className="grid lg:grid-cols-3 gap-12 items-center w-full">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-4 mb-8 uppercase font-mono text-[9px] tracking-widest text-brand">
                  <span className="px-3 py-1 bg-brand/10 border border-brand/20 rounded-full">System_V4_Active</span>
                  <div className="h-px w-20 bg-white/10 hidden sm:block" />
                </div>
                
                <h1 className="fluid-heading font-black tracking-tighter mb-10 text-transparent bg-clip-text bg-gradient-to-r from-brand via-accent to-brand bg-[length:200%_auto] animate-text-flow">
                  {displayText}
                  <span className="text-brand border-r-4 md:border-r-8 border-brand ml-1 animate-pulse"></span>
                </h1>

                <div className="flex flex-wrap gap-6 text-gray-500 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">
                  <button onClick={() => setActiveModal('dev')} className="flex items-center gap-2 hover:text-brand transition-colors"><Trophy size={16}/> Knight_1700+</button>
                  <a href={data.links.github} target="_blank" className="flex items-center gap-2 hover:text-brand transition-colors"><Github size={16}/> Arya_Dev</a>
                </div>
              </motion.div>
            </div>

            <div className="glass-panel p-8 border-brand/20 hidden lg:block animate-float">
               <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4 text-[9px] font-mono text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full" /> ARCH_STATUS: OPERATIONAL
               </div>
               <div className="font-mono text-[10px] space-y-3 leading-relaxed text-gray-400 uppercase">
                  <p className="text-brand"> {'>'} arya --init_handshake</p>
                  <p>[INFO] Verification integrity...</p>
                  <p className="text-green-500">[SUCCESS] CONCURRENCY_STABLE</p>
                  <p className="text-green-500">[SUCCESS] RAG_LOADED</p>
                  <p className="animate-pulse underline tracking-tighter text-white">READY_FOR_LOAD</p>
               </div>
            </div>
          </div>
        </section>

        {/* THE ARSENAL (TECHNICAL SKILLS) */}
        <section className="mb-40 scroll-mt-24 w-full" id="skills">
           <div className="flex items-baseline gap-6 mb-20">
              <h2 className="text-4xl md:text-9xl font-black tracking-tighter uppercase leading-none">Arsenal</h2>
              <p className="font-mono text-gray-500 text-[9px] uppercase tracking-[0.4em] hidden sm:block">Optimized_Stack_V1</p>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: <Monitor className="text-brand" />, title: "Frontend", items: "React, Redux, Tailwind, Three.js, GSAP" },
                { icon: <Server className="text-accent" />, title: "Backend", items: "Node, Express, JWT Auth, REST APIs" },
                { icon: <Binary className="text-green-400" />, title: "AI / RAG", items: "Gemini, Prompt Eng, Vector DB" },
                { icon: <Database className="text-orange-400" />, title: "Data", items: "Mongo, PostgreSQL, MySQL, Redis" }
              ].map((skill, idx) => (
                <motion.div key={idx} whileHover={{ y: -10 }} className="glass-panel p-10 hover:border-brand/40">
                  <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl">{skill.icon}</div>
                  <h4 className="font-black text-xl mb-4 tracking-tighter uppercase">{skill.title}</h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{skill.items}</p>
                </motion.div>
              ))}
           </div>
        </section>

        {/* ABOUT: THE HUSTLE & RESILIENCE */}
        <section className="mb-40 scroll-mt-24 w-full" id="about">
           <div className="grid lg:grid-cols-2 gap-10">
              <div onClick={() => setActiveModal('dev')} className="glass-panel p-12 relative group cursor-pointer border-brand/10 hover:bg-brand/[0.03]">
                 <div className="scan-line" />
                 <Cpu className="text-brand mb-8 group-hover:rotate-12 transition-transform" size={40} />
                 <h2 className="text-5xl font-black mb-6 tracking-tighter uppercase leading-none">Dev_Core</h2>
                 <p className="text-gray-400 leading-relaxed mb-10 italic border-l-2 border-brand/20 pl-8">
                    "Obsessed with high-concurrency systems and resilient architecture. 1700+ LeetCode rating proves technical grit."
                 </p>
                 <div className="flex gap-4">
                    <span className="bg-brand/10 text-brand px-3 py-1 rounded text-[10px] font-mono border border-brand/20 uppercase tracking-widest">Knight_Tier</span>
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded text-[10px] font-mono border border-accent/20 uppercase tracking-widest">CodeChef_3*</span>
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <a href={data.links.instagram} target="_blank" className="glass-panel p-10 flex items-center justify-between group border-accent/10">
                    <div className="flex items-center gap-8">
                       <Youtube className="text-accent" size={32} />
                       <div><h4 className="font-bold text-2xl tracking-tighter uppercase">Content Creation</h4><p className="text-xs text-gray-500 font-mono italic">Engineering aesthetics.</p></div>
                    </div>
                    <ArrowUpRight className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform text-accent" />
                 </a>
                 <div className="glass-panel p-10 flex items-center gap-8 border-orange-500/10">
                    <TrendingUp className="text-orange-500" size={32} />
                    <div><h4 className="font-bold text-2xl tracking-tighter uppercase">AI Consulting</h4><p className="text-xs text-gray-500 font-mono italic">Optimizing RAG pipelines.</p></div>
                 </div>
                 <div className="glass-panel p-10 flex items-center gap-8 border-brand/10">
                    <Dumbbell className="text-brand" size={32} />
                    <div><h4 className="font-bold text-2xl tracking-tighter uppercase">Fitness Module</h4><p className="text-xs text-gray-500 font-mono italic">6 days discipline.</p></div>
                 </div>
              </div>
           </div>
        </section>

        {/* PROJECT VAULT */}
        <section className="mb-40 scroll-mt-24 w-full" id="projects">
           <div className="flex items-center gap-10 mb-24">
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase">Vault</h2>
              <div className="h-px bg-white/5 flex-grow" />
           </div>
           <div className="grid gap-24 lg:gap-60">
              {data.projects.map((p, i) => (
                <motion.div 
                  key={p.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                   <div className="relative group overflow-hidden rounded-[2rem] lg:rounded-[3rem] border border-white/10 glass-panel aspect-video w-full">
                      <img 
                        src={p.img} 
                        onClick={() => window.open(p.url, '_blank')}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 cursor-pointer" 
                        alt={p.title}
                      />
                      <div className="scan-line opacity-10" />
                   </div>
                   <div className="w-full">
                      <div className="font-mono text-brand mb-4 text-[10px] tracking-[0.4em] uppercase">Deployment_Sequence_00{p.id}</div>
                      <h3 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none break-words">{p.title}</h3>
                      <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed italic border-l-2 border-brand/20 pl-8">"{p.desc}"</p>
                      <button onClick={() => window.open(p.repo, '_blank')} className="flex items-center gap-4 text-brand font-black uppercase text-xs tracking-widest group">
                        VIEW_SYSTEM_SOURCE <ChevronRight className="group-hover:translate-x-3 transition-transform" />
                      </button>
                   </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* EXPERIENCE: THE RESILIENCE LOG */}
        <section className="mb-40 scroll-mt-24 w-full" id="experience">
           <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1">
                 <div className="sticky top-40">
                    <h2 className="fluid-heading font-black tracking-tighter uppercase leading-[0.8]">History <br /> <span className="text-accent">Refactored</span></h2>
                    <p className="text-gray-500 mt-10 font-mono text-[10px] uppercase tracking-widest">Independent Engineering over validation.</p>
                 </div>
              </div>
              <div className="lg:col-span-2 space-y-8">
                 {[
                   { title: "Independent Software Architect", time: "2024 - PRESENT", desc: "Built production ecosystems (AshStar, AshFit) to prove technical obsession. Spent 14+ hrs/day engineering RAG pipelines and 3D UI environments.", icon: <Zap className="text-brand"/> },
                   { title: "Technical Turnaround", time: "2022 - 2023", desc: "Refactored academic setbacks into engineering meritocracy. Mastered DSA and earned LeetCode Knight Rank.", icon: <Activity className="text-accent"/> },
                   { title: "Medical Resilience", time: "2021", desc: "Overcame severe health challenges that disrupted formal paths. Learned the value of 'Graceful Failure'—a principle that now defines my architecture.", icon: <ShieldCheck className="text-gray-500"/> }
                 ].map((log, i) => (
                    <motion.div key={i} whileInView={{ opacity: [0, 1], x: [-20, 0] }} className="glass-panel p-10 md:p-14 relative overflow-hidden group border-white/5 hover:border-brand/20">
                       <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
                          <div className="flex gap-6 items-center">
                             <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">{log.icon}</div>
                             <h4 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">{log.title}</h4>
                          </div>
                          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-4 py-1 rounded-full">{log.time}</span>
                       </div>
                       <p className="text-gray-400 text-sm md:text-base leading-relaxed italic">"{log.desc}"</p>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* INCIDENT LOGS (EXPANDED FAILURES) */}
        <section className="mb-40 scroll-mt-24 w-full">
           <h2 className="text-5xl md:text-[140px] font-black tracking-tighter leading-none uppercase mb-20">Notable <br /> <span className="text-red-500">Failures</span></h2>
           <div className="grid gap-10">
              {[
                { id: "INC-001", title: "Redis Thundering Herd", impact: "System-wide 503 outage due to simultaneous cache expiration causing database spikes.", res: "Implemented Probabilistic Early Expiration (Jitter) and Semantic Locking." },
                { id: "INC-002", title: "N+1 Query Cascade", impact: "Production API latency peaked at 1.8s during user burst events due to unoptimized ORM fetching.", res: "Optimized SQL views and integrated batch-processing handlers." }
              ].map(fail => (
                <div key={fail.id} className="glass-panel p-10 md:p-16 border-red-500/10 hover:border-red-500/40">
                   <div className="text-red-500 font-mono text-xs mb-4 uppercase tracking-[0.4em]">{fail.id}</div>
                   <h3 className="text-3xl md:text-5xl font-black mb-10 uppercase tracking-tight">{fail.title}</h3>
                   <div className="grid md:grid-cols-2 gap-10 border-t border-white/5 pt-10">
                      <div><div className="text-[9px] text-gray-600 uppercase font-black mb-3 underline decoration-red-500 tracking-widest">Impact_Report</div><p className="text-sm text-gray-400 leading-relaxed uppercase">{fail.impact}</p></div>
                      <div><div className="text-[9px] text-gray-600 uppercase font-black mb-3 underline decoration-brand tracking-widest">Resolution</div><p className="text-sm text-gray-400 leading-relaxed uppercase">{fail.res}</p></div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* INVITE_CONTACT (FINAL CTA) */}
        <section className="py-20 lg:py-40 text-center border-t border-white/5 relative w-full" id="contact">
          <motion.div whileInView={{ scale: [0.8, 1] }}>
            <h2 className="fluid-heading font-black mb-12 tracking-tighter uppercase leading-none break-words">Invite_<br/>Contact</h2>
            <div className="flex flex-col md:flex-row justify-center gap-10 items-center w-full px-4">
              <a href={`mailto:${data.links.email}`} className="w-full md:w-auto px-16 py-8 bg-brand text-black font-black text-xl rounded-full hover:shadow-[0_0_80px_rgba(0,242,234,0.4)] transition-all uppercase tracking-tighter">Initiate_Protocol</a>
              <div className="flex gap-6">
                <a href={data.links.linkedin} target="_blank" className="p-6 glass-panel rounded-full hover:text-brand transition-colors"><Linkedin size={32}/></a>
                <a href={data.links.github} target="_blank" className="p-6 glass-panel rounded-full hover:text-brand transition-colors"><Github size={32}/></a>
                <a href={`tel:${data.links.phone}`} className="p-6 glass-panel rounded-full hover:text-brand transition-colors"><Phone size={32}/></a>
              </div>
            </div>
          </motion.div>
          <footer className="mt-40 font-mono text-[8px] text-gray-700 uppercase tracking-[0.5em] flex flex-wrap justify-center gap-12 pb-10">
            <span>LOC: IN_CHANDIGARH</span><span>System: Aryasharma_V4.0.2</span><span>Uptime: 99.999%</span>
          </footer>
        </section>

      </main>

      {/* MODALS */}
      <AnimatePresence>
        {activeModal === 'dev' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-dark/95 backdrop-blur-3xl flex items-center justify-center p-6">
            <div className="max-w-2xl w-full glass-panel p-10 md:p-16 relative">
              <button onClick={() => setActiveModal(null)} className="absolute top-10 right-10 text-gray-500 hover:text-brand transition-colors"><X size={32}/></button>
              <Trophy className="text-brand mb-10" size={56} />
              <h3 className="text-5xl font-black mb-12 tracking-tighter uppercase leading-none">Ranking</h3>
              <div className="space-y-10 mt-16">
                <div className="flex justify-between border-b border-white/10 pb-6">
                  <span className="text-xs uppercase tracking-widest text-gray-500 font-mono font-black">LeetCode Peak</span>
                  <span className="text-5xl font-black text-brand tracking-tighter">1700+</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 font-black">
                  <a href={data.links.leetcode} target="_blank" className="py-5 glass-panel text-center text-[10px] tracking-widest uppercase hover:bg-brand/10">LEETCODE_URL</a>
                  <a href={data.links.codechef} target="_blank" className="py-5 glass-panel text-center text-[10px] tracking-widest uppercase hover:bg-brand/10">CODECHEF_URL</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {activeModal === 'resume' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-dark/98 backdrop-blur-3xl p-4 md:p-20 flex flex-col items-center">
             <div className="w-full h-full max-w-4xl glass-panel relative overflow-hidden p-1">
                <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 z-10 p-3 bg-dark rounded-full text-white border border-white/10"><X size={24}/></button>
                <iframe src="/resume.pdf" className="w-full h-full rounded-[1rem] md:rounded-[2.5rem] border-none" title="Resume" />
             </div>
             <a href="/resume.pdf" download className="mt-8 px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full hover:bg-brand transition-all">Download_Master_PDF</a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;