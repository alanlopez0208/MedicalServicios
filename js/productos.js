import * as storage from "./localstorage.js";

const APIURL = "http://localhost:5138";

async function getAllProducts(API, contenedor) {
  const productos = {};
  const url = APIURL + API;

  try {
    const response = await fetch(url);
    const data = await response.json();
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
          <del>${producto.discount !== 0 ? "$" + producto.discount : ""}</del>
        </div>
        <a class="card-boton">
          <button  id = "${producto.id}" class = "btn-agregar">Agregar</button>
        </a>
      </div>
    </div>`;

      contenedor.appendChild(card);
    });

    const botones = contenedor.getElementsByClassName("btn-agregar");

    for (let index = 0; index < botones.length; index++) {
      botones[index].addEventListener("click", function () {
        let id = botones[index].getAttribute("id");
        storage.agregarCarrito(id);
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getCantidad(API, contenedor) {
  let cantidad = 0;
  const url = APIURL + API;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.length);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getProduct(API) {
  const url = APIURL + API;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function enviarReservacion(API, reservacion) {
  const url = APIURL + API;

  try {
    const response = await fetch("http://api.medicalsantacruz.com" + API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reservacion,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getAllProducts, getProduct, enviarReservacion };
