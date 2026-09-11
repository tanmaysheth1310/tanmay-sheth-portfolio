/**
 * Tanmay Sheth - Portfolio Core Experience & Interactivity
 * Features:
 * 1. Theme Engine (Dark / Light with LocalStorage & OS Preference)
 * 2. Dynamic Hero Role Switcher (Typewriter)
 * 3. Scroll Progress & Header Active Tracking
 * 4. Mobile Navigation Drawer
 * 5. Command Palette (Ctrl+K)
 * 6. Project Inspect Modal
 * 7. Certificate Inspect Modal (PDF Viewer)
 * 8. WhatsApp Message Studio (Direct WhatsApp Integration)
 * 9. Clipboard Email Utility & Toast Notification
 * 10. Interactive Luminous Cursor Trail Animation (Where cursor goes, particles follow!)
 * 11. Custom Fluid Cursor Follower (Desktop Only)
 * 12. Ambient Background Constellation Canvas
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. THEME ENGINE (Dark / Light with LocalStorage & OS Preference)
     ========================================================================== */
  const THEME_STORAGE_KEY = 'tanmay_portfolio_theme';
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleIcon = document.getElementById('themeToggleIcon');

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    if (themeToggleIcon) {
      themeToggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeToggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  window.setPortfolioTheme = function (theme) {
    if (theme === 'light' || theme === 'dark') {
      applyTheme(theme);
    }
  };

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  themeToggleBtn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // Listen for OS theme changes if user has not manually set a preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /* ==========================================================================
     2. DYNAMIC HERO ROLE SWITCHER (Typewriter effect)
     ========================================================================== */
  const dynamicRoleEl = document.getElementById('dynamicRole');
  const roles = [
    'B.Tech CSE (AI-ML) Student',
    'Full-Stack Web Developer',
    'AI / ML Enthusiast',
    'Curious Mind & Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function typeRole() {
    if (!dynamicRoleEl) return;

    const currentRole = roles[roleIndex];
    if (isDeleting) {
      charIndex--;
      typeSpeed = 45;
    } else {
      charIndex++;
      typeSpeed = 95;
    }

    dynamicRoleEl.textContent = currentRole.substring(0, charIndex);

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(typeRole, typeSpeed);
  }

  if (dynamicRoleEl) {
    setTimeout(typeRole, 600);
  }

  /* ==========================================================================
     3. SCROLL PROGRESS & HEADER ACTIVE TRACKING
     ========================================================================== */
  const scrollProgress = document.getElementById('scrollProgress');
  const headerEl = document.querySelector('.navbar-wrapper');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (scrollProgress) {
      scrollProgress.style.width = scrolled + '%';
    }

    if (headerEl) {
      if (winScroll > 30) {
        headerEl.classList.add('scrolled');
      } else {
        headerEl.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // Intersection Observer for Active Navigation
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  /* ==========================================================================
     4. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    mobileNav?.classList.add('open');
    mobileNavOverlay?.classList.add('open');
    menuToggle?.setAttribute('aria-expanded', 'true');
    menuToggle?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav?.classList.remove('open');
    mobileNavOverlay?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuToggle?.addEventListener('click', () => {
    const isOpen = mobileNav?.classList.contains('open');
    if (isOpen) closeMobileNav();
    else openMobileNav();
  });

  mobileNavOverlay?.addEventListener('click', closeMobileNav);
  mobileNavLinks.forEach((link) => link.addEventListener('click', closeMobileNav));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav?.classList.contains('open')) {
      closeMobileNav();
    }
  });

  /* ==========================================================================
     5. COMMAND PALETTE (Ctrl + K / Cmd + K)
     ========================================================================== */
  const cmdPaletteModal = document.getElementById('commandPaletteModal');
  const cmdPaletteTrigger = document.getElementById('cmdPaletteTrigger');
  const cmdPaletteClose = document.getElementById('cmdPaletteClose');
  const cmdPaletteInput = document.getElementById('cmdPaletteInput');
  const cmdItemList = document.getElementById('cmdItemList');

  const PALETTE_COMMANDS = [
    { title: 'Home', subtitle: 'Return to top overview & intro', icon: '⚡', action: () => scrollToSection('#home') },
    { title: 'About Tanmay', subtitle: 'Education at Adani University, background & story', icon: '👤', action: () => scrollToSection('#about') },
    { title: 'Interactive Terminal', subtitle: 'Launch embedded developer CLI shell', icon: '💻', action: () => { scrollToSection('#terminal'); focusTerminal(); } },
    { title: 'Technical Skills', subtitle: 'Explore Languages, Web Dev, Databases & AI/ML', icon: '🛠️', action: () => scrollToSection('#skills') },
    { title: 'Featured Projects', subtitle: 'Inspect Web, AI/ML & Hackathon work', icon: '🚀', action: () => scrollToSection('#projects') },
    { title: 'Certificates & Proof', subtitle: 'Data Analysis, Prompt Engineering & GenAI', icon: '📜', action: () => scrollToSection('#certificates') },
    { title: 'Contact & WhatsApp', subtitle: 'Open direct conversation channels', icon: '💬', action: () => scrollToSection('#contact') },
    { title: 'Switch Color Theme', subtitle: 'Toggle between Cyber Dark and Crisp Light mode', icon: '🌓', action: () => themeToggleBtn?.click() },
    { title: 'GitHub Profile', subtitle: 'github.com/tanmaysheth1310 (Open external)', icon: '↗', action: () => window.open('https://github.com/tanmaysheth1310', '_blank', 'noopener') },
    { title: 'LinkedIn Profile', subtitle: 'linkedin.com/in/tanmay-sheth-5a4415384/', icon: '↗', action: () => window.open('https://www.linkedin.com/in/tanmay-sheth-5a4415384/', '_blank', 'noopener') },
    { title: 'Copy Email Address', subtitle: 'tanmaysheth12@gmail.com', icon: '📋', action: () => copyEmailToClipboard() }
  ];

  let activePaletteIndex = 0;
  let filteredPaletteCommands = [...PALETTE_COMMANDS];

  function openCommandPalette() {
    if (!cmdPaletteModal) return;
    cmdPaletteModal.classList.add('active');
    cmdPaletteModal.setAttribute('aria-hidden', 'false');
    if (cmdPaletteInput) {
      cmdPaletteInput.value = '';
      setTimeout(() => cmdPaletteInput.focus(), 80);
    }
    renderPaletteItems(PALETTE_COMMANDS);
    document.body.style.overflow = 'hidden';
  }

  function closeCommandPalette() {
    if (!cmdPaletteModal) return;
    cmdPaletteModal.classList.remove('active');
    cmdPaletteModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function focusTerminal() {
    setTimeout(() => {
      const input = document.querySelector('.terminal-input');
      if (input) input.focus();
    }, 450);
  }

  function renderPaletteItems(list) {
    if (!cmdItemList) return;
    cmdItemList.innerHTML = '';
    filteredPaletteCommands = list;
    activePaletteIndex = 0;

    if (list.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'palette-empty';
      empty.textContent = 'No matching commands or destinations found.';
      cmdItemList.appendChild(empty);
      return;
    }

    list.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = `palette-item ${idx === 0 ? 'selected' : ''}`;
      el.setAttribute('role', 'option');
      el.setAttribute('data-idx', idx);
      el.innerHTML = `
        <span class="palette-item-icon">${item.icon}</span>
        <div class="palette-item-text">
          <div class="palette-item-title">${item.title}</div>
          <div class="palette-item-subtitle">${item.subtitle}</div>
        </div>
        <span class="palette-item-badge">Select &crarr;</span>
      `;

      el.addEventListener('click', () => {
        closeCommandPalette();
        item.action();
      });

      el.addEventListener('mouseenter', () => {
        setPaletteActiveIndex(idx);
      });

      cmdItemList.appendChild(el);
    });
  }

  function setPaletteActiveIndex(index) {
    const items = cmdItemList?.querySelectorAll('.palette-item');
    if (!items || items.length === 0) return;
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
    activePaletteIndex = index;
  }

  cmdPaletteInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderPaletteItems(PALETTE_COMMANDS);
      return;
    }
    const filtered = PALETTE_COMMANDS.filter((cmd) => {
      return cmd.title.toLowerCase().includes(query) || cmd.subtitle.toLowerCase().includes(query);
    });
    renderPaletteItems(filtered);
  });

  cmdPaletteInput?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredPaletteCommands.length > 0) {
        const next = (activePaletteIndex + 1) % filteredPaletteCommands.length;
        setPaletteActiveIndex(next);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredPaletteCommands.length > 0) {
        const prev = (activePaletteIndex - 1 + filteredPaletteCommands.length) % filteredPaletteCommands.length;
        setPaletteActiveIndex(prev);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredPaletteCommands[activePaletteIndex]) {
        const selected = filteredPaletteCommands[activePaletteIndex];
        closeCommandPalette();
        selected.action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeCommandPalette();
    }
  });

  cmdPaletteTrigger?.addEventListener('click', openCommandPalette);
  cmdPaletteClose?.addEventListener('click', closeCommandPalette);

  cmdPaletteModal?.addEventListener('click', (e) => {
    if (e.target === cmdPaletteModal) closeCommandPalette();
  });

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdPaletteModal?.classList.contains('active')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    } else if (e.key === 'Escape' && cmdPaletteModal?.classList.contains('active')) {
      closeCommandPalette();
    }
  });

  /* ==========================================================================
     6. PROJECT INSPECT MODAL
     ========================================================================== */
  const PROJECT_DETAILS = {
    web_app: {
      title: 'Web Application Project',
      category: 'WEB DEVELOPMENT / DATABASE MANAGEMENT',
      badge: 'Full-Stack Architecture',
      overview: 'A complete practical web application engineered to demonstrate responsive frontend interfaces, clean backend business logic, and structured relational database operations.',
      highlights: [
        'Responsive, modern UI engineered with standards-compliant HTML5, CSS3, and JavaScript.',
        'Modular backend architecture managing request lifecycles and API routing.',
        'Relational database integration (SQL) for structured data storage, querying, and retrieval.',
        'Focus on maintainable code structure, UX performance, and clean component hierarchy.'
      ],
      stack: ['HTML5', 'CSS3', 'JavaScript', 'SQL', 'Backend Architecture'],
      repo: 'https://github.com/tanmaysheth1310'
    },
    aiml_learning: {
      title: 'AI/ML Learning Projects',
      category: 'ARTIFICIAL INTELLIGENCE / MACHINE LEARNING',
      badge: 'Academic & Experimental',
      overview: 'A structured collection of hands-on Python scripts, data analysis workflows, and algorithm implementations developed as part of ongoing B.Tech CSE (AI-ML) coursework and personal research.',
      highlights: [
        'Data exploration, cleaning, and statistical summaries using Python ecosystem tools.',
        'Implementation of fundamental machine learning algorithms and evaluation metrics.',
        'Prompt engineering and GenAI integration experiments exploring modern LLM behaviors.',
        'Systematic approach to problem solving, computational complexity, and reproducible experiments.'
      ],
      stack: ['Python', 'Data Analysis', 'Prompt Engineering', 'Generative AI', 'Algorithms'],
      repo: 'https://github.com/tanmaysheth1310'
    },
    sih_advisor: {
      title: 'Career & Education Advisor',
      category: 'SMART INDIA HACKATHON (SIH) / EDUCATION TRACK',
      badge: 'Hackathon Innovation Concept',
      overview: 'An innovative education-focused roadmap conceived for Smart India Hackathon (SIH) aiming to provide student-centric guidance, personalized career trajectories, and curriculum recommendations.',
      highlights: [
        'Conceptualized to address educational information gaps for aspiring engineers and students.',
        'Designed modular advisory workflows linking user interests with required skillsets and milestones.',
        'Collaborative team development showcasing problem framing, agile iterations, and user-centric ideation.',
        'Presented as part of SIH competitive hackathon initiative at Adani University.'
      ],
      stack: ['Education Tech', 'Product Strategy', 'Personalized Roadmaps', 'Agile Collaboration'],
      repo: 'https://github.com/tanmaysheth1310'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const projectModalClose = document.getElementById('projectModalClose');
  const projectModalBody = document.getElementById('projectModalBody');

  function openProjectModal(key) {
    const data = PROJECT_DETAILS[key];
    if (!data || !projectModal || !projectModalBody) return;

    projectModalBody.innerHTML = `
      <div class="modal-category">${data.category}</div>
      <h3 class="modal-title">${data.title}</h3>
      <span class="modal-badge">${data.badge}</span>
      <p class="modal-desc">${data.overview}</p>

      <h4 class="modal-subheading">Technical & Architectural Highlights</h4>
      <ul class="modal-highlights">
        ${data.highlights.map(h => `<li><span class="highlight-bullet">&bull;</span> ${h}</li>`).join('')}
      </ul>

      <h4 class="modal-subheading">Technologies Used</h4>
      <div class="modal-tags">
        ${data.stack.map(s => `<span class="modal-tag">${s}</span>`).join('')}
      </div>

      <div class="modal-actions">
        <a class="btn primary" href="${data.repo}" target="_blank" rel="noopener">
          View Repository on GitHub ↗
        </a>
        <a class="btn ghost" href="#contact" onclick="closeProjectModal()">
          Discuss This Project
        </a>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  window.closeProjectModal = function () {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  projectModalClose?.addEventListener('click', closeProjectModal);
  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
  });

  document.querySelectorAll('[data-inspect-project]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-inspect-project');
      openProjectModal(key);
    });
  });

  /* ==========================================================================
     7. CERTIFICATE INSPECT MODAL (PDF Viewer)
     ========================================================================== */
  const CERT_DETAILS = {
    internship: {
      title: 'Data Analysis Internship Certificate',
      issuer: 'Industry Internship',
      period: '15 June 2026 – 15 July 2026',
      file: '/static/certificates/data-analysis-internship.pdf',
      summary: 'Verified completion certificate for practical Data Analysis internship focusing on data handling, cleaning, and quantitative evaluation.'
    },
    prompt_eng: {
      title: 'Prompt Engineering for Everyone',
      issuer: 'Cognitive Class / IBM Developer Skills Network',
      period: 'Issued: December 12, 2025',
      file: '/static/certificates/prompt-engineering.pdf',
      summary: 'Credential credentialing mastery of prompt design principles, few-shot techniques, chain-of-thought strategies, and LLM optimization.'
    },
    gen_ai: {
      title: 'Introduction to Generative AI',
      issuer: 'Specialized AI Education Credential',
      period: 'Issued: April 24, 2026',
      file: '/static/certificates/generative-ai.pdf',
      summary: 'Foundational certification covering generative AI paradigms, transformer architectures, foundational models, and generative application use cases.'
    }
  };

  const certModal = document.getElementById('certModal');
  const certModalClose = document.getElementById('certModalClose');
  const certModalBody = document.getElementById('certModalBody');

  function openCertModal(key) {
    const cert = CERT_DETAILS[key];
    if (!cert || !certModal || !certModalBody) return;

    certModalBody.innerHTML = `
      <div class="cert-modal-header">
        <div>
          <span class="modal-category">VERIFIED CREDENTIAL</span>
          <h3 class="modal-title">${cert.title}</h3>
          <p class="modal-desc" style="margin: 4px 0 12px;"><strong>${cert.issuer}</strong> • ${cert.period}</p>
        </div>
        <div class="cert-modal-btns">
          <a class="btn primary btn-sm" href="${cert.file}" target="_blank" rel="noopener">Open in New Tab ↗</a>
          <a class="btn ghost btn-sm" href="${cert.file}" download>Download PDF</a>
        </div>
      </div>
      <div class="cert-embed-wrap">
        <iframe class="cert-iframe" src="${cert.file}#view=FitH" title="${cert.title}"></iframe>
      </div>
    `;

    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  window.closeCertModal = function () {
    if (certModal) {
      certModal.classList.remove('active');
      document.body.style.overflow = '';
      if (certModalBody) certModalBody.innerHTML = '';
    }
  };

  certModalClose?.addEventListener('click', closeCertModal);
  certModal?.addEventListener('click', (e) => {
    if (e.target === certModal) closeCertModal();
  });

  document.querySelectorAll('[data-inspect-cert]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-inspect-cert');
      openCertModal(key);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal?.classList.contains('active')) closeProjectModal();
      if (certModal?.classList.contains('active')) closeCertModal();
    }
  });

  /* ==========================================================================
     8. WHATSAPP FORM INTEGRATION (Exact Phone Preserved)
     ========================================================================== */
  const whatsappForm = document.getElementById('whatsappForm');
  const messageInput = document.getElementById('message');
  const charCounter = document.getElementById('messageCharCount');
  const phone = '919274213780'; // India country code +91; verified phone from original portfolio

  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      charCounter.textContent = `${messageInput.value.length} characters`;
    });
  }

  // Pre-fill chips for easy messaging
  document.querySelectorAll('.whatsapp-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-text');
      if (messageInput && text) {
        messageInput.value = text;
        messageInput.focus();
        if (charCounter) charCounter.textContent = `${text.length} characters`;
      }
    });
  });

  whatsappForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawMsg = messageInput?.value.trim();
    if (!rawMsg) return;

    const encoded = encodeURIComponent(rawMsg);
    const targetUrl = `https://wa.me/${phone}?text=${encoded}`;
    window.open(targetUrl, '_blank', 'noopener');
  });

  /* ==========================================================================
     9. CLIPBOARD EMAIL UTILITY & TOAST NOTIFICATION
     ========================================================================== */
  function copyEmailToClipboard() {
    const email = 'tanmaysheth12@gmail.com';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: tanmaysheth12@gmail.com');
      }).catch(() => {
        fallbackCopyText(email);
      });
    } else {
      fallbackCopyText(email);
    }
  }

  function fallbackCopyText(text) {
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand('copy');
      showToast('Email copied to clipboard: ' + text);
    } catch (err) {
      showToast('Contact: ' + text);
    }
    document.body.removeChild(temp);
  }

  function showToast(msg) {
    let toast = document.getElementById('portfolioToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'portfolioToast';
      toast.className = 'portfolio-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3200);
  }

  document.querySelectorAll('.copy-email-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      copyEmailToClipboard();
    });
  });

  /* ==========================================================================
     10. INTERACTIVE LUMINOUS CURSOR TRAIL ANIMATION (Particle Aura Following Mouse)
     ========================================================================== */
  const isTouchDevice = () => {
    return 'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches);
  };

  const trailCanvas = document.getElementById('cursorTrailCanvas');
  if (trailCanvas && !isTouchDevice() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const tCtx = trailCanvas.getContext('2d');
    let tWidth = (trailCanvas.width = window.innerWidth);
    let tHeight = (trailCanvas.height = window.innerHeight);

    let trailParticles = [];
    let lastMouseX = -100;
    let lastMouseY = -100;

    window.addEventListener('resize', () => {
      tWidth = trailCanvas.width = window.innerWidth;
      tHeight = trailCanvas.height = window.innerHeight;
    }, { passive: true });

    // Spawn luminous stardust sparks as cursor moves
    window.addEventListener('mousemove', (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      const dist = Math.hypot(currentX - lastMouseX, currentY - lastMouseY);
      if (dist > 2) {
        const count = Math.min(Math.floor(dist / 5) + 1, 4);
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 1.8 + 0.4;
          const isCyan = Math.random() > 0.45;
          trailParticles.push({
            x: currentX + (Math.random() - 0.5) * 8,
            y: currentY + (Math.random() - 0.5) * 8,
            vx: Math.cos(angle) * speed * 0.4,
            vy: Math.sin(angle) * speed * 0.4 - 0.25,
            size: Math.random() * 3.8 + 1.8,
            alpha: 1,
            decay: Math.random() * 0.024 + 0.018,
            color: isCyan ? '6, 182, 212' : '99, 102, 241'
          });
        }
        lastMouseX = currentX;
        lastMouseY = currentY;
      }
    }, { passive: true });

    // Burst ripple animation on mouse click
    window.addEventListener('click', (e) => {
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.8 + 1.2;
        trailParticles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4.5 + 2,
          alpha: 1,
          decay: Math.random() * 0.028 + 0.02,
          color: Math.random() > 0.5 ? '6, 182, 212' : '129, 140, 248'
        });
      }
    });

    function animateTrail() {
      tCtx.clearRect(0, 0, tWidth, tHeight);

      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const p = trailParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.size *= 0.96;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.size < 0.3) {
          trailParticles.splice(i, 1);
          continue;
        }

        tCtx.save();
        tCtx.beginPath();
        tCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        tCtx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        tCtx.shadowColor = `rgba(${p.color}, ${p.alpha * 0.85})`;
        tCtx.shadowBlur = 9;
        tCtx.fill();
        tCtx.restore();
      }

      requestAnimationFrame(animateTrail);
    }

    requestAnimationFrame(animateTrail);
  }

  /* ==========================================================================
     11. CUSTOM FLUID CURSOR FOLLOWER (Desktop Only, Touch Bypassed)
     ========================================================================== */
  const cursorDot = document.getElementById('cursorDot');
  const cursorFollower = document.getElementById('cursorFollower');

  if (!isTouchDevice() && cursorDot && cursorFollower) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    function animateCursor() {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Interactive element hover detections
    const interactiveSelectors = 'a, button, input, textarea, .project-card, .skill-card, .certificate-card, .info-stat-card';
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest(interactiveSelectors);
      if (target) {
        cursorFollower.classList.add('cursor-hover');
        if (target.classList.contains('project-card')) {
          cursorFollower.setAttribute('data-cursor-text', 'INSPECT');
        } else if (target.classList.contains('certificate-card')) {
          cursorFollower.setAttribute('data-cursor-text', 'VIEW');
        } else {
          cursorFollower.removeAttribute('data-cursor-text');
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest(interactiveSelectors);
      if (target) {
        cursorFollower.classList.remove('cursor-hover');
        cursorFollower.removeAttribute('data-cursor-text');
      }
    });
  }

  /* ==========================================================================
     12. AMBIENT BACKGROUND CONSTELLATION CANVAS
     ========================================================================== */
  const canvas = document.getElementById('ambientCanvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 24), 55);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.8
      });
    }

    function renderCanvas() {
      const isDark = (document.documentElement.getAttribute('data-theme') || 'dark') === 'dark';
      ctx.clearRect(0, 0, width, height);

      const colorDot = isDark ? 'rgba(99, 102, 241, 0.45)' : 'rgba(99, 102, 241, 0.25)';
      const colorLine = isDark ? 'rgba(99, 102, 241, 0.07)' : 'rgba(99, 102, 241, 0.04)';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = colorDot;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = colorLine;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderCanvas);
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    renderCanvas();
  }
})();
