const tbody = document.getElementById("users");

for (let key in localStorage) {
  if (key.startsWith("balance_")) {
    const user = key.replace("balance_", "");
    const bal = localStorage.getItem(key);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user}</td>
      <td>${bal}</td>
      <td><button onclick="pay('${user}')">Mark Paid</button></td>
    `;
    tbody.appendChild(tr);
  }
}

function pay(user) {
  localStorage.setItem("balance_" + user, 0);
  alert(user + " paid successfully");
  location.reload();
}
