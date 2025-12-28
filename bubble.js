const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 120;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let bubbles = [];
let points = 0;
let progress = 0;

const user = localStorage.getItem("user");

class Bubble {
  constructor() {
    this.radius = 15 + Math.random() * 10;
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + this.radius;
    this.speed = 1 + Math.random() * 2;
    this.color = ["#ff4d4d","#4dd2ff","#4dff88","#ffd24d"][
      Math.floor(Math.random() * 4)
    ];
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

function spawnBubble() {
  bubbles.push(new Bubble());
}

canvas.addEventListener("click", (e) => {
  bubbles.forEach((b, i) => {
    const dx = e.clientX - b.x;
    const dy = e.clientY - b.y;
    if (Math.sqrt(dx * dx + dy * dy) < b.radius) {
      bubbles.splice(i, 1);
      points += 10;
      progress += 5;

      document.getElementById("score").innerText = "Points: " + points;
      document.getElementById("meter").innerText = "Progress: " + progress + "%";

      if (progress >= 100) redeem();
    }
  });
});

function redeem() {
  const reward = points;
  let balance = Number(localStorage.getItem("balance_" + user)) || 0;
  balance += reward;

  localStorage.setItem("balance_" + user, balance);

  alert(`🎉 You earned ${reward} points\nBalance: ${balance}`);
  location.href = "index.html";
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(b => b.update());
  requestAnimationFrame(animate);
}

setInterval(spawnBubble, 800);
animate();
