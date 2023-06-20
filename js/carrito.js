let pagatTotal = 0;

window.addEventListener("DOMContentLoaded", (event) => {
  obtenerCarrito();
  obtenerTotal();
  actualizarCarrito();
});

const botonPagar = document.getElementById("botonPagar");
botonPagar.addEventListener("click", function () {
  pagar();
});

const ventana = document.getElementById("ventana");
ventana.addEventListener("click", function () {
  cerrarVentana();
});

async function obtenerCarrito() {
  const contenedor = document.getElementById("shop-contenedor");
  const cantidadProductoTotal = document.getElementById(
    "cantidad-productoTotal"
  );
  const ids = JSON.parse(localStorage.getItem("id"));
  if (ids != null && ids.length != 0) {
    let cantidadProducto = obtenerCantidadProductos();

    cantidadProductoTotal.innerText = cantidadProducto;

    if (Object.keys(ids) != 0) {
      const tabla = document.createElement("table");
      tabla.classList.add("tabla");
      tabla.setAttribute("id", "tabla");

      tabla.innerHTML = `
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Precio Total</th>
          </tr>
        </thead>`;

      const tbody = document.createElement("tbody");

      for (let clave in ids) {
        if (Object.hasOwnProperty.call(ids, clave)) {
          const elemento = ids[clave];
          const data = await getProduct(`/products/id`, clave, elemento);
          const producto = crearFilaProducto(data, elemento["cantidad"], clave);

          tbody.appendChild(producto);
          tabla.appendChild(tbody);
        }
      }

      contenedor.appendChild(tabla);
    } else {
      const nuevoElemento = document.createElement("div");
      nuevoElemento.classList.add("texto");
      nuevoElemento.classList.add("advertencia");
      nuevoElemento.innerHTML = `<p>No has seleccionado ningún artículo</p>`;
      contenedor.appendChild(nuevoElemento);
    }
  } else {
    cantidadProductoTotal.innerText = 0;
    contenedor.innerHTML = `<p class="textoAdvertencia"> No has seleccionado Ningun Articulo </p>`;
  }
}

function crearFilaProducto(data, cantidad, clave) {
  const filaProducto = document.createElement("tr");

  const columnaProducto = document.createElement("td");
  columnaProducto.innerHTML = `
    <div class="producto">
      <img src="${data.imgPath}" alt="" />
      <a href="#">${data.name}</a>
    </div>`;

  const columnaCantidad = document.createElement("td");

  const divCantidad = document.createElement("div");
  divCantidad.classList.add("cantidad");

  const botonIncrementar = document.createElement("button");
  botonIncrementar.innerText = "+";
  botonIncrementar.addEventListener("click", function () {
    incrementar(this, data.id, clave);
  });

  const inputCantidad = document.createElement("input");
  inputCantidad.type = "text";
  inputCantidad.name = "cantidad-producto";
  inputCantidad.id = "cantidad-producto";
  inputCantidad.readOnly = true;
  inputCantidad.value = cantidad;

  const botonDecrementar = document.createElement("button");
  botonDecrementar.innerText = "-";
  botonDecrementar.addEventListener("click", function () {
    decrementar(this, data.id, clave);
  });

  divCantidad.appendChild(botonIncrementar);
  divCantidad.appendChild(inputCantidad);
  divCantidad.appendChild(botonDecrementar);

  columnaCantidad.appendChild(divCantidad);
  filaProducto.appendChild(columnaCantidad);

  const columnaPrecioUnitario = document.createElement("td");
  columnaPrecioUnitario.classList.add("precioUnitario");
  columnaPrecioUnitario.dataset.titulo = "Precio Unitario";
  columnaPrecioUnitario.innerText = "$" + data.price.toFixed(2);

  const columnaPrecioTotal = document.createElement("td");
  columnaPrecioTotal.classList.add("PrecioTotal");
  columnaPrecioTotal.dataset.titulo = "Precio Total";
  columnaPrecioTotal.innerText = "$" + (data.price * cantidad).toFixed(2);

  const columnaBorrar = document.createElement("td");
  const iconoBorrar = document.createElement("i");
  iconoBorrar.classList.add("fa-solid", "fa-trash");
  iconoBorrar.addEventListener("click", function () {
    eliminarItem(this, data.id);
  });

  columnaBorrar.appendChild(iconoBorrar);

  filaProducto.appendChild(columnaProducto);

  filaProducto.appendChild(columnaCantidad);
  filaProducto.appendChild(columnaPrecioUnitario);
  filaProducto.appendChild(columnaPrecioTotal);
  filaProducto.appendChild(columnaBorrar);
  return filaProducto;
}

