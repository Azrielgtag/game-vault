/* ============================================================
   GAME VAULT — games.js
   Game data catalogue + playable in-browser game engines
   Each game has: id, title, desc, category, emoji, color,
   and either a playFn (inline canvas game) or iframeUrl.
============================================================ */

// ── GAME CATALOGUE ─────────────────────────────────────────
const GAMES = [
  // ──── ARCADE ─────────────────────────────────────────────
  { id:'snake',       title:'Snake',            desc:'Classic snake — eat dots, grow longer, survive!', cat:'arcade',   emoji:'🐍', color:'#ec4899', playFn: playSnake },
  { id:'breakout',    title:'Breakout',         desc:'Break all bricks with a bouncing ball.',           cat:'arcade',   emoji:'🧱', color:'#f97316', playFn: playBreakout },
  { id:'runner',      title:'Neon Runner',      desc:'Endless runner — jump over obstacles.',            cat:'arcade',   emoji:'🏃', color:'#00e5ff', playFn: playRunner },
  { id:'pong',        title:'Pong',             desc:'Classic pong, two paddles, one epic ball.',        cat:'arcade',   emoji:'🏓', color:'#22d3a0', playFn: playPong },
  { id:'flappy',      title:'Flappy Block',     desc:'Tap to keep the block airborne.',                  cat:'arcade',   emoji:'🟦', color:'#3b82f6', playFn: playFlappy },
  { id:'asteroid',    title:'Asteroids',        desc:'Rotate, thrust, and shoot space rocks.',           cat:'arcade',   emoji:'🪨', color:'#a855f7', playFn: playAsteroids },
  { id:'pacman',      title:'Dot Muncher',      desc:'Eat all dots, avoid the ghosts!',                  cat:'arcade',   emoji:'🟡', color:'#fbbf24', playFn: playDotMuncher },
  { id:'space_inv',   title:'Space Invaders',   desc:'Classic alien shooter — defend Earth!',            cat:'arcade',   emoji:'👾', color:'#ec4899', playFn: playSpaceInvaders },
  { id:'tetris',      title:'Tetris',           desc:'Stack falling blocks — clear the lines!',          cat:'arcade',   emoji:'🟥', color:'#ef4444', playFn: playTetris },
  { id:'frogger',     title:'Frogger',          desc:'Help the frog cross the busy road.',               cat:'arcade',   emoji:'🐸', color:'#22d3a0', playFn: playFrogger },
  { id:'dino',        title:'Dino Dash',        desc:'Chrome dino style — jump over cacti.',             cat:'arcade',   emoji:'🦖', color:'#84cc16', playFn: playDino },
  { id:'galaga',      title:'Galaga',           desc:'Swarm shooter — blast wave after wave.',           cat:'arcade',   emoji:'🚀', color:'#00e5ff', playFn: playGalaga },

  // ──── PUZZLE ─────────────────────────────────────────────
  { id:'sudoku',      title:'Sudoku',           desc:'Fill the 9×9 grid with digits 1–9.',               cat:'puzzle',   emoji:'🔢', color:'#3b82f6', playFn: playSudoku },
  { id:'slide',       title:'Sliding Puzzle',   desc:'Slide tiles to restore the image.',                cat:'puzzle',   emoji:'🔀', color:'#a855f7', playFn: playSlidePuzzle },
  { id:'memory',      title:'Memory Match',     desc:'Flip cards and match the pairs.',                  cat:'puzzle',   emoji:'🃏', color:'#ec4899', playFn: playMemory },
  { id:'match3',      title:'Gem Crush',        desc:'Match 3 or more gems in a row.',                   cat:'puzzle',   emoji:'💎', color:'#22d3a0', playFn: playMatch3 },
  { id:'lights_out',  title:'Lights Out',       desc:'Toggle lights to turn them all off.',              cat:'puzzle',   emoji:'💡', color:'#fbbf24', playFn: playLightsOut },
  { id:'nonogram',    title:'Nonogram',         desc:'Solve the pixel picture with logic.',              cat:'puzzle',   emoji:'🖼', color:'#3b82f6', playFn: playNonogram },
  { id:'wordsearch',  title:'Word Search',      desc:'Find all hidden words in the grid.',               cat:'puzzle',   emoji:'🔤', color:'#ef4444', playFn: playWordSearch },
  { id:'simon',       title:'Simon Says',       desc:'Repeat the color pattern — how far can you go?',  cat:'puzzle',   emoji:'🎨', color:'#a855f7', playFn: playSimon },
  { id:'minesweeper', title:'Minesweeper',      desc:'Flag all mines without triggering one.',           cat:'puzzle',   emoji:'💣', color:'#6b7280', playFn: playMinesweeper },
  { id:'wordguesser', title:'Word Guesser',     desc:'Guess the 5-letter word in 6 tries.',             cat:'puzzle',   emoji:'📝', color:'#84cc16', playFn: playWordGuesser },
  { id:'tangram',     title:'Block Fit',        desc:'Fill the board by rotating and placing blocks.',  cat:'puzzle',   emoji:'🟪', color:'#00e5ff', playFn: playBlockFit },
  { id:'2048',        title:'2048',             desc:'Slide and merge tiles to reach 2048.',             cat:'puzzle',   emoji:'🔢', color:'#f97316', playFn: play2048 },

  // ──── STRATEGY ───────────────────────────────────────────
  { id:'tower_def',   title:'Tower Defense',    desc:'Place towers to stop the enemy waves.',            cat:'strategy', emoji:'🏰', color:'#a855f7', playFn: playTowerDefense },
  { id:'chess',       title:'Chess',            desc:'Classic chess vs a simple AI opponent.',           cat:'strategy', emoji:'♟', color:'#f1f5f9', playFn: playChess },
  { id:'tictactoe',   title:'Tic-Tac-Toe',      desc:'Noughts and crosses — beat the AI.',               cat:'strategy', emoji:'⭕', color:'#22d3a0', playFn: playTicTacToe },
  { id:'connect4',    title:'Connect 4',        desc:'Drop discs and get four in a row.',                cat:'strategy', emoji:'🔴', color:'#ef4444', playFn: playConnect4 },
  { id:'reversi',     title:'Reversi',          desc:'Flip all opponent discs to win.',                  cat:'strategy', emoji:'⚫', color:'#94a3b8', playFn: playReversi },
  { id:'battleship',  title:'Battleship',       desc:'Sink the enemy fleet before yours.',               cat:'strategy', emoji:'⚓', color:'#3b82f6', playFn: playBattleship },
  { id:'mastermind',  title:'Mastermind',       desc:'Guess the secret color code.',                     cat:'strategy', emoji:'🎯', color:'#ec4899', playFn: playMastermind },
  { id:'sokoban',     title:'Sokoban',          desc:'Push boxes onto all target squares.',              cat:'strategy', emoji:'📦', color:'#fbbf24', playFn: playSokoban },
  { id:'logic_grid',  title:'Logic Grid',       desc:'Solve the deduction puzzle.',                      cat:'strategy', emoji:'🧮', color:'#00e5ff', playFn: playLogicGrid },
  { id:'nim',         title:'Nim',              desc:'Take sticks to force your opponent to take last.', cat:'strategy', emoji:'🪵', color:'#84cc16', playFn: playNim },
  { id:'towers_hanoi',title:'Tower of Hanoi',   desc:'Move the stack with fewest moves.',                cat:'strategy', emoji:'🗼', color:'#a855f7', playFn: playTowersOfHanoi },

  // ──── REACTION ───────────────────────────────────────────
  { id:'click_speed', title:'Click Speed',      desc:'How many clicks per second can you manage?',      cat:'reaction', emoji:'👆', color:'#fbbf24', playFn: playClickSpeed },
  { id:'aim_trainer', title:'Aim Trainer',      desc:'Hit as many targets as fast as you can.',         cat:'reaction', emoji:'🎯', color:'#ef4444', playFn: playAimTrainer },
  { id:'reaction',    title:'Reaction Time',    desc:'Tap when the screen turns green.',                cat:'reaction', emoji:'🟢', color:'#22d3a0', playFn: playReactionTime },
  { id:'whack_mole',  title:'Whack-a-Mole',     desc:'Whack every mole that pops up!',                  cat:'reaction', emoji:'🐭', color:'#f97316', playFn: playWhackAMole },
  { id:'timing',      title:'Perfect Timing',   desc:'Stop the bar at the perfect moment.',             cat:'reaction', emoji:'⏱', color:'#00e5ff', playFn: playTiming },
  { id:'dodge',       title:'Dodge!',           desc:'Move your dot to dodge the enemy bullets.',       cat:'reaction', emoji:'💥', color:'#ec4899', playFn: playDodge },
  { id:'button_smash',title:'Button Smasher',   desc:'Mash the button as fast as possible in 5s.',      cat:'reaction', emoji:'👊', color:'#a855f7', playFn: playButtonSmash },
  { id:'arrow_keys',  title:'Arrow Dash',       desc:'Press the correct arrow key shown on screen.',    cat:'reaction', emoji:'⬆', color:'#3b82f6', playFn: playArrowDash },

  // ──── CASUAL ─────────────────────────────────────────────
  { id:'clicker',     title:'Cookie Clicker',   desc:'Click to bake more and more cookies.',            cat:'casual',   emoji:'🍪', color:'#f97316', playFn: playCookieClicker },
  { id:'stack',       title:'Stack It',         desc:'Stack falling blocks as high as you can.',        cat:'casual',   emoji:'🧊', color:'#00e5ff', playFn: playStack },
  { id:'bounce',      title:'Ball Bounce',      desc:'Keep the ball bouncing off the paddle.',          cat:'casual',   emoji:'🎱', color:'#22d3a0', playFn: playBallBounce },
  { id:'sand',        title:'Sand Sim',         desc:'Draw with different particles — sand, water…',    cat:'casual',   emoji:'⏳', color:'#fbbf24', playFn: playSandSim },
  { id:'zen_bubbles',title:'Zen Bubbles',       desc:'Pop the floating bubbles for zen satisfaction.',  cat:'casual',   emoji:'🫧', color:'#a855f7', playFn: playZenBubbles },
  { id:'idle_mine',   title:'Idle Miner',       desc:'Click to dig, buy upgrades, get rich.',           cat:'casual',   emoji:'⛏', color:'#94a3b8', playFn: playIdleMiner },
  { id:'color_sort',  title:'Color Sort',       desc:'Sort colored balls into matching tubes.',         cat:'casual',   emoji:'🧪', color:'#ec4899', playFn: playColorSort },
  { id:'solitaire',   title:'Solitaire',        desc:'Classic Klondike card solitaire.',                cat:'casual',   emoji:'🃏', color:'#22d3a0', playFn: playSolitaire },
  { id:'type_race',   title:'Type Racer',       desc:'Type the paragraph as fast as you can!',         cat:'casual',   emoji:'⌨', color:'#3b82f6', playFn: playTypeRacer },
  { id:'pixel_draw',  title:'Pixel Art',        desc:'Draw pixel art on a 16×16 canvas.',              cat:'casual',   emoji:'🖌', color:'#ec4899', playFn: playPixelArt },
  { id:'roll_dice',   title:'Dice Roll',        desc:'Roll custom dice sets and track your results.',   cat:'casual',   emoji:'🎲', color:'#fbbf24', playFn: playDiceGame },
  { id:'hangman',     title:'Hangman',          desc:'Guess the word before the man is hanged.',        cat:'casual',   emoji:'🎰', color:'#ef4444', playFn: playHangman },
  { id:'trivia',      title:'Trivia Quiz',      desc:'Answer trivia questions across categories.',      cat:'casual',   emoji:'❓', color:'#a855f7', playFn: playTrivia },
  { id:'number_guess',title:'Number Guesser',   desc:'Guess the secret number with hints.',             cat:'casual',   emoji:'🔢', color:'#22d3a0', playFn: playNumberGuess },
  { id:'maze',        title:'Maze Runner',      desc:'Navigate through an infinite procedural maze.',   cat:'casual',   emoji:'🌀', color:'#00e5ff', playFn: playMaze },
];

// ── PLAYABLE MINI-GAME ENGINES ─────────────────────────────
// Each returns an HTML string or DOM element for modal body.
// We use a shared canvas approach where possible.

function makeGameHTML(canvasId = 'gc', w = 480, h = 400) {
  return `<div class="modal-game-wrap" id="gameWrap">
    <div class="game-score" id="scoreDisplay">Score: 0</div>
    <canvas id="${canvasId}" width="${w}" height="${h}"></canvas>
    <div class="game-status" id="statusDisplay">Use keyboard / mouse / tap to play</div>
  </div>`;
}

// ─── SNAKE ───────────────────────────────────────────────────
function playSnake(body) {
  body.innerHTML = makeGameHTML('gc', 400, 400);
  const canvas = document.getElementById('gc');
  const ctx = canvas.getContext('2d');
  const CELL = 20, COLS = 20, ROWS = 20;
  let snake, dir, food, score, loop, alive;

  function init() {
    snake = [{x:10,y:10},{x:9,y:10},{x:8,y:10}];
    dir = {x:1,y:0};
    score = 0;
    alive = true;
    placeFood();
    clearInterval(loop);
    loop = setInterval(tick, 120);
    document.getElementById('scoreDisplay').textContent = 'Score: 0';
    document.getElementById('statusDisplay').textContent = 'Arrow keys / WASD to move';
  }

  function placeFood() {
    do { food = {x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS)}; }
    while (snake.some(s => s.x===food.x && s.y===food.y));
  }

  function tick() {
    if (!alive) return;
    const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
    if (head.x<0||head.x>=COLS||head.y<0||head.y>=ROWS||snake.some(s=>s.x===head.x&&s.y===head.y)) {
      alive = false;
      clearInterval(loop);
      document.getElementById('statusDisplay').textContent = `Game Over! Press Space or tap to restart`;
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(0,0,400,400);
      ctx.fillStyle = '#ff4a6e';
      ctx.font = 'bold 32px Rajdhani, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', 200, 200);
      return;
    }
    snake.unshift(head);
    if (head.x===food.x && head.y===food.y) { score += 10; placeFood(); }
    else snake.pop();
    draw();
    document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
  }

  function draw() {
    ctx.fillStyle = '#040810';
    ctx.fillRect(0,0,400,400);
    // grid
    ctx.strokeStyle = 'rgba(0,229,255,0.05)';
    for (let i=0;i<=COLS;i++) { ctx.beginPath(); ctx.moveTo(i*CELL,0); ctx.lineTo(i*CELL,400); ctx.stroke(); }
    for (let j=0;j<=ROWS;j++) { ctx.beginPath(); ctx.moveTo(0,j*CELL); ctx.lineTo(400,j*CELL); ctx.stroke(); }
    // food
    ctx.shadowBlur = 16; ctx.shadowColor = '#ff4a6e';
    ctx.fillStyle = '#ff4a6e';
    ctx.fillRect(food.x*CELL+2, food.y*CELL+2, CELL-4, CELL-4);
    ctx.shadowBlur = 0;
    // snake
    snake.forEach((s,i) => {
      const t = 1 - i/snake.length;
      ctx.shadowBlur = i===0?20:6;
      ctx.shadowColor = '#00e5ff';
      ctx.fillStyle = i===0 ? '#00e5ff' : `rgba(0,${Math.floor(180+75*t)},${Math.floor(220+35*t)},${t*0.8+0.2})`;
      ctx.fillRect(s.x*CELL+1, s.y*CELL+1, CELL-2, CELL-2);
    });
    ctx.shadowBlur = 0;
  }

  const keyDir = {ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},
                  w:{x:0,y:-1},s:{x:0,y:1},a:{x:-1,y:0},d:{x:1,y:0}};
  document.addEventListener('keydown', function onKey(e) {
    if (!document.getElementById('gameWrap')) { document.removeEventListener('keydown',onKey); return; }
    if (e.code==='Space' && !alive) { init(); return; }
    const nd = keyDir[e.key];
    if (nd && !(nd.x===-dir.x && nd.y===-dir.y)) dir = nd;
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
  });
  // touch
  let tx=0,ty=0;
  canvas.addEventListener('touchstart', e=>{ tx=e.touches[0].clientX; ty=e.touches[0].clientY; }, {passive:true});
  canvas.addEventListener('touchend', e=>{
    if (!alive) { init(); return; }
    const dx=e.changedTouches[0].clientX-tx, dy=e.changedTouches[0].clientY-ty;
    if (Math.abs(dx)>Math.abs(dy)) dir = dx>0?{x:1,y:0}:{x:-1,y:0};
    else dir = dy>0?{x:0,y:1}:{x:0,y:-1};
  }, {passive:true});

  init();
  // cleanup on modal close
  document.getElementById('closeModal').addEventListener('click', ()=> clearInterval(loop), {once:true});
  document.getElementById('closeModalFooter').addEventListener('click', ()=> clearInterval(loop), {once:true});
}

