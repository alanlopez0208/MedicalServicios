let catalogo;

window.addEventListener("DOMContentLoaded", async (event) => {
  const progreso = document.getElementById("dots");
  try {
    progreso.style.display = "block";
    catalogo = await obtenerCatalogoRentas("/catalogues/all");
    await cargarSlider();
    await obtenerCategory();
    await obtenerTodosProductos();

    eventoFiltrar();

    console.log(catalogo);
  } catch (error) {
    console.log(error);
  } finally {
    progreso.style.display = "none";
  }
});

async function obtenerCategory() {
  const contenedorCategorias = document.getElementById("filtros-Categorias");

  const datos = await obtenerCategorias("/categories/all", catalogo);

  const ul = document.createElement("ul");
  let i = 0;
  for (const key in datos) {
    if (Object.hasOwnProperty.call(datos, key)) {
      const elemento = datos[key];
      const li = document.createElement("li");
      const id = "categoria" + (i + 1);
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = id;
      input.classList.add("checkbox-filter");
      input.classList.add("checkbox-categoria");
      input.value = elemento["id"];

      const label = document.createElement("label");
      label.for = id;
      label.innerText = " " + elemento["label"];
      li.appendChild(input);
      li.appendChild(label);
      ul.appendChild(li);

      i++;
    }
  }

  contenedorCategorias.appendChild(ul);
}

async function cargarSlider() {
  await $(function () {
    $("#slider-range").slider({
      range: true,
      step: 200,
      min: 0,
      max: 50000,
      values: [0, 50000],
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

    $("#slider-range").on("slidechange", async function (event, ui) {
      await filtrar();
    });
  });
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
  const contenedor = document.getElementById("card-container");
  const filtrosCategoria =
    document.getElementsByClassName("checkbox-categoria");

  for (let index = 0; index < filtrosCategoria.length; index++) {
    const filtroCategoria = filtrosCategoria[index];

    const id = filtroCategoria.value;

    getAllProducts("/products/cat", id, contenedor, catalogo);
  }
}

async function eliminarProductos() {
  const productos = document.querySelectorAll(".swiper-slide");

  for (let index = 0; index < productos.length; index++) {
    const element = productos[index];

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

//Metodo que se va a usar para las filtraciones
function eventoFiltrar() {
  const checkboxes = document.getElementsByClassName("checkbox-filter");

  for (let index = 0; index < checkboxes.length; index++) {
    const checkbox = checkboxes[index];

    checkbox.addEventListener("click", async function (event) {
      await filtrar();
    });
  }
}

async function filtrar() {
  const progreso = document.getElementById("dots");
  const contenedor = document.getElementById("card-container");
  let elementos = [];
  await eliminarProductos();

  try {
    progreso.style.display = "block";
    const checkboxesPalomeados = document.querySelectorAll(
      "input.checkbox-categoria:checked"
    );

    for (let index = 0; index < checkboxesPalomeados.length; index++) {
      const element = checkboxesPalomeados[index];
      const clase = element.classList[1];

      switch (clase) {
        case "checkbox-categoria":
          let elemento = await obtenerProductosCategorias(checkboxesPalomeados);
          elementos = elementos.concat(elemento);
          break;
      }
    }

    const sliderMin = $("#slider-range").slider("values", 0);
    const sliderMax = $("#slider-range").slider("values", 1);

    if (checkboxesPalomeados.length != 0) {
      const productosFiltrados = elementos.filter((producto) => {
        return producto.price >= sliderMin && producto.price <= sliderMax;
      });
      await agregarProducto(productosFiltrados, contenedor);
      if (divElement.hasChildNodes()) {
        console.log("El div tiene hijos.");
        console.log(divElement);
      } else {
        // El div no tiene hijos
        const textoNoHijos = document.createElement("p");
        textoNoHijos.classList.add("texto");
        textoNoHijos.innerText = "NO HAY ELEMENTOS CON LOS FILTROS AÑADIDOS";
        divElement.appendChild(textoNoHijos);
      }
    } else {
      let allProducts = await getTodosProductos("/products/cat", catalogo);
      elementos = elementos.concat(allProducts);
      console.log(elementos);
      const productosFiltrados = elementos.filter((producto) => {
        return producto.price >= sliderMin && producto.price <= sliderMax;
      });
      await agregarProducto(productosFiltrados, contenedor);
    }
  } catch (error) {
    console.log(error);
  } finally {
    progreso.style.display = "none";
  }
}

async function obtenerProductosCategorias(checkboxesPalomeados) {
  let elementos = [];
  for (let index = 0; index < checkboxesPalomeados.length; index++) {
    const element = await obtenerIdProductos(
      "/products/cat",
      checkboxesPalomeados[index].value,
      catalogo
    );
    elementos = elementos.concat(element);
  }

  return elementos;
}

function agregarProducto(data, contenedor) {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const producto = data[key];

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
              <del>${
                producto.discountPct !== 0 ? "$" + producto.discountPct : ""
              }</del>
            </div>
            <a class="card-boton">
              <button id-Producto="${producto.id}" id-Catalogo= ${
        producto.catalogueId
      }
      id-Categoria = ${producto.categoria} class="btn-agregar" >Agregar</button>
            </a>
          </div>
        </div>`;
      contenedor.appendChild(card);

      // Agregar acción al botón "Agregar"
      const botonAgregar = card.querySelector(".btn-agregar");
      botonAgregar.addEventListener("click", function () {
        const idProducto = botonAgregar.getAttribute("id-Producto");
        const idCatalogo = botonAgregar.getAttribute("id-Catalogo");
        const idCategoria = botonAgregar.getAttribute("id-Categoria");

        agregarCarrito(idProducto, idCategoria, idCatalogo);
      });

      contenedor.appendChild(card);
    }
  }
}
