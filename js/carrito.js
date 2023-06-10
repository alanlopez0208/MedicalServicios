let pagatTotal = 0;

window.addEventListener("DOMContentLoaded", (event) => {
  obtenerCarrito();
  obtenerTotal();
});

async function obtenerCarrito() {
  const contenedor = document.getElementById("shop-contenedor");
  const ids = JSON.parse(localStorage.getItem("id"));
  if (ids != null) {
    let cantidadProducto = obtenerCantidadProductos();
    const cantidadProductoTotal = document.getElementById(
      "cantidad-productoTotal"
    );

    cantidadProductoTotal.innerText = cantidadProducto;

    cantidadProductoTotal.innerText = cantidadProducto;
    if (Object.keys(ids) != 0) {
      const tabla = document.createElement("table");
      tabla.classList.add("tabla");

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
      const API_URL = "http://localhost:5138";
      for (let clave in ids) {
        if (Object.hasOwnProperty.call(ids, clave)) {
          try {
            const response = await fetch(`${API_URL}/api/products/${clave}`, {
              headers: {
                Accept: "application/json",
              },
            });

            if (!response.ok) {
              throw new Error("Error en la solicitud");
            }

            const data = await response.json();
            const producto = crearFilaProducto(data, ids[clave]);
            tbody.appendChild(producto);
          } catch (error) {
            console.log(error);
          }
        }
      }

      tabla.appendChild(tbody);
      contenedor.appendChild(tabla);
    } else {
      const nuevoElemento = document.createElement("div");
      nuevoElemento.classList.add("texto");
      nuevoElemento.classList.add("advertencia");
      nuevoElemento.innerHTML = `<p>No has seleccionado ningún artículo</p>`;
      contenedor.appendChild(nuevoElemento);
    }
  }
}

function crearFilaProducto(data, cantidad) {
  const filaProducto = document.createElement("tr");

  const columnaProducto = document.createElement("td");
  columnaProducto.innerHTML = `
    <div class="producto">
      <img src="${data.imgPath}" alt="" />
      <a href="#">${data.name}</a>
    </div>`;

  const columnaCantidad = document.createElement("td");
  columnaCantidad.innerHTML = `
    <div class="cantidad">
      <button onclick = "incrementar(this,${data.id})" >+</button>
      <input type="text" name="" id="cantidad-producto" readonly value = "${cantidad}"/>
      <button onclick = "decrementar(this,${data.id})">-</button>
    </div>
  `;

  const columnaPrecioUnitario = document.createElement("td");
  columnaPrecioUnitario.classList.add("precioUnitario");
  columnaPrecioUnitario.dataset.titulo = "Precio Unitario";
  columnaPrecioUnitario.innerText = "$" + data.price.toFixed(2);

  const columnaPrecioTotal = document.createElement("td");
  columnaPrecioTotal.classList.add("PrecioTotal");
  columnaPrecioTotal.dataset.titulo = "Precio Total";
  columnaPrecioTotal.innerText = "$" + (data.price * cantidad).toFixed(2);

  const columnaBorrar = document.createElement("td");

  columnaBorrar.innerHTML = `<i class="fa-solid fa-trash"  onclick = "eliminarItem(this,${data.id})"></i>`;

  filaProducto.appendChild(columnaProducto);

  filaProducto.appendChild(columnaCantidad);
  filaProducto.appendChild(columnaPrecioUnitario);
  filaProducto.appendChild(columnaPrecioTotal);
  filaProducto.appendChild(columnaBorrar);
  return filaProducto;
}

function incrementar(button, idProducto) {
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
  fila.querySelector(".PrecioTotal").textContent = nuevoPrecioTotal.toFixed(2);
  var local = localStorage.getItem("id");

  var ids = JSON.parse(local);
  ids[idProducto] = cantidad;
  localStorage.setItem("id", JSON.stringify(ids));
  obtenerTotal();
  let cantidadProducto = obtenerCantidadProductos();
  const cantidadProductoTotal = document.getElementById(
    "cantidad-productoTotal"
  );
  cantidadProductoTotal.innerText = cantidadProducto;
}

function decrementar(button, idProducto) {
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
      nuevoPrecioTotal.toFixed(2);
    var local = localStorage.getItem("id");
    var ids = JSON.parse(local);
    ids[idProducto] = cantidad;
    localStorage.setItem("id", JSON.stringify(ids));
    obtenerTotal();
    let cantidadProducto = obtenerCantidadProductos();
    const cantidadProductoTotal = document.getElementById(
      "cantidad-productoTotal"
    );
    cantidadProductoTotal.innerText = cantidadProducto;
  }
}

function eliminarItem(elemento, productoId) {
  const fila = elemento.parentElement;
  console.log(fila);
  var local = localStorage.getItem("id");
  var ids = JSON.parse(local);
  delete ids[productoId];
  console.log(ids);
  localStorage.setItem("id", JSON.stringify(ids));
  setTimeout(function () {
    location.reload();
  });
}

async function obtenerTotal() {
  let total = 0;
  const localstorage = localStorage.getItem("id");
  const id = JSON.parse(localstorage);
  try {
    const API_URL = "http://localhost:5138";

    const fetchPromises = [];

    for (const clave in id) {
      if (Object.hasOwnProperty.call(id, clave)) {
        const response = await fetch(`${API_URL}/api/products/${clave}`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }

        const data = await response.json();
        total += data.price * id[clave];
      }
    }
  } catch (error) {
    console.log(error);
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
      cantidadProductoTotalTexto += ids[key];
    }
  }
  return cantidadProductoTotalTexto;
}

function pagar() {
  main = document.querySelector("body");
  main.classList.add("active");
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
      main = document.querySelector("body");
      main.classList.remove("active");
    }
  });
}
