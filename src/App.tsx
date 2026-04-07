import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Globe, 
  Cpu, 
  Database, 
  Layers, 
  MessageSquare, 
  Ship, 
  FileText, 
  ExternalLink, 
  ChevronRight, 
  Mail, 
  Github, 
  Linkedin,
  Terminal,
  Code2,
  Workflow,
  Zap,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import GlobalNodeMap from './components/GlobalNodeMap';
import { cn } from './lib/utils';

const revealVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={revealVariants}
    className="mb-12"
  >
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 flex items-center gap-3">
      {children}
      <span className="w-8 h-[2px] bg-electric-indigo"></span>
    </h2>
    {subtitle && <p className="text-white/50 font-mono text-sm uppercase tracking-widest">{subtitle}</p>}
  </motion.div>
);

const ProjectCard = ({ title, description, impact, stack, icon: Icon, link }: any) => (
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={revealVariants}
    className="glass p-6 rounded-2xl group hover:border-electric-indigo/50 transition-all duration-500 flex flex-col h-full"
  >
    <div className="w-12 h-12 rounded-xl bg-electric-indigo/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
      <Icon className="w-6 h-6 text-electric-indigo" />
    </div>
    <h3 className="text-xl font-bold mb-3 group-hover:text-electric-indigo transition-colors flex items-center justify-between">
      {title}
    </h3>
    <p className="text-white/70 mb-4 leading-relaxed flex-grow">{description}</p>
    <div className="bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg p-3 mb-6">
      <p className="text-cyber-blue text-sm font-medium flex items-center gap-2">
        <Zap className="w-4 h-4" />
        Impact: {impact}
      </p>
    </div>
    <div className="flex flex-wrap gap-2 mb-8">
      {stack.map((tech: string) => (
        <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50">
          {tech}
        </span>
      ))}
    </div>
    
    {link && (
      <motion.a 
        href={link.startsWith('http') ? link : `https://${link}`} 
        target="_blank" 
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-auto w-full py-3 bg-white/5 border border-white/10 rounded-xl font-mono text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-electric-indigo hover:border-electric-indigo transition-all duration-300"
      >
        Launch System <ExternalLink className="w-3 h-3" />
      </motion.a>
    )}
  </motion.div>
);

