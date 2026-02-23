/* ============================================================
   GAME VAULT — main.js
   Core app logic: particles, rendering, modal, leaderboard,
   navigation, search, filters, counters, lazy loading.
============================================================ */

// ── PARTICLE BACKGROUND ───────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = {x: -9999, y: -9999};

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  const COLORS = ['rgba(0,229,255,', 'rgba(168,85,247,', 'rgba(236,72,153,', 'rgba(34,211,160,'];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 2.5 + 0.5;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      // mouse repulsion
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 80) { this.x += dx / dist * 0.5; this.y += dy / dist * 0.5; }
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  // Init particles
  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,229,255,${(1 - d/120) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
  }
  animate();
})();

// ── NAVBAR SCROLL ─────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ── HAMBURGER ─────────────────────────────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// ── ANIMATED COUNTERS ─────────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// Intersection observer to trigger counters
const heroObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { animateCounters(); heroObserver.disconnect(); }
}, { threshold: 0.3 });
heroObserver.observe(document.getElementById('hero'));

// ── GAMES GRID RENDERING ──────────────────────────────────────
const BATCH_SIZE = 24;  // games loaded per batch
let currentFilter = 'all';
let currentSearch = '';
let loadedCount = 0;

function getFilteredGames() {
  return GAMES.filter(g => {
    const matchCat = currentFilter === 'all' || g.cat === currentFilter;
    const matchSearch = currentSearch === '' ||
      g.title.toLowerCase().includes(currentSearch) ||
      g.desc.toLowerCase().includes(currentSearch) ||
      g.cat.toLowerCase().includes(currentSearch);
    return matchCat && matchSearch;
  });
}

