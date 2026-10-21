import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const iconShapes = {
  ArrowDown: <path d="M12 4v16m-7-7 7 7 7-7" />,
  ArrowLeft: <path d="M19 12H5m7 7-7-7 7-7" />,
  ArrowRight: <path d="M5 12h14m-7-7 7 7-7 7" />,
  ArrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  BookOpen: <><path d="M12 7v14" /><path d="M3 18V5a1 1 0 0 1 1-1h4a4 4 0 0 1 4 4 4 4 0 0 1 4-4h4a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4a4 4 0 0 0-4 2 4 4 0 0 0-4-2H4a1 1 0 0 1-1-1Z" /></>,
  Check: <path d="m5 12 4 4L19 6" />,
  ChevronDown: <path d="m6 9 6 6 6-6" />,
  CircleHelp: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9a2.5 2.5 0 1 1 4.7 1.2c-.8 1.3-2.3 1.5-2.3 3.3m0 3h.01" /></>,
  Github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.7A5.2 5.2 0 0 0 18.8 4a4.8 4.8 0 0 0-.1-3S17.5.7 15 2.4a13.5 13.5 0 0 0-7 0C5.5.7 4.3 1 4.3 1a4.8 4.8 0 0 0-.1 3 5.2 5.2 0 0 0-1.4 3.8c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.6V21" transform="translate(2 1) scale(.86)" /></>,
  GraduationCap: <><path d="m2 10 10-6 10 6-10 6-10-6Z" /><path d="M6 12v5c4 3 8 3 12 0v-5m4-2v6" /></>,
  Keyboard: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 15h8" /></>,
  Linkedin: <><path d="M4 9v11M4 4v.01M9 20v-7a4 4 0 0 1 8 0v7m-8-7v7" /><circle cx="4" cy="5" r="1" /></>,
  Mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  Moon: <path d="M20.8 13A8.5 8.5 0 0 1 11 3.2 8.5 8.5 0 1 0 20.8 13Z" />,
  Search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
  Sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
  X: <path d="m18 6-12 12M6 6l12 12" />,
};

function Icon({ name, size = 18, strokeWidth = 1.7, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>{iconShapes[name]}</svg>;
}

const ArrowDown = (props) => <Icon name="ArrowDown" {...props} />;
const ArrowLeft = (props) => <Icon name="ArrowLeft" {...props} />;
const ArrowRight = (props) => <Icon name="ArrowRight" {...props} />;
const ArrowUpRight = (props) => <Icon name="ArrowUpRight" {...props} />;
const BookOpen = (props) => <Icon name="BookOpen" {...props} />;
const Check = (props) => <Icon name="Check" {...props} />;
const ChevronDown = (props) => <Icon name="ChevronDown" {...props} />;
const CircleHelp = (props) => <Icon name="CircleHelp" {...props} />;
const Github = (props) => <Icon name="Github" {...props} />;
const GraduationCap = (props) => <Icon name="GraduationCap" {...props} />;
const Keyboard = (props) => <Icon name="Keyboard" {...props} />;
const Linkedin = (props) => <Icon name="Linkedin" {...props} />;
const Mail = (props) => <Icon name="Mail" {...props} />;
const Moon = (props) => <Icon name="Moon" {...props} />;
const Search = (props) => <Icon name="Search" {...props} />;
const Sun = (props) => <Icon name="Sun" {...props} />;
const X = (props) => <Icon name="X" {...props} />;

const sections = [
  { id: 'about', label: 'About', key: '1' },
  { id: 'projects', label: 'Projects', key: '2' },
  { id: 'interests', label: 'Interests', key: '3' },
  { id: 'contact', label: 'Contact', key: '4' },
];

const projects = [
  {
    id: 'maargai',
    number: '01',
    name: 'MaargAI',
    label: 'Google Solution Challenge · 2026',
    summary: 'A resilient routing engine for decisions that need to keep moving.',
    color: 'sage',
    mark: 'M',
    tags: ['Node.js', 'PostgreSQL', 'C++', 'Firebase', 'Docker'],
    detail:
      'A fault-tolerant backend that processes live GPS, traffic and environmental data to flag risks and route decisions. I worked on concurrent data streams, an agent workflow for multi-variable constraints, real-time sync, and secure deployment.',
    points: [
      'Built an autonomous reasoning flow that uses tools to evaluate changing constraints.',
      'Designed an ACID-compliant PostgreSQL schema and low-latency client synchronization.',
      'Containerized services with Docker and deployed on Google Cloud Run.',
    ],
  },
  {
    id: 'ecoagent',
    number: '02',
    name: 'ecoAgent',
    label: 'MumbaiHacks · 2025',
    summary: 'An ESG analytics platform for making emissions data easier to inspect.',
    color: 'sand',
    mark: 'e',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'pgvector', 'React'],
    detail:
      'An enterprise-oriented platform for estimating and aggregating Scope 1, 2 and 3 emissions. The product pairs auditable data ingestion with a dashboard for exploring metrics, confidence intervals and category-level risk.',
    points: [
      'Created a PostgreSQL vector-search pipeline for contextual queries.',
      'Added automated ingestion and validation to reduce inconsistent entries.',
      'Built a React dashboard with metric breakdowns and confidence intervals.',
    ],
  },
];

