import * as productos from "./productos.js";

obtenerInfo();

const contenedor = document.getElementById("slider");
productos.getAllProducts("/api/products", contenedor);

function obtenerInfo() {
  const API_URL = "http://localhost:5138";

  const xhr = new XMLHttpRequest();

  xhr.open("GET", `${API_URL}/api/about`);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.response);

      document.getElementById("banner_text").innerText = data.description;

      document.getElementById("nosotros-texto").innerText = data.description;
    }
  };

  xhr.send();
}
