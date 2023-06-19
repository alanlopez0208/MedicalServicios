const APIURL = "http://api.medicalsantacruz.com";

async function getAllProducts(API, categoria, contenedor, catalogo) {
  const cuerpo = {
    catalogueId: catalogo,
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

async function obtenerCategorias(API, catalogo) {
  const url = APIURL + API;

  const cuerpo = {
    catalogueId: catalogo,
  };

  try {
    const response = await fetch("http://api.medicalsantacruz.com" + API, {
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

async function obtenerIdProductos(API, categoriaId, catalogo) {
  const url = APIURL + API;

  const cuerpo = {
    catalogueId: catalogo,
    categoryId: categoriaId,
  };

  try {
    const response = await fetch("http://api.medicalsantacruz.com" + API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cuerpo),
    });
    const data = await response.json();
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        element.categoria = categoriaId;
        element.catalogo = cuerpo.catalogueId;
      }
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function obtenerCatalogoVentas(API) {
  const cuerpo = {};
  const url = APIURL + API;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(cuerpo),
    });

    const data = await response.json();
    const elemento = data.find((objeto) => objeto.name === "Venta");

    return elemento.id;
  } catch (error) {
    alert("Hubo el siguiente error " + error);
    console.log(error);
  }
}

async function obtenerCatalogoRentas(API) {
  const cuerpo = {};
  const url = APIURL + API;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(cuerpo),
    });

    const data = await response.json();
    const elemento = data.find((objeto) => objeto.name === "Renta");

    return elemento.id;
  } catch (error) {
    alert("Hubo el siguiente error " + error);
    console.log(error);
  }
}

async function getTodosProductos(API, catalogo) {
  const categorias = await obtenerCategorias("/categories/all", catalogo);
  let productos = [];
  for (const key in categorias) {
    if (Object.hasOwnProperty.call(categorias, key)) {
      const categoria = categorias[key];

      const cuerpo = {
        catalogueId: catalogo,
        categoryId: categoria["id"],
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

        productos = productos.concat(data);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return productos;
}
