window.addEventListener("DOMContentLoaded", (event) => {
  onRequestHandler();
});

function onRequestHandler() {
  const API_URL = "http://localhost:5138";

  const xhr = new XMLHttpRequest();

  xhr.open("GET", `${API_URL}/api/about`);

  xhr.setRequestHeader("accept", " text/plain");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.response);

      document.getElementById("descripcion").innerText = data.description;

      document.getElementById("textMision").innerText = data.mission;

      document.getElementById("textVision").innerText = data.vision;
    }
  };
  xhr.send();
}
