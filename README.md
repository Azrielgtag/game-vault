# 🎮 Game Vault
**Hundreds of Games, Endless Fun**

A complete, self-contained browser game arcade with a futuristic neon UI. No backend required — deploy instantly to GitHub Pages.

---

## 🚀 Deploy to GitHub Pages (3 steps)

1. **Create a new GitHub repository** (e.g. `game-vault`)
2. **Upload all 4 files** into the repo root:
   - `index.html`
   - `style.css`
   - `games.js`
   - `tools.js`
   - `main.js`
3. Go to **Settings → Pages → Source: Deploy from branch → main → / (root)** → Save

Your site will be live at `https://yourusername.github.io/game-vault` within 1–2 minutes!

---

## 🎯 Features

### Games (55+ playable, expandable to 200+)
| Category | Games |
|---|---|
| 🕹 Arcade | Snake, Breakout, Neon Runner, Pong, Flappy Block, Asteroids, Tetris, Space Invaders, Pac-Man, Frogger, Dino Dash |
| 🧩 Puzzle | Sudoku, Sliding Puzzle, Memory Match, Gem Crush (Match-3), Lights Out, Simon Says, Minesweeper, Word Guesser (Wordle), 2048 |
| ♟ Strategy | Tic-Tac-Toe, Connect 4, Tower of Hanoi, Mastermind, Sokoban |
| ⚡ Reaction | Click Speed, Aim Trainer, Reaction Time, Whack-a-Mole, Timing Game, Dodge!, Button Smasher, Arrow Dash |
| 🎯 Casual | Cookie Clicker, Stack It, Zen Bubbles, Sand Simulation, Idle Miner, Color Sort, Type Racer, Pixel Art, Dice Roll, Hangman, Trivia, Number Guesser, Maze Runner |

### 🔧 Tools (12 interactive tools)
- 😂 Joke Generator
- 🧠 Trivia Generator  
- 🎲 Dice Spinner (d4–d20)
- 🪙 Coin Flip
- 🔢 Random Number Generator
- ✨ Particle Sandbox
- 🖼 Meme Generator
- ⏱ Countdown Timer
- 🎡 Decision Wheel
- 🎨 Color Mixer
- 🔐 Password Generator
- 🎵 Metronome

### 🏆 Leaderboard
- Global / Daily / Weekly tabs
- Animated entries with rank badges

### ✨ UI
- Animated neon particle background
- Dark theme with cyan/purple/pink accents
- Smooth card hover effects + glow animations
- Responsive & touch-friendly
- Modal game launcher with fullscreen support
- Category filters + live search
- Lazy-loading game grid

---

## 📁 File Structure

```
game-vault/
├── index.html   # Main page & structure
├── style.css    # All styling (CSS variables, animations)
├── games.js     # Game catalogue + playable game engines
├── tools.js     # Fun tools implementations  
├── main.js      # App logic, particles, rendering
└── README.md
```

---

## 🛠 Customizing

**Add a new game:**
```js
// In games.js, add to the GAMES array:
{ id:'mygame', title:'My Game', desc:'Short description', cat:'arcade',
  emoji:'🎮', color:'#00e5ff', playFn: playMyGame }

// Then define the function:
function playMyGame(body) {
  body.innerHTML = makeGameHTML('gc', 480, 400);
  const canvas = document.getElementById('gc');
  // ... your canvas game code
}
```

**Change colors** — edit CSS variables in `style.css`:
```css
:root {
  --cyan: #00e5ff;
  --purple: #a855f7;
  /* etc */
}
```

---

## 🎮 Keyboard Shortcuts
- `/` — Focus search bar
- `Esc` — Close game modal
- `Space` — In-game action (jump, restart, etc.)
- `Arrow Keys` — In-game movement

---

Made with ❤️ and lots of ☕ | Game Vault 2025