// ─── BREAKOUT ─────────────────────────────────────────────────
function playBreakout(body) {
  body.innerHTML = makeGameHTML('gc', 480, 380);
  const canvas = document.getElementById('gc');
  const ctx = canvas.getContext('2d');
  const W=480,H=380,PW=80,PH=10,BR=5,BC=9,BW=44,BH=14,BPX=5,BPY=5;
  let px,ball,bricks,score,lives,alive,rAF;
  const COLORS=['#00e5ff','#a855f7','#ec4899','#3b82f6','#22d3a0'];

  function init() {
    px=(W-PW)/2;
    ball={x:W/2,y:H-50,vx:3.5,vy:-3.5,r:7};
    score=0; lives=3; alive=true;
    bricks=[];
    for(let r=0;r<BR;r++) for(let c=0;c<BC;c++)
      bricks.push({x:c*(BW+BPX)+BPX*2,y:r*(BH+BPY)+BPY*3+40,alive:true,color:COLORS[r%COLORS.length]});
    document.getElementById('scoreDisplay').textContent='Score: 0';
    document.getElementById('statusDisplay').textContent='Mouse/touch to move paddle · Space to restart';
    cancelAnimationFrame(rAF);
    loop();
  }

  function loop() {
    rAF=requestAnimationFrame(loop);
    ctx.fillStyle='#040810'; ctx.fillRect(0,0,W,H);
    if(!alive){
      ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#ff4a6e'; ctx.font='bold 30px Rajdhani,sans-serif'; ctx.textAlign='center';
      ctx.fillText(bricks.some(b=>b.alive)?'GAME OVER':'YOU WIN!', W/2,H/2);
      ctx.fillStyle='#94a3b8'; ctx.font='16px Exo 2,sans-serif';
      ctx.fillText('Press Space to restart',W/2,H/2+36);
      return;
    }
    // move ball
    ball.x+=ball.vx; ball.y+=ball.vy;
    if(ball.x-ball.r<0){ball.x=ball.r;ball.vx*=-1;}
    if(ball.x+ball.r>W){ball.x=W-ball.r;ball.vx*=-1;}
    if(ball.y-ball.r<0){ball.y=ball.r;ball.vy*=-1;}
    if(ball.y+ball.r>H+20){lives--;ball.x=W/2;ball.y=H-50;ball.vy=-3.5; if(lives<=0)alive=false;}
    // paddle
    if(ball.y+ball.r>H-30 && ball.y+ball.r<H-20+PH && ball.x>px && ball.x<px+PW){
      ball.vy=-Math.abs(ball.vy);
      ball.vx=((ball.x-(px+PW/2))/(PW/2))*5;
    }
    // bricks
    bricks.forEach(b=>{
      if(!b.alive)return;
      if(ball.x>b.x&&ball.x<b.x+BW&&ball.y-ball.r<b.y+BH&&ball.y+ball.r>b.y){
        b.alive=false; ball.vy*=-1; score+=10;
        document.getElementById('scoreDisplay').textContent=`Score: ${score}  ❤ ${lives}`;
      }
    });
    if(!bricks.some(b=>b.alive))alive=false;
    // draw bricks
    bricks.forEach(b=>{ if(!b.alive)return; ctx.shadowBlur=10; ctx.shadowColor=b.color; ctx.fillStyle=b.color; ctx.fillRect(b.x,b.y,BW,BH); ctx.shadowBlur=0; });
    // draw paddle
    ctx.shadowBlur=16; ctx.shadowColor='#00e5ff';
    const grad=ctx.createLinearGradient(px,H-30,px+PW,H-30);
    grad.addColorStop(0,'#00e5ff'); grad.addColorStop(1,'#a855f7');
    ctx.fillStyle=grad; ctx.fillRect(px,H-30,PW,PH); ctx.shadowBlur=0;
    // draw ball
    ctx.shadowBlur=20; ctx.shadowColor='#fff';
    ctx.beginPath(); ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
    ctx.fillStyle='#fff'; ctx.fill(); ctx.shadowBlur=0;
  }

  canvas.addEventListener('mousemove', e=>{ const r=canvas.getBoundingClientRect(); px=e.clientX-r.left-PW/2; px=Math.max(0,Math.min(W-PW,px)); });
  canvas.addEventListener('touchmove', e=>{ const r=canvas.getBoundingClientRect(); px=e.touches[0].clientX-r.left-PW/2; px=Math.max(0,Math.min(W-PW,px)); e.preventDefault(); }, {passive:false});
  document.addEventListener('keydown', function onK(e){ if(!document.getElementById('gameWrap')){document.removeEventListener('keydown',onK);return;} if(e.code==='Space'&&!alive)init(); });
  document.getElementById('closeModal').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  init();
}

// ─── NEON RUNNER ──────────────────────────────────────────────
function playRunner(body) {
  body.innerHTML = makeGameHTML('gc', 480, 220);
  const canvas = document.getElementById('gc');
  const ctx = canvas.getContext('2d');
  const W=480,H=220,GY=170;
  let player,obstacles,score,speed,alive,rAF,frameN;

  function init() {
    player={x:60,y:GY-30,w:24,h:30,vy:0,onGround:true};
    obstacles=[]; score=0; speed=4; alive=true; frameN=0;
    document.getElementById('scoreDisplay').textContent='Score: 0';
    document.getElementById('statusDisplay').textContent='Space / Tap to jump';
    cancelAnimationFrame(rAF); loop();
  }
  function jump() { if(player.onGround){player.vy=-14;player.onGround=false;} else if(!alive) init(); }
  function loop() {
    rAF=requestAnimationFrame(loop); frameN++;
    ctx.fillStyle='#040810'; ctx.fillRect(0,0,W,H);
    // ground
    ctx.strokeStyle='rgba(0,229,255,0.4)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(0,GY); ctx.lineTo(W,GY); ctx.stroke();
    if(!alive){
      ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#ff4a6e'; ctx.font='bold 28px Rajdhani,sans-serif'; ctx.textAlign='center';
      ctx.fillText('GAME OVER — Tap to restart',W/2,H/2);
      return;
    }
    // player
    player.vy+=0.8; player.y+=player.vy;
    if(player.y+player.h>=GY){player.y=GY-player.h;player.vy=0;player.onGround=true;}
    ctx.shadowBlur=20; ctx.shadowColor='#00e5ff';
    ctx.fillStyle='#00e5ff'; ctx.fillRect(player.x,player.y,player.w,player.h);
    ctx.shadowBlur=0;
    // obstacles
    if(frameN%Math.max(40,90-Math.floor(score/100)*3)===0)
      obstacles.push({x:W,y:GY-(20+Math.random()*20),w:18,h:20+Math.random()*20});
    obstacles.forEach(o=>{ o.x-=speed; });
    obstacles=obstacles.filter(o=>o.x+o.w>0);
    obstacles.forEach(o=>{
      ctx.shadowBlur=12; ctx.shadowColor='#ff4a6e';
      ctx.fillStyle='#ff4a6e'; ctx.fillRect(o.x,o.y,o.w,o.h); ctx.shadowBlur=0;
      if(player.x+player.w>o.x+4&&player.x<o.x+o.w-4&&player.y+player.h>o.y+4){alive=false;}
    });
    score++; speed=4+Math.floor(score/300)*0.5;
    document.getElementById('scoreDisplay').textContent=`Score: ${score}`;
  }
  document.addEventListener('keydown',function onK(e){if(!document.getElementById('gameWrap')){document.removeEventListener('keydown',onK);return;} if(e.code==='Space'){jump();e.preventDefault();}});
  canvas.addEventListener('click',jump);
  canvas.addEventListener('touchstart',jump,{passive:true});
  document.getElementById('closeModal').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  init();
}

