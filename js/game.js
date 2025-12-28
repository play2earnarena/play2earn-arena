const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const user = localStorage.getItem("user");
let points = Number(localStorage.getItem("points_" + user)) || 0;
const rewardTarget = 5000;

document.getElementById("bgSound").play();

let balls = [];

function spawnBall() {
  balls.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 20,
    color: ["#5fdcff","#ff5f5f","#5fff9d"][Math.floor(Math.random()*3)],
    dx: (Math.random()-0.5)*2,
    dy: (Math.random()-0.5)*2
  });
}

for (let i=0;i<8;i++) spawnBall();

canvas.addEventListener("click", e => {
  balls.forEach(b => {
    const d = Math.hypot(e.clientX-b.x, e.clientY-b.y);
    if (d < b.r) {
      points += 10;
      document.getElementById("tapSound").play();
    }
  });
});

function update() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  balls.forEach(b => {
    b.x += b.dx;
    b.y += b.dy;

    if (b.x<0||b.x>canvas.width) b.dx*=-1;
    if (b.y<0||b.y>canvas.height) b.dy*=-1;

    ctx.beginPath();
    ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
    ctx.fillStyle = b.color;
    ctx.fill();
  });

  const progress = Math.min((points/rewardTarget)*100,100);
  document.getElementById("points").innerText = "Points: " + points;
  document.getElementById("progressText").innerText = "Progress: " + Math.floor(progress) + "%";
  document.getElementById("rewardFill").style.width = progress + "%";

  requestAnimationFrame(update);
}

update();

setInterval(()=>{
  localStorage.setItem("points_" + user, points);
},3000);

function exitGame() {
  localStorage.setItem("points_" + user, points);
  location.href = "index.html";
}
