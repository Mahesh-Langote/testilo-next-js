'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck, Zap, BarChart3, ChevronRight, ChevronDown,
  Brain, Lock, Globe, ArrowRight, Star, CheckCircle2,
  Users, Clock, TrendingUp, Award, Play, X, Menu
} from 'lucide-react';

// ─── Typewriter Hook ────────────────────────────────────────────────────────
function useTypewriter(words, speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIdx % words.length];
    let timeout;
    if (!isDeleting) {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pause);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length - 1)), speed / 2);
      } else {
        setIsDeleting(false);
        setWordIdx(i => i + 1);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words, speed, pause]);

  return text;
}

// ─── Animated Counter Hook ──────────────────────────────────────────────────
function useCounter(target, duration = 2000, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

// ─── Testimonials Data ──────────────────────────────────────────────────────
const testimonials = [
  { name: 'Dr. Priya Sharma', role: 'Dean of Academics', institution: 'IIT Bombay', text: 'Testilo transformed how we conduct university-wide assessments. The proctoring is seamless and completely invisible to students.', rating: 5 },
  { name: 'Marcus Johnson', role: 'Head of HR Tech', institution: 'TechCorp Global', text: 'We run 500+ technical interviews monthly. Testilo\'s zero-latency grading and anti-cheat systems are best-in-class.', rating: 5 },
  { name: 'Sofia Andrade', role: 'E-Learning Director', institution: 'EduBridge Academy', text: 'The analytics dashboard gives us insights we\'ve never had before. Percentile tracking is a game-changer for educators.', rating: 5 },
  { name: 'Kenji Yamamoto', role: 'CTO', institution: 'LearnAI Platform', text: 'Integrating Testilo\'s API was effortless. We had our entire exam pipeline running in under a day.', rating: 5 },
  { name: 'Aisha Mensah', role: 'Professor of CS', institution: 'University of Ghana', text: 'From 50 students to 5,000 — Testilo scaled with us perfectly. Not a single exam disruption in two years.', rating: 5 },
  { name: 'Carlos Rivera', role: 'Training Manager', institution: 'MedAssess Corp', text: 'Medical licensing exams need 100% integrity. Testilo\'s invisible shield feature gives both institutions and students total confidence.', rating: 5 },
];

// ─── Features Data ──────────────────────────────────────────────────────────
const features = [
  {
    icon: <Zap size={36} />,
    color: '#F59E0B',
    title: 'Silicon-Speed Grading',
    subtitle: '⚡ Instant evaluation engine',
    desc: 'Thousands of submissions graded in milliseconds. Our distributed architecture eliminates latency — scores materialize the instant a student clicks submit.',
    points: ['Sub-50ms response time', 'Parallel batch processing', 'Auto-scaling infrastructure'],
  },
  {
    icon: <ShieldCheck size={36} />,
    color: '#06B6D4',
    title: 'Invisible Shield Proctoring',
    subtitle: '🛡️ Anti-cheat at the core',
    desc: 'Sophisticated behavioral proctoring built directly into the exam layer. Tab switching, screen blur, focus loss — all trigger automatic safeguards.',
    points: ['Tab-switch detection', 'Face presence monitoring', 'Keystroke pattern analysis'],
  },
  {
    icon: <BarChart3 size={36} />,
    color: '#7C3AED',
    title: 'Neural Analytics Engine',
    subtitle: '📊 Intelligence-grade insights',
    desc: 'Dive into structural metrics with precision histograms, global percentile tracking, and seamless Excel exporting. Data clarity as art.',
    points: ['Real-time percentile ranking', 'Cohort performance graphs', 'One-click Excel export'],
  },
  {
    icon: <Lock size={36} />,
    color: '#10B981',
    title: 'Zero-Trust Security',
    subtitle: '🔐 Enterprise compliance ready',
    desc: 'End-to-end encryption, role-based access control, and full GDPR/FERPA compliance. Your data never leaves secured infrastructure.',
    points: ['AES-256 encryption', 'RBAC access control', 'GDPR & FERPA compliant'],
  },
];

// ─── Main Component ─────────────────────────────────────────────────────────
export default function Home() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const mockupRef = useRef(null);
  const statsRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const revealsRef = useRef([]);

  const typedText = useTypewriter(['Assess.', 'Proctor.', 'Analyze.', 'Grade.', 'Succeed.'], 90, 1800);

  const reqCount = useCounter(1000000, 2200, statsInView);
  const educatorCount = useCounter(15000, 2000, statsInView);
  const uptimeCount = useCounter(999, 1800, statsInView);

  // ── Canvas Neural Network ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let nodes = [];
    const NUM_NODES = 80;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < NUM_NODES; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now() / 1000;

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.pulse += 0.02;

        const alpha = 0.5 + Math.sin(n.pulse) * 0.3;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.25;
            const hue = 220 + (now * 10 % 60);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `hsla(${hue}, 70%, 65%, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ── Mouse Parallax on Hero Mockup ────────────────────────────────────────
  useEffect(() => {
    const el = mockupRef.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / rect.height) * -10;
      const ry = ((e.clientX - cx) / rect.width) * 10;
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    };
    const resetTransform = () => {
      el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
    };
    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', resetTransform);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', resetTransform);
    };
  }, []);

  // ── Nav scroll effect ────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Intersection Observers ────────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          setVisibleSections(prev => new Set([...prev, entry.target.dataset.sid]));
        }
      });
    }, { threshold: 0.12 });

    revealsRef.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsInView(true);
    }, { threshold: 0.3 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !revealsRef.current.includes(el)) revealsRef.current.push(el);
  };

  const currentYear = new Date().getFullYear();

  const formatCount = (n) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
    return n.toString();
  };

  return (
    <div className={styles.homeContainer}>

      {/* ── FLOATING NAVBAR ──────────────────────────────────── */}
      <header className={`${styles.header} ${navScrolled ? styles.headerScrolled : ''}`}>
        <nav className={styles.nav}>
          <div className={styles.logoWrapper}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div style={{ position: 'relative', width: 32, height: 32, overflow: 'hidden', borderRadius: '8px' }}>
                <Image src="/logo.png" alt="Testilo" fill style={{ objectFit: 'cover', objectPosition: 'left center' }} />
              </div>
              <span className={styles.logoText}>Testilo</span>
            </Link>
          </div>
          <div className={styles.navLinks}>
            <Link href="#features">Features</Link>
            <Link href="#technology">Technology</Link>
            <Link href="#testimonials">Reviews</Link>
          </div>
          <div className={styles.navCta}>
            <Link href="/login" className={styles.navSignIn}>Sign In</Link>
            <Link href="/register" className={styles.navGetStarted}>Get Started</Link>
          </div>
          <button
            className={styles.menuBtn}
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <Link href="#features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
            <Link href="#technology" onClick={() => setMobileMenuOpen(false)}>Technology</Link>
            <Link href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Reviews</Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
            <Link href="/register" className={styles.mobileGetStarted} onClick={() => setMobileMenuOpen(false)}>Get Started →</Link>
          </div>
        )}
      </header>

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className={styles.hero} ref={heroRef}>
          <canvas ref={canvasRef} className={styles.heroCanvas} />
          <div className={styles.heroGlowOrb1} />
          <div className={styles.heroGlowOrb2} />

          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              Neural Assessment Platform · v3.0
            </div>

            <h1 className={styles.heroHeadline}>
              <span className={styles.heroTyped}>{typedText}</span>
              <span className={styles.heroCursor}>|</span>
              <br />
              <span className={styles.heroStatic}>Intelligently.</span>
            </h1>

            <p className={styles.heroSubtext}>
              The most advanced online exam platform ever engineered.
              <br />
              Proctoring so seamless, students forget it exists.
            </p>

            <div className={styles.heroActions}>
              <Link href="/register" className={styles.btnPrimary}>
                <span>Start for Free</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="#features" className={styles.btnGhost}>
                <Play size={16} fill="currentColor" />
                <span>See How It Works</span>
              </Link>
            </div>

            <div className={styles.heroTrust}>
              <div className={styles.heroTrustItem}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>Free forever plan</span>
              </div>
              <div className={styles.heroTrustItem}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>No credit card required</span>
              </div>
              <div className={styles.heroTrustItem}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>15K+ educators trust us</span>
              </div>
            </div>
          </div>

          {/* Dashboard Mockup */}
          <div className={styles.mockupWrapper} ref={mockupRef}>
            <div className={styles.mockupGlow} />
            <div className={styles.mockupFrame}>
              <div className={styles.mockupBar}>
                <div className={styles.mockupDots}>
                  <span style={{ background: '#FF5F57' }} />
                  <span style={{ background: '#FFBD2E' }} />
                  <span style={{ background: '#28CA41' }} />
                </div>
                <div className={styles.mockupUrl}>testilo.com/dashboard</div>
              </div>
              <div className={styles.mockupBody}>
                <div className={styles.mockupSidebar}>
                  <div className={styles.mockupNavItem + ' ' + styles.active}>
                    <BarChart3 size={14} /> Dashboard
                  </div>
                  <div className={styles.mockupNavItem}>
                    <Brain size={14} /> Exams
                  </div>
                  <div className={styles.mockupNavItem}>
                    <Users size={14} /> Students
                  </div>
                  <div className={styles.mockupNavItem}>
                    <ShieldCheck size={14} /> Proctoring
                  </div>
                </div>
                <div className={styles.mockupMain}>
                  <div className={styles.mockupCards}>
                    <div className={styles.mockupStatCard}>
                      <span className={styles.mockupStatLabel}>Submissions</span>
                      <span className={styles.mockupStatVal}>2,847</span>
                      <span className={styles.mockupStatTrend}>↑ 12%</span>
                    </div>
                    <div className={styles.mockupStatCard}>
                      <span className={styles.mockupStatLabel}>Avg Score</span>
                      <span className={styles.mockupStatVal}>78.4%</span>
                      <span className={styles.mockupStatTrend}>↑ 4.2%</span>
                    </div>
                    <div className={styles.mockupStatCard}>
                      <span className={styles.mockupStatLabel}>Pass Rate</span>
                      <span className={styles.mockupStatVal}>91%</span>
                      <span className={styles.mockupStatTrend}>↑ 7%</span>
                    </div>
                  </div>
                  <div className={styles.mockupChartArea}>
                    <div className={styles.chartBars}>
                      {[40, 70, 55, 80, 65, 90, 75, 85, 60, 95, 70, 88].map((h, i) => (
                        <div key={i} className={styles.chartBar} style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.scrollIndicator}>
            <ChevronDown size={20} />
          </div>
        </section>

        {/* ── MARQUEE STRIP ─────────────────────────────────────── */}
        <div className={styles.marqueeSection}>
          <p className={styles.marqueeLabel}>Trusted by leading institutions worldwide</p>
          <div className={styles.marqueeTrack}>
            <div className={styles.marqueeContent}>
              {['IIT Bombay', 'Stanford Online', 'Coursera Partners', 'NEET Prep Academy', 'TechCorp Global', 'LearnAI Platform', 'EduBridge', 'MedAssess Corp', 'Oxford Digital', 'MIT OpenCourseWare', 'Harvard Extension', 'UPSC Prep Hub'].map((name, i) => (
                <span key={i} className={styles.marqueeChip}>{name}</span>
              ))}
              {['IIT Bombay', 'Stanford Online', 'Coursera Partners', 'NEET Prep Academy', 'TechCorp Global', 'LearnAI Platform', 'EduBridge', 'MedAssess Corp', 'Oxford Digital', 'MIT OpenCourseWare', 'Harvard Extension', 'UPSC Prep Hub'].map((name, i) => (
                <span key={`dup-${i}`} className={styles.marqueeChip}>{name}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── FEATURES STICKY SCROLL ────────────────────────────── */}
        <section className={styles.featuresSection} id="features">
          <div className={styles.featuresSectionHeader} ref={addToRefs} data-sid="fheader">
            <div className={styles.sectionBadge}>Core Capabilities</div>
            <h2 className={styles.sectionTitle}>
              Everything your exams deserve,<br />
              <span className={styles.gradientText}>nothing they don't.</span>
            </h2>
            <p className={styles.sectionSub}>
              Four pillars engineered to transform how institutions assess knowledge at scale.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((f, i) => (
              <div
                key={i}
                className={`${styles.featureCard} ${styles.revealSection} ${activeFeature === i ? styles.featureCardActive : ''}`}
                ref={addToRefs}
                data-sid={`feat${i}`}
                onMouseEnter={() => setActiveFeature(i)}
              >
                <div className={styles.featureCardIcon} style={{ color: f.color, '--glow': f.color + '40' }}>
                  {f.icon}
                </div>
                <div className={styles.featureCardBadge}>{f.subtitle}</div>
                <h3 className={styles.featureCardTitle}>{f.title}</h3>
                <p className={styles.featureCardDesc}>{f.desc}</p>
                <ul className={styles.featurePoints}>
                  {f.points.map((pt, j) => (
                    <li key={j}><CheckCircle2 size={14} color={f.color} /> {pt}</li>
                  ))}
                </ul>
                <div className={styles.featureCardGlow} style={{ background: f.color + '20' }} />
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
        <section className={styles.howSection} id="technology">
          <div className={styles.howHeader} ref={addToRefs} data-sid="how">
            <div className={styles.sectionBadge}>Simple Process</div>
            <h2 className={styles.sectionTitle}>From zero to graded<br /><span className={styles.gradientText}>in under 5 minutes.</span></h2>
          </div>
          <div className={styles.howSteps}>
            {[
              { icon: <Brain size={32} />, step: '01', title: 'Create Your Exam', desc: 'Build multi-format exams — MCQ, descriptive, coding — with our intuitive drag-and-drop builder or AI generation.', color: '#7C3AED' },
              { icon: <Globe size={32} />, step: '02', title: 'Distribute Instantly', desc: 'Share via link, LMS integration, or email. Students join in seconds. Our proctoring activates automatically.', color: '#06B6D4' },
              { icon: <TrendingUp size={32} />, step: '03', title: 'Analyze & Export', desc: 'Scores appear instantly. Deep analytics, percentile rankings, and one-click exports to Excel await.', color: '#10B981' },
            ].map((step, i) => (
              <div key={i} className={`${styles.howStep} ${styles.revealSection}`} ref={addToRefs} data-sid={`step${i}`} style={{ animationDelay: `${i * 0.2}s` }}>
                <div className={styles.howStepNumber}>{step.step}</div>
                <div className={styles.howStepIcon} style={{ color: step.color, boxShadow: `0 0 40px ${step.color}30` }}>
                  {step.icon}
                </div>
                <h3 className={styles.howStepTitle}>{step.title}</h3>
                <p className={styles.howStepDesc}>{step.desc}</p>
                {i < 2 && <div className={styles.howConnector} />}
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS ──────────────────────────────────────────────── */}
        <section className={styles.statsSection} ref={statsRef}>
          <div className={styles.statsGlow} />
          <div className={styles.statsHeader} ref={addToRefs} data-sid="stats">
            <div className={styles.sectionBadge}>By The Numbers</div>
            <h2 className={styles.sectionTitle}>Built to scale.<br /><span className={styles.gradientText}>Proven to perform.</span></h2>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ color: '#F59E0B' }}><Zap size={28} /></div>
              <div className={styles.statValue}>
                {statsInView ? `${formatCount(reqCount)}+` : '—'}
              </div>
              <div className={styles.statLabel}>Requests per Second</div>
              <div className={styles.statDesc}>Distributed edge network handles exam traffic without breaking a sweat</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ color: '#06B6D4' }}><Clock size={28} /></div>
              <div className={styles.statValue}>
                {statsInView ? '< 50ms' : '—'}
              </div>
              <div className={styles.statLabel}>Response Latency</div>
              <div className={styles.statDesc}>Scores appear before the student can blink. Real-time computation at its peak</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ color: '#10B981' }}><Award size={28} /></div>
              <div className={styles.statValue}>
                {statsInView ? `${(uptimeCount / 10).toFixed(1)}%` : '—'}
              </div>
              <div className={styles.statLabel}>Uptime Guaranteed</div>
              <div className={styles.statDesc}>Redundant backups and auto-scaling keep your exams live when it matters most</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ color: '#7C3AED' }}><Users size={28} /></div>
              <div className={styles.statValue}>
                {statsInView ? `${formatCount(educatorCount)}+` : '—'}
              </div>
              <div className={styles.statLabel}>Active Educators</div>
              <div className={styles.statDesc}>Institutions from 50+ countries rely on Testilo for mission-critical assessments</div>
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE TAB SHOWCASE ────────────────────────── */}
        <section className={styles.showcaseSection}>
          <div className={styles.showcaseHeader} ref={addToRefs} data-sid="showcase">
            <div className={styles.sectionBadge}>Platform Tour</div>
            <h2 className={styles.sectionTitle}>A platform that does<br /><span className={styles.gradientText}>the heavy lifting for you.</span></h2>
          </div>
          <div className={styles.showcaseTabs}>
            {['Exam Builder', 'Live Proctoring', 'Analytics Hub'].map((tab, i) => (
              <button key={i} className={`${styles.showcaseTab} ${activeTab === i ? styles.showcaseTabActive : ''}`} onClick={() => setActiveTab(i)}>
                {tab}
              </button>
            ))}
          </div>
          <div className={styles.showcasePanel}>
            {activeTab === 0 && (
              <div className={styles.showcasePanelInner}>
                <div className={styles.showcasePanelLeft}>
                  <h3>Build exam in seconds</h3>
                  <p>Drag, drop, and configure. AI-assisted question generation. Support for MCQ, fill-in, coding, and essay formats.</p>
                  <ul className={styles.showcaseList}>
                    <li><CheckCircle2 size={16} color="#7C3AED" /> AI question generator</li>
                    <li><CheckCircle2 size={16} color="#7C3AED" /> Question bank library</li>
                    <li><CheckCircle2 size={16} color="#7C3AED" /> Custom timer & scoring rules</li>
                    <li><CheckCircle2 size={16} color="#7C3AED" /> Section & chapter grouping</li>
                  </ul>
                  <Link href="/register" className={styles.btnPrimary} style={{ display: 'inline-flex', marginTop: '2rem' }}>
                    Build Your First Exam <ArrowRight size={16} />
                  </Link>
                </div>
                <div className={styles.showcasePanelRight}>
                  <div className={styles.builderMockup}>
                    <div className={styles.builderQuestion}>
                      <div className={styles.builderQTag}>Q1 · MCQ</div>
                      <div className={styles.builderQText}>What is the time complexity of binary search?</div>
                      <div className={styles.builderOptions}>
                        <div className={`${styles.builderOption} ${styles.builderOptionCorrect}`}>O(log n) ✓</div>
                        <div className={styles.builderOption}>O(n)</div>
                        <div className={styles.builderOption}>O(n²)</div>
                        <div className={styles.builderOption}>O(1)</div>
                      </div>
                    </div>
                    <div className={styles.builderAddBtn}>+ Add Question</div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 1 && (
              <div className={styles.showcasePanelInner}>
                <div className={styles.showcasePanelLeft}>
                  <h3>Proctoring that's invisible</h3>
                  <p>Students stay focused. Administrators stay informed. Our AI proctoring engine monitors without disrupting the exam experience.</p>
                  <ul className={styles.showcaseList}>
                    <li><CheckCircle2 size={16} color="#06B6D4" /> Tab-switch auto-lock</li>
                    <li><CheckCircle2 size={16} color="#06B6D4" /> Face presence detection</li>
                    <li><CheckCircle2 size={16} color="#06B6D4" /> Copy-paste prevention</li>
                    <li><CheckCircle2 size={16} color="#06B6D4" /> Anomaly flagging & review</li>
                  </ul>
                  <Link href="/register" className={styles.btnPrimary} style={{ display: 'inline-flex', marginTop: '2rem', '--btn-color': '#06B6D4' }}>
                    Try Proctoring Demo <ArrowRight size={16} />
                  </Link>
                </div>
                <div className={styles.showcasePanelRight}>
                  <div className={styles.proctorMockup}>
                    <div className={styles.proctorHeader}>
                      <span className={styles.proctorLive}><span className={styles.liveDot} /> LIVE</span>
                      <span>Monitoring 342 students</span>
                    </div>
                    <div className={styles.proctorGrid}>
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className={`${styles.proctorCell} ${i === 3 ? styles.flagged : ''}`}>
                          <div className={styles.proctorFace}>{i === 3 ? '⚠️' : '👤'}</div>
                          <div className={styles.proctorStatus}>{i === 3 ? 'FLAGGED' : 'Active'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className={styles.showcasePanelInner}>
                <div className={styles.showcasePanelLeft}>
                  <h3>Data that tells a story</h3>
                  <p>Precision histograms, global percentile tracking, topic mastery heat maps. Export everything to Excel with one click.</p>
                  <ul className={styles.showcaseList}>
                    <li><CheckCircle2 size={16} color="#10B981" /> Real-time score histogram</li>
                    <li><CheckCircle2 size={16} color="#10B981" /> Topic mastery breakdown</li>
                    <li><CheckCircle2 size={16} color="#10B981" /> Global percentile ranking</li>
                    <li><CheckCircle2 size={16} color="#10B981" /> One-click Excel export</li>
                  </ul>
                  <Link href="/register" className={styles.btnPrimary} style={{ display: 'inline-flex', marginTop: '2rem', '--btn-color': '#10B981' }}>
                    Explore Analytics <ArrowRight size={16} />
                  </Link>
                </div>
                <div className={styles.showcasePanelRight}>
                  <div className={styles.analyticsMockup}>
                    <div className={styles.analyticsTitle}>Score Distribution</div>
                    <div className={styles.analyticsHistogram}>
                      {[15, 32, 55, 80, 95, 85, 70, 45, 30, 15].map((h, i) => (
                        <div key={i} className={styles.histBar} style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}>
                          <div className={styles.histLabel}>{(i + 1) * 10}%</div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.analyticsLegend}>
                      <span>0</span><span>Score Range</span><span>100</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────── */}
        <section className={styles.testimonialsSection} id="testimonials">
          <div className={styles.testimonialHeader} ref={addToRefs} data-sid="testi">
            <div className={styles.sectionBadge}>Social Proof</div>
            <h2 className={styles.sectionTitle}>Loved by educators<br /><span className={styles.gradientText}>around the world.</span></h2>
          </div>
          <div className={styles.testimonialTrack}>
            <div className={styles.testimonialScroll}>
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className={styles.testimonialCard}>
                  <div className={styles.testimonialStars}>
                    {[...Array(t.rating)].map((_, s) => <Star key={s} size={14} fill="#F59E0B" color="#F59E0B" />)}
                  </div>
                  <p className={styles.testimonialText}>"{t.text}"</p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.testimonialAvatar}>{t.name.charAt(0)}</div>
                    <div>
                      <div className={styles.testimonialName}>{t.name}</div>
                      <div className={styles.testimonialRole}>{t.role} · {t.institution}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaMesh} />
          <div className={styles.ctaGlow1} />
          <div className={styles.ctaGlow2} />
          <div className={styles.ctaContent} ref={addToRefs} data-sid="cta">
            <div className={styles.sectionBadge}>Get Started Today</div>
            <h2 className={styles.ctaTitle}>
              Join 15,000+ educators<br />
              <span className={styles.gradientText}>redefining assessment.</span>
            </h2>
            <p className={styles.ctaDesc}>
              Free to start. No credit card. Full features available in minutes.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/register" className={styles.btnPrimary}>
                <span>Create Free Account</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/login" className={styles.btnGhost}>
                <span>Sign In</span>
              </Link>
            </div>
            <p className={styles.ctaNote}>✦ Cancel anytime &nbsp;·&nbsp; ✦ Free plan forever &nbsp;·&nbsp; ✦ 5-minute setup</p>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerGradientBorder} />
        <div className={styles.footerWrapper}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '1rem' }}>
                <div style={{ position: 'relative', width: 32, height: 32, overflow: 'hidden', borderRadius: '8px' }}>
                  <Image src="/logo.png" alt="Testilo" fill style={{ objectFit: 'cover', objectPosition: 'left center' }} />
                </div>
                <span className={styles.logoText}>Testilo</span>
              </Link>
              <p className={styles.footerTagline}>The standard for modern educational evaluations. Providing highly resilient online assessments globally.</p>
              <div className={styles.footerSocial}>
                <a href="#" className={styles.socialLink} aria-label="Twitter/X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
              </div>
            </div>
            <div className={styles.footerLinks}>
              <h4>Product</h4>
              <ul>
                <li><Link href="#">Features</Link></li>
                <li><Link href="#">Proctoring Engine</Link></li>
                <li><Link href="#">Security</Link></li>
                <li><Link href="#">Pricing</Link></li>
                <li><Link href="#">Changelog</Link></li>
              </ul>
            </div>
            <div className={styles.footerLinks}>
              <h4>Resources</h4>
              <ul>
                <li><Link href="#">Documentation</Link></li>
                <li><Link href="#">API Reference</Link></li>
                <li><Link href="#">Educator Guides</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="#">Status</Link></li>
              </ul>
            </div>
            <div className={styles.footerLinks}>
              <h4>Company</h4>
              <ul>
                <li><Link href="#">About Us</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Contact</Link></li>
                <li><Link href="#">Privacy Policy</Link></li>
                <li><Link href="#">Terms of Use</Link></li>
              </ul>
            </div>
            <div className={styles.footerNewsletter}>
              <h4>Stay Updated</h4>
              <p>Join our newsletter for the latest platform updates.</p>
              <div className={styles.newsletterInput}>
                <input type="email" placeholder="your@email.com" />
                <button type="button">Subscribe</button>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span>© {currentYear} Testilo Inc. All rights reserved.</span>
            <div className={styles.footerBottomLinks}>
              <Link href="#">Privacy</Link>
              <Link href="#">Terms</Link>
              <Link href="#">Legal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
