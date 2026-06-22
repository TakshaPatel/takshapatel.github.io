/* ============================================
   Taksha Patel — Portfolio Dossier
   All data, logic, and interactions
   ============================================ */

// ---- DATA ----

const titles = [
  'Security Researcher',
  'Systems Engineer',
  'Software Developer',
  'Linux Enthusiast',
  'Network Analyst',
  'Student',
  'Puzzle Solver',
  'Problem Solver'
];

const projects = [
  {
    name: 'RustyShell',
    url: 'https://github.com/TakshaPatel/RustyShell',
    kicker: 'Systems',
    description: 'A shell project exploring Rust, command execution, and terminal workflows.',
    action: 'GitHub ->',
    featured: true
  },
  {
    name: 'Recon',
    url: 'https://github.com/TakshaPatel/Recon',
    kicker: 'Security',
    description: 'A reconnaissance project focused on practical cybersecurity workflows.',
    action: 'GitHub ->',
    featured: true
  },
  {
    name: 'WPA Keyminer',
    url: 'https://github.com/TakshaPatel/WPAKeyminer',
    kicker: 'Networking',
    description: 'A wireless security project centered on WPA-related research.',
    action: 'GitHub ->',
    featured: true
  },
  {
    name: 'PyQt Web Browser',
    url: 'https://github.com/TakshaPatel/browser/tree/main',
    kicker: 'Desktop App',
    description: 'A custom browser project built with Python and PyQt.',
    action: 'GitHub ->',
    featured: false
  },
  {
    name: 'AI Powered Dictionary',
    url: 'https://definition.streamlit.app/',
    kicker: 'AI',
    description: 'A Streamlit app for quick AI-assisted definitions and explanations.',
    action: 'Live App ->',
    featured: false
  },
  {
    name: 'AI Voice Assistant',
    url: 'https://github.com/TakshaPatel/FridayAI',
    kicker: 'Assistant',
    description: 'A voice assistant experiment exploring automation and AI interaction.',
    action: 'GitHub ->',
    featured: false
  },
  {
    name: 'Skill Snap',
    url: 'https://github.com/TakshaPatel/SkillSnap',
    kicker: 'Productivity',
    description: 'A project aimed at capturing and presenting skills more effectively.',
    action: 'GitHub ->',
    featured: false
  },
  {
    name: 'Password Manager',
    url: 'https://github.com/TakshaPatel/SIMPLEPasswordManager',
    kicker: 'Security',
    description: 'A simple password manager project for learning secure storage concepts.',
    action: 'GitHub ->',
    featured: false
  }
];

const contactInfo = {
  email: 'takshapatel3@gmail.com',
  github: 'github.com/TakshaPatel'
};

// ---- DOM REFS ----

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

// ---- NAV TOGGLE ----

$('.nav-toggle').addEventListener('click', () => {
  $('.nav-links').classList.toggle('open');
});

$$('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    $('.nav-links').classList.remove('open');
  });
});

// ---- HERO TYPING ----

(() => {
  const el = $('.hero-typing');
  let idx = 0;
  let charIdx = 0;
  let dir = 1;

  function type() {
    const current = titles[idx];
    if (dir === 1) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        dir = -1;
        setTimeout(type, 2000);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        dir = 1;
        idx = (idx + 1) % titles.length;
      }
    }
    setTimeout(type, dir === 1 ? 80 : 40);
  }
  type();
})();

// ---- NETWORK CANVAS ----

(() => {
  const canvas = document.getElementById('network-canvas');
  const ctx = canvas.getContext('2d');
  let nodes = [];
  let mouse = { x: -9999, y: -9999 };
  let animId;

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  function initNodes() {
    nodes = [];
    const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const alpha = (1 - dist / 180) * 0.2;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      const dx = n.x - mouse.x;
      const dy = n.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = dist < 120 ? 'rgba(0, 255, 255, 0.8)' : 'rgba(0, 255, 255, 0.3)';
      ctx.fill();

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(0, 255, 255, ${(1 - dist / 120) * 0.15})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    animId = requestAnimationFrame(draw);
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  window.addEventListener('resize', () => {
    resize();
    initNodes();
  });

  resize();
  initNodes();
  draw();
})();

// ---- SCROLL REVEAL ----

(() => {
  const observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  const sections = $$('section');
  for (const s of sections) {
    s.classList.add('reveal');
    observer.observe(s);
  }
})();

// ---- PROJECT CARDS ----

function createProjectCard(p, featured = false) {
  const div = document.createElement('div');
  div.className = `project-card${featured ? ' featured' : ''}`;
  div.innerHTML = `
    <span class="project-kicker">${p.kicker}</span>
    <h3>${p.name}</h3>
    <p>${p.description}</p>
    <a href="${p.url}" class="project-link" target="_blank" rel="noopener noreferrer">${p.action}</a>
  `;
  return div;
}

const featuredGrid = $('#featured-grid');
if (featuredGrid) {
  const featured = projects.filter(p => p.featured);
  for (const p of featured) {
    featuredGrid.appendChild(createProjectCard(p, true));
  }
}

const projectsGrid = $('#projects-grid');
function renderProjects(filter = 'all') {
  projectsGrid.innerHTML = '';
  const filtered = filter === 'all' ? projects : projects.filter(p => p.kicker === filter);
  for (const p of filtered) {
    projectsGrid.appendChild(createProjectCard(p));
  }
}
renderProjects();

// Filter buttons
$$('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

// ---- CONTACT TERMINAL ----

(() => {
  const output = $('#terminal-output');
  const input = $('#terminal-input');
  const btns = $$('.term-btn');

  function typeLine(text, cb) {
    const line = document.createElement('div');
    line.className = 'terminal-output-line';
    output.appendChild(line);
    let i = 0;
    function tick() {
      if (i < text.length) {
        line.textContent += text[i];
        i++;
        setTimeout(tick, 20);
      } else if (cb) {
        cb();
      }
    }
    tick();
  }

  function execute(cmd) {
    switch (cmd.toLowerCase()) {
      case 'email':
        typeLine(`contact --email  =>  ${contactInfo.email}`);
        break;
      case 'github':
        typeLine(`contact --github  =>  ${contactInfo.github}`);
        break;
      case 'linkedin':
        typeLine(`contact --linkedin  =>  ${contactInfo.linkedin}`);
        break;
      case 'help':
        typeLine('Available commands: email, github, linkedin');
        break;
      case 'clear':
        output.innerHTML = '';
        break;
      default:
        typeLine(`error: unrecognized command "${cmd}". Type "help" for available commands.`);
    }
  }

  function handleInput(val) {
    const cmd = val.trim().toLowerCase();
    if (cmd) execute(cmd);
    input.value = '';
  }

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.innerHTML = `<span class="terminal-prompt">contact&gt;</span> ${input.value}`;
      output.appendChild(line);
      handleInput(input.value);
    }
  });

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.dataset.cmd;
      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.innerHTML = `<span class="terminal-prompt">contact&gt;</span> ${cmd}`;
      output.appendChild(line);
      execute(cmd);
    });
  });

  // Handle clickable commands in terminal body
  output.addEventListener('click', e => {
    if (e.target.classList.contains('terminal-cmd')) {
      const cmd = e.target.textContent;
      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.innerHTML = `<span class="terminal-prompt">contact&gt;</span> ${cmd}`;
      output.appendChild(line);
      execute(cmd);
    }
  });
})();
