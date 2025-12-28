import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { ref, set } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

window.register = function(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(user => {
      set(ref(db, "users/" + user.user.uid), {
        points: 0
      });
      window.location.href = "game.html";
    })
    .catch(err => alert(err.message));
};

window.login = function(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "game.html")
    .catch(err => alert(err.message));
};
