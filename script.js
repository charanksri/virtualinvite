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

  const target = new Date('2025-04-12T19:00:00');
  const diff   = Math.max(0, target - new Date());
  const days   = Math.floor(diff / 86400000);
  const hours  = Math.floor((diff % 86400000) / 3600000);
  const mins   = Math.floor((diff % 3600000)  / 60000);

  if (choice === 'yes') {
    rs.innerHTML = `
      <span class="r-emoji">🌸</span>
      <div class="r-title">She said yes!</div>
      <p class="r-sub">Oh, this makes my heart bloom.<br>I cannot wait to see your face that evening…</p>
      <p class="r-note">✦ · · A reminder will find its way to you · · ✦</p>
      <div class="countdown-wrap">
        <div class="cd-unit"><span class="cd-num">${days}</span><span class="cd-label">Days</span></div>
        <div class="cd-unit"><span class="cd-num">${hours}</span><span class="cd-label">Hours</span></div>
        <div class="cd-unit"><span class="cd-num">${mins}</span><span class="cd-label">Mins</span></div>
      </div>
      <div class="share-section">
        <p class="share-label">Share your answer</p>
        <button class="share-btn ig-btn" onclick="shareToInstagram('yes')">
          <svg class="ig-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="white" stroke-width="1.8" fill="none"/>
            <circle cx="12" cy="12" r="4.2" stroke="white" stroke-width="1.8" fill="none"/>
            <circle cx="17.5" cy="6.5" r="1.1" fill="white"/>
          </svg>
          Send on Instagram
        </button>
        <button class="share-btn copy-btn" onclick="copyMessage('yes')" id="copyBtnYes">
          <svg class="copy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.8" fill="none"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          Copy message
        </button>
      </div>`;
    spawnSparkles();
  } else {
    rs.innerHTML = `
      <span class="r-emoji">🌿</span>
      <div class="r-title">Until next time…</div>
      <p class="r-sub">The invitation remains open,<br>whenever you're ready, I'll be waiting.</p>
      <p class="r-note">✦ · · The door is always ajar · · ✦</p>
      <div class="share-section">
        <p class="share-label">Share your answer</p>
        <button class="share-btn ig-btn" onclick="shareToInstagram('no')">
          <svg class="ig-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="white" stroke-width="1.8" fill="none"/>
            <circle cx="12" cy="12" r="4.2" stroke="white" stroke-width="1.8" fill="none"/>
            <circle cx="17.5" cy="6.5" r="1.1" fill="white"/>
          </svg>
          Send on Instagram
        </button>
        <button class="share-btn copy-btn" onclick="copyMessage('no')" id="copyBtnNo">
          <svg class="copy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.8" fill="none"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          Copy message
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
   INSTAGRAM SHARE
────────────────────────────────────────── */
const igMessages = {
  yes: `🌸 I said YES to the most beautiful invitation!\n\n🌉 Rooftop dinner under the stars\n🕯️ Saturday, April 12 · 7:00 PM\n🌷 Spring is in the air and so is something magical ✨\n\n💌 Can't wait for this evening…`,
  no:  `🌿 I had to say "maybe next time" to a beautiful spring invitation…\n\n🌸 But the door is always open 🌷\n💌 Whenever the timing is right, I'll be there ✨`
};

function shareToInstagram(choice) {
  const msg = igMessages[choice];

  /* On mobile, try to open the Instagram app DM screen.
     Instagram doesn't support direct pre-filled DMs via URL,
     so we copy the message first, then open Instagram — the
     user just pastes into DM. We show a toast explaining this. */
  navigator.clipboard.writeText(msg).then(() => {
    showToast('Message copied! Opening Instagram — just paste it into a DM 💌');
    setTimeout(() => {
      // Try Instagram app deep link first, fall back to web
      const ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|android/.test(ua)) {
        window.location.href = 'instagram://direct-inbox';
        // fallback after 1.5s if app not installed
        setTimeout(() => { window.open('https://www.instagram.com/direct/inbox/', '_blank'); }, 1500);
      } else {
        window.open('https://www.instagram.com/direct/inbox/', '_blank');
      }
    }, 800);
  }).catch(() => {
    // Clipboard failed — show manual copy prompt
    showCopyFallback(msg);
  });
}

function copyMessage(choice) {
  const msg  = igMessages[choice];
  const btnId = choice === 'yes' ? 'copyBtnYes' : 'copyBtnNo';
  const btn   = document.getElementById(btnId);

  navigator.clipboard.writeText(msg).then(() => {
    if (btn) {
      btn.innerHTML = `<span style="font-size:1rem">✅</span> Copied!`;
      btn.style.borderColor = '#34c759';
      btn.style.color       = '#34c759';
      setTimeout(() => {
        btn.innerHTML = `<svg class="copy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg> Copy message`;
        btn.style.borderColor = '';
        btn.style.color       = '';
      }, 2500);
    }
    showToast('Message copied to clipboard! 📋');
  }).catch(() => showCopyFallback(msg));
}

function showToast(msg) {
  const existing = document.getElementById('shareToast');
  if (existing) existing.remove();

  const t = document.createElement('div');
  t.id = 'shareToast';
  t.textContent = msg;
  t.style.cssText = `
    position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%) translateY(20px);
    background: rgba(20,10,8,.92); backdrop-filter: blur(12px);
    color: #fdf3e9; font-family: 'Jost',sans-serif; font-size: .78rem;
    font-weight: 300; letter-spacing: .04em;
    padding: 12px 22px; border-radius: 50px;
    border: 1px solid rgba(201,137,62,.3);
    box-shadow: 0 8px 32px rgba(0,0,0,.4);
    z-index: 9999; white-space: nowrap; max-width: 90vw;
    opacity: 0; transition: opacity .35s ease, transform .35s ease;
    text-overflow: ellipsis; overflow: hidden;
  `;
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity   = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity   = '0';
    t.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => t.remove(), 400);
  }, 3500);
}

function showCopyFallback(msg) {
  // Textarea select fallback for browsers that block clipboard API
  const ta = document.createElement('textarea');
  ta.value = msg;
  ta.style.cssText = 'position:fixed;top:-999px;left:-999px;opacity:0;';
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try {
    document.execCommand('copy');
    showToast('Message copied! Paste it into an Instagram DM 💌');
  } catch {
    showToast('Please copy the message above manually 📋');
  }
  document.body.removeChild(ta);
}
