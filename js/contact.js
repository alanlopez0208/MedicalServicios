window.addEventListener("DOMContentLoaded", (event) => {
  onRequestHandler();
  obtenerNosotros();
});

function onRequestHandler() {
  const API_URL = "http://localhost:5138";

  const xhr = new XMLHttpRequest();

  xhr.open("GET", `${API_URL}/api/stores`);

  xhr.setRequestHeader("accept", " text/plain");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.response);

      const filtrarLugar = data.filter(function (data) {
        return data.id === 1;
      });

      filtrarLugar.forEach(function (data) {
        const elementosDireccion =
          document.getElementsByClassName("txtDireccion");

        for (let i = 0; i < elementosDireccion.length; i++) {
          elementosDireccion[i].innerText = data.address;
        }

        const elementosCorreo = document.getElementsByClassName("txtCorreo");

        for (let i = 0; i < elementosCorreo.length; i++) {
          elementosCorreo[i].innerText = data.email;
        }

        const elementosTelefono =
          document.getElementsByClassName("txtTelefono");

        for (let i = 0; i < elementosTelefono.length; i++) {
          elementosTelefono[i].innerText = data.telephone;
        }

        document.getElementById("txtTelfono").innerText = data.telephone;
        const elementosFacebook =
          document.getElementsByClassName("linkFacebook");

        for (let i = 0; i < elementosFacebook.length; i++) {
          elementosFacebook[i].href = data.facebookUser;
        }

        const elementosWhats = document.getElementsByClassName("linkWhatsapp");

        for (let i = 0; i < elementosWhats.length; i++) {
          elementosWhats[i].href = data.whatsAppPhone;
        }

        const elementosTwitter = document.getElementsByClassName("linkTwitter");

        for (let i = 0; i < elementosTwitter.length; i++) {
          elementosTwitter[i].href = data.twitterUser;
        }
      });
    }
  };
  xhr.send();
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