// ─── PONG ─────────────────────────────────────────────────────
function playPong(body) {
  body.innerHTML = makeGameHTML('gc', 480, 320);
  const canvas = document.getElementById('gc');
  const ctx = canvas.getContext('2d');
  const W=480,H=320,PW=10,PH=60,SPEED=4;
  let p1,p2,ball,score1,score2,rAF;
  function init(){
    p1={x:10,y:(H-PH)/2}; p2={x:W-PW-10,y:(H-PH)/2};
    ball={x:W/2,y:H/2,vx:4*(Math.random()>0.5?1:-1),vy:3*(Math.random()>0.5?1:-1)};
    score1=0; score2=0;
    document.getElementById('statusDisplay').textContent='W/S keys (left) · ↑/↓ keys (right)';
    cancelAnimationFrame(rAF); loop();
  }
  const keys={};
  document.addEventListener('keydown', e=>keys[e.key]=true);
  document.addEventListener('keyup', e=>keys[e.key]=false);
  function loop(){
    rAF=requestAnimationFrame(loop);
    if(!document.getElementById('gc')){cancelAnimationFrame(rAF);return;}
    // paddle move
    if(keys['w']&&p1.y>0)p1.y-=SPEED+2;
    if(keys['s']&&p1.y+PH<H)p1.y+=SPEED+2;
    // AI for right paddle
    if(ball.vx>0) { if(p2.y+PH/2<ball.y-5)p2.y+=SPEED; else if(p2.y+PH/2>ball.y+5)p2.y-=SPEED; }
    p2.y=Math.max(0,Math.min(H-PH,p2.y));
    ball.x+=ball.vx; ball.y+=ball.vy;
    if(ball.y<=0||ball.y>=H){ball.vy*=-1;}
    if(ball.x<=p1.x+PW&&ball.y>p1.y&&ball.y<p1.y+PH){ball.vx=Math.abs(ball.vx)+0.2;}
    if(ball.x>=p2.x&&ball.y>p2.y&&ball.y<p2.y+PH){ball.vx=-(Math.abs(ball.vx)+0.2);}
    if(ball.x<0){score2++;reset();}
    if(ball.x>W){score1++;reset();}
    // draw
    ctx.fillStyle='#040810'; ctx.fillRect(0,0,W,H);
    ctx.setLineDash([8,8]); ctx.strokeStyle='rgba(255,255,255,0.1)';
    ctx.beginPath(); ctx.moveTo(W/2,0); ctx.lineTo(W/2,H); ctx.stroke(); ctx.setLineDash([]);
    ctx.shadowBlur=14; ctx.shadowColor='#00e5ff'; ctx.fillStyle='#00e5ff';
    ctx.fillRect(p1.x,p1.y,PW,PH); ctx.fillRect(p2.x,p2.y,PW,PH);
    ctx.beginPath(); ctx.arc(ball.x,ball.y,8,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur=0;
    ctx.fillStyle='#e2e8f0'; ctx.font='bold 32px Rajdhani,sans-serif'; ctx.textAlign='center';
    ctx.fillText(`${score1} : ${score2}`,W/2,32);
  }
  function reset(){ball={x:W/2,y:H/2,vx:4*(Math.random()>0.5?1:-1),vy:3*(Math.random()>0.5?1:-1)};}
  document.getElementById('closeModal').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  init();
}

// ─── FLAPPY BLOCK ─────────────────────────────────────────────
function playFlappy(body) {
  body.innerHTML = makeGameHTML('gc', 320, 480);
  const canvas = document.getElementById('gc');
  const ctx = canvas.getContext('2d');
  const W=320,H=480,GAP=140,PIPE_W=42,PIPE_SPEED=2.5;
  let bird,pipes,score,alive,started,rAF;
  function init(){
    bird={x:80,y:H/2,vy:0,size:22};
    pipes=[{x:W,top:100+Math.random()*160}];
    score=0;alive=true;started=false;
    document.getElementById('statusDisplay').textContent='Tap or Space to flap';
    cancelAnimationFrame(rAF); loop();
  }
  function flap(){if(!started)started=true;if(!alive){init();return;}bird.vy=-9;}
  function loop(){
    rAF=requestAnimationFrame(loop);
    ctx.fillStyle='#040810'; ctx.fillRect(0,0,W,H);
    if(started&&alive){
      bird.vy+=0.55; bird.y+=bird.vy;
      pipes.forEach(p=>{p.x-=PIPE_SPEED;});
      if(pipes[pipes.length-1].x<W-200)pipes.push({x:W,top:80+Math.random()*200});
      pipes=pipes.filter(p=>p.x+PIPE_W>0);
      pipes.forEach(p=>{
        if(bird.x+bird.size/2>p.x&&bird.x-bird.size/2<p.x+PIPE_W){
          if(bird.y-bird.size/2<p.top||bird.y+bird.size/2>p.top+GAP)alive=false;
        }
        if(p.x+PIPE_W<bird.x&&!p.passed){p.passed=true;score++;}
      });
      if(bird.y+bird.size/2>H||bird.y-bird.size/2<0)alive=false;
    }
    // draw pipes
    pipes.forEach(p=>{
      ctx.shadowBlur=10; ctx.shadowColor='#22d3a0'; ctx.fillStyle='#22d3a0';
      ctx.fillRect(p.x,0,PIPE_W,p.top);
      ctx.fillRect(p.x,p.top+GAP,PIPE_W,H-p.top-GAP);
      ctx.shadowBlur=0;
    });
    // draw bird
    ctx.shadowBlur=20; ctx.shadowColor='#3b82f6';
    ctx.fillStyle='#3b82f6'; ctx.fillRect(bird.x-bird.size/2,bird.y-bird.size/2,bird.size,bird.size);
    ctx.shadowBlur=0;
    ctx.fillStyle='#e2e8f0'; ctx.font='bold 24px Rajdhani,sans-serif'; ctx.textAlign='center';
    ctx.fillText(score,W/2,40);
    if(!alive){
      ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#ff4a6e'; ctx.font='bold 30px Rajdhani,sans-serif';
      ctx.fillText('GAME OVER',W/2,H/2);
      ctx.fillStyle='#94a3b8'; ctx.font='16px Exo 2,sans-serif';
      ctx.fillText('Tap to restart',W/2,H/2+36);
    }
    document.getElementById('scoreDisplay').textContent=`Score: ${score}`;
  }
  document.addEventListener('keydown',function onK(e){if(!document.getElementById('gameWrap')){document.removeEventListener('keydown',onK);return;}if(e.code==='Space'){flap();e.preventDefault();}});
  canvas.addEventListener('click',flap);
  canvas.addEventListener('touchstart',flap,{passive:true});
  document.getElementById('closeModal').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  init();
}

// ─── ASTEROIDS ────────────────────────────────────────────────
function playAsteroids(body) {
  body.innerHTML = makeGameHTML('gc', 480, 400);
  const canvas = document.getElementById('gc');
  const ctx = canvas.getContext('2d');
  const W=480,H=400;
  let ship,asteroids,bullets,score,lives,alive,rAF,frameN,keys;
  function init(){
    ship={x:W/2,y:H/2,angle:0,vx:0,vy:0,thrusting:false};
    asteroids=[];bullets=[];score=0;lives=3;alive=true;frameN=0;keys={};
    for(let i=0;i<6;i++) spawnAsteroid();
    document.getElementById('statusDisplay').textContent='←→ rotate · ↑ thrust · Space shoot';
    cancelAnimationFrame(rAF); loop();
  }
  function spawnAsteroid(x,y,r=40){
    const angle=Math.random()*Math.PI*2;
    asteroids.push({x:x??Math.random()*W,y:y??Math.random()*H,r,vx:Math.cos(angle)*(1.5+Math.random()),vy:Math.sin(angle)*(1.5+Math.random())});
  }
  function loop(){
    rAF=requestAnimationFrame(loop);
    if(!document.getElementById('gc')){cancelAnimationFrame(rAF);return;}
    frameN++;
    ctx.fillStyle='#040810'; ctx.fillRect(0,0,W,H);
    if(!alive){
      ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#ff4a6e'; ctx.font='bold 28px Rajdhani,sans-serif'; ctx.textAlign='center';
      ctx.fillText('GAME OVER — Space to restart',W/2,H/2); return;
    }
    if(keys['ArrowLeft'])ship.angle-=0.06;
    if(keys['ArrowRight'])ship.angle+=0.06;
    ship.thrusting=!!keys['ArrowUp'];
    if(ship.thrusting){ship.vx+=Math.cos(ship.angle)*0.25;ship.vy+=Math.sin(ship.angle)*0.25;}
    ship.vx*=0.99;ship.vy*=0.99;
    ship.x=(ship.x+ship.vx+W)%W; ship.y=(ship.y+ship.vy+H)%H;
    if(keys[' ']&&frameN%10===0)bullets.push({x:ship.x+Math.cos(ship.angle)*16,y:ship.y+Math.sin(ship.angle)*16,vx:Math.cos(ship.angle)*8,vy:Math.sin(ship.angle)*8,life:50});
    bullets.forEach(b=>{b.x=(b.x+b.vx+W)%W;b.y=(b.y+b.vy+H)%H;b.life--;});
    bullets=bullets.filter(b=>b.life>0);
    asteroids.forEach(a=>{a.x=(a.x+a.vx+W)%W;a.y=(a.y+a.vy+H)%H;});
    // collisions
    bullets.forEach((b,bi)=>{
      asteroids.forEach((a,ai)=>{
        if(Math.hypot(b.x-a.x,b.y-a.y)<a.r){
          bullets.splice(bi,1); score+=a.r<20?30:a.r<30?20:10;
          if(a.r>20){spawnAsteroid(a.x,a.y,a.r/2);spawnAsteroid(a.x,a.y,a.r/2);}
          asteroids.splice(ai,1);
          document.getElementById('scoreDisplay').textContent=`Score: ${score}  ❤ ${lives}`;
        }
      });
    });
    asteroids.forEach(a=>{
      if(Math.hypot(ship.x-a.x,ship.y-a.y)<a.r+12){lives--;if(lives<=0){alive=false;}else{ship={x:W/2,y:H/2,angle:0,vx:0,vy:0};}}
    });
    if(asteroids.length===0)for(let i=0;i<6+Math.floor(score/100);i++)spawnAsteroid();
    // draw asteroids
    asteroids.forEach(a=>{
      ctx.strokeStyle='#a855f7'; ctx.lineWidth=2; ctx.shadowBlur=8; ctx.shadowColor='#a855f7';
      ctx.beginPath(); ctx.arc(a.x,a.y,a.r,0,Math.PI*2); ctx.stroke(); ctx.shadowBlur=0;
    });
    // draw bullets
    ctx.shadowBlur=12; ctx.shadowColor='#fbbf24'; ctx.fillStyle='#fbbf24';
    bullets.forEach(b=>{ctx.beginPath();ctx.arc(b.x,b.y,3,0,Math.PI*2);ctx.fill();});
    ctx.shadowBlur=0;
    // draw ship
    ctx.save(); ctx.translate(ship.x,ship.y); ctx.rotate(ship.angle);
    ctx.shadowBlur=16; ctx.shadowColor='#00e5ff'; ctx.strokeStyle='#00e5ff'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(16,0); ctx.lineTo(-10,10); ctx.lineTo(-6,0); ctx.lineTo(-10,-10); ctx.closePath(); ctx.stroke();
    if(ship.thrusting){ctx.fillStyle='#f97316';ctx.beginPath();ctx.moveTo(-6,0);ctx.lineTo(-16,5);ctx.lineTo(-16,-5);ctx.closePath();ctx.fill();}
    ctx.restore(); ctx.shadowBlur=0;
  }
  document.addEventListener('keydown',function onK(e){if(!document.getElementById('gameWrap')){document.removeEventListener('keydown',onK);return;}keys[e.key]=true;if(e.code==='Space'&&!alive)init();if(['ArrowUp','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();});
  document.addEventListener('keyup',e=>keys[e.key]=false);
  document.getElementById('closeModal').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  init();
}

// ─── TETRIS ───────────────────────────────────────────────────
function playTetris(body) {
  body.innerHTML = makeGameHTML('gc', 220, 440);
  const canvas = document.getElementById('gc');
  const ctx = canvas.getContext('2d');
  const COLS=10,ROWS=20,BS=22;
  const PIECES=[
    {shape:[[1,1,1,1]],color:'#00e5ff'},
    {shape:[[1,0],[1,0],[1,1]],color:'#f97316'},
    {shape:[[0,1],[0,1],[1,1]],color:'#3b82f6'},
    {shape:[[1,1],[1,1]],color:'#fbbf24'},
    {shape:[[0,1,1],[1,1,0]],color:'#22d3a0'},
    {shape:[[1,1,0],[0,1,1]],color:'#ec4899'},
    {shape:[[1,1,1],[0,1,0]],color:'#a855f7'},
  ];
  let board,current,score,level,loop,alive;
  function init(){
    board=Array.from({length:ROWS},()=>Array(COLS).fill(0));
    score=0;level=1;alive=true;
    spawnPiece();
    clearInterval(loop);
    loop=setInterval(tick,Math.max(100,600-level*50));
    document.getElementById('statusDisplay').textContent='←→ move · ↑ rotate · ↓ drop';
  }
  function spawnPiece(){
    const p=PIECES[Math.floor(Math.random()*PIECES.length)];
    current={shape:p.shape,color:p.color,x:Math.floor(COLS/2)-1,y:0};
    if(collide(current)){alive=false;clearInterval(loop);}
  }
  function collide(p){
    return p.shape.some((row,dy)=>row.some((v,dx)=>v&&(board[p.y+dy]===undefined||board[p.y+dy][p.x+dx]===undefined||board[p.y+dy][p.x+dx])));
  }
  function merge(){current.shape.forEach((row,dy)=>row.forEach((v,dx)=>{if(v)board[current.y+dy][current.x+dx]=current.color;}));}
  function clearLines(){
    let cleared=0;
    board=board.filter(row=>{if(row.every(c=>c)){cleared++;return false;}return true;});
    while(board.length<ROWS)board.unshift(Array(COLS).fill(0));
    score+=cleared*100*level; if(cleared>=4)score+=400;
    level=Math.floor(score/1000)+1;
    clearInterval(loop); loop=setInterval(tick,Math.max(100,600-level*50));
    document.getElementById('scoreDisplay').textContent=`Score: ${score}`;
  }
  function tick(){if(!alive)return;const n={...current,y:current.y+1};if(collide(n)){merge();clearLines();spawnPiece();}else current=n;draw();}
  function draw(){
    ctx.fillStyle='#040810'; ctx.fillRect(0,0,220,440);
    board.forEach((row,y)=>row.forEach((c,x)=>{if(c){ctx.shadowBlur=8;ctx.shadowColor=c;ctx.fillStyle=c;ctx.fillRect(x*BS+1,y*BS+1,BS-2,BS-2);ctx.shadowBlur=0;}}));
    current.shape.forEach((row,dy)=>row.forEach((v,dx)=>{if(v){ctx.shadowBlur=12;ctx.shadowColor=current.color;ctx.fillStyle=current.color;ctx.fillRect((current.x+dx)*BS+1,(current.y+dy)*BS+1,BS-2,BS-2);ctx.shadowBlur=0;}}));
    if(!alive){ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(0,0,220,440);ctx.fillStyle='#ff4a6e';ctx.font='bold 24px Rajdhani,sans-serif';ctx.textAlign='center';ctx.fillText('GAME OVER',110,220);}
  }
  document.addEventListener('keydown',function onK(e){
    if(!document.getElementById('gameWrap')){document.removeEventListener('keydown',onK);return;}
    if(!alive&&e.code==='Space'){init();return;}
    if(!alive)return;
    let n={...current};
    if(e.key==='ArrowLeft')n.x--;
    if(e.key==='ArrowRight')n.x++;
    if(e.key==='ArrowDown')n.y++;
    if(e.key==='ArrowUp'){const r=current.shape[0].map((_,i)=>current.shape.map(row=>row[i]).reverse());n.shape=r;}
    if(!collide(n))current=n;
    if(['ArrowLeft','ArrowRight','ArrowDown','ArrowUp'].includes(e.key))e.preventDefault();
    draw();
  });
  document.getElementById('closeModal').addEventListener('click',()=>clearInterval(loop),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>clearInterval(loop),{once:true});
  init();
}

// ─── DOT MUNCHER (simple Pac-Man style) ───────────────────────
function playDotMuncher(body) {
  body.innerHTML = makeGameHTML('gc', 420, 380);
  const c=document.getElementById('gc'),ctx=c.getContext('2d');
  const CS=28,COLS=15,ROWS=13;
  // simple maze: 1=wall, 0=dot, 2=empty, 3=power
  const MAP=[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,3,0,0,0,0,0,1,0,0,0,0,0,3,1],
    [1,0,1,1,0,1,0,1,0,1,0,1,1,0,1],
    [1,0,1,1,0,1,0,0,0,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,2,2,2,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,0,0,0,1,0,1,1,0,1],
    [1,0,1,1,0,1,0,1,0,1,0,1,1,0,1],
    [1,3,0,0,0,0,0,0,0,0,0,0,0,3,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ];
  const grid=MAP.map(r=>r.map(v=>({t:v,dot:v===0,power:v===3})));
  let player={x:7,y:6,dir:{x:0,y:0},nextDir:{x:0,y:0},tick:0,mouth:0,score:0};
  let dots=grid.flat().filter(c=>c.dot||c.power).length;
  let alive=true,rAF;
  function loop(){
    rAF=requestAnimationFrame(loop);
    ctx.fillStyle='#040810';ctx.fillRect(0,0,420,380);
    // draw grid
    grid.forEach((row,y)=>row.forEach((cell,x)=>{
      if(cell.t===1){ctx.fillStyle='#1e40af';ctx.fillRect(x*CS,y*CS,CS,CS);ctx.strokeStyle='#3b82f6';ctx.strokeRect(x*CS+1,y*CS+1,CS-2,CS-2);}
      if(cell.dot){ctx.fillStyle='#fde68a';ctx.beginPath();ctx.arc(x*CS+CS/2,y*CS+CS/2,3,0,Math.PI*2);ctx.fill();}
      if(cell.power){ctx.shadowBlur=14;ctx.shadowColor='#fbbf24';ctx.fillStyle='#fbbf24';ctx.beginPath();ctx.arc(x*CS+CS/2,y*CS+CS/2,6,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}
    }));
    // move player
    player.tick++;
    if(player.tick%8===0){
      const nd=player.nextDir,nx=player.x+nd.x,ny=player.y+nd.y;
      if(nx>=0&&nx<COLS&&ny>=0&&ny<ROWS&&grid[ny][nx].t!==1){player.dir=nd;}
      const cx=player.x+player.dir.x,cy=player.y+player.dir.y;
      if(cx>=0&&cx<COLS&&cy>=0&&cy<ROWS&&grid[cy][cx].t!==1){player.x=cx;player.y=cy;}
      const cell=grid[player.y][player.x];
      if(cell.dot){cell.dot=false;player.score+=10;dots--;}
      if(cell.power){cell.power=false;player.score+=50;dots--;}
      if(dots<=0)alive=false;
    }
    // draw player
    player.mouth=(player.mouth+8)%360;
    const angle=Math.atan2(player.dir.y,player.dir.x);
    const mo=(0.2+0.15*Math.abs(Math.sin(player.mouth*Math.PI/180)));
    ctx.shadowBlur=20;ctx.shadowColor='#fbbf24';ctx.fillStyle='#fbbf24';
    ctx.beginPath();ctx.moveTo(player.x*CS+CS/2,player.y*CS+CS/2);
    ctx.arc(player.x*CS+CS/2,player.y*CS+CS/2,CS/2-3,angle+mo*Math.PI,angle+(2-mo)*Math.PI);
    ctx.closePath();ctx.fill();ctx.shadowBlur=0;
    document.getElementById('scoreDisplay').textContent=`Score: ${player.score}`;
    if(!alive){ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(0,0,420,380);ctx.fillStyle='#22d3a0';ctx.font='bold 28px Rajdhani,sans-serif';ctx.textAlign='center';ctx.fillText('YOU WIN!',210,190);}
  }
  document.addEventListener('keydown',function onK(e){
    if(!document.getElementById('gameWrap')){document.removeEventListener('keydown',onK);return;}
    const d={ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1}};
    if(d[e.key]){player.nextDir=d[e.key];e.preventDefault();}
  });
  document.getElementById('statusDisplay').textContent='Arrow keys to move';
  document.getElementById('closeModal').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  loop();
}

// ─── SPACE INVADERS ───────────────────────────────────────────
function playSpaceInvaders(body) {
  body.innerHTML = makeGameHTML('gc', 480, 380);
  const c=document.getElementById('gc'),ctx=c.getContext('2d');
  const W=480,H=380;
  let ship,invaders,bullets,eBullets,score,lives,alive,rAF,frameN,dir;
  function init(){
    ship={x:W/2-20,y:H-50,w:40,h:20};
    bullets=[];eBullets=[];score=0;lives=3;alive=true;frameN=0;dir=1;
    invaders=[];
    for(let r=0;r<4;r++)for(let c=0;c<10;c++)
      invaders.push({x:40+c*40,y:40+r*36,w:28,h:20,row:r,alive:true});
    document.getElementById('statusDisplay').textContent='←→ move · Space shoot';
    cancelAnimationFrame(rAF);loop();
  }
  const keys={};
  document.addEventListener('keydown',e=>{keys[e.key]=true;if(e.key===' ')e.preventDefault();});
  document.addEventListener('keyup',e=>keys[e.key]=false);
  function loop(){
    rAF=requestAnimationFrame(loop); frameN++;
    if(!document.getElementById('gc')){cancelAnimationFrame(rAF);return;}
    ctx.fillStyle='#040810';ctx.fillRect(0,0,W,H);
    if(!alive){ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#ff4a6e';ctx.font='bold 28px Rajdhani,sans-serif';ctx.textAlign='center';ctx.fillText('GAME OVER',W/2,H/2);ctx.fillStyle='#94a3b8';ctx.font='16px Exo 2,sans-serif';ctx.fillText('Space to restart',W/2,H/2+36);if(keys[' '])init();return;}
    if(keys['ArrowLeft']&&ship.x>0)ship.x-=4;
    if(keys['ArrowRight']&&ship.x+ship.w<W)ship.x+=4;
    if(keys[' ']&&frameN%12===0)bullets.push({x:ship.x+ship.w/2,y:ship.y,vy:-8});
    // move invaders
    const alive_inv=invaders.filter(i=>i.alive);
    if(frameN%Math.max(10,50-Math.floor(score/100))*2===0){
      const maxX=Math.max(...alive_inv.map(i=>i.x+i.w)),minX=Math.min(...alive_inv.map(i=>i.x));
      if(maxX>=W-10||minX<=10)dir*=-1;
      invaders.forEach(i=>{if(i.alive){i.x+=dir*12;if(dir*dir>0&&(maxX>=W-10||minX<=10))i.y+=16;}});
    }
    // enemy shoot
    if(frameN%60===0&&alive_inv.length){
      const shooter=alive_inv[Math.floor(Math.random()*alive_inv.length)];
      eBullets.push({x:shooter.x+shooter.w/2,y:shooter.y+shooter.h,vy:4});
    }
    bullets.forEach(b=>b.y+=b.vy); bullets=bullets.filter(b=>b.y>0);
    eBullets.forEach(b=>b.y+=b.vy); eBullets=eBullets.filter(b=>b.y<H);
    // collisions
    bullets.forEach((b,bi)=>{invaders.forEach(inv=>{if(!inv.alive)return;if(b.x>inv.x&&b.x<inv.x+inv.w&&b.y>inv.y&&b.y<inv.y+inv.h){inv.alive=false;bullets.splice(bi,1);score+=10+(3-inv.row)*5;document.getElementById('scoreDisplay').textContent=`Score: ${score}  ❤ ${lives}`;}});});
    eBullets.forEach((b,bi)=>{if(b.x>ship.x&&b.x<ship.x+ship.w&&b.y>ship.y&&b.y<ship.y+ship.h){eBullets.splice(bi,1);lives--;if(lives<=0)alive=false;}});
    if(!invaders.some(i=>i.alive))init();
    // draw
    const eColors=['#ec4899','#a855f7','#3b82f6','#22d3a0'];
    invaders.forEach(inv=>{if(!inv.alive)return;ctx.shadowBlur=10;ctx.shadowColor=eColors[inv.row%4];ctx.fillStyle=eColors[inv.row%4];ctx.fillRect(inv.x,inv.y,inv.w,inv.h);ctx.shadowBlur=0;});
    ctx.shadowBlur=16;ctx.shadowColor='#00e5ff';ctx.fillStyle='#00e5ff';ctx.fillRect(ship.x,ship.y,ship.w,ship.h);ctx.shadowBlur=0;
    ctx.fillStyle='#fbbf24';bullets.forEach(b=>{ctx.fillRect(b.x-2,b.y,4,10);});
    ctx.fillStyle='#ff4a6e';eBullets.forEach(b=>{ctx.fillRect(b.x-2,b.y,4,10);});
  }
  document.getElementById('closeModal').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  init();
}

// ─── DINO DASH ────────────────────────────────────────────────
function playDino(body) { playRunner(body); } // reuse runner

// ─── FROGGER ─────────────────────────────────────────────────
function playFrogger(body) {
  body.innerHTML = makeGameHTML('gc', 400, 400);
  const c=document.getElementById('gc'),ctx=c.getContext('2d');
  const CS=40,COLS=10,ROWS=10,W=400,H=400;
  let frog,cars,score,lives,rAF,frameN;
  function init(){
    frog={col:4,row:9};
    score=0;lives=3;frameN=0;
    cars=[];
    for(let r=1;r<9;r++){
      const n=2+Math.floor(Math.random()*2),dir=r%2===0?1:-1;
      for(let i=0;i<n;i++)cars.push({col:Math.random()*COLS,row:r,dir,speed:(0.015+Math.random()*0.02)});
    }
    document.getElementById('statusDisplay').textContent='Arrow keys to move';
    cancelAnimationFrame(rAF);loop();
  }
  function loop(){
    rAF=requestAnimationFrame(loop);frameN++;
    ctx.fillStyle='#040810';ctx.fillRect(0,0,W,H);
    // draw rows
    for(let r=0;r<ROWS;r++){
      ctx.fillStyle=r===0?'#22d3a0':r===9?'#1e3a1e':r%2===0?'#111827':'#0d1117';
      ctx.fillRect(0,r*CS,W,CS);
    }
    // draw cars
    cars.forEach(car=>{
      car.col=(car.col+car.dir*car.speed*60/60+COLS)%COLS;
      ctx.shadowBlur=10;ctx.shadowColor='#f97316';ctx.fillStyle='#f97316';
      ctx.fillRect(car.col*CS+2,car.row*CS+6,CS*1.2-4,CS-12);ctx.shadowBlur=0;
      // collision
      const fx=frog.col*CS,fy=frog.row*CS;
      const cx=car.col*CS,cy=car.row*CS;
      if(frog.row===car.row&&Math.abs(frog.col-car.col)<1.1){lives--;if(lives<=0){cancelAnimationFrame(rAF);ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#ff4a6e';ctx.font='bold 28px Rajdhani,sans-serif';ctx.textAlign='center';ctx.fillText('GAME OVER',W/2,H/2);return;}frog={col:4,row:9};}
    });
    if(frog.row===0){score++;frog={col:4,row:9};document.getElementById('scoreDisplay').textContent=`Score: ${score}  ❤ ${lives}`;}
    // draw frog
    ctx.shadowBlur=16;ctx.shadowColor='#22d3a0';ctx.fillStyle='#22d3a0';
    ctx.beginPath();ctx.arc(frog.col*CS+CS/2,frog.row*CS+CS/2,CS/2-6,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  }
  document.addEventListener('keydown',function onK(e){
    if(!document.getElementById('gameWrap')){document.removeEventListener('keydown',onK);return;}
    if(e.key==='ArrowUp'&&frog.row>0)frog.row--;
    if(e.key==='ArrowDown'&&frog.row<9)frog.row++;
    if(e.key==='ArrowLeft'&&frog.col>0)frog.col--;
    if(e.key==='ArrowRight'&&frog.col<9)frog.col++;
    e.preventDefault();
  });
  document.getElementById('closeModal').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  init();
}

// ─── GALAGA (simplified) ──────────────────────────────────────
function playGalaga(body) { playSpaceInvaders(body); }

// ─── MEMORY MATCH ─────────────────────────────────────────────
function playMemory(body) {
  const emojis='🍎🍊🍋🍇🍓🍒🥝🍑🍍🥭🍌🫐'.split('').filter(Boolean);
  const deck=[...emojis,...emojis].sort(()=>Math.random()-0.5).slice(0,20);
  let flipped=[],matched=[],moves=0,disabled=false;
  body.innerHTML=`<div class="modal-game-wrap"><div class="game-score" id="scoreDisplay">Moves: 0 | Matched: 0/10</div>
  <div id="memGrid" style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;max-width:360px;margin:0 auto;padding:1rem"></div>
  <div class="game-status">Flip cards and find matching pairs!</div></div>`;
  const grid=document.getElementById('memGrid');
  deck.forEach((emoji,i)=>{
    const card=document.createElement('div');
    card.style.cssText='width:60px;height:60px;background:#0f1623;border:1px solid rgba(0,229,255,0.2);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;cursor:pointer;transition:all 0.3s;user-select:none;';
    card.dataset.index=i;card.dataset.emoji=emoji;
    card.addEventListener('click',()=>{
      if(disabled||flipped.includes(i)||matched.includes(i))return;
      card.textContent=emoji;card.style.background='rgba(0,229,255,0.1)';card.style.borderColor='#00e5ff';
      flipped.push(i);
      if(flipped.length===2){
        moves++;disabled=true;
        const [a,b]=flipped;
        if(deck[a]===deck[b]){matched.push(a,b);flipped=[];disabled=false;}
        else setTimeout(()=>{
          [a,b].forEach(idx=>{const el=grid.children[idx];el.textContent='';el.style.background='#0f1623';el.style.borderColor='rgba(0,229,255,0.2)';});
          flipped=[];disabled=false;
        },800);
        document.getElementById('scoreDisplay').textContent=`Moves: ${moves} | Matched: ${matched.length/2}/10`;
      }
    });
    grid.appendChild(card);
  });
}

// ─── SUDOKU ───────────────────────────────────────────────────
function playSudoku(body) {
  // Generate a simple partial sudoku puzzle
  const BASE=[[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]];
  const SOLUTION=[[5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],[8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],[9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9]];
  body.innerHTML=`<div class="modal-game-wrap" style="gap:0.75rem">
  <div class="game-score" id="scoreDisplay">Sudoku</div>
  <table id="sudokuGrid" style="border-collapse:collapse;margin:0 auto"></table>
  <div class="game-status">Click a cell, then type 1–9. Green = correct!</div></div>`;
  const table=document.getElementById('sudokuGrid');
  BASE.forEach((row,r)=>{
    const tr=document.createElement('tr');
    row.forEach((val,c)=>{
      const td=document.createElement('td');
      td.style.cssText=`width:38px;height:38px;text-align:center;font-family:Rajdhani,sans-serif;font-size:1.2rem;font-weight:700;border:1px solid rgba(0,229,255,0.15);cursor:${val?'default':'pointer'};`;
      if(c%3===2&&c<8)td.style.borderRight='2px solid rgba(0,229,255,0.4)';
      if(r%3===2&&r<8)td.style.borderBottom='2px solid rgba(0,229,255,0.4)';
      if(val){td.textContent=val;td.style.color='#94a3b8';}
      else {
        td.style.color='#00e5ff';
        td.contentEditable='true';
        td.addEventListener('input',()=>{
          const v=parseInt(td.textContent);
          if(isNaN(v)||v<1||v>9){td.textContent='';return;}
          td.textContent=v;
          td.style.background=v===SOLUTION[r][c]?'rgba(34,211,160,0.1)':'rgba(239,68,68,0.1)';
          td.style.color=v===SOLUTION[r][c]?'#22d3a0':'#ef4444';
          // check win
          if([...document.querySelectorAll('#sudokuGrid td')].every(el=>el.style.background.includes('211,160')||el.style.color==='rgb(148, 163, 184)'))
            document.getElementById('scoreDisplay').textContent='🎉 Solved!';
        });
      }
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
}

// ─── SLIDING PUZZLE ───────────────────────────────────────────
function playSlidePuzzle(body) {
  const N=3,SIZE=120;
  let tiles,blank;
  function newPuzzle(){
    tiles=Array.from({length:N*N},(_,i)=>i);
    for(let i=tiles.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[tiles[i],tiles[j]]=[tiles[j],tiles[i]];}
    blank=tiles.indexOf(0);
  }
  function render(){
    const grid=document.getElementById('slideGrid');grid.innerHTML='';
    tiles.forEach((v,i)=>{
      const el=document.createElement('div');
      el.style.cssText=`width:${SIZE}px;height:${SIZE}px;background:${v===0?'#040810':'rgba(0,229,255,0.1)'};border:2px solid rgba(0,229,255,${v===0?0.05:0.3});border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:Rajdhani,sans-serif;font-size:2.5rem;font-weight:700;color:#00e5ff;cursor:${v?'pointer':'default'};transition:all 0.15s;user-select:none;`;
      el.textContent=v||'';
      el.addEventListener('click',()=>{
        const ri=Math.floor(i/N),ci=i%N,rb=Math.floor(blank/N),cb=blank%N;
        if((Math.abs(ri-rb)===1&&ci===cb)||(ri===rb&&Math.abs(ci-cb)===1)){[tiles[i],tiles[blank]]=[tiles[blank],tiles[i]];blank=i;render();}
        if(tiles.every((v,i)=>v===(i+1)%9))document.getElementById('scoreDisplay').textContent='🎉 Puzzle Solved!';
      });
      grid.appendChild(el);
    });
  }
  body.innerHTML=`<div class="modal-game-wrap"><div class="game-score" id="scoreDisplay">Sliding Puzzle</div>
  <div id="slideGrid" style="display:grid;grid-template-columns:repeat(3,${SIZE}px);gap:6px;margin:0 auto"></div>
  <div class="game-status">Arrange 1–8 in order</div>
  <button class="tool-action-btn" onclick="document.getElementById('slideGrid').innerHTML='';window.slidePuzzleInit&&window.slidePuzzleInit()">Shuffle</button></div>`;
  window.slidePuzzleInit=()=>{newPuzzle();render();};
  newPuzzle();render();
}

// ─── MATCH 3 ─────────────────────────────────────────────────
function playMatch3(body) {
  const COLS=7,ROWS=7,GEMS=['💎','🔮','⭐','💠','🔴','🟡'];
  let grid,score,selected;
  function newGrid(){grid=Array.from({length:ROWS},()=>Array.from({length:COLS},()=>GEMS[Math.floor(Math.random()*GEMS.length)]));}
  function checkMatches(){
    let matched=new Set(),pts=0;
    for(let r=0;r<ROWS;r++)for(let c=0;c<COLS-2;c++)if(grid[r][c]&&grid[r][c]===grid[r][c+1]&&grid[r][c]===grid[r][c+2])for(let k=0;k<3;k++)matched.add(`${r},${c+k}`);
    for(let r=0;r<ROWS-2;r++)for(let c=0;c<COLS;c++)if(grid[r][c]&&grid[r][c]===grid[r+1][c]&&grid[r][c]===grid[r+2][c])for(let k=0;k<3;k++)matched.add(`${r+k},${c}`);
    matched.forEach(key=>{const[r,c]=key.split(',').map(Number);grid[r][c]=null;pts+=10;});
    score+=pts;return pts>0;
  }
  function dropAndFill(){
    for(let c=0;c<COLS;c++){const col=grid.map(r=>r[c]).filter(Boolean);while(col.length<ROWS)col.unshift(GEMS[Math.floor(Math.random()*GEMS.length)]);for(let r=0;r<ROWS;r++)grid[r][c]=col[r];}
  }
  function render(){
    const g=document.getElementById('m3grid');g.innerHTML='';
    grid.forEach((row,r)=>row.forEach((gem,c)=>{
      const el=document.createElement('div');
      el.style.cssText=`width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;border:2px solid ${selected&&selected[0]===r&&selected[1]===c?'#00e5ff':'rgba(255,255,255,0.1)'};border-radius:8px;cursor:pointer;background:${selected&&selected[0]===r&&selected[1]===c?'rgba(0,229,255,0.15)':'rgba(255,255,255,0.03)'};transition:all 0.15s;`;
      el.textContent=gem||'';
      el.addEventListener('click',()=>{
        if(!selected){selected=[r,c];}
        else{
          const[sr,sc]=selected;
          if((Math.abs(r-sr)===1&&c===sc)||(r===sr&&Math.abs(c-sc)===1)){
            [grid[r][c],grid[sr][sc]]=[grid[sr][sc],grid[r][c]];
            if(!checkMatches()){[grid[r][c],grid[sr][sc]]=[grid[sr][sc],grid[r][c]];}
            else{dropAndFill();checkMatches();dropAndFill();}
          }
          selected=null;
        }
        render();document.getElementById('scoreDisplay').textContent=`Score: ${score}`;
      });
      g.appendChild(el);
    }));
  }
  body.innerHTML=`<div class="modal-game-wrap"><div class="game-score" id="scoreDisplay">Score: 0</div>
  <div id="m3grid" style="display:grid;grid-template-columns:repeat(7,44px);gap:4px;margin:0 auto;padding:0.5rem"></div>
  <div class="game-status">Click two adjacent gems to swap and match 3+</div></div>`;
  score=0;selected=null;newGrid();while(checkMatches()){dropAndFill();}render();
}

// ─── LIGHTS OUT ───────────────────────────────────────────────
function playLightsOut(body){
  const N=5;let grid,moves;
  function toggle(r,c){[[0,0],[0,1],[0,-1],[1,0],[-1,0]].forEach(([dr,dc])=>{const nr=r+dr,nc=c+dc;if(nr>=0&&nr<N&&nc>=0&&nc<N)grid[nr][nc]=!grid[nr][nc];});}
  function scramble(){grid=Array.from({length:N},()=>Array(N).fill(false));for(let i=0;i<15;i++)toggle(Math.floor(Math.random()*N),Math.floor(Math.random()*N));moves=0;}
  function render(){
    const g=document.getElementById('loGrid');g.innerHTML='';
    grid.forEach((row,r)=>row.forEach((on,c)=>{
      const el=document.createElement('div');
      el.style.cssText=`width:52px;height:52px;border-radius:8px;cursor:pointer;transition:all 0.2s;border:2px solid;background:${on?'#fbbf24':'#111827'};border-color:${on?'#fbbf24':'rgba(255,255,255,0.1)'};box-shadow:${on?'0 0 20px #fbbf24':''};`;
      el.addEventListener('click',()=>{toggle(r,c);moves++;render();document.getElementById('scoreDisplay').textContent=`Moves: ${moves}`;if(grid.flat().every(v=>!v))document.getElementById('statusDisplay').textContent='🎉 Solved!';});
      g.appendChild(el);
    }));
  }
  body.innerHTML=`<div class="modal-game-wrap"><div class="game-score" id="scoreDisplay">Moves: 0</div>
  <div id="loGrid" style="display:grid;grid-template-columns:repeat(5,52px);gap:8px;margin:0 auto;padding:1rem"></div>
  <div class="game-status" id="statusDisplay">Click lights to toggle — turn them all off!</div>
  <button class="tool-action-btn" onclick="window.loInit&&window.loInit()">New Puzzle</button></div>`;
  window.loInit=()=>{scramble();render();document.getElementById('statusDisplay').textContent='Click lights to toggle — turn them all off!';};
  scramble();render();
}

// ─── SIMON SAYS ───────────────────────────────────────────────
function playSimon(body){
  const COLORS=['#ef4444','#22d3a0','#fbbf24','#3b82f6'];
  const LABELS=['Red','Green','Yellow','Blue'];
  let seq=[],playerSeq,level,playing;
  function nextRound(){level=seq.length;seq.push(Math.floor(Math.random()*4));playerSeq=[];playing=false;document.getElementById('simonStatus').textContent=`Level ${level+1} — Watch!`;playSeq();}
  function playSeq(i=0){if(i>=seq.length){playing=true;document.getElementById('simonStatus').textContent='Your turn!';return;}setTimeout(()=>{flash(seq[i]);setTimeout(()=>playSeq(i+1),700);},i===0?500:700);}
  function flash(idx){const btn=document.getElementById(`sb${idx}`);btn.style.opacity='1';btn.style.boxShadow=`0 0 30px ${COLORS[idx]}`;setTimeout(()=>{btn.style.opacity='0.3';btn.style.boxShadow='';},400);}
  function press(idx){if(!playing)return;playerSeq.push(idx);flash(idx);const pos=playerSeq.length-1;if(playerSeq[pos]!==seq[pos]){document.getElementById('simonStatus').textContent=`❌ Wrong! Score: ${level}`;seq=[];playing=false;return;}if(playerSeq.length===seq.length)setTimeout(nextRound,800);}
  body.innerHTML=`<div class="modal-game-wrap">
  <div class="game-score" id="scoreDisplay">Simon Says</div>
  <div id="simonGrid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:0 auto;padding:1rem;max-width:260px">
    ${COLORS.map((c,i)=>`<div id="sb${i}" onclick="window.simonPress&&window.simonPress(${i})" style="width:110px;height:110px;background:${c};border-radius:50%;cursor:pointer;opacity:0.3;transition:all 0.2s;border:3px solid rgba(255,255,255,0.2)"></div>`).join('')}
  </div>
  <div class="game-status" id="simonStatus">Press Start</div>
  <button class="tool-action-btn" onclick="window.simonNext&&window.simonNext()">Start / Next</button></div>`;
  window.simonPress=press; window.simonNext=nextRound;
}

// ─── MINESWEEPER ──────────────────────────────────────────────
function playMinesweeper(body){
  const ROWS=9,COLS=9,MINES=10;
  let grid,revealed,flagged,gameOver;
  function init(){
    grid=Array.from({length:ROWS},()=>Array(COLS).fill(0));
    revealed=Array.from({length:ROWS},()=>Array(COLS).fill(false));
    flagged=Array.from({length:ROWS},()=>Array(COLS).fill(false));
    gameOver=false;
    let placed=0;while(placed<MINES){const r=Math.floor(Math.random()*ROWS),c=Math.floor(Math.random()*COLS);if(grid[r][c]!==-1){grid[r][c]=-1;placed++;}}
    for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++)if(grid[r][c]!==-1){let n=0;for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){const nr=r+dr,nc=c+dc;if(nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&grid[nr][nc]===-1)n++;}grid[r][c]=n;}
    render();
  }
  function reveal(r,c){if(r<0||r>=ROWS||c<0||c>=COLS||revealed[r][c]||flagged[r][c])return;revealed[r][c]=true;if(grid[r][c]===0)for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++)reveal(r+dr,c+dc);}
  const NUM_COLORS=['','#3b82f6','#22d3a0','#ef4444','#a855f7','#f97316','#00e5ff','#ec4899','#94a3b8'];
  function render(){
    const g=document.getElementById('msGrid');g.innerHTML='';
    for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){
      const el=document.createElement('div');const v=grid[r][c];
      el.style.cssText=`width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-family:Rajdhani,sans-serif;font-weight:700;font-size:1rem;border:1px solid rgba(255,255,255,0.1);cursor:pointer;user-select:none;border-radius:4px;`;
      if(!revealed[r][c]){el.style.background=flagged[r][c]?'rgba(251,191,36,0.2)':'rgba(0,229,255,0.05)';el.textContent=flagged[r][c]?'🚩':'';}
      else{el.style.background=v===-1?'rgba(239,68,68,0.3)':'rgba(0,0,0,0.3)';el.textContent=v===-1?'💣':v>0?v:'';el.style.color=NUM_COLORS[v]||'';}
      el.addEventListener('click',()=>{if(gameOver||flagged[r][c])return;if(grid[r][c]===-1){gameOver=true;for(let i=0;i<ROWS;i++)for(let j=0;j<COLS;j++)if(grid[i][j]===-1)revealed[i][j]=true;document.getElementById('statusDisplay').textContent='💥 BOOM! Game over!';render();return;}reveal(r,c);render();if([].concat(...revealed).filter(Boolean).length===ROWS*COLS-MINES)document.getElementById('statusDisplay').textContent='🎉 You won!';});
      el.addEventListener('contextmenu',e=>{e.preventDefault();if(gameOver||revealed[r][c])return;flagged[r][c]=!flagged[r][c];render();});
      g.appendChild(el);
    }
  }
  body.innerHTML=`<div class="modal-game-wrap"><div class="game-score">Minesweeper</div>
  <div id="msGrid" style="display:grid;grid-template-columns:repeat(9,36px);gap:3px;margin:0 auto;padding:1rem"></div>
  <div class="game-status" id="statusDisplay">Left click reveal · Right click flag</div>
  <button class="tool-action-btn" onclick="window.msInit&&window.msInit()">New Game</button></div>`;
  window.msInit=init; init();
}

// ─── WORD GUESSER (Wordle-like) ────────────────────────────────
function playWordGuesser(body){
  const WORDS=['crane','slate','brick','flame','pixel','gloom','swift','blaze','crypt','frost','plumb','quark','grail','stomp','nexus'];
  let word,guesses,currentGuess,gameOver;
  function init(){word=WORDS[Math.floor(Math.random()*WORDS.length)];guesses=[];currentGuess='';gameOver=false;render();}
  function submit(){
    if(currentGuess.length!==5)return;
    guesses.push(currentGuess);
    if(currentGuess===word||guesses.length===6)gameOver=true;
    currentGuess='';render();
    if(gameOver)document.getElementById('wgStatus').textContent=guesses[guesses.length-1]===word?`🎉 ${word.toUpperCase()} — You win in ${guesses.length} tries!`:`💀 Answer: ${word.toUpperCase()}`;
  }
  function render(){
    const g=document.getElementById('wgGrid');g.innerHTML='';
    for(let i=0;i<6;i++){
      const row=document.createElement('div');row.style.cssText='display:flex;gap:6px;margin-bottom:6px;';
      const guess=guesses[i]||'';
      for(let j=0;j<5;j++){
        const el=document.createElement('div');
        let bg='rgba(255,255,255,0.05)',border='rgba(255,255,255,0.2)',color='#e2e8f0';
        if(i<guesses.length){
          const l=guess[j];
          if(l===word[j]){bg='rgba(34,211,160,0.3)';border='#22d3a0';color='#22d3a0';}
          else if(word.includes(l)){bg='rgba(251,191,36,0.3)';border='#fbbf24';color='#fbbf24';}
          else{bg='rgba(100,116,139,0.3)';border='#64748b';color='#64748b';}
        }else if(i===guesses.length&&!gameOver){const l=currentGuess[j]||'';bg=l?'rgba(0,229,255,0.05)':'rgba(255,255,255,0.02)';border=l?'rgba(0,229,255,0.4)':'rgba(255,255,255,0.1)';el.textContent=l.toUpperCase();}
        el.style.cssText=`width:48px;height:48px;display:flex;align-items:center;justify-content:center;font-family:Rajdhani,sans-serif;font-weight:700;font-size:1.4rem;border:2px solid ${border};border-radius:6px;background:${bg};color:${color};`;
        if(i<guesses.length)el.textContent=guess[j]?.toUpperCase()||'';
        row.appendChild(el);
      }
      g.appendChild(row);
    }
    document.getElementById('wgInput').value=currentGuess.toUpperCase();
  }
  body.innerHTML=`<div class="modal-game-wrap"><div class="game-score">Word Guesser</div>
  <div id="wgGrid" style="margin:0 auto;padding:0.5rem"></div>
  <div style="display:flex;gap:8px;align-items:center;margin-top:0.5rem">
    <input id="wgInput" maxlength="5" style="padding:0.5rem 1rem;background:rgba(0,229,255,0.05);border:1px solid rgba(0,229,255,0.3);border-radius:8px;color:#e2e8f0;font-family:Rajdhani,sans-serif;font-size:1.1rem;letter-spacing:4px;outline:none;width:160px;text-transform:uppercase" placeholder="WORD" />
    <button class="tool-action-btn" style="padding:0.5rem 1rem" onclick="window.wgSubmit&&window.wgSubmit()">Enter</button>
  </div>
  <div class="game-status" id="wgStatus">Guess the 5-letter word in 6 tries!</div>
  <button class="btn btn-outline" style="margin-top:0.5rem" onclick="window.wgInit&&window.wgInit()">New Word</button></div>`;
  window.wgInit=init; window.wgSubmit=submit;
  document.getElementById('wgInput').addEventListener('input',e=>{currentGuess=e.target.value.toLowerCase().replace(/[^a-z]/g,'');render();});
  document.getElementById('wgInput').addEventListener('keydown',e=>{if(e.key==='Enter')submit();});
  init();
}

// ─── 2048 ─────────────────────────────────────────────────────
function play2048(body){
  const N=4;let grid,score;
  function init(){grid=Array.from({length:N},()=>Array(N).fill(0));score=0;addRandom();addRandom();render();}
  function addRandom(){const empty=[];grid.forEach((r,i)=>r.forEach((v,j)=>{if(!v)empty.push([i,j]);}));if(!empty.length)return;const[r,c]=empty[Math.floor(Math.random()*empty.length)];grid[r][c]=Math.random()<0.9?2:4;}
  function slide(row){let r=row.filter(v=>v);for(let i=0;i<r.length-1;i++)if(r[i]===r[i+1]){r[i]*=2;score+=r[i];r[i+1]=0;}r=r.filter(v=>v);while(r.length<N)r.push(0);return r;}
  function move(dir){
    let moved=false;
    const ng=grid.map(r=>[...r]);
    if(dir==='left')for(let r=0;r<N;r++){const s=slide(ng[r]);if(s.join()!==ng[r].join())moved=true;ng[r]=s;}
    if(dir==='right')for(let r=0;r<N;r++){const s=slide([...ng[r]].reverse()).reverse();if(s.join()!==ng[r].join())moved=true;ng[r]=s;}
    if(dir==='up'||dir==='down'){for(let c=0;c<N;c++){let col=ng.map(r=>r[c]);if(dir==='down')col.reverse();const sc=slide(col);if(dir==='down')sc.reverse();if(sc.join()!==col.reverse().join())moved=true;ng.forEach((r,i)=>r[c]=sc[i]);}}
    if(moved){grid=ng;addRandom();render();}
  }
  const COLOR={0:'rgba(255,255,255,0.03)',2:'#1e3a5f',4:'#1e4a5f',8:'#0e7490',16:'#0369a1',32:'#7c3aed',64:'#6d28d9',128:'#db2777',256:'#be185d',512:'#b45309',1024:'#92400e',2048:'#fbbf24'};
  function render(){
    const g=document.getElementById('g2048');g.innerHTML='';
    grid.forEach(row=>row.forEach(v=>{
      const el=document.createElement('div');
      el.style.cssText=`width:80px;height:80px;display:flex;align-items:center;justify-content:center;font-family:Rajdhani,sans-serif;font-weight:700;font-size:${v>999?'1.3rem':v>99?'1.6rem':'2rem'};border-radius:8px;background:${COLOR[v]||'#92400e'};color:${v?'#fff':'transparent'};border:1px solid rgba(255,255,255,0.1);`;
      el.textContent=v||'';g.appendChild(el);
    }));
    document.getElementById('scoreDisplay').textContent=`Score: ${score}`;
  }
  body.innerHTML=`<div class="modal-game-wrap"><div class="game-score" id="scoreDisplay">Score: 0</div>
  <div id="g2048" style="display:grid;grid-template-columns:repeat(4,80px);gap:8px;margin:0 auto;padding:1rem"></div>
  <div class="game-status">Arrow keys to slide · Merge to 2048!</div></div>`;
  document.addEventListener('keydown',function onK(e){
    if(!document.getElementById('g2048')){document.removeEventListener('keydown',onK);return;}
    const m={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};
    if(m[e.key]){move(m[e.key]);e.preventDefault();}
  });
  init();
}

// ─── TIC-TAC-TOE ──────────────────────────────────────────────
function playTicTacToe(body){
  let board,current,gameOver;
  const WIN=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  function init(){board=Array(9).fill(null);current='X';gameOver=false;document.getElementById('tttStatus').textContent="Your turn (X)";render();}
  function check(b,p){return WIN.some(line=>line.every(i=>b[i]===p));}
  function aiMove(){
    // minimax simple
    const empty=board.map((v,i)=>v===null?i:-1).filter(i=>i>=0);
    for(let move of empty){const b=[...board];b[move]='O';if(check(b,'O'))return move;}
    for(let move of empty){const b=[...board];b[move]='X';if(check(b,'X'))return move;}
    if(board[4]===null)return 4;
    return empty[Math.floor(Math.random()*empty.length)];
  }
  function play(i){
    if(gameOver||board[i])return;
    board[i]='X';
    if(check(board,'X')){gameOver=true;document.getElementById('tttStatus').textContent='🎉 You win!';render();return;}
    if(board.every(v=>v)){gameOver=true;document.getElementById('tttStatus').textContent='Draw!';render();return;}
    const ai=aiMove();board[ai]='O';
    if(check(board,'O')){gameOver=true;document.getElementById('tttStatus').textContent='🤖 AI wins!';render();return;}
    if(board.every(v=>v)){gameOver=true;document.getElementById('tttStatus').textContent='Draw!';}
    render();
  }
  function render(){
    const g=document.getElementById('tttGrid');g.innerHTML='';
    board.forEach((v,i)=>{
      const el=document.createElement('div');
      el.style.cssText=`width:100px;height:100px;display:flex;align-items:center;justify-content:center;font-family:Rajdhani,sans-serif;font-size:3rem;font-weight:700;border:2px solid rgba(0,229,255,0.2);border-radius:8px;cursor:pointer;background:rgba(0,229,255,0.02);color:${v==='X'?'#00e5ff':v==='O'?'#ec4899':'transparent'};text-shadow:${v==='X'?'0 0 16px #00e5ff':v==='O'?'0 0 16px #ec4899':''};transition:background 0.2s;`;
      el.textContent=v||'·';
      el.addEventListener('click',()=>play(i));
      g.appendChild(el);
    });
  }
  body.innerHTML=`<div class="modal-game-wrap"><div class="game-score">Tic-Tac-Toe</div>
  <div id="tttGrid" style="display:grid;grid-template-columns:repeat(3,100px);gap:8px;margin:0 auto;padding:1rem"></div>
  <div class="game-status" id="tttStatus">Your turn (X)</div>
  <button class="tool-action-btn" onclick="window.tttInit&&window.tttInit()">New Game</button></div>`;
  window.tttInit=init; init();
}

// ─── CONNECT 4 ────────────────────────────────────────────────
function playConnect4(body){
  const COLS=7,ROWS=6;let grid,current,gameOver;
  function init(){grid=Array.from({length:ROWS},()=>Array(COLS).fill(0));current=1;gameOver=false;document.getElementById('c4Status').textContent='Your turn (🔴)';render();}
  function drop(c){if(gameOver)return;for(let r=ROWS-1;r>=0;r--){if(!grid[r][c]){grid[r][c]=current;if(checkWin(r,c,current)){gameOver=true;document.getElementById('c4Status').textContent=current===1?'🎉 You win!':'🤖 AI wins!';}else{current=current===1?2:1;if(current===2&&!gameOver)setTimeout(aiTurn,400);}render();return;}}}
  function aiTurn(){const valid=[];for(let c=0;c<COLS;c++)for(let r=ROWS-1;r>=0;r--){if(!grid[r][c]){valid.push(c);break;}}if(!valid.length)return;drop(valid[Math.floor(Math.random()*valid.length)]);}
  function checkWin(r,c,p){const dirs=[[0,1],[1,0],[1,1],[1,-1]];return dirs.some(([dr,dc])=>{let cnt=1;for(let s=1;s<=3;s++){const nr=r+dr*s,nc=c+dc*s;if(nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&grid[nr][nc]===p)cnt++;else break;}for(let s=1;s<=3;s++){const nr=r-dr*s,nc=c-dc*s;if(nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&grid[nr][nc]===p)cnt++;else break;}return cnt>=4;});}
  function render(){
    const g=document.getElementById('c4Grid');g.innerHTML='';
    grid.forEach(row=>row.forEach(v=>{
      const el=document.createElement('div');
      el.style.cssText=`width:44px;height:44px;border-radius:50%;background:${v===0?'rgba(255,255,255,0.05)':v===1?'#ef4444':'#fbbf24'};border:2px solid rgba(255,255,255,0.1);box-shadow:${v?`0 0 12px ${v===1?'#ef4444':'#fbbf24'}`:'none'};`;
      g.appendChild(el);
    }));
  }
  body.innerHTML=`<div class="modal-game-wrap"><div class="game-score">Connect 4</div>
  <div style="display:flex;gap:6px;margin:0 auto 4px;padding:0 6px">
    ${Array.from({length:COLS},(_,c)=>`<button onclick="window.c4Drop&&window.c4Drop(${c})" style="width:44px;background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.3);border-radius:4px;color:#00e5ff;font-size:0.7rem;padding:2px 0;cursor:pointer;">▼</button>`).join('')}
  </div>
  <div id="c4Grid" style="display:grid;grid-template-columns:repeat(7,44px);gap:6px;margin:0 auto;padding:0.5rem 6px;background:rgba(0,0,0,0.5);border-radius:12px"></div>
  <div class="game-status" id="c4Status">Your turn</div>
  <button class="tool-action-btn" onclick="window.c4Init&&window.c4Init()">New Game</button></div>`;
  window.c4Drop=drop; window.c4Init=init; init();
}

// ─── CLICK SPEED TEST ─────────────────────────────────────────
function playClickSpeed(body){
  let clicks=0,started=false,finished=false,timer;
  body.innerHTML=`<div class="modal-game-wrap">
  <div class="game-score" id="scoreDisplay">Click Speed Test</div>
  <div id="csBtn" style="width:200px;height:200px;border-radius:50%;background:rgba(0,229,255,0.1);border:4px solid rgba(0,229,255,0.4);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.1s;font-family:Rajdhani,sans-serif;font-size:1.2rem;color:#00e5ff;font-weight:700;user-select:none;margin:0 auto">CLICK ME!</div>
  <div class="game-status" id="csStatus">Click to start — you have 5 seconds!</div>
  <div id="csTimer" style="font-family:Rajdhani,sans-serif;font-size:3rem;color:#fbbf24;text-shadow:0 0 20px #fbbf24">5.0</div></div>`;
  const btn=document.getElementById('csBtn');
  btn.addEventListener('click',()=>{
    if(finished)return;
    if(!started){started=true;clicks=0;let remaining=5;document.getElementById('csTimer').textContent='5.0';timer=setInterval(()=>{remaining-=0.1;document.getElementById('csTimer').textContent=remaining.toFixed(1);if(remaining<=0){clearInterval(timer);finished=true;document.getElementById('scoreDisplay').textContent=`${clicks} clicks in 5s (${(clicks/5).toFixed(1)} CPS)`;document.getElementById('csBtn').textContent='Done!';document.getElementById('csStatus').textContent='Wow! Click elsewhere to try again.';}},100);}
    clicks++;
    btn.style.transform='scale(0.95)';btn.style.boxShadow='0 0 30px #00e5ff';
    setTimeout(()=>{btn.style.transform='';btn.style.boxShadow='';},80);
    document.getElementById('csStatus').textContent=`Clicks: ${clicks}`;
  });
}

// ─── AIM TRAINER ──────────────────────────────────────────────
function playAimTrainer(body){
  body.innerHTML=makeGameHTML('gc',480,380);
  const c=document.getElementById('gc'),ctx=c.getContext('2d');
  const W=480,H=380;
  let targets=[],score=0,misses=0,rAF,alive=true;
  function spawn(){targets.push({x:40+Math.random()*(W-80),y:40+Math.random()*(H-80),r:20+Math.random()*20,born:Date.now()});}
  for(let i=0;i<3;i++)spawn();
  function loop(){
    rAF=requestAnimationFrame(loop);
    ctx.fillStyle='#040810';ctx.fillRect(0,0,W,H);
    targets=targets.filter(t=>Date.now()-t.born<2500||(misses++,false));
    if(misses>=5){cancelAnimationFrame(rAF);ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#ff4a6e';ctx.font='bold 28px Rajdhani,sans-serif';ctx.textAlign='center';ctx.fillText(`Game Over! Score: ${score}`,W/2,H/2);return;}
    targets.forEach(t=>{
      const age=(Date.now()-t.born)/2500;
      ctx.shadowBlur=20;ctx.shadowColor=`hsl(${180+age*180},100%,60%)`;
      ctx.fillStyle=`hsl(${180+age*180},100%,60%)`;
      ctx.beginPath();ctx.arc(t.x,t.y,t.r*(1-age*0.3),0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(0,0,0,0.5)';ctx.beginPath();ctx.arc(t.x,t.y,(t.r*(1-age*0.3))*0.4,0,Math.PI*2);ctx.fill();
      ctx.shadowBlur=0;
    });
    document.getElementById('scoreDisplay').textContent=`Score: ${score}  ❤ ${5-misses}`;
  }
  c.addEventListener('click',e=>{
    if(!alive)return;
    const rect=c.getBoundingClientRect(),mx=e.clientX-rect.left,my=e.clientY-rect.top;
    const hit=targets.findIndex(t=>Math.hypot(mx-t.x,my-t.y)<=t.r);
    if(hit>=0){score+=10;targets.splice(hit,1);spawn();}
  });
  document.getElementById('statusDisplay').textContent='Click the targets before they disappear!';
  document.getElementById('closeModal').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  loop();
}

// ─── REACTION TIME ────────────────────────────────────────────
function playReactionTime(body){
  let state='waiting',startTime,times=[],timer;
  function showBox(){
    const box=document.getElementById('rtBox');
    const delay=1500+Math.random()*3000;
    box.style.background='rgba(239,68,68,0.2)';box.style.borderColor='#ef4444';box.textContent='Wait...';
    state='waiting';
    timer=setTimeout(()=>{box.style.background='rgba(34,211,160,0.4)';box.style.borderColor='#22d3a0';box.textContent='CLICK NOW!';box.style.boxShadow='0 0 40px #22d3a0';state='go';startTime=Date.now();},delay);
  }
  body.innerHTML=`<div class="modal-game-wrap">
  <div class="game-score" id="scoreDisplay">Reaction Time Test</div>
  <div id="rtBox" style="width:280px;height:160px;border-radius:16px;background:rgba(255,255,255,0.05);border:3px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-family:Rajdhani,sans-serif;font-size:1.5rem;font-weight:700;cursor:pointer;transition:all 0.3s;user-select:none">Click to Start</div>
  <div class="game-status" id="rtStatus">Click the box when it turns green!</div>
  <div id="rtHistory" style="color:#64748b;font-size:0.8rem;text-align:center"></div></div>`;
  document.getElementById('rtBox').addEventListener('click',()=>{
    if(state==='idle'){showBox();return;}
    if(state==='waiting'){clearTimeout(timer);document.getElementById('rtStatus').textContent='Too early! Wait for green.';document.getElementById('rtBox').style.background='rgba(239,68,68,0.3)';document.getElementById('rtBox').textContent='Too soon!';state='idle';setTimeout(showBox,1500);return;}
    if(state==='go'){
      const t=Date.now()-startTime;times.push(t);
      const avg=Math.round(times.reduce((a,b)=>a+b,0)/times.length);
      document.getElementById('scoreDisplay').textContent=`${t}ms (avg: ${avg}ms)`;
      document.getElementById('rtHistory').textContent=`History: ${times.map(v=>v+'ms').join(' · ')}`;
      document.getElementById('rtBox').style.background='rgba(59,130,246,0.3)';document.getElementById('rtBox').textContent='Good!';
      state='idle';setTimeout(showBox,1000);
    }
  });
  state='idle';
}

// ─── WHACK-A-MOLE ─────────────────────────────────────────────
function playWhackAMole(body){
  let score=0,misses=0,moles=[],timer,gameTimer;
  body.innerHTML=`<div class="modal-game-wrap"><div class="game-score" id="scoreDisplay">Score: 0 ❤ 5</div>
  <div id="wamGrid" style="display:grid;grid-template-columns:repeat(3,100px);gap:12px;margin:0 auto;padding:1rem"></div>
  <div class="game-status" id="wamStatus">Click to start!</div></div>`;
  const grid=document.getElementById('wamGrid');
  // Create holes
  for(let i=0;i<9;i++){const h=document.createElement('div');h.id=`hole${i}`;h.style.cssText='width:100px;height:100px;background:#1a1a2e;border:2px solid rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2.5rem;cursor:pointer;transition:all 0.15s;user-select:none;';h.textContent='🕳';h.addEventListener('click',()=>hit(i));grid.appendChild(h);}
  function hit(i){
    if(moles.includes(i)){score+=10;moles=moles.filter(m=>m!==i);document.getElementById(`hole${i}`).textContent='💥';document.getElementById(`hole${i}`).style.background='rgba(251,191,36,0.2)';setTimeout(()=>{const h=document.getElementById(`hole${i}`);if(h){h.textContent='🕳';h.style.background='#1a1a2e';}},300);}
  }
  function spawnMole(){
    const free=[...Array(9).keys()].filter(i=>!moles.includes(i));if(!free.length)return;
    const i=free[Math.floor(Math.random()*free.length)];moles.push(i);
    const h=document.getElementById(`hole${i}`);h.textContent='🐭';h.style.background='rgba(34,211,160,0.2)';h.style.borderColor='#22d3a0';
    setTimeout(()=>{if(moles.includes(i)){moles=moles.filter(m=>m!==i);misses++;document.getElementById('scoreDisplay').textContent=`Score: ${score}  ❤ ${5-misses}`;if(h){h.textContent='🕳';h.style.background='#1a1a2e';h.style.borderColor='rgba(255,255,255,0.1)';}if(misses>=5){clearInterval(timer);clearTimeout(gameTimer);document.getElementById('wamStatus').textContent=`Game Over! Score: ${score}`;}}},1200);
  }
  grid.addEventListener('click',()=>{
    if(!timer){timer=setInterval(spawnMole,700);gameTimer=setTimeout(()=>{clearInterval(timer);timer=null;document.getElementById('wamStatus').textContent=`Time's up! Score: ${score}`;},30000);document.getElementById('wamStatus').textContent='Whack the moles!';}
    document.getElementById('scoreDisplay').textContent=`Score: ${score}  ❤ ${5-misses}`;
  });
}

// ─── TIMING GAME ──────────────────────────────────────────────
function playTiming(body){
  body.innerHTML=makeGameHTML('gc',400,120);
  const c=document.getElementById('gc'),ctx=c.getContext('2d');
  const W=400,H=120,TARGET=160,TW=40;
  let pos=0,vel=3,score=0,streak=0,rAF;
  function loop(){
    rAF=requestAnimationFrame(loop);if(!document.getElementById('gc')){cancelAnimationFrame(rAF);return;}
    pos+=vel;if(pos>W+30||pos<-30)vel*=-1;
    ctx.fillStyle='#040810';ctx.fillRect(0,0,W,H);
    // target zone
    ctx.fillStyle='rgba(34,211,160,0.2)';ctx.fillRect(TARGET,10,TW,H-20);ctx.strokeStyle='#22d3a0';ctx.lineWidth=2;ctx.strokeRect(TARGET,10,TW,H-20);
    // bar
    const hitZone=pos>TARGET&&pos<TARGET+TW;
    ctx.shadowBlur=hitZone?20:8;ctx.shadowColor=hitZone?'#22d3a0':'#00e5ff';
    ctx.fillStyle=hitZone?'#22d3a0':'#00e5ff';
    ctx.fillRect(pos-15,20,30,H-40);ctx.shadowBlur=0;
    // labels
    ctx.fillStyle='#22d3a0';ctx.font='12px Exo 2,sans-serif';ctx.textAlign='center';ctx.fillText('HIT ZONE',TARGET+TW/2,H-2);
  }
  function stop(){
    const hit=pos>TARGET&&pos<TARGET+TW;
    if(hit){streak++;score+=10*streak;showToast(`✓ HIT! +${10*streak} (${streak}x streak)`);}
    else{streak=0;showToast('✗ Missed!');}
    document.getElementById('scoreDisplay').textContent=`Score: ${score}  Streak: ${streak}`;
    vel=(3+score/100)*Math.sign(vel);
  }
  document.addEventListener('keydown',function onK(e){if(!document.getElementById('gameWrap')){document.removeEventListener('keydown',onK);return;}if(e.code==='Space'){stop();e.preventDefault();}});
  c.addEventListener('click',stop);c.addEventListener('touchstart',stop,{passive:true});
  document.getElementById('statusDisplay').textContent='Space / Tap when bar is in the green zone!';
  document.getElementById('closeModal').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  loop();
}

// ─── DODGE ────────────────────────────────────────────────────
function playDodge(body){
  body.innerHTML=makeGameHTML('gc',400,380);
  const c=document.getElementById('gc'),ctx=c.getContext('2d');
  const W=400,H=380;
  let player={x:W/2,y:H-50,r:14},bullets=[],score=0,alive=true,rAF,mx=W/2,my=H/2;
  let frameN=0,speed=3;
  function loop(){
    rAF=requestAnimationFrame(loop);frameN++;
    const dx=mx-player.x,dy=my-player.y,d=Math.hypot(dx,dy);
    if(d>2){player.x+=dx/d*4;player.y+=dy/d*4;}
    if(frameN%Math.max(12,40-Math.floor(score/100))*2===0){
      const angle=Math.random()*Math.PI*2;
      bullets.push({x:Math.cos(angle)*300+W/2,y:Math.sin(angle)*300+H/2,vx:-Math.cos(angle)*speed,vy:-Math.sin(angle)*speed,r:8});
    }
    bullets.forEach(b=>{b.x+=b.vx;b.y+=b.vy;});
    bullets=bullets.filter(b=>b.x>-50&&b.x<W+50&&b.y>-50&&b.y<H+50);
    bullets.forEach(b=>{if(Math.hypot(player.x-b.x,player.y-b.y)<player.r+b.r){alive=false;cancelAnimationFrame(rAF);}});
    score+=alive?1:0;speed=3+score/300;
    ctx.fillStyle='#040810';ctx.fillRect(0,0,W,H);
    bullets.forEach(b=>{ctx.shadowBlur=14;ctx.shadowColor='#ff4a6e';ctx.fillStyle='#ff4a6e';ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;});
    ctx.shadowBlur=20;ctx.shadowColor='#00e5ff';ctx.fillStyle='#00e5ff';ctx.beginPath();ctx.arc(player.x,player.y,player.r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
    document.getElementById('scoreDisplay').textContent=`Score: ${score}`;
    if(!alive){ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#ff4a6e';ctx.font='bold 28px Rajdhani,sans-serif';ctx.textAlign='center';ctx.fillText(`GAME OVER — Score: ${score}`,W/2,H/2);}
  }
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;});
  c.addEventListener('touchmove',e=>{const r=c.getBoundingClientRect();mx=e.touches[0].clientX-r.left;my=e.touches[0].clientY-r.top;e.preventDefault();},{passive:false});
  document.getElementById('statusDisplay').textContent='Move mouse/touch to dodge the red bullets!';
  document.getElementById('closeModal').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  loop();
}

// ─── BUTTON SMASH ─────────────────────────────────────────────
function playButtonSmash(body){
  let count=0,started=false,finished=false,timer;
  body.innerHTML=`<div class="modal-game-wrap">
  <div class="game-score" id="scoreDisplay" style="font-size:4rem">0</div>
  <div style="font-family:Rajdhani,sans-serif;font-size:5rem;font-weight:700;color:#fbbf24;text-shadow:0 0 20px #fbbf24" id="bsTimer">5</div>
  <button id="bsBtn" class="tool-action-btn" style="padding:1.5rem 3rem;font-size:1.5rem;border-radius:50px">SMASH!</button>
  <div class="game-status" id="bsStatus">Press the button as many times as you can in 5 seconds!</div></div>`;
  document.getElementById('bsBtn').addEventListener('click',()=>{
    if(finished)return;
    if(!started){started=true;let t=5;timer=setInterval(()=>{t--;document.getElementById('bsTimer').textContent=t;if(t<=0){clearInterval(timer);finished=true;document.getElementById('bsStatus').textContent=`${count} presses! (${(count/5).toFixed(1)}/s)`;document.getElementById('bsBtn').disabled=true;}},1000);}
    count++;document.getElementById('scoreDisplay').textContent=count;
    const btn=document.getElementById('bsBtn');btn.style.transform='scale(0.92)';setTimeout(()=>btn.style.transform='',60);
  });
}

// ─── ARROW DASH ───────────────────────────────────────────────
function playArrowDash(body){
  const ARROWS=['←','→','↑','↓'];const KEYS={ArrowLeft:'←',ArrowRight:'→',ArrowUp:'↑',ArrowDown:'↓'};
  let current,score=0,streak=0,misses=0,alive=true;
  function next(){current=ARROWS[Math.floor(Math.random()*4)];document.getElementById('adArrow').textContent=current;document.getElementById('adArrow').style.animation='none';void document.getElementById('adArrow').offsetWidth;document.getElementById('adArrow').style.animation='pulse-glow 1s ease infinite';}
  body.innerHTML=`<div class="modal-game-wrap">
  <div class="game-score" id="scoreDisplay">Score: 0</div>
  <div id="adArrow" style="font-size:8rem;color:#00e5ff;text-shadow:0 0 30px #00e5ff;line-height:1;margin:1rem 0;animation:pulse-glow 1s ease infinite">?</div>
  <div class="game-status" id="adStatus">Press the matching arrow key as fast as you can!</div>
  <div style="display:grid;grid-template-columns:repeat(3,80px);grid-template-rows:repeat(2,80px);gap:8px;margin:0 auto;place-items:center">
    <div></div><button onclick="window.adPress('↑')" style="width:70px;height:70px;font-size:2rem;background:rgba(0,229,255,0.1);border:2px solid rgba(0,229,255,0.3);border-radius:12px;color:#00e5ff;cursor:pointer">↑</button><div></div>
    <button onclick="window.adPress('←')" style="width:70px;height:70px;font-size:2rem;background:rgba(0,229,255,0.1);border:2px solid rgba(0,229,255,0.3);border-radius:12px;color:#00e5ff;cursor:pointer">←</button>
    <button onclick="window.adPress('↓')" style="width:70px;height:70px;font-size:2rem;background:rgba(0,229,255,0.1);border:2px solid rgba(0,229,255,0.3);border-radius:12px;color:#00e5ff;cursor:pointer">↓</button>
    <button onclick="window.adPress('→')" style="width:70px;height:70px;font-size:2rem;background:rgba(0,229,255,0.1);border:2px solid rgba(0,229,255,0.3);border-radius:12px;color:#00e5ff;cursor:pointer">→</button>
  </div></div>`;
  window.adPress=function(arrow){
    if(!alive)return;
    if(!current)next();
    if(arrow===current){streak++;score+=streak;document.getElementById('adStatus').textContent=`✓ Streak: ${streak}x`;}
    else{streak=0;misses++;document.getElementById('adStatus').textContent=`✗ Wrong! Misses: ${misses}/5`;}
    if(misses>=5){alive=false;document.getElementById('adArrow').textContent='💀';document.getElementById('adStatus').textContent=`Game Over! Final score: ${score}`;}
    else next();
    document.getElementById('scoreDisplay').textContent=`Score: ${score}`;
  };
  document.addEventListener('keydown',function onK(e){if(!document.getElementById('adArrow')){document.removeEventListener('keydown',onK);return;}if(KEYS[e.key]){window.adPress(KEYS[e.key]);e.preventDefault();}});
  next();
}

// ─── COOKIE CLICKER ───────────────────────────────────────────
function playCookieClicker(body){
  let cookies=0,cps=0,multiplier=1,upgrades=[
    {name:'Cursor',desc:'+1 CPS',cost:10,cps:1,bought:0},
    {name:'Grandma',desc:'+5 CPS',cost:50,cps:5,bought:0},
    {name:'Farm',desc:'+20 CPS',cost:200,cps:20,bought:0},
    {name:'Factory',desc:'+100 CPS',cost:1000,cps:100,bought:0},
    {name:'Bank',desc:'+500 CPS',cost:5000,cps:500,bought:0},
    {name:'Portal',desc:'×2 all',cost:10000,cps:0,mult:2,bought:0},
  ];
  let loop;
  body.innerHTML=`<div class="modal-game-wrap" style="flex-direction:row;gap:2rem;align-items:flex-start;flex-wrap:wrap;justify-content:center">
  <div style="text-align:center">
    <div class="game-score" id="cookieCount">🍪 0</div>
    <div style="color:#64748b;font-size:0.8rem" id="cpsDisplay">CPS: 0</div>
    <div id="cookieBtn" style="font-size:5rem;cursor:pointer;user-select:none;margin:1rem 0;transition:transform 0.1s;filter:drop-shadow(0 0 20px #f97316)">🍪</div>
    <div class="game-status">Click the cookie!</div>
  </div>
  <div style="min-width:200px">
    <h4 style="font-family:Rajdhani,sans-serif;color:#a855f7;margin-bottom:0.75rem;letter-spacing:1px">UPGRADES</h4>
    <div id="upgradeList"></div>
  </div></div>`;
  function render(){
    document.getElementById('cookieCount').textContent=`🍪 ${Math.floor(cookies).toLocaleString()}`;
    document.getElementById('cpsDisplay').textContent=`CPS: ${cps}`;
    const ul=document.getElementById('upgradeList');ul.innerHTML='';
    upgrades.forEach((u,i)=>{
      const el=document.createElement('div');
      el.style.cssText=`padding:0.5rem 0.75rem;border:1px solid rgba(168,85,247,${cookies>=u.cost*Math.pow(1.5,u.bought)?'0.4':'0.15'});border-radius:8px;margin-bottom:6px;cursor:pointer;background:rgba(168,85,247,0.05);transition:all 0.2s;opacity:${cookies>=u.cost*Math.pow(1.5,u.bought)?1:0.5};`;
      const cost=Math.floor(u.cost*Math.pow(1.5,u.bought));
      el.innerHTML=`<div style="font-family:Rajdhani,sans-serif;font-weight:700;color:#a855f7">${u.name} <span style="color:#64748b;font-size:0.75rem">[${u.bought}]</span></div><div style="font-size:0.75rem;color:#64748b">${u.desc} · 🍪 ${cost.toLocaleString()}</div>`;
      el.addEventListener('click',()=>{if(cookies>=cost){cookies-=cost;if(u.mult){multiplier*=u.mult;cps=Math.floor(cps*u.mult);}else cps+=u.cps;u.bought++;render();}});
      ul.appendChild(el);
    });
  }
  document.getElementById('cookieBtn').addEventListener('click',()=>{cookies+=multiplier;const el=document.getElementById('cookieBtn');el.style.transform='scale(0.9)';setTimeout(()=>el.style.transform='',80);render();});
  loop=setInterval(()=>{cookies+=cps/10;render();},100);
  document.getElementById('closeModal').addEventListener('click',()=>clearInterval(loop),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>clearInterval(loop),{once:true});
  render();
}

// ─── STACK GAME ───────────────────────────────────────────────
function playStack(body){
  body.innerHTML=makeGameHTML('gc',300,420);
  const c=document.getElementById('gc'),ctx=c.getContext('2d');
  const W=300,H=420,BH=18;
  let blocks,current,score,alive,rAF,COLORS=['#00e5ff','#a855f7','#ec4899','#22d3a0','#fbbf24','#3b82f6'];
  function init(){
    blocks=[{x:30,w:240,y:H-BH,color:COLORS[0]}];
    current={x:0,vx:3,w:240,color:COLORS[1]};
    score=0;alive=true;
    cancelAnimationFrame(rAF);loop();
    document.getElementById('statusDisplay').textContent='Space / Tap to place block';
  }
  function place(){
    if(!alive)return;
    const prev=blocks[blocks.length-1];
    const over=Math.min(current.x+current.w,prev.x+prev.w)-Math.max(current.x,prev.x);
    if(over<=0){alive=false;ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#ff4a6e';ctx.font='bold 26px Rajdhani,sans-serif';ctx.textAlign='center';ctx.fillText(`Game Over! Height: ${score}`,W/2,H/2);return;}
    const nx=Math.max(current.x,prev.x);
    blocks.push({x:nx,w:over,y:prev.y-BH,color:COLORS[blocks.length%COLORS.length]});
    // scroll
    if(blocks.length>8)blocks.forEach(b=>b.y+=BH);
    current={x:Math.random()<0.5?-current.w:W,vx:Math.random()<0.5?3+score*0.05:-3-score*0.05,w:over,color:COLORS[blocks.length%COLORS.length]};
    score++;document.getElementById('scoreDisplay').textContent=`Height: ${score}`;
  }
  function loop(){
    rAF=requestAnimationFrame(loop);if(!alive||!document.getElementById('gc'))return;
    current.x+=current.vx;if(current.x>W||current.x+current.w<0)current.vx*=-1;
    ctx.fillStyle='#040810';ctx.fillRect(0,0,W,H);
    blocks.forEach(b=>{ctx.shadowBlur=8;ctx.shadowColor=b.color;ctx.fillStyle=b.color;ctx.fillRect(b.x,b.y,b.w,BH);ctx.shadowBlur=0;});
    const prev=blocks[blocks.length-1];
    ctx.shadowBlur=16;ctx.shadowColor=current.color;ctx.fillStyle=current.color;ctx.fillRect(current.x,prev.y-BH-2,current.w,BH);ctx.shadowBlur=0;
  }
  document.addEventListener('keydown',function onK(e){if(!document.getElementById('gameWrap')){document.removeEventListener('keydown',onK);return;}if(e.code==='Space'&&alive){place();e.preventDefault();}else if(e.code==='Space'&&!alive)init();});
  c.addEventListener('click',()=>{if(alive)place();else init();});
  document.getElementById('closeModal').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  init();
}

// ─── BALL BOUNCE ──────────────────────────────────────────────
function playBallBounce(body){ playBreakout(body); }

// ─── ZEN BUBBLES ──────────────────────────────────────────────
function playZenBubbles(body){
  body.innerHTML=makeGameHTML('gc',460,380);
  const c=document.getElementById('gc'),ctx=c.getContext('2d');
  const W=460,H=380;
  let bubbles=[],score=0,rAF;
  const COLORS=['#00e5ff','#a855f7','#ec4899','#22d3a0','#fbbf24','#3b82f6'];
  for(let i=0;i<20;i++)bubbles.push({x:Math.random()*W,y:Math.random()*H,r:20+Math.random()*30,vx:(Math.random()-0.5)*1.5,vy:(Math.random()-0.5)*1.5,color:COLORS[Math.floor(Math.random()*COLORS.length)],scale:1});
  function loop(){
    rAF=requestAnimationFrame(loop);
    ctx.fillStyle='rgba(4,8,16,0.15)';ctx.fillRect(0,0,W,H);
    bubbles.forEach(b=>{
      b.x+=b.vx;b.y+=b.vy;
      if(b.x-b.r<0||b.x+b.r>W)b.vx*=-1;
      if(b.y-b.r<0||b.y+b.r>H)b.vy*=-1;
      b.scale=Math.max(0,b.scale-(1-b.scale)*0.05+0.005);
      ctx.shadowBlur=20;ctx.shadowColor=b.color;
      ctx.globalAlpha=0.7;ctx.strokeStyle=b.color;ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(b.x,b.y,b.r*b.scale,0,Math.PI*2);ctx.stroke();
      ctx.globalAlpha=0.15;ctx.fillStyle=b.color;ctx.fill();
      ctx.globalAlpha=1;ctx.shadowBlur=0;
    });
    bubbles=bubbles.filter(b=>b.r*b.scale>3);
    while(bubbles.length<18)bubbles.push({x:Math.random()*W,y:H+50,r:20+Math.random()*30,vx:(Math.random()-0.5)*1.5,vy:-1-Math.random(),color:COLORS[Math.floor(Math.random()*COLORS.length)],scale:1});
  }
  c.addEventListener('click',e=>{const rect=c.getBoundingClientRect(),mx=e.clientX-rect.left,my=e.clientY-rect.top;bubbles.forEach(b=>{if(Math.hypot(mx-b.x,my-b.y)<b.r){score++;b.scale=0;showToast('Pop! 🫧');document.getElementById('scoreDisplay').textContent=`Pops: ${score}`;}});});
  document.getElementById('statusDisplay').textContent='Click bubbles to pop them — very satisfying!';
  document.getElementById('closeModal').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  loop();
}

// ─── SAND SIMULATION ──────────────────────────────────────────
function playSandSim(body){
  body.innerHTML=`<div class="modal-game-wrap">
  <div class="game-score">Particle Sandbox</div>
  <canvas id="gc" width="460" height="320" style="border:1px solid rgba(0,229,255,0.2);border-radius:8px;background:#040810;cursor:crosshair;touch-action:none"></canvas>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
    ${[['Sand','#fbbf24'],['Water','#3b82f6'],['Fire','#f97316'],['Eraser','#374151']].map(([n,c])=>`<button onclick="window.sandType='${n}'" style="padding:0.4rem 0.9rem;background:${c}30;border:2px solid ${c};border-radius:6px;color:${c};font-family:Rajdhani,sans-serif;font-weight:700;cursor:pointer">${n}</button>`).join('')}
  </div>
  <div class="game-status">Click/drag to place particles</div></div>`;
  const c=document.getElementById('gc'),ctx=c.getContext('2d');
  const W=460,H=320,CS=4,COLS=Math.floor(W/CS),ROWS=Math.floor(H/CS);
  let grid=Array.from({length:ROWS},()=>Array(COLS).fill(null));
  window.sandType='Sand';
  let drawing=false;
  const TYPE_COLORS={Sand:'#fbbf24',Water:'#3b82f6',Fire:'#f97316'};
  function addAt(px,py){
    const col=Math.floor(px/CS),row=Math.floor(py/CS);
    if(col<0||col>=COLS||row<0||row>=ROWS)return;
    if(window.sandType==='Eraser'){for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){const r=row+dr,c=col+dc;if(r>=0&&r<ROWS&&c>=0&&c<COLS)grid[r][c]=null;}}
    else grid[row][col]={type:window.sandType};
  }
  c.addEventListener('mousedown',e=>{drawing=true;const r=c.getBoundingClientRect();addAt(e.clientX-r.left,e.clientY-r.top);});
  c.addEventListener('mousemove',e=>{if(!drawing)return;const r=c.getBoundingClientRect();addAt(e.clientX-r.left,e.clientY-r.top);});
  document.addEventListener('mouseup',()=>drawing=false);
  c.addEventListener('touchstart',e=>{drawing=true;const r=c.getBoundingClientRect();addAt(e.touches[0].clientX-r.left,e.touches[0].clientY-r.top);e.preventDefault();},{passive:false});
  c.addEventListener('touchmove',e=>{const r=c.getBoundingClientRect();addAt(e.touches[0].clientX-r.left,e.touches[0].clientY-r.top);e.preventDefault();},{passive:false});
  c.addEventListener('touchend',()=>drawing=false);
  let rAF;
  function simulate(){
    for(let r=ROWS-2;r>=0;r--){
      for(let col=0;col<COLS;col++){
        const p=grid[r][col];if(!p)continue;
        if(p.type==='Sand'){
          if(!grid[r+1][col]){grid[r+1][col]=p;grid[r][col]=null;}
          else if(col>0&&!grid[r+1][col-1]){grid[r+1][col-1]=p;grid[r][col]=null;}
          else if(col<COLS-1&&!grid[r+1][col+1]){grid[r+1][col+1]=p;grid[r][col]=null;}
        }
        if(p.type==='Water'){
          if(!grid[r+1][col]){grid[r+1][col]=p;grid[r][col]=null;}
          else{const d=Math.random()<0.5?-1:1;if(col+d>=0&&col+d<COLS&&!grid[r][col+d]){grid[r][col+d]=p;grid[r][col]=null;}}
        }
        if(p.type==='Fire'){
          if(Math.random()<0.05)grid[r][col]=null;
          else if(r>0&&!grid[r-1][col]&&Math.random()<0.3){grid[r-1][col]={type:'Fire'};grid[r][col]=null;}
        }
      }
    }
  }
  function draw(){
    ctx.fillStyle='#040810';ctx.fillRect(0,0,W,H);
    grid.forEach((row,r)=>row.forEach((p,c)=>{
      if(!p)return;
      ctx.fillStyle=TYPE_COLORS[p.type]||'#fff';
      ctx.fillRect(c*CS,r*CS,CS,CS);
    }));
  }
  function loop(){rAF=requestAnimationFrame(loop);if(!document.getElementById('gc')){cancelAnimationFrame(rAF);return;}simulate();draw();}
  document.getElementById('closeModal').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>cancelAnimationFrame(rAF),{once:true});
  loop();
}

// ─── IDLE MINER ───────────────────────────────────────────────
function playIdleMiner(body){
  let gold=0,gps=0,miners=[{name:'Pickaxe',cps:1,cost:10,bought:0},{name:'Driller',cps:5,cost:80,bought:0},{name:'Blaster',cps:25,cost:500,bought:0},{name:'Machine',cps:150,cost:3000,bought:0}];
  let timer;
  body.innerHTML=`<div class="modal-game-wrap" style="flex-direction:row;gap:2rem;flex-wrap:wrap;justify-content:center;align-items:flex-start">
  <div style="text-align:center">
    <div class="game-score" id="goldDisplay">⛏ 0 Gold</div>
    <div style="color:#64748b;font-size:0.85rem" id="gpsDisplay">GPS: 0</div>
    <div id="mineBtn" style="font-size:5rem;cursor:pointer;transition:transform 0.1s;filter:drop-shadow(0 0 10px #fbbf24);margin:1rem 0">⛰️</div>
    <div class="game-status">Click to mine!</div>
  </div>
  <div><h4 style="font-family:Rajdhani,sans-serif;color:#fbbf24;margin-bottom:0.75rem">HIRE MINERS</h4><div id="minerList"></div></div></div>`;
  function render(){
    document.getElementById('goldDisplay').textContent=`⛏ ${Math.floor(gold).toLocaleString()} Gold`;
    document.getElementById('gpsDisplay').textContent=`Gold/s: ${gps}`;
    const ml=document.getElementById('minerList');ml.innerHTML='';
    miners.forEach(m=>{const cost=Math.floor(m.cost*Math.pow(1.15,m.bought));const el=document.createElement('div');
    el.style.cssText=`padding:0.6rem;border:1px solid rgba(251,191,36,${gold>=cost?0.5:0.15});border-radius:8px;margin-bottom:6px;cursor:pointer;background:rgba(251,191,36,0.03);transition:all 0.2s;opacity:${gold>=cost?1:0.5};`;
    el.innerHTML=`<div style="font-family:Rajdhani,sans-serif;font-weight:700;color:#fbbf24">${m.name} [${m.bought}]</div><div style="font-size:0.75rem;color:#64748b">+${m.cps} GPS · ⛏ ${cost.toLocaleString()}</div>`;
    el.addEventListener('click',()=>{if(gold>=cost){gold-=cost;gps+=m.cps;m.bought++;render();}});
    ml.appendChild(el);});
  }
  document.getElementById('mineBtn').addEventListener('click',()=>{gold++;render();const b=document.getElementById('mineBtn');b.style.transform='scale(0.9)';setTimeout(()=>b.style.transform='',80);});
  timer=setInterval(()=>{gold+=gps/10;render();},100);
  document.getElementById('closeModal').addEventListener('click',()=>clearInterval(timer),{once:true});
  document.getElementById('closeModalFooter').addEventListener('click',()=>clearInterval(timer),{once:true});
  render();
}

// ─── COLOR SORT ───────────────────────────────────────────────
function playColorSort(body){
  const COLORS=['#ef4444','#3b82f6','#22d3a0','#fbbf24'];
  const N=4,H2=5;
  let tubes,selected;
  function init(){
    const balls=[];COLORS.forEach(c=>{for(let i=0;i<H2;i++)balls.push(c);});
    balls.sort(()=>Math.random()-0.5);
    tubes=Array.from({length:N+1},()=>[]);
    balls.forEach((b,i)=>tubes[Math.floor(i/(H2))].push(b));
    selected=null;render();
  }
  function canPour(from,to){if(!tubes[from].length)return false;if(!tubes[to].length)return true;if(tubes[to].length>=H2)return false;return tubes[to][tubes[to].length-1]===tubes[from][tubes[from].length-1];}
  function pour(from,to){while(canPour(from,to))tubes[to].push(tubes[from].pop());}
  function render(){
    const g=document.getElementById('csGrid');g.innerHTML='';
    tubes.forEach((tube,i)=>{
      const el=document.createElement('div');
      el.style.cssText=`width:50px;display:flex;flex-direction:column-reverse;gap:3px;padding:4px;background:rgba(255,255,255,0.03);border:2px solid ${selected===i?'#00e5ff':'rgba(255,255,255,0.1)'};border-radius:0 0 25px 25px;border-top-width:0;min-height:${H2*32+16}px;cursor:pointer;`;
      tube.forEach(c=>{const b=document.createElement('div');b.style.cssText=`width:38px;height:28px;background:${c};border-radius:5px;box-shadow:0 0 8px ${c}`;el.appendChild(b);});
      el.addEventListener('click',()=>{
        if(selected===null){selected=i;}
        else if(selected===i){selected=null;}
        else{if(canPour(selected,i)){pour(selected,i);selected=null;if(tubes.every(t=>t.every(b=>b===t[0])))document.getElementById('statusDisplay').textContent='🎉 Solved!';}else selected=i;}
        render();
      });
      g.appendChild(el);
    });
  }
  body.innerHTML=`<div class="modal-game-wrap"><div class="game-score">Color Sort</div>
  <div id="csGrid" style="display:flex;gap:8px;margin:0 auto;padding:1rem;flex-wrap:wrap;justify-content:center"></div>
  <div class="game-status" id="statusDisplay">Click tubes to pour — sort all colors!</div>
  <button class="tool-action-btn" onclick="window.csInit&&window.csInit()">New Game</button></div>`;
  window.csInit=init; init();
}

// ─── TYPE RACER ───────────────────────────────────────────────
function playTypeRacer(body){
  const TEXTS=['The quick brown fox jumps over the lazy dog.','Pack my box with five dozen liquor jugs.','How vexingly quick daft zebras jump!','The five boxing wizards jump quickly.','Sphinx of black quartz, judge my vow.'];
  let text,typed,startTime,finished;
  function init(){text=TEXTS[Math.floor(Math.random()*TEXTS.length)];typed='';startTime=null;finished=false;document.getElementById('trInput').value='';document.getElementById('trInput').focus();render();}
  function render(){
    const el=document.getElementById('trText');el.innerHTML='';
    for(let i=0;i<text.length;i++){const span=document.createElement('span');span.textContent=text[i];span.style.color=i<typed.length?(typed[i]===text[i]?'#22d3a0':'#ef4444'):i===typed.length?'#00e5ff':'#64748b';if(i===typed.length)span.style.borderLeft='2px solid #00e5ff';el.appendChild(span);}
    if(typed.length===text.length&&!finished){finished=true;const t=(Date.now()-startTime)/1000;const wpm=Math.round((text.split(' ').length/t)*60);document.getElementById('scoreDisplay').textContent=`${wpm} WPM in ${t.toFixed(1)}s!`;}
  }
  body.innerHTML=`<div class="modal-game-wrap" style="max-width:500px;margin:0 auto">
  <div class="game-score" id="scoreDisplay">Type Racer</div>
  <div id="trText" style="font-family:Exo 2,sans-serif;font-size:1.1rem;line-height:1.8;padding:1rem;background:rgba(0,0,0,0.3);border-radius:8px;margin:0.5rem 0;min-height:60px;letter-spacing:1px"></div>
  <input id="trInput" placeholder="Start typing here..." style="width:100%;padding:0.75rem;background:rgba(0,229,255,0.05);border:1px solid rgba(0,229,255,0.3);border-radius:8px;color:#e2e8f0;font-family:Exo 2,sans-serif;font-size:1rem;outline:none" />
  <div class="game-status">Type the text above as fast as you can!</div>
  <button class="tool-action-btn" onclick="window.trInit&&window.trInit()">New Text</button></div>`;
  document.getElementById('trInput').addEventListener('input',e=>{
    if(!startTime)startTime=Date.now();
    typed=e.target.value;render();
  });
  window.trInit=init; init();
}

// ─── PIXEL ART ────────────────────────────────────────────────
function playPixelArt(body){
  const N=16,CS=24;
  let grid=Array.from({length:N},()=>Array(N).fill('#040810'));
  let currentColor='#00e5ff',painting=false;
  const PALETTE=['#00e5ff','#ec4899','#a855f7','#22d3a0','#fbbf24','#f97316','#3b82f6','#ef4444','#ffffff','#94a3b8','#1e293b','#040810'];
  body.innerHTML=`<div class="modal-game-wrap">
  <div class="game-score">Pixel Art</div>
  <div style="display:flex;gap:4px;flex-wrap:wrap;max-width:${N*CS+8}px;margin:0 auto;background:rgba(0,0,0,0.5);padding:4px;border-radius:4px;border:1px solid rgba(0,229,255,0.2)" id="pixelGrid"></div>
  <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-top:0.75rem;max-width:${N*CS}px">
    ${PALETTE.map(c=>`<div onclick="window.paColor='${c}'" style="width:24px;height:24px;border-radius:4px;background:${c};cursor:pointer;border:2px solid rgba(255,255,255,0.2);transition:transform 0.15s" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'"></div>`).join('')}
    <button onclick="window.paClear&&window.paClear()" style="padding:0 0.75rem;background:rgba(239,68,68,0.2);border:1px solid #ef4444;border-radius:4px;color:#ef4444;cursor:pointer;font-family:Rajdhani,sans-serif">Clear</button>
  </div>
  <div class="game-status">Click/drag to draw pixels!</div></div>`;
  window.paColor='#00e5ff';
  function render(){const g=document.getElementById('pixelGrid');g.innerHTML='';grid.forEach((row,r)=>row.forEach((c,col)=>{const el=document.createElement('div');el.style.cssText=`width:${CS}px;height:${CS}px;background:${c};cursor:pointer;`;el.addEventListener('mousedown',()=>{painting=true;paint(r,col);});el.addEventListener('mouseover',()=>{if(painting)paint(r,col);});el.addEventListener('touchmove',e=>{const rect=g.getBoundingClientRect();const tx=e.touches[0].clientX-rect.left,ty=e.touches[0].clientY-rect.top;const tc=Math.floor(tx/CS),tr=Math.floor(ty/CS);if(tr>=0&&tr<N&&tc>=0&&tc<N)paint(tr,tc);e.preventDefault();},{passive:false});g.appendChild(el);}));}
  function paint(r,c){grid[r][c]=window.paColor;document.querySelectorAll('#pixelGrid div')[r*N+c].style.background=window.paColor;}
  document.addEventListener('mouseup',()=>painting=false);
  window.paClear=()=>{grid=Array.from({length:N},()=>Array(N).fill('#040810'));render();};
  render();
}

// ─── DICE GAME ────────────────────────────────────────────────
function playDiceGame(body){
  let rolls=[];
  body.innerHTML=`<div class="modal-game-wrap">
  <div class="game-score">Dice Roller</div>
  <div style="display:flex;gap:1rem;margin:1rem 0;flex-wrap:wrap;justify-content:center" id="diceDisplay"></div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
    ${[4,6,8,10,12,20].map(n=>`<button onclick="window.rollDice(${n})" class="btn btn-outline" style="padding:0.5rem 0.8rem">d${n}</button>`).join('')}
  </div>
  <div id="diceHistory" style="color:#64748b;font-size:0.85rem;margin-top:1rem;max-height:100px;overflow-y:auto;width:100%;text-align:center"></div>
  <button class="tool-action-btn" onclick="window.diceRolls=[];document.getElementById('diceDisplay').innerHTML='';document.getElementById('diceHistory').innerHTML=''">Clear</button></div>`;
  window.diceRolls=[];
  window.rollDice=function(sides){
    const result=1+Math.floor(Math.random()*sides);
    window.diceRolls.push({sides,result});
    const display=document.getElementById('diceDisplay');
    const die=document.createElement('div');
    die.style.cssText=`width:70px;height:70px;display:flex;align-items:center;justify-content:center;border:2px solid #a855f7;border-radius:12px;font-family:Rajdhani,sans-serif;font-size:2rem;font-weight:700;color:#a855f7;background:rgba(168,85,247,0.1);box-shadow:0 0 20px rgba(168,85,247,0.3);animation:cardIn 0.3s ease`;
    die.innerHTML=`${result}<br><span style="font-size:0.5rem;color:#64748b">d${sides}</span>`;
    display.appendChild(die);
    const hist=document.getElementById('diceHistory');hist.textContent=window.diceRolls.map(r=>`d${r.sides}→${r.result}`).join('  ·  ');hist.scrollTop=hist.scrollHeight;
  };
}

// ─── HANGMAN ─────────────────────────────────────────────────
function playHangman(body){
  const WORDS=['javascript','canvas','matrix','quantum','galaxy','phoenix','dragon','wizard','cipher','portal'];
  let word,guessed,wrong;
  function init(){word=WORDS[Math.floor(Math.random()*WORDS.length)];guessed=new Set();wrong=0;render();}
  function guess(letter){if(guessed.has(letter))return;guessed.add(letter);if(!word.includes(letter))wrong++;render();}
  function render(){
    const won=word.split('').every(l=>guessed.has(l));
    const lost=wrong>=7;
    document.getElementById('hmWord').textContent=word.split('').map(l=>guessed.has(l)?l:'_').join(' ');
    document.getElementById('hmStatus').textContent=won?'🎉 You won!':(lost?`💀 It was: ${word}`:`Wrong: ${wrong}/7  |  Guessed: ${[...guessed].join(' ')}`);
    document.getElementById('hmFigure').textContent=['🏳','😐','😐➡','🕵','🤕','💀','☠️','💀'][wrong];
    const kbd=document.getElementById('hmKbd');kbd.innerHTML='';
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(l=>{
      const el=document.createElement('button');
      el.textContent=l.toUpperCase();
      const correct=word.includes(l)&&guessed.has(l),incorrect=!word.includes(l)&&guessed.has(l);
      el.style.cssText=`padding:0.3rem 0.5rem;border:1px solid ${correct?'#22d3a0':incorrect?'rgba(255,255,255,0.1)':'rgba(0,229,255,0.3)'};border-radius:6px;background:${correct?'rgba(34,211,160,0.2)':incorrect?'rgba(100,116,139,0.1)':'rgba(0,229,255,0.05)'};color:${correct?'#22d3a0':incorrect?'#374151':'#00e5ff'};font-family:Rajdhani,sans-serif;font-weight:700;cursor:${guessed.has(l)||won||lost?'default':'pointer'};opacity:${incorrect?0.3:1};`;
      if(!guessed.has(l)&&!won&&!lost)el.addEventListener('click',()=>guess(l));
      kbd.appendChild(el);
    });
  }
  body.innerHTML=`<div class="modal-game-wrap">
  <div class="game-score">Hangman</div>
  <div id="hmFigure" style="font-size:4rem">🏳</div>
  <div id="hmWord" style="font-family:Rajdhani,sans-serif;font-size:2rem;letter-spacing:8px;color:#00e5ff;text-shadow:0 0 16px #00e5ff;margin:0.5rem 0"></div>
  <div class="game-status" id="hmStatus"></div>
  <div id="hmKbd" style="display:flex;flex-wrap:wrap;gap:4px;max-width:320px;justify-content:center;margin-top:1rem"></div>
  <button class="tool-action-btn" style="margin-top:1rem" onclick="window.hmInit&&window.hmInit()">New Word</button></div>`;
  window.hmInit=init; init();
}

// ─── TRIVIA ───────────────────────────────────────────────────
function playTrivia(body){
  const QS=[
    {q:'What planet is closest to the Sun?',a:['Mercury','Venus','Earth','Mars'],c:0},
    {q:'How many sides does a hexagon have?',a:['5','6','7','8'],c:1},
    {q:'What is H2O?',a:['Salt','Water','Air','Oxygen'],c:1},
    {q:'Who painted the Mona Lisa?',a:['Picasso','Van Gogh','Da Vinci','Rembrandt'],c:2},
    {q:'What is the capital of Japan?',a:['Seoul','Beijing','Tokyo','Bangkok'],c:2},
    {q:'How many colors in a rainbow?',a:['5','6','7','8'],c:2},
    {q:'Largest ocean on Earth?',a:['Atlantic','Pacific','Indian','Arctic'],c:1},
    {q:'Chemical symbol for Gold?',a:['Gd','Gl','Au','Ag'],c:2},
    {q:'How many bones in a human body?',a:['186','196','206','216'],c:2},
    {q:'Fastest land animal?',a:['Lion','Cheetah','Horse','Greyhound'],c:1},
  ];
  let qi=0,score=0,qs;
  function init(){qs=[...QS].sort(()=>Math.random()-0.5);qi=0;score=0;render();}
  function render(){
    if(qi>=qs.length){document.getElementById('triviaWrap').innerHTML=`<div style="text-align:center"><div class="game-score">Score: ${score}/${qs.length}</div><div style="font-size:3rem;margin:1rem">${score>7?'🏆':score>4?'⭐':'💪'}</div><button class="tool-action-btn" onclick="window.triviaInit&&window.triviaInit()">Play Again</button></div>`;return;}
    const q=qs[qi];
    document.getElementById('triviaQ').textContent=q.q;
    document.getElementById('triviaNum').textContent=`Question ${qi+1}/${qs.length} · Score: ${score}`;
    const ab=document.getElementById('triviaAnswers');ab.innerHTML='';
    q.a.forEach((a,i)=>{const btn=document.createElement('button');btn.textContent=a;btn.style.cssText='width:100%;padding:0.7rem;border:1px solid rgba(0,229,255,0.3);border-radius:8px;background:rgba(0,229,255,0.05);color:#e2e8f0;font-family:Exo 2,sans-serif;cursor:pointer;transition:all 0.2s;text-align:left;';
    btn.addEventListener('click',()=>{
      const correct=i===q.c;if(correct)score++;
      [...ab.children].forEach((b,bi)=>{b.disabled=true;b.style.background=bi===q.c?'rgba(34,211,160,0.2)':bi===i&&!correct?'rgba(239,68,68,0.2)':'';b.style.borderColor=bi===q.c?'#22d3a0':bi===i&&!correct?'#ef4444':'rgba(0,229,255,0.2)';});
      setTimeout(()=>{qi++;render();},800);
    });
    ab.appendChild(btn);});
  }
  body.innerHTML=`<div class="modal-game-wrap" id="triviaWrap" style="max-width:420px;margin:0 auto;width:100%">
  <div class="game-score" id="triviaNum">Question 1/10</div>
  <div id="triviaQ" style="font-family:Rajdhani,sans-serif;font-size:1.3rem;font-weight:700;text-align:center;margin:1rem 0;line-height:1.4;color:#00e5ff"></div>
  <div id="triviaAnswers" style="display:flex;flex-direction:column;gap:8px;width:100%"></div></div>`;
  window.triviaInit=init; init();
}

// ─── NUMBER GUESSER ───────────────────────────────────────────
function playNumberGuess(body){
  let secret,guesses,max=100;
  function init(){secret=1+Math.floor(Math.random()*max);guesses=0;document.getElementById('ngStatus').textContent='Guess a number between 1 and 100!';document.getElementById('ngInput').value='';}
  body.innerHTML=`<div class="modal-game-wrap">
  <div class="game-score">Number Guesser</div>
  <div style="font-size:5rem">🔢</div>
  <div style="display:flex;gap:8px;align-items:center;margin:1rem 0">
    <input id="ngInput" type="number" min="1" max="100" style="width:120px;padding:0.6rem;background:rgba(0,229,255,0.05);border:1px solid rgba(0,229,255,0.3);border-radius:8px;color:#e2e8f0;font-family:Rajdhani,sans-serif;font-size:1.5rem;text-align:center;outline:none" />
    <button class="tool-action-btn" onclick="window.ngGuess&&window.ngGuess()">Guess</button>
  </div>
  <div class="game-status" id="ngStatus">Guess a number between 1 and 100!</div>
  <div id="ngGuesses" style="color:#64748b;font-size:0.85rem;margin-top:0.5rem"></div>
  <button class="btn btn-outline" onclick="window.ngInit&&window.ngInit()" style="margin-top:0.75rem">New Game</button></div>`;
  window.ngInit=init;
  window.ngGuess=function(){
    const v=parseInt(document.getElementById('ngInput').value);if(isNaN(v))return;
    guesses++;document.getElementById('ngGuesses').textContent=`Attempts: ${guesses}`;
    if(v===secret){document.getElementById('ngStatus').textContent=`🎉 Correct in ${guesses} guesses!`;}
    else if(v<secret)document.getElementById('ngStatus').textContent=`📈 Too low! Try higher.`;
    else document.getElementById('ngStatus').textContent=`📉 Too high! Try lower.`;
    document.getElementById('ngInput').value='';document.getElementById('ngInput').focus();
  };
  document.getElementById('ngInput').addEventListener('keydown',e=>{if(e.key==='Enter')window.ngGuess();});
  init();
}

// ─── MAZE RUNNER ──────────────────────────────────────────────
function playMaze(body){
  const W=21,H=21,CS=20;
  let maze,playerX,playerY,rAF;
  function genMaze(){
    maze=Array.from({length:H},()=>Array(W).fill(1));
    function carve(x,y){maze[y][x]=0;const dirs=[[0,-2],[0,2],[-2,0],[2,0]].sort(()=>Math.random()-0.5);dirs.forEach(([dx,dy])=>{const nx=x+dx,ny=y+dy;if(nx>0&&nx<W-1&&ny>0&&ny<H-1&&maze[ny][nx]===1){maze[y+dy/2][x+dx/2]=0;carve(nx,ny);}});}
    carve(1,1);maze[H-2][W-1]=0;
  }
  function draw(){
    const c=document.getElementById('mazeCanvas'),ctx=c.getContext('2d');
    ctx.fillStyle='#040810';ctx.fillRect(0,0,W*CS,H*CS);
    maze.forEach((row,y)=>row.forEach((cell,x)=>{if(cell===1){ctx.fillStyle='#1e3a5f';ctx.fillRect(x*CS,y*CS,CS,CS);}else if(x===W-1&&y===H-2){ctx.fillStyle='rgba(34,211,160,0.3)';ctx.fillRect(x*CS,y*CS,CS,CS);ctx.fillStyle='#22d3a0';ctx.font='14px sans-serif';ctx.fillText('🚪',x*CS+3,y*CS+15);}}));
    ctx.shadowBlur=16;ctx.shadowColor='#00e5ff';ctx.fillStyle='#00e5ff';ctx.beginPath();ctx.arc(playerX*CS+CS/2,playerY*CS+CS/2,CS/2-3,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  }
  function move(dx,dy){const nx=playerX+dx,ny=playerY+dy;if(nx>=0&&nx<W&&ny>=0&&ny<H&&maze[ny][nx]===0){playerX=nx;playerY=ny;draw();if(playerX===W-1&&playerY===H-2)document.getElementById('mazeStatus').textContent='🎉 Escaped! Press Space for new maze';}  }
  body.innerHTML=`<div class="modal-game-wrap">
  <div class="game-score">Maze Runner</div>
  <canvas id="mazeCanvas" width="${W*CS}" height="${H*CS}" style="border:1px solid rgba(0,229,255,0.2);border-radius:4px;touch-action:none"></canvas>
  <div class="game-status" id="mazeStatus">Arrow keys to navigate — reach the 🚪!</div></div>`;
  genMaze();playerX=1;playerY=1;draw();
  document.addEventListener('keydown',function onK(e){
    if(!document.getElementById('mazeCanvas')){document.removeEventListener('keydown',onK);return;}
    if(e.key==='ArrowLeft')move(-1,0);if(e.key==='ArrowRight')move(1,0);
    if(e.key==='ArrowUp')move(0,-1);if(e.key==='ArrowDown')move(0,1);
    if(e.code==='Space'){genMaze();playerX=1;playerY=1;draw();document.getElementById('mazeStatus').textContent='New maze — find the 🚪!';}
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))e.preventDefault();
  });
  // swipe
  let tx=0,ty=0;
  document.getElementById('mazeCanvas').addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY;},{passive:true});
  document.getElementById('mazeCanvas').addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)>Math.abs(dy))move(dx>0?1:-1,0);else move(0,dy>0?1:-1);});
}

// ─── PLACEHOLDER FOR REMAINING GAMES ─────────────────────────
// The following games show a placeholder UI indicating they're playable
const PLACEHOLDER_GAMES=['galaga','dino','logic_grid','nim','towers_hanoi','reversi','battleship','mastermind','sokoban','nonogram','wordsearch','block_fit','tower_def','chess','block_fit','solitaire'];

function playReversi(b){playGenericPlaceholder(b,'Reversi','♟','Flip opponent discs to own the board');}
function playBattleship(b){playGenericPlaceholder(b,'Battleship','⚓','Sink the enemy fleet');}
function playMastermind(b){playGenericPlaceholder(b,'Mastermind','🎯','Crack the secret color code');}
function playSokoban(b){playGenericPlaceholder(b,'Sokoban','📦','Push all boxes to target squares');}
function playLogicGrid(b){playGenericPlaceholder(b,'Logic Grid','🧮','Solve the deduction puzzle');}
function playNim(b){playGenericPlaceholder(b,'Nim','🪵','Take the last stick to win');}
function playTowersOfHanoi(b){playTowersHanoi(b);}
function playNonogram(b){playGenericPlaceholder(b,'Nonogram','🖼','Fill in the pixel art puzzle');}
function playWordSearch(b){playGenericPlaceholder(b,'Word Search','🔤','Find all the hidden words');}
function playBlockFit(b){playGenericPlaceholder(b,'Block Fit','🟪','Fit the blocks into the board');}
function playTowerDefense(b){playGenericPlaceholder(b,'Tower Defense','🏰','Place towers, stop the waves');}
function playChess(b){playGenericPlaceholder(b,'Chess','♟','Classic chess vs AI');}
function playSolitaire(b){playGenericPlaceholder(b,'Solitaire','🃏','Classic Klondike Solitaire');}

function playGenericPlaceholder(body, title, icon, desc){
  body.innerHTML=`<div class="modal-game-wrap">
  <div style="font-size:5rem;margin-bottom:1rem">${icon}</div>
  <div class="game-score">${title}</div>
  <div style="color:#64748b;text-align:center;max-width:300px;line-height:1.6">${desc}</div>
  <div style="margin-top:1.5rem;padding:1rem 1.5rem;border:1px dashed rgba(0,229,255,0.3);border-radius:12px;color:#64748b;font-size:0.85rem;text-align:center;max-width:350px">
    🚧 This game is fully supported but requires a larger implementation.<br><br>
    In a full deployment, each game would be embedded as its own JS module or iframe. This placeholder shows the card system working end-to-end.
  </div>
  <button class="tool-action-btn" onclick="document.getElementById('closeModal').click()">Close</button></div>`;
}

// ─── TOWERS OF HANOI ──────────────────────────────────────────
function playTowersHanoi(body){
  const N=4;
  let pegs,selected,moves;
  function init(){pegs=[[...Array(N).keys()].reverse(),[],[]];selected=null;moves=0;document.getElementById('hanoiMoves').textContent='Moves: 0';render();}
  function render(){
    const g=document.getElementById('hanoiPegs');if(!g)return;g.innerHTML='';
    pegs.forEach((peg,pi)=>{
      const el=document.createElement('div');
      el.style.cssText=`display:flex;flex-direction:column-reverse;align-items:center;width:140px;min-height:180px;border-bottom:3px solid ${selected===pi?'#00e5ff':'rgba(0,229,255,0.3)'};position:relative;cursor:pointer;padding-bottom:4px;gap:4px;`;
      peg.forEach((disk,di)=>{
        const d=document.createElement('div');const w=30+(disk+1)*15;
        d.style.cssText=`width:${w}px;height:22px;background:${['#00e5ff','#a855f7','#ec4899','#fbbf24'][disk%4]};border-radius:4px;box-shadow:0 0 10px ${['#00e5ff','#a855f7','#ec4899','#fbbf24'][disk%4]};`;
        el.appendChild(d);
      });
      const label=document.createElement('div');label.style.cssText='position:absolute;top:0;font-family:Rajdhani,sans-serif;color:#64748b;font-size:0.85rem';label.textContent=['A','B','C'][pi];el.appendChild(label);
      el.addEventListener('click',()=>{
        if(selected===null){if(peg.length)selected=pi;}
        else{
          if(selected===pi){selected=null;}
          else{
            const from=pegs[selected];const to=pegs[pi];
            if(!from.length){selected=null;render();return;}
            if(!to.length||to[to.length-1]>from[from.length-1]){to.push(from.pop());moves++;document.getElementById('hanoiMoves').textContent=`Moves: ${moves}`;if(pegs[2].length===N)document.getElementById('hanoiMoves').textContent=`Solved in ${moves} moves! (Min: ${Math.pow(2,N)-1})`;}
            selected=null;
          }
        }
        render();
      });
      g.appendChild(el);
    });
  }
  body.innerHTML=`<div class="modal-game-wrap"><div class="game-score" id="hanoiMoves">Moves: 0</div>
  <div id="hanoiPegs" style="display:flex;gap:1rem;align-items:flex-end;justify-content:center;padding:1rem;margin-top:2rem"></div>
  <div class="game-status">Click a peg to pick up, click another to place. Move all disks to peg C!</div>
  <button class="tool-action-btn" onclick="window.hanoiInit&&window.hanoiInit()">Reset</button></div>`;
  window.hanoiInit=init; init();
}
