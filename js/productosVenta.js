const contenedor = document.getElementById("slider");
window.addEventListener("DOMContentLoaded", (event) => {
  obtenerTodosProductos();
});

//Agregamos el script del JQuery UI
$(function () {
  $("#slider-range").slider({
    range: true,
    step: 100,
    min: 0,
    max: 5000,
    values: [1000, 3500],
    slide: function (event, ui) {
      $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
    },
  });
  $("#amount").val(
    "$" +
      $("#slider-range").slider("values", 0) +
      " - $" +
      $("#slider-range").slider("values", 1)
  );
});

// Agregamos Acciones a las Categorias
var checkboxes = document.getElementsByClassName("filter-categorias");
for (let index = 0; index < checkboxes.length; index++) {
  const checkbox = checkboxes[index];
  checkbox.addEventListener("click", async function () {
    if (checkbox.checked) {
      await eliminarProductos();
      obtenerProducto(checkbox.value);
    } else {
      eliminarCategoria(checkbox.value);
      if (estaVacio()) {
        obtenerTodosProductos();
      }
    }
  });
}

function obtenerProducto(categoria) {
  const API_URL = "http://localhost:5138";

  const xhr = new XMLHttpRequest();

  xhr.open("GET", `${API_URL}/api/catalogue/category/${categoria}`);
  xhr.setRequestHeader("accept", "text/plain");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.response);
      const contenedor = document.getElementById("card-container");
      data.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("card-swiper");
        card.dataset.productoId = "1";
        card.dataset.categoria = categoria;
        card.innerHTML = `
        <div class="swiper-card-img">
            <img src="${producto.imgPath}" alt="" />
        </div>
        <div class="swiper-card-txt">
            <a href="#">${producto.name}</a>
            <div class="card-precios">
                <p>${producto.price}</p>
                <del>$1700</del>
            </div>
            <a href="#" class="card-boton"><button>Agregar</button></a>
        </div>`;

        contenedor.appendChild(card);
      });
    }
  };

  xhr.send();
}

function eliminarCategoria(categoria) {
  const productos = document.querySelectorAll(
    '[data-categoria="' + categoria + '"]'
  );

  for (let index = 0; index < productos.length; index++) {
    const element = productos[index];
    console.log(element);
    element.remove();
  }
}

function estaVacio() {
  const productos = document.getElementsByClassName("card-swiper");

  return productos.length === 0;
}

function obtenerTodosProductos() {
  const API_URL = "http://localhost:5138";

  const xhr = new XMLHttpRequest();

  xhr.open("GET", `${API_URL}/api/products`);
  xhr.setRequestHeader("accept", "text/plain");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.response);
      const contenedor = document.getElementById("card-container");
      data.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("card-swiper");
        card.dataset.productoId = "1";
        card.innerHTML = `
          <div class="swiper-card-img">
              <img src="${producto.imgPath}" alt="" />
          </div>
          <div class="swiper-card-txt">
              <a href="#">${producto.name}</a>
              <div class="card-precios">
                  <p>${producto.price}</p>
                  <del>$1700</del>
              </div>
              <a href="#" class="card-boton"><button>Agregar</button></a>
          </div>`;
        contenedor.appendChild(card);
      });
    }
  };

  xhr.send();
}

async function eliminarProductos() {
  const productos = document.querySelectorAll(".card-swiper");

  for (let index = 0; index < productos.length; index++) {
    const element = productos[index];
    console.log(element);
    element.remove();
  }
}

//Agregremos funcionalidad a los botones para abrir los filtros
function abrirFiltros(divFiltro) {
  var filtros =
    divFiltro.parentElement.getElementsByClassName("filtros-checkbox")[0];

  // Obtiene los elementos de los íconos
  var chevronDown = divFiltro.querySelector(".fa-chevron-down");
  var chevronUp = divFiltro.querySelector(".fa-chevron-up");

  if (chevronDown.style.display !== "none") {
    chevronDown.style.display = "none";
    chevronUp.style.display = "inline";
  }
  // Si el ícono de fa-chevron-up está visible, ocúltalo y muestra el ícono de fa-chevron-down
  else {
    chevronUp.style.display = "none";
    chevronDown.style.display = "inline";
  }
  filtros.classList.toggle("active");

  //   // Obtener el rango inicial menor y mayor
  //   const initialMinRange = $("#slider-range").slider("values", 0);
  //   const initialMaxRange = $("#slider-range").slider("values", 1);
  //   console.log(initialMinRange);
}
