/* ══════════════════════════════════════════
   DATE INVITE — script.js
   Elements: Bridges · Spring Flowers · Flight · FaceTime
══════════════════════════════════════════ */

/* ──────────────────────────────────────────
   CANVAS — deep warm bokeh background
────────────────────────────────────────── */
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');
let W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(true); }
  reset(init) {
    this.x        = Math.random() * W;
    this.y        = init ? Math.random() * H : -20;
    this.r        = 1 + Math.random() * 2.5;
    this.vx       = (Math.random() - .5) * .4;
    this.vy       = .18 + Math.random() * .55;
    this.alpha    = 0;
    this.maxAlpha = .15 + Math.random() * .25;
    this.hue      = Math.random() > .5 ? '200,100,80' : '201,137,62';
    this.life     = 0;
    this.maxLife  = 300 + Math.random() * 400;
  }
  update() {
    this.x += this.vx; this.y += this.vy; this.life++;
    const p    = this.life / this.maxLife;
    this.alpha = p < .1 ? p * 10 * this.maxAlpha : p > .85 ? (1 - p) * 6.67 * this.maxAlpha : this.maxAlpha;
    if (this.life > this.maxLife || this.y > H + 20) this.reset(false);
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.hue},${this.alpha})`;
    ctx.fill();
  }
}

class Bokeh {
  constructor() { this.reset(); }
  reset() {
    this.x        = Math.random() * W;
    this.y        = Math.random() * H;
    this.r        = 30 + Math.random() * 100;
    this.alpha    = 0;
    this.maxAlpha = .025 + Math.random() * .04;
    this.vx       = (Math.random() - .5) * .15;
    this.vy       = (Math.random() - .5) * .1;
    this.life     = 0;
    this.maxLife  = 500 + Math.random() * 600;
    this.col      = Math.random() > .5 ? '212,97,78' : '201,137,62';
  }
  update() {
    this.x += this.vx; this.y += this.vy; this.life++;
    const p    = this.life / this.maxLife;
    this.alpha = p < .2 ? p * 5 * this.maxAlpha : p > .8 ? (1 - p) * 5 * this.maxAlpha : this.maxAlpha;
    if (this.life > this.maxLife) this.reset();
  }
  draw() {
    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    g.addColorStop(0, `rgba(${this.col},${this.alpha})`);
    g.addColorStop(1, `rgba(${this.col},0)`);
    ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = g; ctx.fill();
  }
}

const particles = []; for (let i = 0; i < 90; i++) particles.push(new Particle());
const bokehs    = []; for (let i = 0; i < 18; i++) bokehs.push(new Bokeh());

function loop() {
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0,  '#1e0c09');
  bg.addColorStop(.5, '#2b1510');
  bg.addColorStop(1,  '#1a0a07');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  bokehs.forEach(b    => { b.update(); b.draw(); });
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(loop);
}
loop();


/* ──────────────────────────────────────────
   FLIGHT — Animated birds flying across screen
────────────────────────────────────────── */
(function spawnBirds() {
  const layer    = document.getElementById('birdsLayer');
  const birdEmojis = ['🕊️', '🦋', '🐦', '🦢', '🕊️', '🦋'];
  const count    = 10;

  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'bird';
    b.textContent = birdEmojis[Math.floor(Math.random() * birdEmojis.length)];

    // Each bird flies at a different vertical position
    const topPct  = 5 + Math.random() * 55; // upper 60% of screen
    const drift   = (Math.random() - .5) * 60 + 'px';   // vertical wobble mid-flight
    const drift2  = (Math.random() - .5) * 80 + 'px';   // vertical wobble end

    b.style.cssText = [
      `top: ${topPct}vh`,
      `--drift: ${drift}`,
      `--drift2: ${drift2}`,
      `animation-duration: ${14 + Math.random() * 14}s`,
      `animation-delay: ${Math.random() * 20}s`,
      `font-size: ${0.8 + Math.random() * 0.8}rem`,
    ].join(';');

    layer.appendChild(b);
  }
})();


/* ──────────────────────────────────────────
   SPRING FLOWERS — CSS falling petals
────────────────────────────────────────── */
(function spawnPetals() {
  const colors = ['#f5b8a0','#f2a08e','#e8836a','#f7cdb8','#d4a07a','#c9893e','#f0c0d0'];
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'css-petal';
    p.style.cssText = [
      `left: ${Math.random() * 100}vw`,
      `width: ${7 + Math.random() * 10}px`,
      `height: ${11 + Math.random() * 10}px`,
      `background: ${colors[Math.floor(Math.random() * colors.length)]}`,
      `animation-duration: ${9 + Math.random() * 13}s`,
      `animation-delay: ${Math.random() * 16}s`,
      `border-radius: ${Math.random() > .5 ? '60% 10% 60% 10%' : '10% 60% 10% 60%'}`,
      'top: -20px'
    ].join(';');
    document.body.appendChild(p);
  }
})();


/* ──────────────────────────────────────────
   ENVELOPE OPEN — transition to Scene 2
────────────────────────────────────────── */
function openEnvelope() {
  const wrap = document.getElementById('envWrap');

  const style = document.createElement('style');
  style.textContent = `
    @keyframes envFlyAway {
      0%   { opacity: 1; transform: scale(1) translateY(0) rotate(0deg); }
      100% { opacity: 0; transform: scale(.65) translateY(50px) rotate(4deg); }
    }`;
  document.head.appendChild(style);

  wrap.style.animation = 'envFlyAway .7s cubic-bezier(.55,.06,.68,.19) forwards';
  document.querySelector('.pre-text').style.cssText = 'transition:opacity .4s;opacity:0;';
  document.querySelector('.tap-hint').style.cssText = 'transition:opacity .3s;opacity:0;';

  setTimeout(() => {
    document.getElementById('scene1').style.display = 'none';
    const s2 = document.getElementById('scene2');
    s2.style.display = 'flex';
    setTimeout(() => {
      document.getElementById('heroQuote').classList.add('visible');
      setTimeout(() => { document.getElementById('invCard').classList.add('visible'); }, 300);
    }, 80);
  }, 650);
}


/* ──────────────────────────────────────────
   RSVP
────────────────────────────────────────── */
function rsvp(choice) {
  document.getElementById('cardMain').style.display = 'none';
  const rs = document.getElementById('responseScreen');
  rs.style.display = 'block';

  if (choice === 'yes') {
    rs.innerHTML = `
      <span class="r-emoji">🌸</span>
      <div class="r-title">Yes, I will be there.</div>
      <div class="share-section">
        <button class="share-btn save-img-btn" onclick="nativeShare('yes')">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="16 6 12 2 8 6" stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="2" x2="12" y2="15" stroke="white" stroke-width="1.9" stroke-linecap="round"/>
          </svg>
          Share
        </button>
      </div>`;
    spawnSparkles();
  } else {
    rs.innerHTML = `
      <span class="r-emoji">🌿</span>
      <div class="r-title">Until next time.</div>
      <div class="share-section">
        <button class="share-btn save-img-btn" onclick="nativeShare('no')">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="16 6 12 2 8 6" stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="2" x2="12" y2="15" stroke="white" stroke-width="1.9" stroke-linecap="round"/>
          </svg>
          Share
        </button>
      </div>`;
  }
}


/* ──────────────────────────────────────────
   SPARKLE BURST
────────────────────────────────────────── */
function spawnSparkles() {
  const set = ['✨','💖','🌸','🌷','💫','🌺','💕','🌼','✿','❤️','🕊️'];

  function burst(n) {
    for (let i = 0; i < n; i++) {
      const s = document.createElement('div');
      s.className = 'sp';
      s.textContent = set[Math.floor(Math.random() * set.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist  = 80 + Math.random() * 200;
      s.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      s.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
      s.style.left          = (20 + Math.random() * 60) + 'vw';
      s.style.top           = (20 + Math.random() * 60) + 'vh';
      s.style.animationDelay = Math.random() * .5 + 's';
      s.style.fontSize      = (.8 + Math.random() * 1.2) + 'rem';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1600);
    }
  }

  burst(32);
  setTimeout(() => burst(20), 700);
  setTimeout(() => burst(16), 1400);
}


/* ──────────────────────────────────────────
   NATIVE SHARE
────────────────────────────────────────── */
const shareTexts = {
  yes: '🌸 Yes, I will be there. — Sent via a spring invite 💌',
  no:  '🌿 Until next time. — Sent via a spring invite 💌'
};

function nativeShare(choice) {
  const text = shareTexts[choice];
  if (navigator.share) {
    navigator.share({ title: 'My RSVP 💌', text })
      .catch(() => {}); // user cancelled — do nothing
  } else {
    // Fallback: copy text + show toast
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied! Paste it into an Instagram DM 💌');
    }).catch(() => {
      showToast('Take a screenshot and send it on Instagram 📸');
    });
  }
}

function showToast(msg) {
  const existing = document.getElementById('shareToast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.id    = 'shareToast';
  t.textContent = msg;
  t.style.cssText = `
    position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(20px);
    background:rgba(20,10,8,.92);backdrop-filter:blur(12px);
    color:#fdf3e9;font-family:'Jost',sans-serif;font-size:.78rem;
    font-weight:300;letter-spacing:.04em;padding:12px 22px;border-radius:50px;
    border:1px solid rgba(201,137,62,.3);box-shadow:0 8px 32px rgba(0,0,0,.4);
    z-index:9999;white-space:nowrap;max-width:90vw;
    opacity:0;transition:opacity .35s ease,transform .35s ease;
    text-overflow:ellipsis;overflow:hidden;`;
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity='1'; t.style.transform='translateX(-50%) translateY(0)'; });
  setTimeout(() => {
    t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(10px)';
    setTimeout(() => t.remove(), 400);
  }, 3800);
}
