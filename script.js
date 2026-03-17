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
    this.hue      = Math.random() > .5 ? '180,150,60' : '100,130,200';
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
    this.col      = Math.random() > .5 ? '180,150,60' : '80,110,180';
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
  bg.addColorStop(0,  '#050c18');
  bg.addColorStop(.5, '#080e1a');
  bg.addColorStop(1,  '#060a14');
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
  const colors = ['#c9a84c','#e0c06a','#f0d898','#b8c8e8','#8aaad4','#d4c090'];
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
   DATE PICKER — show on Yes click
────────────────────────────────────────── */
function showDatePicker() {
  // Hide the RSVP buttons, show the date picker panel
  document.querySelector('.btns').style.display         = 'none';
  document.querySelector('.rsvp-heading').style.display = 'none';
  const panel = document.getElementById('datePickerPanel');
  panel.classList.add('visible');

  // Pre-fill with Charan's suggested date/time
  document.getElementById('dpDate').value = '2026-03-17';
  document.getElementById('dpTime').value = '19:00';
}

function confirmDate() {
  const dateVal = document.getElementById('dpDate').value;
  const timeVal = document.getElementById('dpTime').value;

  if (!dateVal || !timeVal) {
    showToast('Please pick both a date and a time 🌸');
    return;
  }

  // Format date nicely
  const dateObj    = new Date(dateVal + 'T' + timeVal);
  const formatted  = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const timeFormatted = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  // Hide card content, show response
  document.getElementById('cardMain').style.display = 'none';
  const rs = document.getElementById('responseScreen');
  rs.style.display = 'block';

  // Step 1 — "I guessed" reveal
  rs.innerHTML = `
    <div class="magic-reveal" id="magicReveal">
      <span class="r-emoji">🔮</span>
      <div class="r-title" style="font-size:1.8rem">I had a feeling…</div>
      <p class="r-sub">Before you picked, I made a guess.<br>Let's see if I got it right.</p>
      <div class="sealed-envelope" id="sealedEnv" onclick="openMagicEnvelope('${formatted}', '${timeFormatted}')">
        <span class="se-icon">💌</span>
        <p class="se-hint">Tap to reveal my guess</p>
      </div>
    </div>`;
}

function openMagicEnvelope(formatted, timeFormatted) {
  const env = document.getElementById('sealedEnv');
  env.classList.add('opening');

  setTimeout(() => {
    const rs = document.getElementById('responseScreen');
    rs.innerHTML = `
      <span class="r-emoji">🌸</span>
      <div class="r-title">I guessed correctly!</div>
      <p class="r-sub" style="margin-bottom:16px">I knew you'd pick…</p>
      <div class="guess-reveal">
        <div class="guess-tile">
          <span class="guess-icon">🗓️</span>
          <span class="guess-val">${formatted}</span>
        </div>
        <div class="guess-tile">
          <span class="guess-icon">🕯️</span>
          <span class="guess-val">${timeFormatted}, EST</span>
        </div>
      </div>
      <p class="r-sub" style="margin-top:16px">Can't wait. See you then 💛</p>
      <div class="share-section">
        <button class="share-btn save-img-btn" onclick="nativeShare('yes', '${formatted}', '${timeFormatted}')">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="16 6 12 2 8 6" stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="2" x2="12" y2="15" stroke="white" stroke-width="1.9" stroke-linecap="round"/>
          </svg>
          Share
        </button>
      </div>`;
    spawnSparkles();
  }, 700);
}

/* ──────────────────────────────────────────
   RSVP — No path only
────────────────────────────────────────── */
function rsvp(choice) {
  document.getElementById('cardMain').style.display = 'none';
  const rs = document.getElementById('responseScreen');
  rs.style.display = 'block';

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
function nativeShare(choice, formatted, timeFormatted) {
  let text;
  if (choice === 'yes' && formatted && timeFormatted) {
    text = `🌸 Yes, I will be there!\n\n🗓️ ${formatted}\n🕯️ ${timeFormatted}, EST\n\n💌 Can't wait — see you then!`;
  } else if (choice === 'yes') {
    text = '🌸 Yes, I will be there! 💌';
  } else {
    text = '🌿 Until next time. 💌';
  }

  if (navigator.share) {
    navigator.share({ title: 'My RSVP 💌', text })
      .catch(() => {});
  } else {
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
    background:rgba(8,14,26,.95);backdrop-filter:blur(12px);
    color:#f5f0e8;font-family:'Tenor Sans',sans-serif;font-size:.72rem;
    font-weight:400;letter-spacing:.08em;padding:12px 22px;border-radius:2px;
    border:1px solid rgba(201,168,76,.3);box-shadow:0 8px 32px rgba(0,0,0,.5);
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
