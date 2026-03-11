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
        <p class="share-label">Save &amp; share your answer</p>
        <button class="share-btn save-img-btn" id="saveImgBtn" onclick="saveAsImage('yes')">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path d="M12 3v13M7 11l5 5 5-5" stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 20h16" stroke="white" stroke-width="1.9" stroke-linecap="round"/>
          </svg>
          Save as Image
        </button>
      </div>`;
    spawnSparkles();
  } else {
    rs.innerHTML = `
      <span class="r-emoji">🌿</span>
      <div class="r-title">Until next time.</div>
      <div class="share-section">
        <p class="share-label">Save &amp; share your answer</p>
        <button class="share-btn save-img-btn" id="saveImgBtn" onclick="saveAsImage('no')">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path d="M12 3v13M7 11l5 5 5-5" stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 20h16" stroke="white" stroke-width="1.9" stroke-linecap="round"/>
          </svg>
          Save as Image
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
   SAVE AS IMAGE — draws a shareable card on canvas
────────────────────────────────────────── */
function saveAsImage(choice) {
  const btn = document.getElementById('saveImgBtn');
  if (btn) { btn.textContent = 'Generating…'; btn.disabled = true; }

  // Square canvas — perfect for Instagram
  const SIZE = 1080;
  const c    = document.createElement('canvas');
  c.width    = SIZE;
  c.height   = SIZE;
  const cx   = c.getContext('2d');

  /* ── Background gradient ── */
  const bg = cx.createLinearGradient(0, 0, SIZE, SIZE);
  bg.addColorStop(0,   '#1e0c09');
  bg.addColorStop(0.5, '#2b1510');
  bg.addColorStop(1,   '#1a0a07');
  cx.fillStyle = bg;
  cx.fillRect(0, 0, SIZE, SIZE);

  /* ── Soft bokeh circles ── */
  const bokehData = [
    { x: 0.15, y: 0.2,  r: 180, col: '212,97,78',  a: 0.07 },
    { x: 0.75, y: 0.15, r: 220, col: '201,137,62',  a: 0.06 },
    { x: 0.5,  y: 0.6,  r: 260, col: '212,97,78',  a: 0.05 },
    { x: 0.85, y: 0.75, r: 150, col: '201,137,62',  a: 0.07 },
    { x: 0.1,  y: 0.8,  r: 170, col: '212,97,78',  a: 0.05 },
  ];
  bokehData.forEach(b => {
    const g = cx.createRadialGradient(b.x*SIZE, b.y*SIZE, 0, b.x*SIZE, b.y*SIZE, b.r);
    g.addColorStop(0, `rgba(${b.col},${b.a})`);
    g.addColorStop(1, `rgba(${b.col},0)`);
    cx.fillStyle = g;
    cx.beginPath(); cx.arc(b.x*SIZE, b.y*SIZE, b.r, 0, Math.PI*2); cx.fill();
  });

  /* ── Card rectangle ── */
  const cX = SIZE * 0.08, cY = SIZE * 0.1;
  const cW = SIZE * 0.84, cH = SIZE * 0.8;
  const rad = 36;
  roundRect(cx, cX, cY, cW, cH, rad);
  const cardGrad = cx.createLinearGradient(cX, cY, cX + cW, cY + cH);
  cardGrad.addColorStop(0,   '#fdf6ed');
  cardGrad.addColorStop(0.5, '#f8edda');
  cardGrad.addColorStop(1,   '#f3e2c6');
  cx.fillStyle = cardGrad;
  cx.fill();

  /* ── Gold top border ── */
  const goldBar = cx.createLinearGradient(cX, cY, cX + cW, cY);
  goldBar.addColorStop(0,   'transparent');
  goldBar.addColorStop(0.3, '#c9893e');
  goldBar.addColorStop(0.5, '#e8b86d');
  goldBar.addColorStop(0.7, '#c9893e');
  goldBar.addColorStop(1,   'transparent');
  roundRect(cx, cX, cY, cW, 7, { tl: rad, tr: rad, br: 0, bl: 0 });
  cx.fillStyle = goldBar;
  cx.fill();

  /* ── Header illustration area ── */
  const hH = 280;
  roundRect(cx, cX, cY, cW, hH, { tl: rad, tr: rad, br: 0, bl: 0 });
  const skyGrad = cx.createLinearGradient(cX, cY, cX, cY + hH);
  skyGrad.addColorStop(0,    '#1a0e28');
  skyGrad.addColorStop(0.35, '#2e1a3a');
  skyGrad.addColorStop(0.65, '#5c2a38');
  skyGrad.addColorStop(0.85, '#8c3e30');
  skyGrad.addColorStop(1,    '#b8602a');
  cx.fillStyle = skyGrad;
  cx.fill();

  /* ── Stars ── */
  const stars = [[0.12,0.08],[0.35,0.05],[0.55,0.04],[0.72,0.09],[0.9,0.06],[0.25,0.18],[0.65,0.14]];
  stars.forEach(([sx,sy]) => {
    cx.beginPath();
    cx.arc(cX + sx*cW, cY + sy*hH, 2.5, 0, Math.PI*2);
    cx.fillStyle = 'rgba(255,255,220,0.75)';
    cx.fill();
  });

  /* ── Moon ── */
  cx.beginPath(); cx.arc(cX + cW*0.84, cY + hH*0.28, 28, 0, Math.PI*2);
  cx.fillStyle = 'rgba(255,240,180,0.18)'; cx.fill();
  cx.beginPath(); cx.arc(cX + cW*0.86, cY + hH*0.22, 22, 0, Math.PI*2);
  cx.fillStyle = skyGrad; cx.fill();

  /* ── Bridge ── */
  const bY = cY + hH * 0.72; // deck y
  // Water
  cx.fillStyle = 'rgba(100,160,200,0.15)';
  cx.fillRect(cX, bY + 8, cW, 30);
  // Deck
  cx.fillStyle = 'rgba(50,25,15,0.8)';
  cx.fillRect(cX, bY, cW, 10);
  // Towers
  const t1x = cX + cW*0.18, t2x = cX + cW*0.82;
  cx.fillStyle = 'rgba(50,25,15,0.85)';
  cx.fillRect(t1x-9, cY + hH*0.15, 18, bY - (cY + hH*0.15));
  cx.fillRect(t2x-9, cY + hH*0.15, 18, bY - (cY + hH*0.15));
  // Tower caps
  cx.fillStyle = 'rgba(200,90,60,0.8)';
  cx.beginPath(); cx.moveTo(t1x-12, cY+hH*0.15); cx.lineTo(t1x, cY+hH*0.08); cx.lineTo(t1x+12, cY+hH*0.15); cx.fill();
  cx.beginPath(); cx.moveTo(t2x-12, cY+hH*0.15); cx.lineTo(t2x, cY+hH*0.08); cx.lineTo(t2x+12, cY+hH*0.15); cx.fill();
  // Main cable
  cx.beginPath(); cx.moveTo(t1x, cY+hH*0.17);
  cx.quadraticCurveTo(cX + cW*0.5, cY+hH*0.55, t2x, cY+hH*0.17);
  cx.strokeStyle = 'rgba(200,140,80,0.65)'; cx.lineWidth = 3.5; cx.stroke();
  // Hangers
  cx.strokeStyle = 'rgba(200,140,80,0.3)'; cx.lineWidth = 1.5;
  [0.28,0.36,0.44,0.5,0.56,0.64,0.72].forEach(px => {
    const hx  = cX + cW * px;
    // interpolate cable y at this x
    const t   = (px - 0.18) / (0.82 - 0.18);
    const cableY = cY + hH*0.17 + (cY+hH*0.55 - (cY+hH*0.17)) * 4*t*(1-t);
    cx.beginPath(); cx.moveTo(hx, cableY); cx.lineTo(hx, bY); cx.stroke();
  });
  // Tower lights
  cx.beginPath(); cx.arc(t1x, cY+hH*0.09, 5, 0, Math.PI*2);
  cx.fillStyle = 'rgba(255,220,100,0.9)'; cx.fill();
  cx.beginPath(); cx.arc(t2x, cY+hH*0.09, 5, 0, Math.PI*2);
  cx.fill();

  /* ── Flowers row at bottom of header ── */
  const flowerEmojis = ['🌸','🌷','🌺','🌼','🌸','🌷','🌻','🌺','🌸'];
  cx.font = '38px serif';
  cx.textAlign = 'center';
  flowerEmojis.forEach((f, i) => {
    const fx = cX + (i + 0.5) * (cW / flowerEmojis.length);
    cx.fillText(f, fx, cY + hH - 8);
  });

  /* ── Main text content ── */
  const textX  = cX + cW * 0.5;
  const startY = cY + hH + 60;

  // Emoji
  cx.font      = '72px serif';
  cx.textAlign = 'center';
  cx.fillText(choice === 'yes' ? '🌸' : '🌿', textX, startY);

  // Title
  cx.fillStyle = '#d4614e';
  cx.font      = 'italic 700 62px Georgia, serif';
  cx.fillText(choice === 'yes' ? 'She said yes!' : 'Until next time…', textX, startY + 80);

  // Sub text
  cx.fillStyle = '#7a4030';
  cx.font      = 'italic 28px Georgia, serif';
  cx.textAlign = 'center';
  if (choice === 'yes') {
    wrapText(cx, 'Oh, this makes my heart bloom.', textX, startY + 140, cW * 0.78, 38);
    wrapText(cx, 'I cannot wait to see your face that evening…', textX, startY + 182, cW * 0.78, 38);
  } else {
    wrapText(cx, 'The invitation remains open,', textX, startY + 140, cW * 0.78, 38);
    wrapText(cx, 'whenever you\'re ready, I\'ll be waiting.', textX, startY + 182, cW * 0.78, 38);
  }

  // Ornament
  cx.fillStyle = '#c9893e';
  cx.font      = '24px serif';
  cx.fillText('✦  ·  ·  ·  ✦', textX, startY + 248);

  // Note line
  cx.fillStyle = '#b07050';
  cx.font      = '22px "Jost", sans-serif';
  cx.fillText(choice === 'yes' ? 'Saturday, April 12 · 7:00 PM · Rooftop under the stars 🌉' : '💌 The door is always open', textX, startY + 288);

  /* ── Bottom flower decoration ── */
  cx.font      = '32px serif';
  cx.fillText('🌸  🌷  🌺  🌷  🌸', textX, cY + cH - 40);

  /* ── Watermark ── */
  cx.fillStyle = 'rgba(201,137,62,0.18)';
  cx.font      = '22px "Jost", sans-serif';
  cx.fillText('💌 Invite', textX, cY + cH - 14);

  /* ── Download ── */
  const filename = choice === 'yes' ? 'yes-she-said-yes.png' : 'until-next-time.png';
  const link     = document.createElement('a');
  link.download  = filename;
  link.href      = c.toDataURL('image/png');
  link.click();

  if (btn) {
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M5 13l4 4L19 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Saved!`;
    btn.disabled  = false;
    setTimeout(() => {
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M12 3v13M7 11l5 5 5-5" stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 20h16" stroke="white" stroke-width="1.9" stroke-linecap="round"/></svg> Save as Image`;
    }, 2500);
  }

  showToast('Image saved! Share it on Instagram Stories or DMs 🌸');
}

/* ── Canvas helpers ── */
function roundRect(ctx, x, y, w, h, r) {
  let tl, tr, br, bl;
  if (typeof r === 'number') { tl = tr = br = bl = r; }
  else { tl = r.tl||0; tr = r.tr||0; br = r.br||0; bl = r.bl||0; }
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+tr);
  ctx.lineTo(x+w, y+h-br);
  ctx.quadraticCurveTo(x+w, y+h, x+w-br, y+h);
  ctx.lineTo(x+bl, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-bl);
  ctx.lineTo(x, y+tl);
  ctx.quadraticCurveTo(x, y, x+tl, y);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = text.split(' ');
  let line    = '';
  let curY    = y;
  words.forEach((word, i) => {
    const test = line + (line ? ' ' : '') + word;
    if (ctx.measureText(test).width > maxW && i > 0) {
      ctx.fillText(line, x, curY);
      line = word; curY += lineH;
    } else { line = test; }
  });
  ctx.fillText(line, x, curY);
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
