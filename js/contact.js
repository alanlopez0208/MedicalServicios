window.addEventListener("DOMContentLoaded", (event) => {
  var urlParams = new URLSearchParams(window.location.search);
  var mensaje = urlParams.get("mensaje");

  if (mensaje === "success") {
    Swal.fire({
      title: "Comprado",
      text: "Se ha comprado de manera exitosa en un lapso de 72 se comunicarán con usted. ¡Gracias por su compra!",
      icon: "success",
      iconColor: "#6882b2",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#6882b2",
      customClass: {
        title: "my-title-class",
        confirmButton: "my-custom-button-class",
        icon: "my-icon-class",
      },
    });
  } else if (mensaje === "error") {
    Swal.fire({
      title: "Error",
      text: "Ha ocurrido un error al almacenar los datos en la base de datos. Por favor, inténtelo nuevamente.",
      icon: "error",
      iconColor: "#6882b2",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#6882b2",
      customClass: {
        title: "my-title-class",
        confirmButton: "my-custom-button-class",
        icon: "my-icon-class",
      },
    });
  }
  onRequestHandler();
  obtenerNosotros();
});

function onRequestHandler() {
  const API_URL = "http://api.medicalsantacruz.com";

  const body = {};

  fetch(`${API_URL}/info`, {
    headers: {
      "Content-Type": "application/json",
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
      document.getElementById("nosotros-texto").innerText = data.about;
    })
    .catch((error) => {
      console.error(error);
    });
}

function obtenerNosotros() {
  const API_URL = "http://localhost:5138";

  const xhr = new XMLHttpRequest();

  xhr.open("GET", `${API_URL}/api/about`);

  xhr.setRequestHeader("accept", " text/plain");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.response);

      const txtNosotros = document.getElementById("nosotros-texto");
      txtNosotros.innerText = data.description;
    }
  };
  xhr.send();
}