const SkillBadge = ({ name, icon: Icon }: { name: string, icon: any }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="glass glow-hover px-4 py-3 rounded-xl flex items-center gap-3 border border-white/5 cursor-default"
  >
    <Icon className="w-5 h-5 text-cyber-blue" />
    <span className="font-medium text-sm">{name}</span>
  </motion.div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => setIsMenuOpen(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Projects", "#projects"],
    ["Experience", "#experience"],
    ["Education", "#education"]
  ];
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-electric-indigo/30">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-electric-indigo origin-left z-50" style={{ scaleX }} />
      
      {/* Background Elements */}
      <div className="fixed inset-0 grid-overlay pointer-events-none" />
      <div className="fixed inset-0 scanline pointer-events-none" />
      <div className="fixed inset-0 bg-radial-at-t from-electric-indigo/5 via-transparent to-transparent pointer-events-none" />

      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 px-6 py-4 flex justify-center pointer-events-none">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="glass px-4 md:px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-4 md:gap-8 pointer-events-auto shadow-2xl backdrop-blur-xl relative"
        >
          <div className="font-mono text-[10px] tracking-tighter flex items-center gap-2 pr-4 border-r border-white/10">
            <div className="w-2 h-2 rounded-full bg-electric-indigo animate-pulse" />
            PHILA NGCAMU
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(([label, href]) => (
              <a 
                key={label} 
                href={href} 
                className="text-[10px] font-mono uppercase tracking-widest text-white/50 hover:text-electric-indigo transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 pl-0 md:pl-4 border-l-0 md:border-l border-white/10">
            <div className="hidden sm:flex items-center gap-4">
              <a href="https://github.com/PhilaNgcamu" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
              <a href="https://www.linkedin.com/in/philasande-ngcamu-282992207/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block bg-electric-indigo text-white text-[10px] font-mono uppercase tracking-widest px-4 py-2 rounded-lg font-bold hover:bg-electric-indigo/90 transition-all ml-2"
            >
              CV
            </motion.button>

            {/* Hamburger Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white/50 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-obsidian/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 md:hidden shadow-2xl"
            >
              {navLinks.map(([label, href]) => (
                <a 
                  key={label} 
                  href={href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xs font-mono uppercase tracking-widest text-white/70 hover:text-electric-indigo transition-colors py-2 border-b border-white/5 last:border-0"
                >
                  {label}
                </a>
              ))}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10">
                <div className="flex gap-4">
                  <a href="https://github.com/PhilaNgcamu" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                  <a href="https://www.linkedin.com/in/philasande-ngcamu-282992207/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                </div>
                <button className="bg-electric-indigo text-white text-[10px] font-mono uppercase tracking-widest px-4 py-2 rounded-lg font-bold">
                  CV
                </button>
              </div>
            </motion.div>
          )}
        </motion.nav>
      </header>

      <main className="relative z-10">
        {/* Section 1: Hero */}
        <section className="relative min-h-screen flex flex-col justify-center items-start pt-48 px-6 md:pl-48 md:pr-24 xl:px-24 max-w-7xl xl:mx-auto overflow-hidden text-left">
          <GlobalNodeMap />
          
          <div className="max-w-4xl flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-start"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-electric-indigo/10 border border-electric-indigo/20 text-electric-indigo text-xs font-mono mb-6 uppercase tracking-widest">
                Software Architect & AI Specialist
              </span>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                Philasande Ngcamu: <span className="text-gradient">Neural Architect</span>.
              </h1>
              <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl leading-relaxed">
                Software Architect and Full Stack Developer focused on logistics tech, payments, analytics, AI-powered workflow automation, and mobile location-aware applications. I specialise in turning complex processes into measurable revenue streams.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  href="#projects"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-electric-indigo rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-electric-indigo/90 transition-all shadow-lg shadow-electric-indigo/20"
                >
                  View Systems <ChevronRight className="w-4 h-4" />
                </motion.a>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border border-white/10 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
                >
                  Download CV <FileText className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Scroll to explore</span>
            <div className="w-[1px] h-12 bg-linear-to-b from-electric-indigo to-transparent" />
          </motion.div>
        </section>

        {/* Section 2: About */}
        <section id="about" className="py-32 px-6 md:pl-48 md:pr-24 xl:px-24 max-w-7xl xl:mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
            >
              <SectionHeading subtitle="The Narrative">About Me</SectionHeading>
              <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                <p>
                  I am a Software Developer and AI Automation Specialist currently optimising complex enterprise operations at <span className="text-white font-medium">Land and Sea Shipping</span>.
                </p>
                <p>
                  While completing my BSc in Mathematics and Computer Science at <span className="text-white font-medium">UNISA</span>, I spend my days (and nights) engineering autonomous workflows that replace manual bottlenecks with intelligent agents.
                </p>
                <p>
                  I don't just write code; I design systems that think, communicate, and scale. My focus is on creating <span className="text-electric-indigo font-medium italic">resilient orchestration</span> that delivers measurable ROI in high-stakes environments like enterprise operations and complex systems.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="relative"
            >
              <div className="aspect-square rounded-3xl glass overflow-hidden relative group">
                <div className="absolute inset-0 bg-linear-to-br from-electric-indigo/20 to-cyber-blue/20 group-hover:opacity-0 transition-opacity duration-700" />
                <img 
                  src="https://picsum.photos/seed/tech-abstract/800/800" 
                  alt="Tech Visualisation" 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border-[20px] border-obsidian/50" />
                <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-electric-indigo/50" />
                <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-cyber-blue/50" />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl border-electric-indigo/30 shadow-2xl">
                <div className="text-3xl font-bold text-electric-indigo mb-1">90%</div>
                <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Error Rate Reduction</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Skills */}
        <section id="skills" className="py-32 px-6 md:pl-48 md:pr-24 xl:px-24 bg-white/2">
          <div className="max-w-7xl xl:mx-auto">
            <SectionHeading subtitle="The Toolkit">Core Competencies</SectionHeading>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="space-y-4"
              >
                <h4 className="font-mono text-xs text-electric-indigo uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> AI & Automation
                </h4>
                <div className="flex flex-col gap-3">
                  <SkillBadge name="n8n Mastery" icon={Workflow} />
                  <SkillBadge name="Vertex AI" icon={Zap} />
                  <SkillBadge name="RAG Architectures" icon={Database} />
                  <SkillBadge name="Agentic Workflows" icon={Layers} />
                  <SkillBadge name="LangChain" icon={Code2} />
                </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="space-y-4"
              >
                <h4 className="font-mono text-xs text-cyber-blue uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Database className="w-4 h-4" /> Backend & Data
                </h4>
                <div className="flex flex-col gap-3">
                  <SkillBadge name="Python (FastAPI)" icon={Terminal} />
                  <SkillBadge name="TypeScript" icon={Code2} />
                  <SkillBadge name="PostgreSQL" icon={Database} />
                  <SkillBadge name="Supabase" icon={Layers} />
                  <SkillBadge name="SQL Optimisation" icon={Zap} />
                </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="space-y-4"
              >
                <h4 className="font-mono text-xs text-electric-indigo uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Integration
                </h4>
                <div className="flex flex-col gap-3">
                  <SkillBadge name="WhatsApp API" icon={MessageSquare} />
                  <SkillBadge name="PayFast Gateway" icon={Zap} />
                  <SkillBadge name="OAuth 2.0" icon={Layers} />
                  <SkillBadge name="Jira Automation" icon={Workflow} />
                  <SkillBadge name="Microsoft Azure" icon={Globe} />
                </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="space-y-4"
              >
                <h4 className="font-mono text-xs text-cyber-blue uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Cloud & DevOps
                </h4>
                <div className="flex flex-col gap-3">
                  <SkillBadge name="Google Cloud" icon={Globe} />
                  <SkillBadge name="Docker" icon={Layers} />
                  <SkillBadge name="CI/CD Pipelines" icon={Workflow} />
                  <SkillBadge name="Microservices" icon={Cpu} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 4: Featured Projects */}
        <section id="projects" className="py-32 px-6 md:pl-48 md:pr-24 xl:px-24 max-w-7xl xl:mx-auto">
          <SectionHeading subtitle="The Proof">Featured Systems</SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            <ProjectCard 
              title="Zipi Driver App"
              description="An 'Uber-like' logistics ecosystem connecting cargo owners and fleet managers, featuring a React Native driver application for real-time shipment tracking and precise geolocation."
              impact="Provided cargo owners and fleet managers with 100% real-time visibility into shipment status and driver whereabouts."
              stack={["React Native", "Google Maps", "Location Services", "TypeScript"]}
              icon={Globe}
            />
            <ProjectCard 
              title="Zipi Newsletter Frontend"
              description="High-performance Next.js web experience for Zipi’s campaign platform, focused on high-conversion content delivery and brand consistency."
              impact="Streamlined campaign delivery and improved mobile engagement for Zipi's newsletter."
              stack={["Next.js", "Tailwind CSS", "Responsive Design", "TypeScript"]}
              icon={Layers}
              link="newsletter.zipi.co.za"
            />
            <ProjectCard 
              title="Secure Payment Orchestration"
              description="Production PayFast gateway integration in Next.js with IPN callback handling, signature verification, and PCI-DSS compliance."
              impact="Ensured 100% payment reliability and secure redirect flows."
              stack={["Next.js", "TypeScript", "PayFast", "PCI-DSS"]}
              icon={Zap}
            />
            <ProjectCard 
              title="Land and Sea Shipping Website"
              description="Redesigned and optimised the core enterprise web presence, focusing on performance, modern aesthetics, and seamless user journeys."
              impact="Enhanced brand authority, significantly improved page load speeds, and integrated a WhatsApp RAG chatbot for real-time support."
              stack={["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"]}
              icon={Ship}
              link="landsea.co.za"
            />
            <ProjectCard 
              title="Autonomous Interaction Agent"
              description="A multi-channel WhatsApp bot using Vertex AI that allows clients to track orders, request quotes, and upload documents via natural language."
              impact="Reduced manual customer service inquiries by 40%."
              stack={["Python", "Supabase", "WhatsApp API", "n8n"]}
              icon={MessageSquare}
            />
            <ProjectCard 
              title="Enterprise RAG Assistant"
              description="A private LLM interface trained on internal SOPs and compliance documents to assist staff with complex operational queries."
              impact="Automated 1,000+ internal compliance checks monthly."
              stack={["Vertex AI", "Vector Embeddings", "n8n"]}
              icon={Database}
            />
          </div>
        </section>

        {/* Section: Certifications & Awards */}
        <section className="py-32 px-6 md:pl-48 md:pr-24 xl:px-24 bg-white/2">
          <div className="max-w-7xl xl:mx-auto">
            <SectionHeading subtitle="The Credentials">Certifications & Awards</SectionHeading>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="space-y-4"
              >
                <h4 className="font-mono text-xs text-electric-indigo uppercase tracking-widest mb-6">Certifications</h4>
                <div className="space-y-3">
                  {[
                    "Infrastructure and Application Modernisation with Google Cloud",
                    "Exploring Data Transformation with Google Cloud",
                    "Digital Transformation with Google Cloud",
                    "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
                    "Google Cloud Fundamentals: Core Infrastructure",
                    "Introduction to Generative AI (Google Cloud)",
                    "Accenture Digital Skills: User Experience",
                    "National Certificate in IT: Systems Development (MICT SETA)",
                    "UMUZI Certification Of Completion (React & React Native)"
                  ].map((cert) => (
                    <div key={cert} className="glass p-4 rounded-xl flex items-center gap-3 border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-cyber-blue" />
                      <span className="text-sm text-white/70">{cert}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="space-y-4"
              >
                <h4 className="font-mono text-xs text-cyber-blue uppercase tracking-widest mb-6">Honours & Awards</h4>
                <div className="glass p-6 rounded-2xl border-cyber-blue/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyber-blue/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-cyber-blue" />
                    </div>
                    <div>
                      <h5 className="font-bold">Investec Promaths Awards</h5>
                      <p className="text-xs text-white/50">Excellence in Mathematics & Science</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Achieved an 81% pass in Physical Sciences and received an award for the matric year.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section: Volunteering */}
        <section className="py-32 px-6 md:pl-48 md:pr-24 xl:px-24 max-w-7xl xl:mx-auto">
          <SectionHeading subtitle="Social Impact">Volunteering</SectionHeading>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="glass p-8 rounded-3xl border-electric-indigo/20"
          >
            <div className="flex flex-col items-start mb-6 gap-4">
              <div>
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  Full Stack Developer
                  <a 
                    href="https://shipwreckers.co.za" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/30 hover:text-electric-indigo transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </h3>
                <p className="text-electric-indigo font-medium">Shipwreckers (Social Services)</p>
              </div>
              <span className="font-mono text-sm text-white/40 bg-white/5 px-3 py-1 rounded-full">Jun 2024 — Present</span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Driving engagement and financial support for Shipwreckers, helping raise over <span className="text-white font-bold">R350,000</span> in charitable contributions for the South African freight and logistics community.
            </p>
            <ul className="grid md:grid-cols-2 gap-4 text-sm text-white/60">
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-electric-indigo shrink-0" /> Optimised UX/UI for frictionless donor journeys.</li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-electric-indigo shrink-0" /> Maintained component libraries for frontend consistency.</li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-electric-indigo shrink-0" /> Integrated PayFast for secure charitable payments.</li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-electric-indigo shrink-0" /> Deployed Google Analytics for data-driven insights.</li>
            </ul>
          </motion.div>
        </section>

        {/* Section 5: Experience */}
        <section id="experience" className="py-32 px-6 md:pl-48 md:pr-24 xl:px-24">
          <div className="max-w-7xl xl:mx-auto">
            <SectionHeading subtitle="The Impact">Professional Journey</SectionHeading>
            
            <div className="space-y-12">
              {[
                {
                  role: "Software Architect",
                  company: "Land and Sea Shipping",
                  period: "Jan 2026 — Present",
                  details: [
                    "Leading technical architecture and system design for enterprise-scale logistics platforms.",
                    "Designing resilient orchestration layers using n8n and Vertex AI to automate high-stakes business processes.",
                    "Developed the Driver App for Zipi in React Native and the frontend for newsletter.zipi.co.za, building responsive web experiences for campaign platforms."
                  ]
                },
                {
                  role: "Software Developer",
                  company: "Land and Sea Shipping",
                  period: "Aug 2025 — Jan 2026",
                  details: [
                    "Integrated Google Analytics for comprehensive tracking and data-driven insights into user behaviour.",
                    "Refined PayFast payment gateway integration in Next.js, ensuring PCI-DSS compliance.",
                    "Engineered complex Jira automation workflows using smart values and CRON triggers to reduce manual workload."
                  ]
                },
                {
                  role: "Junior Software Developer",
                  company: "Land and Sea Shipping",
                  period: "June 2024 — Aug 2025",
                  details: [
                    "Developed mobile and web applications with a focus on UI/UX design and functional components.",
                    "Provided technical support for internal systems, resolving domain and performance issues.",
                    "Managed Rocketseed email configurations and Yaxxa VoIP system support."
                  ]
                },
                {
                  role: "Full Stack Developer Intern / Trainee",
                  company: "Umuzi.org",
                  period: "Nov 2021 — March 2024",
                  details: [
                    "Collaborated with agile teams to develop full-stack applications and participate in code reviews.",
                    "Engaged in real-world projects to develop problem-solving skills and teamwork.",
                    "Received mentorship and support for job placements and industry best practices."
                  ]
                }
              ].map((exp, idx) => (
                <motion.div 
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={revealVariants}
                  className="relative pl-8 border-l border-white/10"
                >
                  <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-electric-indigo" />
                  <div className="flex flex-col items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-2xl font-bold">{exp.role}</h3>
                      <p className="text-electric-indigo font-medium">{exp.company}</p>
                    </div>
                    <span className="font-mono text-sm text-white/40 bg-white/5 px-3 py-1 rounded-full">{exp.period}</span>
                  </div>
                  <ul className="space-y-4 text-white/60 max-w-3xl">
                    {exp.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex gap-3">
                        <ChevronRight className="w-5 h-5 text-electric-indigo shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Education */}
        <section id="education" className="py-32 px-6 md:pl-48 md:pr-24 xl:px-24 max-w-7xl xl:mx-auto">
          <SectionHeading subtitle="The Foundation">Education</SectionHeading>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="glass p-8 rounded-3xl max-w-3xl"
          >
            <div className="flex flex-col items-start gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">BSc Mathematics and Computer Science</h3>
                <p className="text-cyber-blue font-medium mb-4">University of South Africa (UNISA)</p>
                <div className="flex flex-wrap gap-3 mb-4">
                  {["Linear Algebra", "Discrete Mathematics", "Data Structures", "Algorithms"].map(topic => (
                    <span key={topic} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/50">
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 glass p-4 rounded-xl border-white/5">
                  <div className="w-2 h-2 rounded-full bg-electric-indigo animate-pulse" />
                  <span className="text-sm font-medium">Unisa Developer Society Member</span>
                </div>
              </div>
              <div className="text-left">
                <span className="font-mono text-sm text-white/40 block mb-1">Jan 2025 — Dec 2027</span>
                <span className="text-xs text-white/30 italic">Optimising for grit and self-discipline</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-24 px-6 md:pl-48 md:pr-24 xl:px-24 border-t border-white/5">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="max-w-7xl xl:mx-auto flex flex-col gap-12"
          >
            <div>
              <h2 className="text-4xl font-bold mb-6">Let's build the <span className="text-gradient">future</span> of autonomous systems.</h2>
              <p className="text-white/50 mb-8 max-w-md">Currently open to full stack roles and collaborations on agentic workflows and RAG systems across all high-demand sectors.</p>
              <div className="flex gap-4">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  href="mailto:philasandengcamu.pn@gmail.com"
                  className="px-6 py-3 bg-white text-obsidian rounded-xl font-bold flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Contact Me
                </motion.a>
                <div className="flex gap-2">
                  <a href="https://github.com/PhilaNgcamu" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-white/5 transition-all"><Github className="w-5 h-5" /></a>
                  <a href="https://www.linkedin.com/in/philasande-ngcamu-282992207/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-white/5 transition-all"><Linkedin className="w-5 h-5" /></a>
                </div>
              </div>
            </div>
            <div className="text-left font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] space-y-2">
              <p>© 2026 PHILASANDE NGCAMU</p>
              <p>NEURAL SYSTEMS ARCHITECTURES</p>
              <p>BUILT IN JOHANNESBURG, SA</p>
            </div>
          </motion.div>
        </footer>
      </main>
    </div>
  );
}
