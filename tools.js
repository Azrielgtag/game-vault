? 'Heads' : 'Tails';
      if (result === 'Heads') heads++; else tails++;
      document.getElementById('coinResult').textContent = result + (result === 'Heads' ? ' 👑' : ' 🦅');
      document.getElementById('coinStats').textContent = `H: ${heads} · T: ${tails} · Total: ${heads+tails}`;
      flipping = false;
    }, 800);
  }
  body.innerHTML = `<style>@keyframes coinSpin{0%{transform:rotateY(0)}50%{transform:rotateY(720deg) scale(1.2)}100%{transform:rotateY(1440deg)}}</style>
  <div class="tool-modal-body">
  <div id="coinEl" style="width:120px;height:120px;border-radius:50%;background:radial-gradient(circle at 35% 35%, #fbbf24, #92400e);border:4px solid #fbbf24;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:3rem;box-shadow:0 0 30px rgba(251,191,36,0.4)" onclick="window.flipCoin&&window.flipCoin()">🪙</div>
  <div class="tool-result" id="coinResult" style="border-color:rgba(251,191,36,0.3);color:#fbbf24;text-shadow:0 0 20px #fbbf24">Click to flip!</div>
  <div id="coinStats" style="color:#64748b;font-size:0.9rem">H: 0 · T: 0 · Total: 0</div>
  <button class="tool-action-btn" onclick="window.flipCoin&&window.flipCoin()">Flip Coin 🪙</button></div>`;
  window.flipCoin = flip;
}

// ─── RANDOM NUMBER GENERATOR ─────────────────────────────────
function openRNG(body) {
  function generate() {
    const min = parseInt(document.getElementById('rngMin').value) || 1;
    const max = parseInt(document.getElementById('rngMax').value) || 100;
    const count = parseInt(document.getElementById('rngCount').value) || 1;
    const results = Array.from({length: Math.min(count, 20)}, () => min + Math.floor(Math.random() * (max - min + 1)));
    document.getElementById('rngResult').textContent = results.join('  ·  ');
    document.getElementById('rngResult').style.animation = 'none'; void document.getElementById('rngResult').offsetWidth; document.getElementById('rngResult').style.animation = 'fadeIn 0.3s ease';
  }
  body.innerHTML = `<div class="tool-modal-body">
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;max-width:360px;text-align:center">
    <div><label style="color:#64748b;font-size:0.8rem;letter-spacing:1px">MIN</label><input id="rngMin" type="number" value="1" style="width:100%;padding:0.6rem;background:rgba(0,0,0,0.3);border:1px solid rgba(34,211,160,0.3);border-radius:8px;color:#22d3a0;font-family:Rajdhani,sans-serif;font-size:1.2rem;text-align:center;outline:none;margin-top:0.3rem" /></div>
    <div><label style="color:#64748b;font-size:0.8rem;letter-spacing:1px">MAX</label><input id="rngMax" type="number" value="100" style="width:100%;padding:0.6rem;background:rgba(0,0,0,0.3);border:1px solid rgba(34,211,160,0.3);border-radius:8px;color:#22d3a0;font-family:Rajdhani,sans-serif;font-size:1.2rem;text-align:center;outline:none;margin-top:0.3rem" /></div>
    <div><label style="color:#64748b;font-size:0.8rem;letter-spacing:1px">COUNT</label><input id="rngCount" type="number" value="1" min="1" max="20" style="width:100%;padding:0.6rem;background:rgba(0,0,0,0.3);border:1px solid rgba(34,211,160,0.3);border-radius:8px;color:#22d3a0;font-family:Rajdhani,sans-serif;font-size:1.2rem;text-align:center;outline:none;margin-top:0.3rem" /></div>
  </div>
  <div class="tool-result" id="rngResult" style="border-color:rgba(34,211,160,0.3);color:#22d3a0;font-size:3rem">?</div>
  <button class="tool-action-btn" onclick="window.rngGen&&window.rngGen()" style="background:linear-gradient(135deg,#22d3a0,#0891b2)">Generate 🎲</button></div>`;
  window.rngGen = generate;
}

