const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 160;

let points = 0;
const REWARD_TARGET = 1000000; // example reward target

const rewardFill = document.getElementById("rewardFill");
const pointsText = document.getElementById("pointsText");
const progressText = document.getElementById("progressText");
const bubbles = [];
const colors = ["#4fc3f7", "#ff5252", "#69f0ae"];

function createBubble() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 30,
    r: 20,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 1 + Math.random() * 2
  };
}function drawBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bubbles.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.fill();
  });
}

function updateBubbles() {
  bubbles.forEach(b => b.y -= b.speed);

  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].y < -30) bubbles.splice(i, 1);
  }
       }canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  bubbles.forEach((b, i) => {
    const dist = Math.hypot(x - b.x, y - b.y);
    if (dist < b.r) {
      bubbles.splice(i, 1);

      let gain = 50;
      if (points > REWARD_TARGET * 0.8) gain = 5;

      points += gain;
      updateUI();
    }
  });
});function updateUI() {
  pointsText.textContent = `Points: ${points}`;

  let progress = Math.min((points / REWARD_TARGET) * 100, 100);
  progressText.textContent = `Progress: ${Math.floor(progress)}%`;

  rewardFill.style.width = progress + "%";

  if (progress >= 100) {
    setTimeout(() => {
      if (confirm("🎉 You reached a reward! Redeem now?")) {
        alert("Reward submitted for review");
      }
    }, 200);
  }
}function gameLoop() {
  if (Math.random() < 0.03) bubbles.push(createBubble());

  updateBubbles();
  drawBubbles();

  requestAnimationFrame(gameLoop);
}

gameLoop();

document.getElementById("exitBtn").onclick = () => {
  window.location.href = "index.html";
};
