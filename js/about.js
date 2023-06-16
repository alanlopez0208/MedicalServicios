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

function eliminarDuplicados(array) {
  const aux = {};
  return array.filter((obj) => {
    const key = JSON.stringify(obj);

    const encontrado = aux[key];

    if (!encontrado) {
      aux[key] = true;
      return true;
    }

    return false;
  });
}

// Ejemplo de uso
const array = [
  { id: 1, nombre: "Objeto 1" },
  { id: 2, nombre: "Objeto 2" },
  { id: 1, nombre: "Objeto 1" },
  { id: 3, nombre: "Objeto 3" },

  { id: 1, nombre: "Objeto 1" },
  { id: 4, nombre: "Objeto 4" },
  { id: 2, nombre: "Objeto 2" },
  { id: 1, nombre: "Objeto 1" },
];

const arraySinDuplicados = eliminarDuplicados(array);
console.log(arraySinDuplicados);
