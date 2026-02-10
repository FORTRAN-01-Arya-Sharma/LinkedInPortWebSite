import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  Github, Linkedin, Mail, Cpu, ShoppingBag, Globe, Trophy, Code2,
  Zap, Terminal, Activity, ShieldCheck, ChevronRight, AlertTriangle,
  Dumbbell, Youtube, TrendingUp, Monitor, Database, ExternalLink, X, FileText, Phone, ArrowUpRight, Binary, Server, Menu, Layers, Award
} from 'lucide-react';

// Images Import
import PortImg from './images/Port.png';
import GtaImg from './images/Gta.png';
import FitImg from './images/Fit.png';

const LoadingScreen = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const logs = ["[BOOT] INITIALIZING_V4", "[INFO] RAG_CORE_STABLE", "[INFO] DRACO_MESH_OPTIMIZED", "[SUCCESS] SYSTEM_READY"];

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(p => { if (p >= 100) { clearInterval(interval); setTimeout(onComplete, 800); return 100; } return p + 1; });
    }, 25);
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

  useEffect(() => {
    const moveCursor = (e) => { if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`; };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const data = {
    links: { linkedin: "https://linkedin.com/in/aryasharma-work", github: "https://github.com/aryasharma-work", instagram: "https://instagram.com/arya_sharma", email: "aryasharma.work@gmail.com", phone: "+91 98170 37928", leetcode: "https://leetcode.com/aryasharma", codechef: "https://codechef.com/users/aryasharma" },
    skills: [
      { cat: "Languages", items: "JS (ES6+), TypeScript, Java, SQL, HTML5, CSS3", icon: <Binary className="text-brand"/> },
      { cat: "Frontend", items: "React.js, Redux, Tailwind, Three.js (R3F), GSAP, Framer Motion, Lenis, Vite", icon: <Monitor className="text-accent"/> },
      { cat: "Backend", items: "Node.js, Express.js, RESTful APIs, JWT Auth, RBAC", icon: <Server className="text-green-400"/> },
      { cat: "AI Engineering", items: "LLM Integration (Gemini/OpenAI), RAG Architecture, Vector Embeddings", icon: <Cpu className="text-blue-400"/> },
      { cat: "Databases", items: "MongoDB (Atlas), PostgreSQL, MySQL", icon: <Database className="text-orange-400"/> },
      { cat: "DevOps & Tools", items: "Git/GitHub, Docker, Vercel, Postman, Render, Payment Gateways (Stripe/Razorpay)", icon: <Layers className="text-pink-400"/> }
    ],
    achievements: [
      { title: "LeetCode Ranking", val: "1700+", desc: "Knight Tier [Top 5% Global]", icon: <Trophy/> },
      { title: "DSA Problems", val: "750+", desc: "Solved across CodeChef/LeetCode", icon: <Code2/> },
      { title: "CodeChef", val: "3★", desc: "Active Contest Participant", icon: <Zap/> }
    ],
    projects: [
      { id: '01', title: "3D Portfolio", desc: "R3F environment with math-based damping. 70% asset reduction.", img: PortImg, url: "https://portfolio-v1.arya.dev", repo: "https://github.com/aryasharma-work/3d-portfolio" },
      { id: '02', title: "AshStar AI", desc: "Gamified SaaS with 'Neural Memory' and Google Gemini logic.", img: GtaImg, url: "https://ashstar.ai", repo: "https://github.com/aryasharma-work/ashstar" },
      { id: '03', title: "AshFit E-com", desc: "Decoupled architecture with <160ms TTFB. Automated inventory.", img: FitImg, url: "https://ashfit.arya.dev", repo: "https://github.com/aryasharma-work/ashfit" }
    ]
  };

  return (
    <div className="relative w-full overflow-hidden bg-dark">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full relative">
            <div ref={cursorRef} className="fixed top-0 left-0 w-10 h-10 border border-brand rounded-full pointer-events-none z-[1000000] -ml-5 -mt-5 transition-transform duration-75 hidden lg:flex items-center justify-center"><div className="w-1 h-1 bg-brand rounded-full" /></div>

            <nav className="fixed top-0 w-full z-[50000] border-b border-white/5 bg-dark/80 backdrop-blur-2xl px-4 md:px-12 py-4">
              <div className="max-w-screen-2xl mx-auto flex justify-between items-center w-full">
                <div className="font-black tracking-tighter text-xl">ARYA SHARMA<span className="text-brand">()</span></div>
                <div className="hidden lg:flex gap-8 font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase">
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
              
              {/* HERO */}
              <section className="min-h-[70vh] flex flex-col justify-center mb-40 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[90vw] aspect-square bg-brand/5 blur-[100px] -z-10 rounded-full animate-pulse" />
                <h1 className="fluid-heading font-black tracking-tighter mb-10 text-transparent bg-clip-text bg-gradient-to-r from-brand via-accent to-brand bg-[length:200%_auto] animate-text-flow uppercase">
                  {displayText}<span className="text-brand border-r-4 md:border-r-8 border-brand ml-1 animate-pulse" />
                </h1>
                <div className="flex flex-wrap gap-4 text-gray-500 font-mono text-[9px] uppercase tracking-widest">
                  <button onClick={() => setActiveModal('dev')} className="hover:text-brand flex items-center gap-2"><Trophy size={14}/> Ranking</button>
                  <a href={data.links.github} target="_blank" className="hover:text-brand flex items-center gap-2"><Github size={14}/> Github</a>
                </div>
              </section>

              {/* ABOUT & ACHIEVEMENTS */}
              <section className="mb-40 scroll-mt-24" id="about">
                <h2 className="fluid-heading font-black mb-12 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_auto] animate-text-flow">System_Refactor</h2>
                <div className="grid lg:grid-cols-2 gap-10 mb-20">
                   <div className="glass-panel p-10 md:p-14 border-brand/10">
                      <Terminal className="text-brand mb-8" size={32} />
                      <h3 className="text-3xl font-black uppercase mb-6 tracking-tight">The_Narrative</h3>
                      <p className="text-gray-400 leading-relaxed italic mb-8 border-l-2 border-brand/20 pl-6">
                        "Traditional paths were hindered by personal challenges, but engineering is the ultimate meritocracy. I refactored my potential, mastered DSA, and architected production systems to force my own technical validation."
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                         <div className="flex items-center gap-4 group"><Dumbbell className="text-brand group-hover:scale-125 transition-transform" size={24}/><div><div className="text-white font-bold text-xs uppercase">Fitness</div><div className="text-[8px] text-gray-500 font-mono">Discipline_Logic</div></div></div>
                         <div className="flex items-center gap-4 group"><Youtube className="text-accent group-hover:scale-125 transition-transform" size={24}/><div><div className="text-white font-bold text-xs uppercase">Content</div><div className="text-[8px] text-gray-500 font-mono">Dev_Life_Vlogs</div></div></div>
                         <div className="flex items-center gap-4 group"><TrendingUp className="text-orange-400 group-hover:scale-125 transition-transform" size={24}/><div><div className="text-white font-bold text-xs uppercase">Hustle</div><div className="text-[8px] text-gray-500 font-mono">AI_Consulting</div></div></div>
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
                {/* Certifications Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                   {["Software Eng [HKUST]", "Agile PM [Google]", "Interview Prep [Meta]", "Virtual Exp [JPMorgan]"].map((cert, i) => (
                      <div key={i} className="glass-panel p-4 flex items-center gap-4 border-white/5">
                         <Award className="text-gray-500" size={16}/>
                         <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest leading-tight">{cert}</span>
                      </div>
                   ))}
                </div>
              </section>

              {/* THE ARSENAL (REWRITTEN WITH RESUME SKILLS) */}
              <section className="mb-40 scroll-mt-24" id="skills">
                 <h2 className="fluid-heading font-black mb-12 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-[length:200%_auto] animate-text-flow">The_Arsenal</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.skills.map((s, i) => (
                      <div key={i} className="glass-panel p-10 group border-white/5 hover:border-brand/40">
                         <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-brand/10 transition-colors">{s.icon}</div>
                         <h4 className="font-black text-xl mb-3 tracking-tight uppercase leading-none">{s.cat}</h4>
                         <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase leading-relaxed">{s.items}</p>
                      </div>
                    ))}
                    <div className="glass-panel p-10 bg-white/5 flex flex-col justify-center border-dashed border-white/10">
                       <h4 className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.4em] mb-4">Core_Fundamentals</h4>
                       <p className="text-[10px] font-mono text-white/50 uppercase leading-loose">DSA, OOP, DBMS, OS, Computer Networks, Comp Architecture</p>
                    </div>
                 </div>
              </section>

              {/* PROJECTS */}
              <section className="mb-40 scroll-mt-24" id="projects">
                 <h2 className="fluid-heading font-black mb-20 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-green-400 bg-[length:200%_auto] animate-text-flow">Vault</h2>
                 <div className="grid gap-20 lg:gap-40">
                    {data.projects.map((p, i) => (
                      <div key={p.id} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                         <motion.div whileHover="hoverState" className="relative group overflow-hidden rounded-[1.5rem] md:rounded-[3rem] border border-white/10 glass-panel aspect-video cursor-pointer">
                            <motion.img variants={{ hoverState: { scale: 1.1 } }} transition={{ duration: 0.8 }} src={p.img} onClick={() => window.open(p.url, '_blank')} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000" alt={p.title} />
                            <div className="animate-scanning-line group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent opacity-80 pointer-events-none" />
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand/40 transition-all rounded-[1.5rem] md:rounded-[3rem] pointer-events-none" />
                         </motion.div>
                         <div className={i % 2 !== 0 ? 'lg:order-first' : ''}>
                            <div className="font-mono text-brand mb-4 text-[10px] tracking-[0.4em] uppercase">Sequence_00{p.id}</div>
                            <h3 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">{p.title}</h3>
                            <p className="text-gray-400 text-sm md:text-lg mb-10 leading-relaxed italic border-l-2 border-brand/20 pl-8">"{p.desc}"</p>
                            <button onClick={() => window.open(p.repo, '_blank')} className="flex items-center gap-4 text-brand font-black uppercase text-xs tracking-widest group">SOURCE_CODE <ChevronRight className="group-hover:translate-x-3 transition-transform" /></button>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>

              {/* EXPERIENCE & INCIDENTS */}
              <section className="mb-40 scroll-mt-24" id="experience">
                 <h2 className="fluid-heading font-black mb-12 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 bg-[length:200%_auto] animate-text-flow">History_<br/>Refactored</h2>
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                       <div className="glass-panel p-10 md:p-14 relative group border-brand/20 bg-brand/5">
                          <div className="flex flex-wrap justify-between items-start mb-8 gap-4">
                             <div className="flex items-center gap-6"><div className="p-4 bg-white/5 rounded-2xl text-brand"><Zap size={24}/></div><h4 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight">Software Architect</h4></div>
                             <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-4 py-1 rounded-full">2024-Present</span>
                          </div>
                          <p className="text-gray-400 text-sm md:text-base leading-relaxed italic">"Bypassed traditional paths due to medical setbacks. Dedicated 14+ hours daily to mastering 3D real-time rendering and RAG pipelines to prove engineering obsession."</p>
                       </div>
                       <div className="glass-panel p-8 border-red-500/20 bg-red-500/5 h-fit">
                          <div className="flex items-center gap-3 text-red-500 font-bold mb-6 uppercase text-xs tracking-widest"><AlertTriangle size={16}/> INCIDENT_POST_MORTEM</div>
                          <h4 className="text-xl font-bold mb-4 uppercase tracking-tighter">Redis Thundering Herd</h4>
                          <p className="text-[11px] text-gray-400 font-mono uppercase leading-relaxed">System-wide 503 outage due to simultaneous cache expiration. Fixed via Probabilistic Early Expiration and Semantic Locking protocols.</p>
                       </div>
                    </div>
                    <div className="glass-panel p-10 flex flex-col justify-center border-accent/20 bg-accent/5">
                       <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Production Readiness</h3>
                       <p className="text-xs text-gray-400 leading-loose uppercase tracking-tighter">I prioritize clean architectural boundaries and 99.9% uptime over feature churn. Code is a liability; systems are assets.</p>
                    </div>
                 </div>
              </section>

              {/* CONTACT */}
              <section className="py-20 lg:py-40 text-center border-t border-white/5 relative" id="contact">
                <h2 className="fluid-heading font-black mb-10 tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-brand via-accent to-brand bg-[length:200%_auto] animate-text-flow">Invite_<br/>Contact</h2>
                <div className="flex flex-col md:flex-row justify-center gap-10 items-center px-4">
                  <a href={`mailto:${data.links.email}`} className="w-full md:w-auto px-16 py-8 bg-brand text-black font-black text-xl rounded-full uppercase tracking-tighter hover:shadow-[0_0_80px_rgba(0,242,234,0.4)] transition-all">Initiate_Protocol</a>
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

      {/* MODALS */}
      <AnimatePresence>
        {activeModal === 'dev' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[10000000] bg-dark/95 backdrop-blur-3xl flex items-center justify-center p-6"><div className="max-w-2xl w-full glass-panel p-10 md:p-16 relative"><button onClick={() => setActiveModal(null)} className="absolute top-10 right-10 text-gray-500 hover:text-brand transition-colors"><X size={32}/></button><Trophy className="text-brand mb-10" size={56} /><h3 className="text-5xl font-black mb-12 tracking-tighter uppercase">Ranking</h3><div className="space-y-10 mt-16 font-mono"><div className="flex justify-between border-b border-white/10 pb-6"><span className="text-xs uppercase text-gray-500">LeetCode Peak</span><span className="text-5xl font-black text-brand">1700+</span></div><div className="grid sm:grid-cols-2 gap-4"><a href={data.links.leetcode} className="py-5 glass-panel text-center text-[10px] font-black uppercase hover:bg-brand/10">LEETCODE</a><a href={data.links.codechef} className="py-5 glass-panel text-center text-[10px] font-black uppercase hover:bg-brand/10">CODECHEF</a></div></div></div></motion.div>
        )}
        {activeModal === 'resume' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[10000000] bg-dark/98 backdrop-blur-3xl p-6 md:p-20 flex flex-col items-center"><div className="w-full h-full max-w-4xl glass-panel relative p-1 overflow-hidden"><button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 z-10 p-3 bg-dark rounded-full text-white border border-white/10"><X size={24}/></button><iframe src="/resume.pdf" className="w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] border-none" title="Resume" /></div><a href="/resume.pdf" download className="mt-8 px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full hover:bg-brand transition-all">Download_PDF</a></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;