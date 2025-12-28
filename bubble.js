const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 120;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
// =================== REWARD TARGETS ===================
const REWARD_TARGETS = [
  { points: 1000000, label: "₵5 Airtime" },
  { points: 4000000, label: "₵7 Airtime" },
  { points: 6000000, label: "₵10 Airtime" }
];

let currentRewardIndex = 0;
let warned = false;
let bubbles = [];
let points = 0;
let progress = 0;

// bubble class
class Bubble {
  constructor() {
    this.radius = 20;
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 200;
    this.speed = 1 + Math.random() * 2;
    this.color = ["#ff4d4d", "#4dd2ff", "#4dff88", "#ffd24d"]
      [Math.floor(Math.random() * 4)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.y -= this.speed;
    this.draw();
  }
}

// spawn bubbles
function spawnBubble() {
  bubbles.push(new Bubble());
}
setInterval(spawnBubble, 700);

// touch + click support
function handleTap(x, y) {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    const b = bubbles[i];
    const dx = x - b.x;
    const dy = y - b.y;
    if (Math.sqrt(dx * dx + dy * dy) < b.radius) {
      bubbles.splice(i, 1);
      points += 10;
      progress += 5;

      document.getElementById("score").innerText = "Points: " + points;
      document.getElementById("meter").innerText = "Progress: " + progress + "%";
      break;
    }
  }
}

canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  handleTap(e.clientX - rect.left, e.clientY - rect.top);
});

canvas.addEventListener("touchstart", e => {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  handleTap(touch.clientX - rect.left, touch.clientY - rect.top);
});

// animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(b => b.update());
  requestAnimationFrame(animate);
}

// TEST DRAW (you should see this immediately)
ctx.fillStyle = "white";
ctx.font = "20px Arial";
ctx.fillText("Game Loaded ✔", 20, 40);

animate();
