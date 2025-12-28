import { auth, db } from "./firebase.js";
import { ref, onValue, set } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas for mobile
function resize() {
  canvas.width = Math.min(window.innerWidth - 20, 360);
  canvas.height = 480;
}
resize();
window.addEventListener("resize", resize);

let points = 0;
let userRef = null;

// AUTH CHECK
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  userRef = ref(db, "users/" + user.uid);

  onValue(userRef, snap => {
    points = snap.val()?.points || 0;
    document.getElementById("points").innerText = points;
  });
});

// GAME OBJECT
const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: 25
};

// TAP TO EARN
canvas.addEventListener("click", () => {
  if (!userRef) return;
  points += 1;
  set(userRef, { points });
});

// GAME LOOP
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = "#050814";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Player circle
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
  ctx.fillStyle = "#00ffd5";
  ctx.fill();

  // Text
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Tap the circle to earn points", canvas.width / 2, canvas.height - 20);

  requestAnimationFrame(draw);
}

draw();