const skillGroups = [
  { title: 'Languages & foundations', items: ['C++', 'JavaScript', 'Python', 'SQL', 'Data structures', 'OOP'] },
  { title: 'Backend & systems', items: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'Concurrency', 'Microservices'] },
  { title: 'Data & storage', items: ['PostgreSQL', 'Firebase', 'pgvector', 'Query optimization'] },
  { title: 'Tools & frontend', items: ['React', 'React Native', 'Tailwind CSS', 'Docker', 'Linux', 'Git', 'CI/CD', 'Cloud Run', 'OAuth 2.0'] },
];

const books = [
  { title: 'Rework', author: 'Jason Fried & David Heinemeier Hansson', isbn: '9780307463746' },
  { title: 'The Mom Test', author: 'Rob Fitzpatrick', isbn: '9781492180746' },
  { title: '$100M Offers', author: 'Alex Hormozi', isbn: '9781737475736' },
  { title: "Don't Sweat the Small Stuff", author: 'Richard Carlson', isbn: '9780786881857' },
  { title: 'The 7 Habits of Highly Effective People', author: 'Stephen R. Covey', isbn: '9780743269513' },
  { title: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292' },
  { title: 'Zero to One', author: 'Peter Thiel with Blake Masters', isbn: '9780804139298' },
  { title: 'The Psychology of Money', author: 'Morgan Housel', isbn: '9780857197689' },
];

function useStoredPreference(key, fallback) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored === null ? fallback : stored === 'true';
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, String(value)); } catch { /* Preferences are optional. */ }
  }, [key, value]);
  return [value, setValue];
}

function useReducedMotionDefault() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true">AT<span>.</span></span>;
}

function Intro({ onComplete, motionOff }) {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    if (motionOff) {
      onComplete();
      return undefined;
    }
    const start = performance.now();
    let frame;
    const update = (now) => {
      const amount = Math.min(100, Math.round(((now - start) / 660) * 100));
      setProgress(amount);
      if (amount < 100) frame = requestAnimationFrame(update);
      else window.setTimeout(onComplete, 70);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [motionOff, onComplete]);

  return (
    <div className="intro-screen" role="status" aria-label="Opening Anush's profile">
      <div className="intro-inner">
        <BrandMark />
        <p className="eyebrow">PERSONAL PROFILE · MUMBAI, INDIA</p>
        <p className="intro-line">Waking up the profile<span className="blink">_</span></p>
        <div className="intro-track"><span style={{ width: `${progress}%` }} /></div>
        <div className="intro-meta"><span>ANUSH TIKOO</span><span>{String(progress).padStart(2, '0')}%</span></div>
        <button className="intro-skip" onClick={onComplete}>Skip intro <ArrowRight size={14} /></button>
      </div>
    </div>
  );
}