function incrementar(button, idProducto, clave) {
  const fila = button.closest("tr");
  const cantidadInput = fila.querySelector(".cantidad input");
  const precioUnitarioText = fila.querySelector(".precioUnitario").textContent;
  const precioUnitario = parseFloat(precioUnitarioText.replace("$", ""));

  const precioTotalText = fila.querySelector(".precioUnitario").textContent;
  const precioTotal = parseFloat(precioUnitarioText.replace("$", ""));

  let cantidad = parseInt(cantidadInput.value);
  cantidad++;
  cantidadInput.value = cantidad;

  const nuevoPrecioTotal = precioUnitario * cantidad;
  fila.querySelector(".PrecioTotal").textContent =
    "$" + nuevoPrecioTotal.toFixed(2);
  var local = localStorage.getItem("id");
  var ids = JSON.parse(local);

  if (ids.hasOwnProperty(clave)) {
    const p = ids[clave];

    p["cantidad"] = cantidad;

    localStorage.setItem("id", JSON.stringify(ids));
  }

  obtenerTotal();
  let cantidadProducto = obtenerCantidadProductos();
  const cantidadProductoTotal = document.getElementById(
    "cantidad-productoTotal"
  );
  cantidadProductoTotal.innerText = cantidadProducto;
  actualizarCarrito();
}

function decrementar(button, idProducto, clave) {
  const fila = button.closest("tr");
  const cantidadInput = fila.querySelector(".cantidad input");

  const precioUnitarioText = fila.querySelector(".precioUnitario").textContent;
  const precioUnitario = parseFloat(precioUnitarioText.replace("$", ""));

  const precioTotalText = fila.querySelector(".precioUnitario").textContent;
  const precioTotal = parseFloat(precioUnitarioText.replace("$", ""));

  let cantidad = parseInt(cantidadInput.value);
  cantidad--;
  if (cantidad > 0) {
    cantidadInput.value = cantidad;
    const nuevoPrecioTotal = precioUnitario * cantidad;
    fila.querySelector(".PrecioTotal").textContent =
      "$" + nuevoPrecioTotal.toFixed(2);

    var local = localStorage.getItem("id");
    var ids = JSON.parse(local);

    if (ids.hasOwnProperty(clave)) {
      const p = ids[clave];

      p["cantidad"] = cantidad;
      // Vuelve a almacenar el objeto actualizado en el localStorage
      localStorage.setItem("id", JSON.stringify(ids));
    }
    obtenerTotal();
    let cantidadProducto = obtenerCantidadProductos();
    const cantidadProductoTotal = document.getElementById(
      "cantidad-productoTotal"
    );
    cantidadProductoTotal.innerText = cantidadProducto;
    actualizarCarrito();
  }
}

function eliminarItem(elemento, productoId) {
  const fila = elemento.parentElement;
  const item = fila.parentElement;

  var local = localStorage.getItem("id");
  var ids = JSON.parse(local);
  delete ids[productoId];
  localStorage.setItem("id", JSON.stringify(ids));
  actualizarCarrito();
  obtenerTotal();
  item.remove();
  location.reload();
  setTimeout(function () {
    location.reload();
  }, 1000);
}

function eliminarItems() {
  const td = document.getElementById("tabla");
  td.remove();
  localStorage.removeItem("id");
  actualizarCarrito();
  obtenerTotal();
  obtenerCarrito();
}

