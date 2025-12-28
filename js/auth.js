function login() {
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  if (!phone || !password) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("user", phone);

  if (!localStorage.getItem("points_" + phone)) {
    localStorage.setItem("points_" + phone, 0);
  }

  location.href = "game.html";
}
