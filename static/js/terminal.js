/**
 * Interactive Developer Terminal for Tanmay Sheth's Portfolio
 * Fully interactive CLI with history, autocomplete, real portfolio data, and command execution.
 */

(function () {
  'use strict';

  const TERMINAL_DATA = {
    user: 'tanmay',
    host: 'sheth-dev',
    path: '~',
    version: '2.4.0-release',
    uptimeStart: Date.now()
  };

  const COMMANDS = {
    help: {
      desc: 'List all available terminal commands',
      exec: () => {
        return [
          { type: 'output', text: '<span class="term-accent">AVAILABLE COMMANDS:</span>' },
          { type: 'output', text: '  <span class="term-cmd">help</span>         Show this assistance manual' },
          { type: 'output', text: '  <span class="term-cmd">about</span>        Display developer profile, bio & education' },
          { type: 'output', text: '  <span class="term-cmd">skills</span>       Inspect technical toolbox & competencies' },
          { type: 'output', text: '  <span class="term-cmd">projects</span>     Explore featured projects & repositories' },
          { type: 'output', text: '  <span class="term-cmd">certs</span>        List verified credentials & certifications' },
          { type: 'output', text: '  <span class="term-cmd">status</span>       Show live system & developer telemetry' },
          { type: 'output', text: '  <span class="term-cmd">contact</span>      Output communication channels & WhatsApp' },
          { type: 'output', text: '  <span class="term-cmd">theme</span>        Toggle theme: [dark | light | switch]' },
          { type: 'output', text: '  <span class="term-cmd">goto &lt;sec&gt;</span>    Scroll to UI section: [home|about|skills|projects|certs|contact]' },
          { type: 'output', text: '  <span class="term-cmd">history</span>      View previous command execution history' },
          { type: 'output', text: '  <span class="term-cmd">clear</span>        Clear the terminal console buffer' },
          { type: 'output', text: '  <span class="term-cmd">whoami</span>       Print current session user role' },
          { type: 'output', text: '  <span class="term-cmd">date</span>         Display current system date & time' }
        ];
      }
    },

    about: {
      desc: 'Display developer profile & education',
      exec: () => {
        return [
          { type: 'output', text: '<span class="term-accent">PROFILE: TANMAY SHETH</span>' },
          { type: 'output', text: '---------------------------------------------------' },
          { type: 'output', text: '<span class="term-highlight">Name:</span>       Tanmay Sheth' },
          { type: 'output', text: '<span class="term-highlight">Role:</span>       Computer Science Student & Web Developer' },
          { type: 'output', text: '<span class="term-highlight">Degree:</span>     B.Tech in Computer Science & Engineering (AI-ML)' },
          { type: 'output', text: '<span class="term-highlight">University:</span> Adani University, Ahmedabad' },
          { type: 'output', text: '<span class="term-highlight">Stage:</span>      2nd Year • 3rd Semester' },
          { type: 'output', text: '<span class="term-highlight">Location:</span>   Ahmedabad, Gujarat, India' },
          { type: 'output', text: '<span class="term-highlight">Bio:</span>        Curious mind with a builder mindset. Focused on full-stack' },
          { type: 'output', text: '           development, relational databases, Python, and applied AI/ML.' }
        ];
      }
    },

    skills: {
      desc: 'Inspect technical toolbox',
      exec: () => {
        return [
          { type: 'output', text: '<span class="term-accent">TECHNICAL TOOLBOX</span>' },
          { type: 'output', text: '---------------------------------------------------' },
          { type: 'output', text: '  <span class="term-tag">[LANGUAGES]</span>     C, C++, Python, JavaScript (ES6+)' },
          { type: 'output', text: '  <span class="term-tag">[FRONTEND]</span>      HTML5, CSS3, Modern JavaScript, React' },
          { type: 'output', text: '  <span class="term-tag">[DATABASES]</span>     SQL, Relational Database Management (RDBMS)' },
          { type: 'output', text: '  <span class="term-tag">[AI / ML]</span>       Prompt Engineering, Generative AI, Data Analysis' },
          { type: 'output', text: '  <span class="term-tag">[CORE FOCUS]</span>    Frontend • Backend • Databases • Machine Learning' }
        ];
      }
    },

    projects: {
      desc: 'List portfolio projects',
      exec: () => {
        return [
          { type: 'output', text: '<span class="term-accent">FEATURED PROJECTS</span>' },
          { type: 'output', text: '---------------------------------------------------' },
          { type: 'output', text: '1. <span class="term-highlight">Web Application Project</span> [Frontend, Backend, SQL DB]' },
          { type: 'output', text: '   A practical web project demonstrating frontend engineering, backend services, and database.' },
          { type: 'output', text: '   GitHub: <a class="term-link" href="https://github.com/tanmaysheth1310" target="_blank" rel="noopener">github.com/tanmaysheth1310 &nearr;</a>' },
          { type: 'output', text: '' },
          { type: 'output', text: '2. <span class="term-highlight">AI/ML Learning Projects</span> [Python, Data Science, AI/ML Experiments]' },
          { type: 'output', text: '   Collection of academic experiments and algorithms exploring machine learning & problem solving.' },
          { type: 'output', text: '   GitHub: <a class="term-link" href="https://github.com/tanmaysheth1310" target="_blank" rel="noopener">github.com/tanmaysheth1310 &nearr;</a>' },
          { type: 'output', text: '' },
          { type: 'output', text: '3. <span class="term-highlight">Career & Education Advisor</span> [Track: SIH / Education Hackathon]' },
          { type: 'output', text: '   Personalized roadmap and curriculum counseling concept designed for hackathons.' },
          { type: 'output', text: '   Contact: Type <span class="term-cmd">goto contact</span> to connect or discuss details.' }
        ];
      }
    },

    certs: {
      desc: 'List verified certifications & internship proof',
      exec: () => {
        return [
          { type: 'output', text: '<span class="term-accent">VERIFIED CREDENTIALS & CERTIFICATES</span>' },
          { type: 'output', text: '---------------------------------------------------' },
          { type: 'output', text: '1. <span class="term-highlight">Data Analysis Internship</span> (15 June 2026 - 15 July 2026)' },
          { type: 'output', text: '   File: <a class="term-link" href="/static/certificates/data-analysis-internship.pdf" target="_blank">data-analysis-internship.pdf &nearr;</a>' },
          { type: 'output', text: '' },
          { type: 'output', text: '2. <span class="term-highlight">Prompt Engineering for Everyone</span> (Issued Dec 12, 2025)' },
          { type: 'output', text: '   Issuer: Cognitive Class / IBM Developer Skills Network' },
          { type: 'output', text: '   File: <a class="term-link" href="/static/certificates/prompt-engineering.pdf" target="_blank">prompt-engineering.pdf &nearr;</a>' },
          { type: 'output', text: '' },
          { type: 'output', text: '3. <span class="term-highlight">Introduction to Generative AI</span> (Issued Apr 24, 2026)' },
          { type: 'output', text: '   File: <a class="term-link" href="/static/certificates/generative-ai.pdf" target="_blank">generative-ai.pdf &nearr;</a>' }
        ];
      }
    },

    status: {
      desc: 'Show real-time developer & system telemetry',
      exec: () => {
        const uptimeSec = Math.floor((Date.now() - TERMINAL_DATA.uptimeStart) / 1000);
        return [
          { type: 'output', text: '<span class="term-accent">LIVE SYSTEM & DEVELOPER STATUS</span>' },
          { type: 'output', text: '---------------------------------------------------' },
          { type: 'output', text: '  SYSTEM STATUS    : <span class="term-online">● ONLINE</span>' },
          { type: 'output', text: '  ACADEMIC STAGE   : B.Tech CSE (AI-ML) • 2nd Year' },
          { type: 'output', text: '  INSTITUTION      : Adani University, Ahmedabad' },
          { type: 'output', text: '  CORE FOCUS       : Full-Stack Web Development + AI/ML' },
          { type: 'output', text: '  BUILD STABILITY  : STABLE (Production Ready / Vercel)' },
          { type: 'output', text: `  SESSION UPTIME   : ${uptimeSec}s` },
          { type: 'output', text: `  ENV SHELL        : WebTerminal v${TERMINAL_DATA.version}` }
        ];
      }
    },

    contact: {
      desc: 'Display contact information',
      exec: () => {
        return [
          { type: 'output', text: '<span class="term-accent">GET IN TOUCH</span>' },
          { type: 'output', text: '---------------------------------------------------' },
          { type: 'output', text: '  <span class="term-highlight">Email:</span>     <a class="term-link" href="mailto:tanmaysheth12@gmail.com">tanmaysheth12@gmail.com</a>' },
          { type: 'output', text: '  <span class="term-highlight">WhatsApp:</span>  +91 9274213780' },
          { type: 'output', text: '  <span class="term-highlight">LinkedIn:</span>  <a class="term-link" href="https://www.linkedin.com/in/tanmay-sheth-5a4415384/" target="_blank" rel="noopener">linkedin.com/in/tanmay-sheth-5a4415384/ &nearr;</a>' },
          { type: 'output', text: '  <span class="term-highlight">Instagram:</span> <a class="term-link" href="https://www.instagram.com/tanmay_sheth1310/" target="_blank" rel="noopener">instagram.com/tanmay_sheth1310/ &nearr;</a>' },
          { type: 'output', text: '  <span class="term-highlight">GitHub:</span>    <a class="term-link" href="https://github.com/tanmaysheth1310" target="_blank" rel="noopener">github.com/tanmaysheth1310 &nearr;</a>' },
          { type: 'output', text: '  <span class="term-highlight">Location:</span>  Ahmedabad, Gujarat, India' }
        ];
      }
    },

    theme: {
      desc: 'Change UI color theme [dark|light|switch]',
      exec: (args) => {
        const arg = args[0] ? args[0].toLowerCase() : '';
        let targetTheme = '';
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

        if (arg === 'light') targetTheme = 'light';
        else if (arg === 'dark') targetTheme = 'dark';
        else targetTheme = currentTheme === 'dark' ? 'light' : 'dark';

        if (window.setPortfolioTheme) {
          window.setPortfolioTheme(targetTheme);
          return [{ type: 'output', text: `Theme updated to <span class="term-highlight">${targetTheme}</span>.` }];
        }
        return [{ type: 'output', text: 'Theme switcher not ready yet.' }];
      }
    },

    goto: {
      desc: 'Jump to section [home|about|skills|projects|certs|contact]',
      exec: (args) => {
        const sec = args[0] ? args[0].toLowerCase() : '';
        const map = {
          home: '#home',
          about: '#about',
          skills: '#skills',
          projects: '#projects',
          certs: '#certificates',
          certificates: '#certificates',
          terminal: '#terminal',
          contact: '#contact'
        };
        if (!sec || !map[sec]) {
          return [
            { type: 'error', text: 'Usage: goto &lt;section&gt;' },
            { type: 'output', text: 'Valid sections: home, about, skills, projects, certs, terminal, contact' }
          ];
        }
        const target = document.querySelector(map[sec]);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          return [{ type: 'output', text: `Navigating to <span class="term-highlight">${sec}</span>...` }];
        }
        return [{ type: 'error', text: `Section not found: ${sec}` }];
      }
    },

    whoami: {
      desc: 'Print current session role',
      exec: () => [
        { type: 'output', text: 'guest@tanmay-portfolio (Developer / Recruiter / Curious Explorer)' },
        { type: 'output', text: 'Privilege: Read-Only (Safe Interactive Sandboxed Shell)' }
      ]
    },

    date: {
      desc: 'Print current date & time',
      exec: () => [{ type: 'output', text: new Date().toString() }]
    },

    history: {
      desc: 'Show executed command history',
      exec: (args, state) => {
        if (!state.history.length) return [{ type: 'output', text: 'No command history recorded yet.' }];
        return state.history.map((cmd, i) => ({
          type: 'output',
          text: `  ${(i + 1).toString().padStart(3, ' ')}  ${escapeHtml(cmd)}`
        }));
      }
    },

    clear: {
      desc: 'Clear the terminal screen buffer',
      exec: (args, state, term) => {
        term.clearBuffer();
        return [];
      }
    },

    sudo: {
      desc: 'Run command as superuser',
      exec: () => [
        { type: 'error', text: 'sudo: Permission denied. Tanmay Sheth is already running with developer root privilege!' }
      ]
    },

    echo: {
      desc: 'Echo input text',
      exec: (args) => [{ type: 'output', text: escapeHtml(args.join(' ')) }]
    }
  };

  class TerminalApp {
    constructor(container) {
      this.container = container;
      this.outputEl = container.querySelector('.terminal-output');
      this.inputEl = container.querySelector('.terminal-input');
      this.promptEl = container.querySelector('.terminal-prompt');
      this.clearBtn = container.querySelector('.terminal-btn-clear');
      
      this.history = [];
      this.historyIndex = -1;
      this.commandList = Object.keys(COMMANDS);

      this.init();
    }

    init() {
      if (!this.inputEl || !this.outputEl) return;

      this.printWelcome();

      this.inputEl.addEventListener('keydown', (e) => this.handleKeyDown(e));

      this.container.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
          this.inputEl.focus();
        }
      });

      this.clearBtn?.addEventListener('click', () => this.clearBuffer());

      // Quick chips listener
      const chips = this.container.querySelectorAll('.term-quick-chip');
      chips.forEach((chip) => {
        chip.addEventListener('click', (e) => {
          const cmd = chip.getAttribute('data-cmd');
          if (cmd) {
            this.inputEl.value = cmd;
            this.executeCommand(cmd);
          }
        });
      });
    }

    printWelcome() {
      const welcome = [
        '<span class="term-accent">Tanmay Sheth</span> Developer Shell [Version 2.4.0]',
        'Type <span class="term-cmd">help</span> for commands, <span class="term-cmd">about</span> for profile, or <span class="term-cmd">projects</span> to inspect work.',
        'Tip: Use <span class="term-highlight">Tab</span> to autocomplete and <span class="term-highlight">&uarr;/&darr;</span> to cycle history.',
        ''
      ];
      welcome.forEach((line) => this.appendLine('output', line));
    }

    appendLine(type, html) {
      const line = document.createElement('div');
      line.className = `term-line term-line-${type}`;
      line.innerHTML = html;
      this.outputEl.appendChild(line);
      this.scrollToBottom();
    }

    scrollToBottom() {
      this.outputEl.scrollTop = this.outputEl.scrollHeight;
    }

    clearBuffer() {
      this.outputEl.innerHTML = '';
      this.printWelcome();
    }

    handleKeyDown(e) {
      if (e.key === 'Enter') {
        const raw = this.inputEl.value.trim();
        this.inputEl.value = '';
        if (raw) {
          this.history.push(raw);
          this.historyIndex = this.history.length;
        }
        this.executeCommand(raw);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.history.length > 0 && this.historyIndex > 0) {
          this.historyIndex--;
          this.inputEl.value = this.history[this.historyIndex] || '';
          this.setCursorToEnd();
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.inputEl.value = this.history[this.historyIndex] || '';
          this.setCursorToEnd();
        } else {
          this.historyIndex = this.history.length;
          this.inputEl.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.autocomplete();
      }
    }

    setCursorToEnd() {
      setTimeout(() => {
        this.inputEl.selectionStart = this.inputEl.selectionEnd = this.inputEl.value.length;
      }, 0);
    }

    autocomplete() {
      const current = this.inputEl.value.trim().toLowerCase();
      if (!current) return;
      const matches = this.commandList.filter((cmd) => cmd.startsWith(current));
      if (matches.length === 1) {
        this.inputEl.value = matches[0];
      } else if (matches.length > 1) {
        this.appendLine('prompt', `<span class="term-prompt-txt">tanmay@sheth:~$</span> ${escapeHtml(current)}`);
        this.appendLine('output', matches.map((m) => `<span class="term-cmd">${m}</span>`).join('   '));
      }
    }

    executeCommand(commandString) {
      const promptHtml = `<span class="term-prompt-txt">tanmay@sheth:~$</span> ${escapeHtml(commandString)}`;
      this.appendLine('prompt', promptHtml);

      if (!commandString) return;

      const tokens = commandString.split(' ').filter(Boolean);
      const cmdName = tokens[0].toLowerCase();
      const args = tokens.slice(1);

      if (COMMANDS[cmdName]) {
        const results = COMMANDS[cmdName].exec(args, { history: this.history }, this);
        if (results && results.length) {
          results.forEach((r) => this.appendLine(r.type || 'output', r.text));
        }
      } else {
        this.appendLine('error', `Command not found: <span class="term-bad">${escapeHtml(cmdName)}</span>. Type <span class="term-cmd">help</span> for a list.`);
      }
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  window.addEventListener('DOMContentLoaded', () => {
    const termEl = document.getElementById('developerTerminal');
    if (termEl) {
      window.terminalInstance = new TerminalApp(termEl);
    }
  });
})();