async function obtenerTotal() {
  let total = 0;
  const localstorage = localStorage.getItem("id");
  const id = JSON.parse(localstorage);
  const progreso = document.getElementById("dots");
  try {
    progreso.style.display = "block";
    for (const clave in id) {
      if (Object.hasOwnProperty.call(id, clave)) {
        const elemento = id[clave];

        const producto = await getProduct("/products/id", clave, elemento);

        total += elemento["cantidad"] * producto.price;
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    progreso.style.display = "none";
  }

  let cantidadProducto = obtenerCantidadProductos();

  const elementoCantidad = document.getElementById("total-producto");
  elementoCantidad.innerText =
    cantidadProducto + " Producto" + (cantidadProducto > 1 ? "s" : "");

  const elementoTotal = document.getElementById("cantidad-total");
  elementoTotal.innerText = "$" + total.toFixed(2);

  let envio = total >= 500 ? 0 : 200;

  const elementoEnvio = document.getElementById("costo-envioTxt");
  elementoEnvio.innerText =
    cantidadProducto > 0
      ? envio === 0
        ? "¡Gratis!"
        : `$${envio.toFixed(2)}`
      : "";

  const totalPagar = document.getElementById("total-pagar");
  totalPagar.innerText =
    cantidadProducto > 0
      ? "$" + (total + envio).toFixed(2)
      : "$" + (0).toFixed(2);

  pagatTotal = (total + envio).toFixed(2);
}

function obtenerCantidadProductos() {
  const ids = JSON.parse(localStorage.getItem("id"));
  let cantidadProductoTotalTexto = 0;
  for (const key in ids) {
    if (Object.hasOwnProperty.call(ids, key)) {
      const p = ids[key];

      cantidadProductoTotalTexto += p["cantidad"];
    }
  }

  return cantidadProductoTotalTexto;
}

function pagar() {
  const cantidad = document.getElementById("cantidad-total").textContent;
  const precioTotal = parseFloat(cantidad.replace("$", ""));
  if (pagatTotal > 0 && precioTotal > 0) {
    const main = document.querySelector("body");
    main.classList.add("active");
  }
}

function cerrarVentana() {
  Swal.fire({
    title: "Saliendo",
    text: "¿Estas Seguro que deseas Salir de la Compra?",
    icon: "warning",
    iconColor: "#6882b2",
    showDenyButton: true,
    denyButtonText: `Salir`,
    confirmButtonText: "Quedarse",
    confirmButtonColor: "#6882b2",
    customClass: {
      title: "my-title-class",

      icon: "my-icon-class",
    },
  }).then((result) => {
    if (result.isDenied) {
      const main = document.querySelector("body");
      main.classList.remove("active");
    }
  });
}

//Funcion que va a enviar el formulario a la base de datos
var formulario = document.getElementById("formulario");
formulario.addEventListener("submit", async function (e) {
  const idsLocal = localStorage.getItem("id");
  const ids = JSON.parse(idsLocal);
  e.preventDefault();
  const captchaResponse = grecaptcha.getResponse();
  if (captchaResponse.length === 0) {
    alert("Por favor, marque el captcha antes de enviar el formulario.");
    return;
  }
  const progreso = document.getElementById("dots");
  progreso.style.display = "block";
  var datos = new FormData(formulario);

  let apellidoPaterno = datos.get("lastNameFirst");
  let apellidosMaterno = datos.get("lastNameSecond");

  const persona = {
    customer: {
      name: datos.get("name"),
      firstSurname: apellidoPaterno,
      lastSurname: apellidosMaterno,
      email: datos.get("email"),
      mobile: datos.get("phone"),
      phone: datos.get("smartphone"),
    },
    itemIds: [],
  };

  for (const key in ids) {
    if (Object.hasOwnProperty.call(ids, key)) {
      const element = ids[key];
      const nuevoItem = {
        catalogueId: element["catalogoId"],
        categoryId: element["categoriaId"],
        productId: key,
        quantity: element["cantidad"],
      };

      persona.itemIds.push(nuevoItem);
    }
  }

  try {
    const respuesta = await enviarReservacion(
      "/reservations",
      JSON.stringify(persona)
    );

    console.log(respuesta);
  } catch (error) {
    alert(
      "Ocurrió un error al enviar la reserva. Porfavor intente de Nuevo plis 8(" +
        error
    );
    console.log(error);
  } finally {
    progreso.style.display = "none";
    Swal.fire({
      title: "Comprado",
      text: "Se ha comprado de manera exitosa en un lapso de 72 se comunicaran con usted\n¡Gracias Por Su compra!",
      icon: "success",
      iconColor: "#6882b2",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#6882b2",
      customClass: {
        title: "my-title-class",
        confirmButton: "my-custom-button-class",
        icon: "my-icon-class",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const main = document.querySelector("body");
        main.classList.remove("active");
        eliminarItems();
      } else if (result.isDismissed) {
        localStorage.removeItem("id");
        const main = document.querySelector("body");
        eliminarItems();
      }
    });
  }
});