function Modal({ title, eyebrow, children, onClose, wide = false }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = oldOverflow; };
  }, []);

  const trapTab = (event) => {
    if (event.key !== 'Tab') return;
    const focusable = [...event.currentTarget.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section
        className={`dialog-card ${wide ? 'dialog-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onKeyDown={trapTab}
        tabIndex={-1}
      >
        <div className="dialog-top">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 id="dialog-title">{title}</h2>
          </div>
          <button className="icon-button dialog-close" ref={closeRef} onClick={onClose} aria-label="Close dialog"><X size={19} /></button>
        </div>
        {children}
      </section>
    </div>
  );
}

function ProjectDialog({ project, onClose, onMove }) {
  return (
    <Modal
      title={project.name}
      eyebrow={`${project.number} / PROJECT FILE · ${project.label}`}
      onClose={onClose}
      wide
    >
      <div className="project-detail">
        <p className="project-detail-lede">{project.summary}</p>
        <p className="project-detail-copy">{project.detail}</p>
        <ul className="detail-points">
          {project.points.map((point) => <li key={point}><span className="list-dot" />{point}</li>)}
        </ul>
        <div className="tag-list detail-tags">
          {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        <div className="dialog-footer">
          <button className="text-button" onClick={() => onMove(-1)}><ArrowLeft size={15} /> Previous project</button>
          <button className="text-button" onClick={() => onMove(1)}>Next project <ArrowRight size={15} /></button>
        </div>
      </div>
    </Modal>
  );
}

function SearchDialog({ onClose, onSelect }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const items = useMemo(() => {
    const all = [
      ...sections.map((section) => ({ title: section.label, meta: `Jump to ${section.label.toLowerCase()}`, section: section.id, terms: section.label })),
      ...projects.map((project) => ({ title: project.name, meta: project.label, project, terms: `${project.name} ${project.label} ${project.summary} ${project.tags.join(' ')}` })),
      { title: 'Skills & tools', meta: 'C++, Python, React, PostgreSQL and more', section: 'about', terms: 'skills tools languages technologies' },
      { title: 'Chess & table tennis', meta: 'The side quests', section: 'interests', terms: 'chess chess.com table tennis ping pong sport' },
      ...books.map((book) => ({ title: book.title, meta: book.author, section: 'interests', terms: `${book.title} ${book.author} reading books` })),
      { title: 'Email Anush', meta: 'anush.tikoo@gmail.com', section: 'contact', terms: 'email contact mail' },
    ];
    const normalized = query.trim().toLowerCase();
    return (normalized ? all.filter((item) => item.terms.toLowerCase().includes(normalized)) : all.slice(0, 7)).slice(0, 8);
  }, [query]);

  useEffect(() => inputRef.current?.focus(), []);
  useEffect(() => setSelected(0), [query]);

  const keySelect = (event) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); setSelected((index) => (index + 1) % items.length); }
    if (event.key === 'ArrowUp') { event.preventDefault(); setSelected((index) => (index - 1 + items.length) % items.length); }
    if (event.key === 'Enter' && items[selected]) { event.preventDefault(); onSelect(items[selected]); }
  };

  return (
    <Modal title="Find something" eyebrow="PROFILE SEARCH · TYPE TO FILTER" onClose={onClose}>
      <div className="search-input-wrap"><Search size={18} /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={keySelect} placeholder="Projects, skills, books…" aria-label="Search the profile" /></div>
      {items.length ? (
        <div className="search-results" role="listbox" aria-label="Search results">
          {items.map((item, index) => (
            <button className={`search-result ${selected === index ? 'selected' : ''}`} key={`${item.title}-${item.meta}`} onMouseEnter={() => setSelected(index)} onClick={() => onSelect(item)} role="option" aria-selected={selected === index}>
              <span className="search-result-copy"><strong>{item.title}</strong><small>{item.meta}</small></span><ArrowUpRight size={16} />
            </button>
          ))}
        </div>
      ) : <p className="empty-state">No matches yet. Try “projects”, “chess” or a skill.</p>}
      <div className="search-hint"><span><kbd>↑</kbd> <kbd>↓</kbd> to move</span><span><kbd>↵</kbd> to open</span><span><kbd>Esc</kbd> to close</span></div>
    </Modal>
  );
}

function HelpDialog({ onClose }) {
  const shortcuts = [
    ['1 — 4', 'Jump to a section'],
    ['/', 'Search the profile'],
    ['T', 'Switch light / dark theme'],
    ['← / →', 'Move between project notes'],
    ['Esc', 'Close a dialog'],
    ['?', 'Show this shortcut guide'],
  ];
  return (
    <Modal title="A few useful keys" eyebrow="QUICK GUIDE · OPTIONAL SHORTCUTS" onClose={onClose}>
      <div className="shortcut-list">
        {shortcuts.map(([key, action]) => <div className="shortcut-row" key={key}><span>{action}</span><kbd>{key}</kbd></div>)}
      </div>
      <p className="dialog-note">Everything works with a pointer too. Use <kbd>Tab</kbd> to move between controls.</p>
    </Modal>
  );
}

function ProjectCard({ project, onClick }) {
  return (
    <button className="project-card" onClick={onClick} aria-label={`Open ${project.name} project details`}>
      <div className={`project-stamp ${project.color}`}><span>{project.mark}</span><i>{project.number}</i></div>
      <div className="project-main">
        <div className="project-title-line"><div><p className="project-label">{project.label}</p><h3>{project.name}</h3></div><span className="open-project"><ArrowUpRight size={18} /></span></div>
        <p className="project-summary">{project.summary}</p>
        <div className="tag-list">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      </div>
      <span className="card-index">{project.number}</span>
    </button>
  );
}

function BookCard({ book, index }) {
  const [failed, setFailed] = useState(false);
  return (
    <article className="book-card" style={{ '--book-index': index }}>
      <div className="book-cover-wrap">
        {!failed && <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false`} alt={`Cover of ${book.title}`} loading="lazy" onLoad={(event) => { if (event.currentTarget.naturalWidth <= 1) setFailed(true); }} onError={() => setFailed(true)} />}
        {failed && <div className="cover-fallback" aria-label={`Cover placeholder for ${book.title}`}><span className="fallback-rule" /><strong>{book.title}</strong><small>{book.author}</small><span className="fallback-mark">AT / SHELF</span></div>}
      </div>
      <div className="book-info"><p className="book-index">READING LOG · {String(index + 1).padStart(2, '0')}</p><h3>{book.title}</h3><p className="book-author">{book.author}</p></div>
    </article>
  );
}

