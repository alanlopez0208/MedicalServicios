window.addEventListener("DOMContentLoaded", (event) => {
  onRequestHandler();
});

function onRequestHandler() {
  const API_URL = "http://api.medicalsantacruz.com";

  const body = {};

  fetch(`${API_URL}/info`, {
    headers: {
      "Content-Type": "application / json",
    },
    body: JSON.stringify(body),
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta de la API");
      }
    })
    .then((data) => {
      document.getElementById("descripcion").innerText = data.description;
      document.getElementById("textMision").innerText = data.mission;
      document.getElementById("textVision").innerText = data.vision;
    })
    .catch((error) => {
      console.error(error);
    });
}
