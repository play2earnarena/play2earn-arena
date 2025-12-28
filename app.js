// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "play2earn-arena-cab9d.firebaseapp.com",
  databaseURL: "https://play2earn-arena-cab9d-default-rtdb.firebaseio.com",
  projectId: "play2earn-arena-cab9d",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

// LOGIN
window.login = () => {
  signInWithEmailAndPassword(auth,
    email.value,
    password.value
  ).then(() => location.href = "game.html")
   .catch(e => alert(e.message));
};

// REGISTER
window.register = () => {
  createUserWithEmailAndPassword(auth,
    email.value,
    password.value
  ).then(res => {
    set(ref(db, "users/" + res.user.uid), { points: 0 });
    location.href = "game.html";
  }).catch(e => alert(e.message));
};

// GAME LOGIC
if (location.pathname.includes("game")) {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  let points = 0;
  let target = 1000000;

  const rewards = [
    { points: 1000000, text: "5 Cedis Airtime" },
    { points: 4000000, text: "7 Cedis Airtime" },
    { points: 6000000, text: "10 Cedis Airtime" }
  ];

  function drawCircle() {
    ctx.clearRect(0,0,260,260);
    ctx.beginPath();
    ctx.arc(130,130,30,0,Math.PI*2);
    ctx.fillStyle = "cyan";
    ctx.fill();
  }

  drawCircle();

  canvas.addEventListener("click", () => {
    points += Math.max(1, Math.floor(50 - points / 200000));
    document.getElementById("points").innerText = points;

    let percent = Math.min(points / target * 100, 100);
    document.getElementById("progressFill").style.width = percent + "%";

    rewards.forEach(r => {
      if (points >= r.points && !window.redeemed) {
        document.getElementById("rewardText").innerText = r.text;
        document.getElementById("redeemPopup").style.display = "block";
        window.redeemed = true;
      }
    });
  });

  window.closePopup = () => {
    document.getElementById("redeemPopup").style.display = "none";
  };

  window.redeem = () => {
    alert("Redemption request sent!");
    window.redeemed = false;
    closePopup();
  };
}
