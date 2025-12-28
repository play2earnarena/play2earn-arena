import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-YhBz-AkexkNZ8OqIJzEeMN8AhZYqVG0",
  authDomain: "play2earn-arena-cab9d.firebaseapp.com",
  databaseURL: "https://play2earn-arena-cab9d-default-rtdb.firebaseio.com",
  projectId: "play2earn-arena-cab9d",
  storageBucket: "play2earn-arena-cab9d.appspot.com",
  messagingSenderId: "309303655208",
  appId: "1:309303655208:web:0e153671ea2591d655ae1d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
