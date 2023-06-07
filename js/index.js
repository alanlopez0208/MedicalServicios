const contenedor = document.getElementById("slider");
window.addEventListener("DOMContentLoaded", (event) => {
  obtenerProdDest();
  obtenerInfo();
});

function obtenerProdDest() {
  const API_URL = "http://localhost:5138";

  const xhr = new XMLHttpRequest();

  xhr.open("GET", `${API_URL}/api/products`);
  xhr.setRequestHeader("accept", " text/plain");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.response);

      data.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("swiper-slide");

        card.innerHTML = `
        <div class="card-swiper">
        <div class="swiper-card-img">
          <img src="${producto.imgPath}" alt="" />
        </div>
        <div class="swiper-card-txt">
          <h3>${producto.name}</h3>
          <div class="card-precios">
            <p>${producto.price}</p>
            <del>$1700</del>
          </div>
          <a href="#" class="card-boton"
            ><button>Agregar</button></a
          >
        </div>
      </div>`;

        contenedor.appendChild(card);
      });
    }
  };

  xhr.send();
}

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