function App() {
  const [introVisible, setIntroVisible] = useState(false);
  const [theme, setTheme] = useStoredPreference('anush-theme-v2', true);
  const [motionOff, setMotionOff] = useStoredPreference('anush-motion-off', useReducedMotionDefault());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [activeSection, setActiveSection] = useState('about');
  const [visited, setVisited] = useState(() => new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const previousFocus = useRef(null);
  const introCompleted = useCallback(() => {
    setIntroVisible(false);
    try { sessionStorage.setItem('anush-intro-seen', 'true'); } catch { /* The intro is optional. */ }
  }, []);

  useEffect(() => {
    try { setIntroVisible(!sessionStorage.getItem('anush-intro-seen') && !motionOff && !useReducedMotionDefault()); }
    catch { setIntroVisible(false); }
  }, [motionOff]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme ? 'dark' : 'light';
    document.documentElement.dataset.motion = motionOff ? 'off' : 'on';
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = theme ? '#161715' : '#f5f4ef';
  }, [theme, motionOff]);

  useEffect(() => {
    const targets = sections.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        setActiveSection(visible.target.id);
        setVisited((current) => new Set([...current, visible.target.id]));
      }
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.1, 0.35, 0.6] });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (introVisible) {
        if (event.key === 'Escape' || event.key === 'Enter') introCompleted();
        return;
      }
      if (dialog) {
        if (event.key === 'Escape') { event.preventDefault(); setDialog(null); }
        return;
      }
      if (activeProject) {
        if (event.key === 'Escape') { event.preventDefault(); setActiveProject(null); }
        if (event.key === 'ArrowRight') { event.preventDefault(); moveProject(1); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); moveProject(-1); }
        return;
      }
      const target = event.target;
      const typing = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === '/' ) { event.preventDefault(); previousFocus.current = target; setDialog('search'); }
      if (event.key === '?') { event.preventDefault(); previousFocus.current = target; setDialog('help'); }
      if (event.key.toLowerCase() === 't') toggleTheme();
      const section = sections[Number(event.key) - 1];
      if (section) document.getElementById(section.id)?.scrollIntoView({ behavior: motionOff ? 'instant' : 'smooth' });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  useEffect(() => {
    if (!dialog && !activeProject && previousFocus.current instanceof HTMLElement) {
      previousFocus.current.focus?.();
      previousFocus.current = null;
    }
  }, [dialog, activeProject]);

  const announce = (message, action = null) => {
    window.clearTimeout(toastTimer.current);
    setToast({ message, action });
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
  };

  const toggleTheme = () => {
    const next = !theme;
    setTheme(next);
    announce(`${next ? 'Dark' : 'Light'} theme on.`, { label: 'Undo', run: () => { setTheme(!next); announce(`${!next ? 'Dark' : 'Light'} theme restored.`); } });
  };

  const openProject = (project) => {
    previousFocus.current = document.activeElement;
    setDialog(null);
    setActiveProject(project);
  };

  const moveProject = (delta) => {
    const current = projects.findIndex((item) => item.id === activeProject?.id);
    const next = (current + delta + projects.length) % projects.length;
    setActiveProject(projects[next]);
  };

  const closeDialog = () => setDialog(null);
  const selectSearchItem = (item) => {
    setDialog(null);
    if (item.project) {
      window.setTimeout(() => openProject(item.project), 80);
      return;
    }
    window.setTimeout(() => document.getElementById(item.section)?.scrollIntoView({ behavior: motionOff ? 'instant' : 'smooth' }), 50);
  };

  const copyEmail = async () => {
    const email = 'anush.tikoo@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      announce('Email address copied.');
    } catch {
      const field = document.createElement('textarea');
      field.value = email;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      announce(copied ? 'Email address copied.' : 'Copy failed — email: anush.tikoo@gmail.com');
    }
  };

  const openSearch = () => { previousFocus.current = document.activeElement; setDialog('search'); setSettingsOpen(false); };
  const openHelp = () => { previousFocus.current = document.activeElement; setDialog('help'); setSettingsOpen(false); };

  return (
    <>
      <div className="scroll-track" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
      <header className="site-header">
        <a href="#about" className="brand-link" aria-label="Anush Tikoo, go to About"><BrandMark /><span className="brand-name">ANUSH TIKOO</span></a>
        <nav className="main-nav" aria-label="Main navigation">
          {sections.map((section) => <a key={section.id} href={`#${section.id}`} className={activeSection === section.id ? 'active' : ''} aria-current={activeSection === section.id ? 'location' : undefined}><span className="nav-key">{section.key}</span>{section.label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="header-search" onClick={openSearch} aria-label="Search profile"><Search size={15} /><span>Search</span><kbd>/</kbd></button>
          <div className="settings-wrap">
            <button className="icon-button preferences-trigger" onClick={() => setSettingsOpen((open) => !open)} aria-expanded={settingsOpen} aria-label="Display preferences">{theme ? <Moon size={17} /> : <Sun size={17} />}<ChevronDown size={13} /></button>
            {settingsOpen && <div className="settings-popover">
              <p className="eyebrow">DISPLAY</p>
              <button className="settings-choice" onClick={toggleTheme}><span>{theme ? <Moon size={16} /> : <Sun size={16} />}{theme ? 'Dark theme' : 'Light theme'}</span><span className="choice-state">Change</span></button>
              <button className="settings-choice" onClick={() => { setMotionOff((value) => !value); setSettingsOpen(false); announce(motionOff ? 'Motion enabled.' : 'Reduced motion enabled.'); }}><span><span className={`switch-indicator ${motionOff ? 'on' : ''}`} />Reduce motion</span><span className="choice-state">{motionOff ? 'On' : 'Off'}</span></button>
              <p className="settings-foot">Animation follows your system preference too.</p>
            </div>}
          </div>
          <button className="icon-button help-trigger" onClick={openHelp} aria-label="Keyboard shortcuts"><CircleHelp size={18} /></button>
        </div>
      </header>

      <main>
        <section id="about" className="hero-section page-section" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow"><span className="live-dot" /> PERSONAL PROFILE <span className="eyebrow-divider">/</span> MUMBAI, INDIA</p>
              <h1 id="hero-title">Curious by nature.<br /><span>Builder by practice.</span></h1>
              <p className="hero-intro">Hey, I’m Anush — a computer engineering student at VJTI who likes turning complicated problems into useful software.</p>
              <div className="hero-actions">
                <a className="primary-button" href="#projects">Explore my work <ArrowDown size={16} /></a>
                <button className="quiet-button" onClick={copyEmail}><Mail size={15} /> Copy email</button>
              </div>
              <div className="hero-meta"><span><GraduationCap size={16} /> VJTI · Computer Engineering</span><span className="meta-separator" /><span>Expected graduation · 2028</span></div>
            </div>

            <aside className="profile-board" aria-label="Profile map and exploration progress">
              <div className="board-head"><span className="board-label"><span className="tiny-grid-icon" /> PROFILE MAP</span><span className="board-dot">LIVE</span></div>
              <p className="board-title">Choose a path<span> to explore.</span></p>
              <div className="quest-list">
                {sections.map((section, index) => <a href={`#${section.id}`} key={section.id} className={`quest-item ${visited.has(section.id) ? 'completed' : ''}`}>
                  <span className="quest-marker">{visited.has(section.id) ? <Check size={12} /> : String(index + 1).padStart(2, '0')}</span>
                  <span className="quest-name">{section.label}</span>
                  <span className="quest-status">{visited.has(section.id) ? 'VISITED' : index === 0 ? 'START HERE' : 'OPEN'}</span>
                  <ArrowUpRight className="quest-arrow" size={14} />
                </a>)}
              </div>
              <div className="board-progress-head"><span>PROFILE EXPLORED</span><span>{visited.size} / {sections.length}</span></div>
              <div className="board-progress"><span style={{ width: `${visited.size / sections.length * 100}%` }} /></div>
              <p className="board-footnote">No score to chase. Just things to discover.</p>
              <div className="board-coordinates"><span>AT / 2026</span><span>SCROLL TO EXPLORE <ArrowDown size={12} /></span></div>
            </aside>
          </div>
          <div className="hero-bottomline"><span>HUMAN-CENTERED CODE · OPEN-ENDED CURIOSITY</span><span>01 — 04 <ArrowDown size={13} /></span></div>
        </section>

        <section className="about-strip content-section" aria-labelledby="about-title">
          <div className="section-heading compact-heading"><div><p className="eyebrow"><span className="section-no">01</span> THE SHORT VERSION</p><h2 id="about-title">A bit about me.</h2></div><p className="section-aside">I enjoy building across the stack, learning by shipping, and finding a better way to solve the problem in front of me.</p></div>
          <div className="about-columns">
            <article className="education-card">
              <span className="round-icon"><GraduationCap size={18} /></span>
              <div><p className="card-overline">CURRENTLY STUDYING</p><h3>Computer Engineering</h3><p>Veermata Jijabai Technological Institute<br />Mumbai, India · Expected 2028</p></div>
              <span className="education-index">VJTI / 01</span>
            </article>
            <article className="experience-card">
              <span className="round-icon"><span className="people-glyph">✳</span></span>
              <div><p className="card-overline">COMMUNITY & OPERATIONS</p><h3>Headstart Network Foundation</h3><p>Operations & Ecosystem Volunteer</p><span className="experience-detail">Coordinated pitch sessions with 30+ investors and founders, plus speaker operations and evaluation briefs.</span></div>
              <span className="experience-index">FIELD NOTE / 02</span>
            </article>
          </div>
          <div className="skills-block">
            <div className="skills-intro"><p className="eyebrow">TOOLKIT</p><h3>Things I work with.</h3></div>
            <div className="skill-groups">{skillGroups.map((group) => <div className="skill-group" key={group.title}><span>{group.title}</span><div>{group.items.map((skill) => <span className="skill-pill" key={skill}>{skill}</span>)}</div></div>)}</div>
          </div>
          <div className="learning-note"><span className="learning-stamp">LEARNING LOG</span><span><strong>Full-Stack Engineering Bootcamp</strong> — Advanced Web Applications, Relational Databases & API Security</span><span className="learning-source">Udemy</span></div>
        </section>

        <section id="projects" className="projects-section content-section page-section" aria-labelledby="projects-title">
          <div className="section-heading"><div><p className="eyebrow"><span className="section-no">02</span> BUILT ALONG THE WAY</p><h2 id="projects-title">Selected projects<span className="heading-period">.</span></h2></div><p className="section-aside">A couple of problems I’ve explored through code, systems thinking and a lot of iteration.</p></div>
          <div className="project-list">{projects.map((project) => <ProjectCard key={project.id} project={project} onClick={() => openProject(project)} />)}</div>
          <div className="section-bottom-note"><span>OPEN A PROJECT FOR THE FIELD NOTES</span><span><Keyboard size={13} /> KEYBOARD FRIENDLY</span></div>
        </section>

        <section id="interests" className="interests-section content-section page-section" aria-labelledby="interests-title">
          <div className="section-heading"><div><p className="eyebrow"><span className="section-no">03</span> OFF-SCREEN CURIOSITIES</p><h2 id="interests-title">Side quests<span className="heading-period">.</span></h2></div><p className="section-aside">A little more of what I’m into when I’m away from the editor.</p></div>
          <div className="hobbies-grid">
            <a className="hobby-card chess-card" href="https://www.chess.com/member/atikoo23" target="_blank" rel="noreferrer">
              <div className="hobby-top"><span className="hobby-kicker">SIDE QUEST 01</span><ArrowUpRight size={17} /></div>
              <div className="chess-art" aria-hidden="true"><span className="chess-piece">♞</span><span className="chess-square" /><span className="chess-corner">♟</span></div>
              <div><p className="hobby-category">THINK A FEW MOVES AHEAD</p><h3>Chess</h3><p className="hobby-copy">Find me as <strong>atikoo23</strong> on Chess.com.</p></div>
              <span className="hobby-cta">Visit my profile <ArrowRight size={14} /></span>
            </a>
            <article className="hobby-card table-tennis-card">
              <div className="hobby-top"><span className="hobby-kicker">SIDE QUEST 02</span><span className="ping-pong-dot" /></div>
              <div className="racket-art" aria-hidden="true"><span className="racket-face" /><span className="racket-handle" /><span className="ball" /></div>
              <div><p className="hobby-category">FAST HANDS, CLEAR HEAD</p><h3>Table tennis</h3><p className="hobby-copy">A good reason to step away from the screen and play a quick rally.</p></div>
              <span className="hobby-cta static-cta">CURRENTLY IN ROTATION <ArrowRight size={14} /></span>
            </article>
          </div>
          <div className="bookshelf-heading"><div><p className="eyebrow"><BookOpen size={14} /> THE READING SHELF</p><h3>Ideas I’ve spent time with.</h3></div><span className="book-count">08 BOOKS <span>·</span> 01 SHELF</span></div>
          <div className="book-grid">{books.map((book, index) => <BookCard key={book.title} book={book} index={index} />)}</div>
          <p className="bookshelf-footnote">Cover images via Open Library.</p>
        </section>

        <section id="contact" className="contact-section page-section" aria-labelledby="contact-title">
          <div className="contact-grid">
            <div><p className="eyebrow"><span className="section-no">04</span> FINAL CHECKPOINT</p><h2 id="contact-title">Good ideas start<br /><span>with a hello.</span></h2><p className="contact-copy">Have a question, a project idea, or a good chess opening to recommend? I’m easy to reach.</p></div>
            <div className="contact-actions">
              <a className="email-card" href="mailto:anush.tikoo@gmail.com"><span className="email-icon"><Mail size={18} /></span><span><small>EMAIL ME</small><strong>anush.tikoo@gmail.com</strong></span><ArrowUpRight className="email-arrow" size={19} /></a>
              <button className="copy-link" onClick={copyEmail}><span>Copy email address</span><span>One click, a little confirmation <ArrowRight size={14} /></span></button>
              <a className="social-link" href="https://www.linkedin.com/in/anush-tikoo/" target="_blank" rel="noreferrer"><Linkedin size={17} /><span>LinkedIn</span><ArrowUpRight size={15} /></a>
              <a className="social-link" href="https://github.com/anushTikoo" target="_blank" rel="noreferrer"><Github size={17} /><span>GitHub</span><ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="contact-bottom"><span>THANKS FOR EXPLORING</span><span>MADE WITH CURIOSITY IN MUMBAI <span className="tiny-spark">✳</span></span></div>
        </section>
      </main>

      <footer className="site-footer"><a href="#about"><BrandMark /></a><span>ANUSH TIKOO · PERSONAL PROFILE</span><button onClick={openHelp}>Shortcuts <kbd>?</kbd></button><span>© 2026</span></footer>

      {activeProject && <ProjectDialog project={activeProject} onClose={() => setActiveProject(null)} onMove={moveProject} />}
      {dialog === 'search' && <SearchDialog onClose={closeDialog} onSelect={selectSearchItem} />}
      {dialog === 'help' && <HelpDialog onClose={closeDialog} />}
      {introVisible && <Intro onComplete={introCompleted} motionOff={motionOff} />}
      {toast && <div className="toast" role="status" aria-live="polite"><span className="toast-check"><Check size={14} /></span><span>{toast.message}</span>{toast.action && <button onClick={toast.action.run}>{toast.action.label}</button>}</div>}
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
