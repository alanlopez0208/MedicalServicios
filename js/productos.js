const APIURL = "http://api.medicalsantacruz.com";

async function getAllProducts(API, categoria, contenedor) {
  const cuerpo = {
    catalogueId: "580739e4-051d-11ee-86d1-0a002700000a",
    categoryId: categoria,
  };

  const url = APIURL + API;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cuerpo),
    });
    const data = await response.json();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const producto = data[key];
        const card = document.createElement("div");
        card.classList.add("swiper-slide");
        console.log(producto.imgPath);
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
          cuerpo.catalogueId
        }
        id-Categoria = ${
          cuerpo.categoryId
        } class="btn-agregar" >Agregar</button>
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
      }
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

async function getProduct(API, clave, producto) {
  const url = APIURL + API;

  const cuerpo = {
    catalogueId: producto["catalogoId"],
    categoryId: producto["categoriaId"],
    productId: clave,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cuerpo),
    });
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