function renderGames(reset = false) {
  const grid = document.getElementById('gamesGrid');
  const filtered = getFilteredGames();

  if (reset) {
    grid.innerHTML = '';
    loadedCount = 0;
  }

  const toRender = filtered.slice(loadedCount, loadedCount + BATCH_SIZE);
  toRender.forEach((game, i) => {
    const card = createGameCard(game, loadedCount + i);
    grid.appendChild(card);
  });
  loadedCount += toRender.length;

  // Show/hide Load More
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  loadMoreBtn.style.display = loadedCount < filtered.length ? 'block' : 'none';

  // Empty state
  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--muted)">
      <div style="font-size:3rem;margin-bottom:1rem">🔍</div>
      <div style="font-family:Rajdhani,sans-serif;font-size:1.5rem">No games found</div>
      <div style="font-size:0.85rem;margin-top:0.5rem">Try a different search or category</div>
    </div>`;
  }
}

function createGameCard(game, index) {
  const card = document.createElement('div');
  card.className = 'game-card';
  card.dataset.cat = game.cat;
  card.dataset.id = game.id;
  card.style.animationDelay = `${(index % BATCH_SIZE) * 0.04}s`;

  card.innerHTML = `
    <div class="game-thumb" style="background:linear-gradient(135deg,${game.color}18,${game.color}08)">
      <span style="filter:drop-shadow(0 0 12px ${game.color})">${game.emoji}</span>
    </div>
    <div class="game-info">
      <span class="game-cat-badge cat-${game.cat}">${game.cat.toUpperCase()}</span>
      <div class="game-title">${game.title}</div>
      <div class="game-desc">${game.desc}</div>
      <button class="play-btn">▶ PLAY NOW</button>
    </div>`;

  card.addEventListener('click', () => openGame(game));
  return card;
}

// Init game grid
renderGames(true);

// Load More
document.getElementById('loadMoreBtn').addEventListener('click', () => renderGames(false));

// ── FILTER BUTTONS ────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.cat;
    renderGames(true);
    document.getElementById('games').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Nav category filter
document.querySelectorAll('.nav-cat').forEach(link => {
  link.addEventListener('click', e => {
    const filter = link.dataset.filter;
    if (filter) {
      e.preventDefault();
      currentFilter = filter;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      document.querySelector(`.filter-btn[data-cat="${filter}"]`)?.classList.add('active');
      renderGames(true);
      document.getElementById('games').scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('navLinks').classList.remove('open');
    }
    document.querySelectorAll('.nav-cat').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
  });
});

// ── SEARCH ────────────────────────────────────────────────────
let searchTimeout;
document.getElementById('searchInput').addEventListener('input', e => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentSearch = e.target.value.toLowerCase().trim();
    renderGames(true);
  }, 200);
});

// ── TOOLS GRID ────────────────────────────────────────────────
const toolsGrid = document.getElementById('toolsGrid');
TOOLS.forEach(tool => {
  const card = document.createElement('div');
  card.className = 'tool-card';
  card.innerHTML = `
    <div class="tool-icon">${tool.emoji}</div>
    <div class="tool-title">${tool.title}</div>
    <div class="tool-desc">${tool.desc}</div>
    <button class="tool-open-btn">Open Tool</button>`;
  card.addEventListener('click', () => openTool(tool));
  toolsGrid.appendChild(card);
});

// ── MODAL ─────────────────────────────────────────────────────
const modal = document.getElementById('gameModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

function openGame(game) {
  modalTitle.textContent = `${game.emoji}  ${game.title}`;
  modalBody.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--muted)"><span>Loading…</span></div>';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Let modal render first
  requestAnimationFrame(() => {
    try { game.playFn(modalBody); }
    catch(e) { modalBody.innerHTML = `<div style="padding:2rem;text-align:center;color:var(--muted)">Error loading game: ${e.message}</div>`; console.error(e); }
  });
}

function openTool(tool) {
  modalTitle.textContent = `${tool.emoji}  ${tool.title}`;
  modalBody.innerHTML = '';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    try { tool.openFn(modalBody); }
    catch(e) { modalBody.innerHTML = `<div style="padding:2rem;text-align:center;color:var(--muted)">Error loading tool: ${e.message}</div>`; console.error(e); }
  });
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  // Small delay to let animations run before clearing
  setTimeout(() => { modalBody.innerHTML = ''; }, 300);
}

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('closeModalFooter').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

// Fullscreen
document.getElementById('fullscreenBtn').addEventListener('click', () => {
  const inner = document.querySelector('.modal-inner');
  if (!document.fullscreenElement) {
    inner.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
});

// ── LEADERBOARD ───────────────────────────────────────────────
const AVATARS = ['🦊','🐺','🐯','🦁','🐻','🐼','🦄','🐲','👾','🤖','👻','💀','🧙','🧛','🦸'];
const GAMES_LIST = GAMES.map(g => g.title);

function generateLeaderboard(type) {
  const count = type === 'global' ? 15 : type === 'daily' ? 10 : 12;
  const names = ['NeonPhantom','CyberWolf','GlitchKing','PixelRacer','VoidRunner','QuantumX','DarkMatter','StarByte','GridHero','LaserFox','BinaryBlade','CryptoAce','NullZone','MaxVelocity','UltraGamer','ShadowByte','ZeroLag','TurboKlick','AlphaGhost','BetaBlaze'];
  return Array.from({length: count}, (_, i) => ({
    rank: i + 1,
    name: names[Math.floor(Math.random() * names.length)],
    avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    game: GAMES_LIST[Math.floor(Math.random() * GAMES_LIST.length)],
    score: Math.floor(Math.random() * 50000) + (count - i) * 3000,
    badge: i < 3 ? ['🏆','🥈','🥉'][i] : i < 5 ? '⚡' : '',
  })).sort((a, b) => b.score - a.score).map((e, i) => ({...e, rank: i+1}));
}

let currentLbType = 'global';

function renderLeaderboard(type) {
  const entries = generateLeaderboard(type);
  const table = document.getElementById('lbTable');
  table.innerHTML = entries.map((e, i) => `
    <div class="lb-row" style="animation-delay:${i*0.05}s">
      <div class="lb-rank ${e.rank<=3?'rank-'+e.rank:''}">${e.rank}</div>
      <div class="lb-avatar" style="background:linear-gradient(135deg,rgba(0,229,255,0.1),rgba(168,85,247,0.1))">${e.avatar}</div>
      <div class="lb-name">${e.name} ${e.badge}</div>
      <div class="lb-game">${e.game}</div>
      <div class="lb-score">${e.score.toLocaleString()}</div>
    </div>`).join('');
}

document.querySelectorAll('.lb-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentLbType = tab.dataset.lb;
    renderLeaderboard(currentLbType);
  });
});

renderLeaderboard('global');
// Refresh leaderboard every 30s for fake live feel
setInterval(() => renderLeaderboard(currentLbType), 30000);

// ── TOAST NOTIFICATION ────────────────────────────────────────
window.showToast = function(msg, duration = 2500) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), duration);
};

// ── SMOOTH SECTION FADE-IN ────────────────────────────────────
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('section').forEach(sec => {
  sec.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  sec.style.opacity = '0';
  sec.style.transform = 'translateY(30px)';
  fadeObserver.observe(sec);
});

// ── CLICK SOUND (optional subtle tick) ───────────────────────
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;
function playClick() {
  try {
    if (!audioCtx) audioCtx = new AudioContext();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.connect(g); g.connect(audioCtx.destination);
    o.frequency.value = 800;
    g.gain.setValueAtTime(0.08, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    o.start(); o.stop(audioCtx.currentTime + 0.05);
  } catch(e) {}
}

document.querySelectorAll('.play-btn, .tool-open-btn, .filter-btn').forEach(btn => {
  btn.addEventListener('click', playClick);
});

// ── LAZY LOADING IMAGES (IntersectionObserver) ────────────────
// Cards are only created when they scroll into view via the grid;
// the load-more system handles lazy loading natively.

// ── KEYBOARD SHORTCUT HINTS ──────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === '/' && !modal.classList.contains('open')) {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
});
