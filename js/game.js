import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from 
"https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { ref, get, update } from 
"https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let uid = null;

onAuthStateChanged(auth, user => {
  if (!user) location.href = "index.html";
  uid = user.uid;
  loadPoints();
});

function loadPoints() {
  get(ref(db, "users/" + uid)).then(snap => {
    if (snap.exists()) score = snap.val().points;
    updateUI();
  });
}

function addPoints(p) {
  score += p;
  update(ref(db, "users/" + uid), { points: score });
  updateUI();
}

function updateUI() {
  document.getElementById("points").innerText = score;
  document.getElementById("progress").style.width =
    Math.min((score / 500) * 100, 100) + "%";
}

/* SIMPLE TAP GAME */
canvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(Math.random()*300, Math.random()*450, 20, 0, Math.PI*2);
  ctx.fill();
  addPoints(5);
});