// ─── PARTICLE SANDBOX (tool version) ────────────────────────
function openParticles(body) {
  body.innerHTML = `<div class="tool-modal-body" style="padding:0">
  <canvas id="partCanvas" style="width:100%;height:420px;cursor:crosshair;display:block;touch-action:none"></canvas>
  <div style="padding:0.75rem 1.5rem;display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;border-top:1px solid rgba(0,229,255,0.1)">
    ${[['🔵','#00e5ff'],['🟣','#a855f7'],['🔴','#ec4899'],['🟢','#22d3a0'],['🟡','#fbbf24'],['🌊','#3b82f6']].map(([e,c])=>`<div onclick="window.partColor='${c}'" style="width:32px;height:32px;border-radius:50%;background:${c};cursor:pointer;transition:transform 0.15s;border:2px solid rgba(255,255,255,0.3)" onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform=''">${e}</div>`).join('')}
    <label style="display:flex;align-items:center;gap:0.5rem;color:#64748b;font-size:0.85rem;cursor:pointer"><input id="gravCheck" type="checkbox" checked /> Gravity</label>
    <button onclick="window.partClear&&window.partClear()" class="btn btn-outline" style="padding:0.3rem 0.75rem;margin-left:auto">Clear</button>
  </div></div>`;
  const canvas = document.getElementById('partCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth; canvas.height = 420;
  let particles = [], mouse = {x:0, y:0, down:false};
  window.partColor = '#00e5ff';
  window.partClear = () => particles = [];
  function spawnAt(x, y) {
    for (let i = 0; i < 5; i++) {
      particles.push({
        x, y, vx: (Math.random()-0.5)*4, vy: -Math.random()*5-1,
        r: 3+Math.random()*4, color: window.partColor,
        alpha: 1, life: 0.98 + Math.random()*0.01
      });
    }
  }
  canvas.addEventListener('mousedown', e => { mouse.down=true; const r=canvas.getBoundingClientRect(); spawnAt(e.clientX-r.left, e.clientY-r.top); });
  canvas.addEventListener('mousemove', e => { if(!mouse.down) return; const r=canvas.getBoundingClientRect(); spawnAt(e.clientX-r.left, e.clientY-r.top); });
  document.addEventListener('mouseup', () => mouse.down=false);
  canvas.addEventListener('touchstart', e => { const r=canvas.getBoundingClientRect(); spawnAt(e.touches[0].clientX-r.left,e.touches[0].clientY-r.top); e.preventDefault(); }, {passive:false});
  canvas.addEventListener('touchmove', e => { const r=canvas.getBoundingClientRect(); spawnAt(e.touches[0].clientX-r.left,e.touches[0].clientY-r.top); e.preventDefault(); }, {passive:false});
  let rAF;
  function loop() {
    rAF = requestAnimationFrame(loop);
    if (!document.getElementById('partCanvas')) { cancelAnimationFrame(rAF); return; }
    ctx.fillStyle = 'rgba(4,8,16,0.2)'; ctx.fillRect(0,0,canvas.width,canvas.height);
    const gravity = document.getElementById('gravCheck')?.checked ? 0.15 : 0;
    particles.forEach(p => {
      p.vy += gravity; p.x += p.vx; p.y += p.vy; p.alpha *= p.life;
      if (p.y > canvas.height) { p.vy *= -0.6; p.y = canvas.height; }
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = 10; ctx.shadowColor = p.color;
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
    });
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    particles = particles.filter(p => p.alpha > 0.01);
    if (particles.length < 5) {
      for(let i=0;i<3;i++) spawnAt(Math.random()*canvas.width, Math.random()*canvas.height*0.3);
    }
  }
  document.getElementById('closeModal').addEventListener('click', () => cancelAnimationFrame(rAF), {once:true});
  document.getElementById('closeModalFooter').addEventListener('click', () => cancelAnimationFrame(rAF), {once:true});
  loop();
}

// ─── MEME GENERATOR ───────────────────────────────────────────
function openMemeGen(body) {
  const TEMPLATES = [
    {name:'Drake',emoji:'🕴',top:'When you use plain CSS',bottom:'When you discover CSS Variables'},
    {name:'Doge',emoji:'🐕',top:'Such code',bottom:'Very wow'},
    {name:'Distracted BF',emoji:'💁',top:'Shiny new framework',bottom:'Your current project'},
    {name:'This is Fine',emoji:'🔥',top:'Production is on fire',bottom:'This is fine'},
    {name:'Two Buttons',emoji:'😰',top:'Sleep',bottom:'One more game'},
  ];
  function generate() {
    const top = document.getElementById('memeTop').value || 'Top Text';
    const bottom = document.getElementById('memeBottom').value || 'Bottom Text';
    const tmpl = TEMPLATES[parseInt(document.getElementById('memeTmpl').value)];
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#111827'; ctx.fillRect(0,0,400,300);
    ctx.fillStyle = 'rgba(0,229,255,0.05)'; ctx.fillRect(0,0,400,300);
    ctx.font = 'bold 60px Rajdhani, sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(0,229,255,0.1)';
    ctx.fillText(tmpl.emoji, 200, 180);
    ctx.font = 'bold 28px Rajdhani, sans-serif'; ctx.textAlign = 'center';
    ctx.strokeStyle = '#000'; ctx.lineWidth = 4;
    ctx.strokeText(top.toUpperCase(), 200, 40); ctx.fillStyle = '#fff'; ctx.fillText(top.toUpperCase(), 200, 40);
    ctx.strokeText(bottom.toUpperCase(), 200, 285); ctx.fillStyle = '#fff'; ctx.fillText(bottom.toUpperCase(), 200, 285);
    ctx.fillStyle = '#64748b'; ctx.font = '14px Exo 2, sans-serif'; ctx.fillText(tmpl.name + ' template — Game Vault', 200, 160);
  }
  body.innerHTML = `<div class="tool-modal-body">
  <canvas id="memeCanvas" width="400" height="300" style="border:1px solid rgba(0,229,255,0.2);border-radius:8px;margin-bottom:1rem"></canvas>
  <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:380px">
    <select id="memeTmpl" style="padding:0.6rem;background:#111827;border:1px solid rgba(0,229,255,0.3);border-radius:8px;color:#e2e8f0;font-family:Exo 2,sans-serif;outline:none">
      ${TEMPLATES.map((t,i)=>`<option value="${i}">${t.emoji} ${t.name}</option>`).join('')}
    </select>
    <input id="memeTop" placeholder="Top text" style="padding:0.6rem;background:rgba(0,229,255,0.05);border:1px solid rgba(0,229,255,0.2);border-radius:8px;color:#e2e8f0;font-family:Rajdhani,sans-serif;font-size:1rem;outline:none" />
    <input id="memeBottom" placeholder="Bottom text" style="padding:0.6rem;background:rgba(0,229,255,0.05);border:1px solid rgba(0,229,255,0.2);border-radius:8px;color:#e2e8f0;font-family:Rajdhani,sans-serif;font-size:1rem;outline:none" />
    <button class="tool-action-btn" onclick="window.genMeme&&window.genMeme()">Generate Meme 🖼</button>
  </div></div>`;
  window.genMeme = generate;
  generate();
}

// ─── COUNTDOWN TIMER ─────────────────────────────────────────
function openTimer(body) {
  let interval, remaining = 0, running = false;
  function start() {
    const m = parseInt(document.getElementById('timerMin').value)||0;
    const s = parseInt(document.getElementById('timerSec').value)||0;
    remaining = m*60+s; if(!remaining) return;
    clearInterval(interval); running = true;
    interval = setInterval(() => {
      remaining--;
      updateDisplay();
      if(remaining<=0) {
        clearInterval(interval); running=false;
        document.getElementById('timerDisplay').style.color = '#ec4899';
        document.getElementById('timerDisplay').style.textShadow = '0 0 30px #ec4899';
        showToast('⏰ Time\'s up!');
      }
    }, 1000);
  }
  function pause() { clearInterval(interval); running=false; }
  function reset() { clearInterval(interval); running=false; remaining=0; updateDisplay(); document.getElementById('timerDisplay').style.color='#fbbf24';document.getElementById('timerDisplay').style.textShadow='0 0 20px #fbbf24'; }
  function updateDisplay() {
    const m=Math.floor(remaining/60), s=remaining%60;
    document.getElementById('timerDisplay').textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  body.innerHTML = `<div class="tool-modal-body">
  <div id="timerDisplay" style="font-family:Rajdhani,sans-serif;font-size:6rem;font-weight:700;color:#fbbf24;text-shadow:0 0 20px #fbbf24;letter-spacing:4px">00:00</div>
  <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;justify-content:center">
    <div style="text-align:center"><label style="color:#64748b;font-size:0.75rem;letter-spacing:1px">MIN</label><br><input id="timerMin" type="number" value="1" min="0" max="99" style="width:70px;padding:0.5rem;background:rgba(0,0,0,0.3);border:1px solid rgba(251,191,36,0.3);border-radius:8px;color:#fbbf24;font-family:Rajdhani,sans-serif;font-size:1.5rem;text-align:center;outline:none" /></div>
    <div style="font-family:Rajdhani,sans-serif;font-size:3rem;color:#fbbf24;margin-top:1rem">:</div>
    <div style="text-align:center"><label style="color:#64748b;font-size:0.75rem;letter-spacing:1px">SEC</label><br><input id="timerSec" type="number" value="0" min="0" max="59" style="width:70px;padding:0.5rem;background:rgba(0,0,0,0.3);border:1px solid rgba(251,191,36,0.3);border-radius:8px;color:#fbbf24;font-family:Rajdhani,sans-serif;font-size:1.5rem;text-align:center;outline:none" /></div>
  </div>
  <div style="display:flex;gap:0.75rem;flex-wrap:wrap;justify-content:center">
    <button class="tool-action-btn" onclick="window.timerStart&&window.timerStart()">▶ Start</button>
    <button class="btn btn-outline" onclick="window.timerPause&&window.timerPause()">⏸ Pause</button>
    <button class="btn btn-outline" onclick="window.timerReset&&window.timerReset()">↺ Reset</button>
  </div></div>`;
  window.timerStart = start; window.timerPause = pause; window.timerReset = reset;
  document.getElementById('closeModal').addEventListener('click', () => clearInterval(interval), {once:true});
  document.getElementById('closeModalFooter').addEventListener('click', () => clearInterval(interval), {once:true});
}

// ─── DECISION WHEEL ──────────────────────────────────────────
function openDecisionWheel(body) {
  const DEFAULT_OPTIONS = ['Pizza','Tacos','Sushi','Burger','Pasta','Salad'];
  let options = [...DEFAULT_OPTIONS], spinning = false, rAF;
  const COLORS = ['#00e5ff','#a855f7','#ec4899','#22d3a0','#fbbf24','#3b82f6','#ef4444','#f97316'];
  function render() {
    const canvas = document.getElementById('wheelCanvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d'), W=300, cx=150, cy=150, r=130;
    ctx.clearRect(0,0,W,W);
    options.forEach((opt, i) => {
      const start = (i/options.length)*Math.PI*2, end = ((i+1)/options.length)*Math.PI*2;
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,start,end); ctx.closePath();
      ctx.fillStyle = COLORS[i%COLORS.length]; ctx.fill();
      ctx.strokeStyle = '#040810'; ctx.lineWidth = 2; ctx.stroke();
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(start+(end-start)/2);
      ctx.textAlign = 'right'; ctx.fillStyle = '#000'; ctx.font = 'bold 13px Rajdhani,sans-serif';
      ctx.fillText(opt.length>12?opt.slice(0,12)+'…':opt, r-8, 5);
      ctx.restore();
    });
    // center
    ctx.shadowBlur = 16; ctx.shadowColor = '#00e5ff';
    ctx.beginPath(); ctx.arc(cx,cy,18,0,Math.PI*2); ctx.fillStyle = '#040810'; ctx.fill();
    ctx.strokeStyle = '#00e5ff'; ctx.lineWidth = 3; ctx.stroke();
    ctx.shadowBlur = 0;
    // pointer
    ctx.shadowBlur = 10; ctx.shadowColor = '#ec4899';
    ctx.beginPath(); ctx.moveTo(cx+r+12,cy); ctx.lineTo(cx+r-6,cy-8); ctx.lineTo(cx+r-6,cy+8); ctx.closePath();
    ctx.fillStyle = '#ec4899'; ctx.fill(); ctx.shadowBlur = 0;
  }
  let angle = 0, targetAngle = 0, lastFrame;
  function spin() {
    if(spinning) return;
    spinning = true;
    targetAngle = angle + (Math.PI*10) + Math.random()*Math.PI*4;
    const canvas = document.getElementById('wheelCanvas');
    function animate(ts) {
      if(!document.getElementById('wheelCanvas')) { cancelAnimationFrame(rAF); return; }
      const diff = targetAngle - angle;
      angle += diff * 0.05;
      canvas.style.transform = `rotate(${angle}rad)`;
      if(diff > 0.01) rAF = requestAnimationFrame(animate);
      else {
        angle = targetAngle % (Math.PI*2);
        canvas.style.transform = `rotate(${angle}rad)`;
        spinning = false;
        const idx = Math.floor((options.length - (angle/(Math.PI*2)*options.length) % options.length) % options.length);
        document.getElementById('wheelResult').textContent = `🎯 ${options[Math.floor(idx)] || options[0]}`;
      }
    }
    rAF = requestAnimationFrame(animate);
  }
  body.innerHTML = `<div class="tool-modal-body" style="gap:1rem">
  <div style="display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap;justify-content:center">
    <canvas id="wheelCanvas" width="300" height="300" style="border-radius:50%;cursor:pointer;transition:none" onclick="window.spinWheel&&window.spinWheel()"></canvas>
    <div style="display:flex;flex-direction:column;gap:0.5rem;min-width:160px">
      <div id="wheelResult" style="font-family:Rajdhani,sans-serif;font-size:1.2rem;color:#00e5ff;min-height:2rem">Spin to decide!</div>
      <textarea id="wheelOptions" style="width:160px;height:120px;background:rgba(0,0,0,0.3);border:1px solid rgba(0,229,255,0.2);border-radius:8px;color:#e2e8f0;font-family:Exo 2,sans-serif;font-size:0.85rem;padding:0.5rem;resize:none;outline:none">${DEFAULT_OPTIONS.join('\n')}</textarea>
      <button class="btn btn-outline" style="font-size:0.85rem;padding:0.4rem" onclick="window.updateWheel&&window.updateWheel()">Update Options</button>
      <button class="tool-action-btn" onclick="window.spinWheel&&window.spinWheel()">🌀 Spin!</button>
    </div>
  </div></div>`;
  window.spinWheel = spin;
  window.updateWheel = function() {
    const text = document.getElementById('wheelOptions').value;
    options = text.split('\n').map(s=>s.trim()).filter(Boolean);
    if(!options.length) options = DEFAULT_OPTIONS.slice();
    render();
  };
  render();
  document.getElementById('closeModal').addEventListener('click', () => cancelAnimationFrame(rAF), {once:true});
  document.getElementById('closeModalFooter').addEventListener('click', () => cancelAnimationFrame(rAF), {once:true});
}

// ─── COLOR MIXER ─────────────────────────────────────────────
function openColorMixer(body) {
  const PALETTES = {
    'Neon Cyber': ['#00e5ff','#a855f7','#ec4899','#22d3a0'],
    'Sunset': ['#f97316','#ec4899','#fbbf24','#ef4444'],
    'Ocean': ['#0ea5e9','#06b6d4','#22d3a0','#3b82f6'],
    'Pastel': ['#c4b5fd','#fbcfe8','#a7f3d0','#fde68a'],
  };
  function renderMix() {
    const c1 = document.getElementById('c1').value;
    const c2 = document.getElementById('c2').value;
    function hexToRgb(hex) { const r = parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16); return [r,g,b]; }
    function rgbToHex(r,g,b) { return '#'+[r,g,b].map(v=>Math.round(v).toString(16).padStart(2,'0')).join(''); }
    const [r1,g1,b1]=hexToRgb(c1), [r2,g2,b2]=hexToRgb(c2);
    const strips = document.getElementById('mixStrips'); strips.innerHTML='';
    for(let i=0;i<=8;i++) {
      const t=i/8, r=r1+(r2-r1)*t, g=g1+(g2-g1)*t, b=b1+(b2-b1)*t;
      const hex=rgbToHex(r,g,b);
      const el=document.createElement('div');
      el.style.cssText=`flex:1;height:60px;background:${hex};cursor:pointer;transition:transform 0.15s;border-radius:${i===0?'8px 0 0 8px':i===8?'0 8px 8px 0':'0'}`;
      el.title=hex; el.addEventListener('click',()=>{navigator.clipboard?.writeText(hex);showToast(`Copied ${hex}!`);});
      el.addEventListener('mouseenter',()=>el.style.transform='scaleY(1.1)');
      el.addEventListener('mouseleave',()=>el.style.transform='');
      strips.appendChild(el);
    }
  }
  body.innerHTML = `<div class="tool-modal-body">
  <div style="display:flex;gap:2rem;align-items:center;flex-wrap:wrap;justify-content:center">
    <div style="text-align:center"><label style="color:#64748b;font-size:0.8rem;letter-spacing:1px">COLOR A</label><br><input id="c1" type="color" value="#00e5ff" style="width:80px;height:60px;border:none;background:none;cursor:pointer" oninput="window.renderMix&&window.renderMix()" /></div>
    <div style="font-family:Rajdhani,sans-serif;font-size:2rem;color:#64748b">+</div>
    <div style="text-align:center"><label style="color:#64748b;font-size:0.8rem;letter-spacing:1px">COLOR B</label><br><input id="c2" type="color" value="#a855f7" style="width:80px;height:60px;border:none;background:none;cursor:pointer" oninput="window.renderMix&&window.renderMix()" /></div>
  </div>
  <div id="mixStrips" style="display:flex;width:100%;max-width:440px;border-radius:8px;overflow:hidden;margin:0.5rem 0"></div>
  <div style="color:#64748b;font-size:0.8rem">Click any color to copy its hex!</div>
  <div style="margin-top:0.75rem">
    <div style="color:#64748b;font-size:0.8rem;margin-bottom:0.5rem;text-align:center;letter-spacing:1px">PRESET PALETTES</div>
    <div style="display:flex;flex-direction:column;gap:0.5rem">
      ${Object.entries(PALETTES).map(([name,cols])=>`
      <div style="display:flex;align-items:center;gap:0.5rem">
        <span style="font-size:0.75rem;color:#64748b;width:100px">${name}</span>
        <div style="display:flex;gap:4px">${cols.map(c=>`<div style="width:28px;height:28px;border-radius:4px;background:${c};cursor:pointer;box-shadow:0 0 8px ${c}40" title="${c}" onclick="navigator.clipboard&&navigator.clipboard.writeText('${c}');showToast('Copied ${c}!')"></div>`).join('')}</div>
      </div>`).join('')}
    </div>
  </div></div>`;
  window.renderMix = renderMix;
  renderMix();
}

// ─── PASSWORD GENERATOR ──────────────────────────────────────
function openPasswordGen(body) {
  function generate() {
    const len = parseInt(document.getElementById('pwLen').value)||16;
    const useUpper = document.getElementById('pwUpper').checked;
    const useLower = document.getElementById('pwLower').checked;
    const useNumbers = document.getElementById('pwNumbers').checked;
    const useSymbols = document.getElementById('pwSymbols').checked;
    let chars = '';
    if(useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if(useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(useNumbers) chars += '0123456789';
    if(useSymbols) chars += '!@#$%^&*()-_=+[]{}|;:,.<>?';
    if(!chars) chars = 'abcdefghijklmnopqrstuvwxyz';
    const pw = Array.from({length: len}, () => chars[Math.floor(Math.random()*chars.length)]).join('');
    document.getElementById('pwResult').textContent = pw;
    // strength
    let strength = 0;
    if(pw.length>=12) strength++;
    if(/[A-Z]/.test(pw)) strength++;
    if(/[0-9]/.test(pw)) strength++;
    if(/[^A-Za-z0-9]/.test(pw)) strength++;
    const labels=['Weak','Fair','Good','Strong','Very Strong'];
    const colors=['#ef4444','#f97316','#fbbf24','#22d3a0','#00e5ff'];
    document.getElementById('pwStrength').textContent = labels[strength];
    document.getElementById('pwStrength').style.color = colors[strength];
  }
  body.innerHTML = `<div class="tool-modal-body">
  <div class="tool-result" id="pwResult" style="font-size:1.1rem;letter-spacing:2px;border-color:rgba(34,211,160,0.3);color:#22d3a0;font-family:monospace;word-break:break-all">Click Generate!</div>
  <div id="pwStrength" style="font-family:Rajdhani,sans-serif;font-size:1.1rem;font-weight:700"></div>
  <div style="display:flex;flex-direction:column;gap:0.5rem;max-width:320px;width:100%">
    <label style="display:flex;align-items:center;gap:0.5rem;color:#94a3b8">
      Length: <input id="pwLen" type="range" min="8" max="64" value="16" style="flex:1" oninput="document.getElementById('pwLenVal').textContent=this.value" />
      <span id="pwLenVal" style="color:#22d3a0;width:30px;text-align:right;font-family:Rajdhani,sans-serif">16</span>
    </label>
    ${[['pwUpper','Uppercase A-Z',true],['pwLower','Lowercase a-z',true],['pwNumbers','Numbers 0-9',true],['pwSymbols','Symbols !@#$',false]].map(([id,label,checked])=>`<label style="display:flex;align-items:center;gap:0.5rem;color:#94a3b8;cursor:pointer"><input id="${id}" type="checkbox" ${checked?'checked':''} style="accent-color:#22d3a0" /> ${label}</label>`).join('')}
  </div>
  <div style="display:flex;gap:0.75rem;flex-wrap:wrap;justify-content:center">
    <button class="tool-action-btn" onclick="window.pwGen&&window.pwGen()" style="background:linear-gradient(135deg,#22d3a0,#0891b2)">Generate 🔐</button>
    <button class="btn btn-outline" onclick="const pw=document.getElementById('pwResult').textContent;navigator.clipboard&&navigator.clipboard.writeText(pw).then(()=>showToast('Password copied!'))">Copy 📋</button>
  </div></div>`;
  window.pwGen = generate;
  generate();
}

// ─── METRONOME ────────────────────────────────────────────────
function openMetronome(body) {
  let bpm = 120, running = false, interval, beat = 0;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  let ctx;
  function click(strong) {
    if(!ctx) try { ctx = new AudioContext(); } catch(e) { return; }
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = strong ? 880 : 660;
    g.gain.setValueAtTime(0.5, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.1);
  }
  function start() {
    if(running) return;
    running = true;
    beat = 0;
    interval = setInterval(() => {
      beat = (beat+1) % 4;
      click(beat===0);
      const dots = document.querySelectorAll('.metro-beat');
      dots.forEach((d,i) => { d.style.background = i===beat ? '#00e5ff' : 'rgba(0,229,255,0.15)'; d.style.boxShadow = i===beat ? '0 0 20px #00e5ff' : 'none'; });
    }, (60/bpm)*1000);
  }
  function stop() { clearInterval(interval); running=false; document.querySelectorAll('.metro-beat').forEach(d=>{ d.style.background='rgba(0,229,255,0.15)'; d.style.boxShadow='none'; }); }
  body.innerHTML = `<div class="tool-modal-body">
  <div style="font-family:Rajdhani,sans-serif;font-size:5rem;font-weight:700;color:#00e5ff;text-shadow:0 0 30px #00e5ff" id="bpmDisplay">120</div>
  <div style="display:flex;gap:12px;margin:0.5rem 0">
    ${[0,1,2,3].map(i=>`<div class="metro-beat" style="width:40px;height:40px;border-radius:50%;background:rgba(0,229,255,0.15);border:2px solid rgba(0,229,255,0.3);transition:all 0.1s"></div>`).join('')}
  </div>
  <input type="range" min="40" max="240" value="120" style="width:260px;accent-color:#00e5ff" oninput="const v=parseInt(this.value);document.getElementById('bpmDisplay').textContent=v;window.metroBpm=v;if(window.metroRunning){window.metroStop();window.metroStart();}" />
  <div style="display:flex;gap:0.75rem;flex-wrap:wrap;justify-content:center">
    <button class="tool-action-btn" onclick="window.metroStart&&window.metroStart()">▶ Start</button>
    <button class="btn btn-outline" onclick="window.metroStop&&window.metroStop()">⏹ Stop</button>
    ${[60,80,100,120,140,160].map(b=>`<button class="btn btn-outline" style="padding:0.3rem 0.6rem;font-size:0.8rem" onclick="document.querySelector('input[type=range]').value=${b};document.getElementById('bpmDisplay').textContent=${b};window.metroBpm=${b};if(window.metroRunning){window.metroStop();window.metroStart();}">${b}</button>`).join('')}
  </div></div>`;
  window.metroBpm = bpm;
  window.metroRunning = false;
  window.metroStart = function() { bpm = window.metroBpm || 120; start(); window.metroRunning=true; };
  window.metroStop = function() { stop(); window.metroRunning=false; };
  document.getElementById('closeModal').addEventListener('click', () => { clearInterval(interval); }, {once:true});
  document.getElementById('closeModalFooter').addEventListener('click', () => { clearInterval(interval); }, {once:true});
}
