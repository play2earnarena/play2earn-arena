let html = "";
for (let k in localStorage) {
  if (k.startsWith("points_")) {
    html += `<p>${k.replace("points_","")} : ${localStorage[k]} pts</p>`;
  }
}
document.getElementById("users").innerHTML = html;
