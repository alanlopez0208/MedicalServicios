const API_URL = "http://localhost:5138";

const xhr = new XMLHttpRequest();

xhr.open("GET", `${API_URL}/api/stores`);

xhr.setRequestHeader("accept", " text/plain");

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.response);

    const filtrarLugar = data.find(function (item) {
      return item.id === 1;
    });

    const ubicanos = document.getElementById("footer-ubicacion");
    ubicanos.innerText = filtrarLugar.address;

    const telefono = document.getElementById("footer-telefono");
    telefono.innerText = filtrarLugar.telephone;

    const correo = document.getElementById("footer-correo");
    correo.innerText = filtrarLugar.email;

    const linkf = document.getElementById("footer-facebook");
    linkf.href = filtrarLugar.facebookUser;

    const linkW = document.getElementById("footer-whatsapp");
    linkW.href = "https://wa.me/" + filtrarLugar.whatsAppPhone;

    const linkI = document.getElementById("footer-instagram");
    linkI.hreI = filtrarLugar.twitterUser;
  }
};
xhr.send();
