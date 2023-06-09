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
    const catSelecc = categoriasSeleccionadas();
    eliminarProductos();
    if (catSelecc.length != 0) {
      for (let index = 0; index < catSelecc.length; index++) {
        obtenerProducto(catSelecc[index]);
      }
    } else {
      obtenerTodosProductos();
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
                <del>$${producto.discount !== 0 ? producto.discount : ""}</del>
            </div>
            <a class="card-boton"
            ><button onclick="agregarCarrito(1)">
              Agregar
            </button></a
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

function categoriasSeleccionadas() {
  const catgorias = [];

  const checkbox = document.getElementsByClassName("filter-categorias");

  for (let index = 0; index < checkbox.length; index++) {
    if (checkbox[index].checked) {
      catgorias.push(checkbox[index].value);
    }
  }
  return catgorias;
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
        card.innerHTML = `
          <div class="swiper-card-img">
              <img src="${producto.imgPath}" alt="" />
          </div>
          <div class="swiper-card-txt">
              <a href="#">${producto.name}</a>
              <div class="card-precios">
                  <p>${producto.price}</p>
                  <del>${
                    producto.discount !== 0 ? "$" + producto.discount : ""
                  }</del>
              </div>
              <a class="card-boton"
            ><button onclick="agregarCarrito(${
              producto.id
            })">Agregar</button></a
          >
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
  var padre = divFiltro.parentElement.parentElement;

  var filtros = padre.getElementsByClassName("filtros-checkbox")[0];

  // Obtiene los elementos de los íconos
  var chevronDown = padre.querySelector(".fa-chevron-down");
  var chevronUp = padre.querySelector(".fa-chevron-up");

  if (chevronDown.style.display !== "none") {
    chevronDown.style.display = "none";
    chevronUp.style.display = "inline";
  }
  //Si el ícono de fa-chevron-up está visible, ocúltalo y muestra el ícono de fa-chevron-down
  else {
    chevronUp.style.display = "none";
    chevronDown.style.display = "inline";
  }
  filtros.classList.toggle("active");
}
