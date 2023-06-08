const contenedor = document.getElementById("shop-contenedor");
const ids = JSON.parse(localStorage.getItem("id"));

if (ids != null) {
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

  for (let clave in ids) {
    if (ids.hasOwnProperty(clave)) {
      const filaProducto = crearFilaProducto();
      tbody.appendChild(filaProducto);
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

function crearFilaProducto() {
  const filaProducto = document.createElement("tr");

  const columnaProducto = document.createElement("td");
  columnaProducto.innerHTML = `
    <div class="producto">
      <img src="img/productos/cubrebocas.png" alt="" />
      <a href="#">Cubrebocas Perron de 5 tabletas</a>
    </div>`;

  const columnaCantidad = document.createElement("td");
  columnaCantidad.innerHTML = `
    <div class="cantidad">
      <button onclick = "incrementar(this)" >+</button>
      <input type="text" name="" id="cantidad-producto" readonly value = "1"/>
      <button onclick = "decrementar(this)">-</button>
    </div>
  `;

  const columnaPrecioUnitario = document.createElement("td");
  columnaPrecioUnitario.classList.add("precioUnitario");
  columnaPrecioUnitario.dataset.titulo = "Precio Unitario";
  columnaPrecioUnitario.innerText = "5.99";

  const columnaPrecioTotal = document.createElement("td");
  columnaPrecioTotal.classList.add("PrecioTotal");
  columnaPrecioTotal.dataset.titulo = "Precio Total";
  columnaPrecioTotal.innerText = "5.99";

  const columnaBorrar = document.createElement("td");

  columnaBorrar.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  filaProducto.appendChild(columnaProducto);

  filaProducto.appendChild(columnaCantidad);
  filaProducto.appendChild(columnaPrecioUnitario);
  filaProducto.appendChild(columnaPrecioTotal);
  filaProducto.appendChild(columnaBorrar);
  return filaProducto;
}

function incrementar(button) {
  const fila = button.closest("tr");
  const cantidadInput = fila.querySelector(".cantidad input");
  const precioUnitario = parseFloat(
    fila.querySelector(".precioUnitario").textContent
  );
  const precioTotal = parseFloat(
    fila.querySelector(".PrecioTotal").textContent
  );

  let cantidad = parseInt(cantidadInput.value);
  cantidad++;
  cantidadInput.value = cantidad;

  const nuevoPrecioTotal = precioUnitario * cantidad;
  fila.querySelector(".PrecioTotal").textContent = nuevoPrecioTotal.toFixed(2);
}

function decrementar(button) {
  const fila = button.closest("tr");
  const cantidadInput = fila.querySelector(".cantidad input");
  const precioUnitario = parseFloat(
    fila.querySelector(".precioUnitario").textContent
  );
  const precioTotal = parseFloat(
    fila.querySelector(".PrecioTotal").textContent
  );

  let cantidad = parseInt(cantidadInput.value);
  cantidad--;
  if (cantidad > 0) {
    cantidadInput.value = cantidad;
    const nuevoPrecioTotal = precioUnitario * cantidad;
    fila.querySelector(".PrecioTotal").textContent =
      nuevoPrecioTotal.toFixed(2);
  }
}
