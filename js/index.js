obtenerInfo();
getProductDestacados();
getCategories();

function getProductDestacados() {
  const contenedor = document.getElementById("slider");
  const catid = "390f513f-0524-11ee-86d1-0a002700000a";

  getAllProducts(
    "/products/cat",
    catid,
    contenedor,
    "580739e4-051d-11ee-86d1-0a002700000a"
  );
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

async function getCategories() {
  const categorias = await obtenerCategorias(
    "/categories/all",
    "580739e4-051d-11ee-86d1-0a002700000a"
  );

  const contenedor = document.getElementById("container-card");

  for (const key in categorias) {
    if (Object.hasOwnProperty.call(categorias, key)) {
      const categoria = categorias[key];

      const elementoCategoria = document.createElement("div");
      elementoCategoria.classList.add("card");

      elementoCategoria.innerHTML = ` 
      <di class="img-card">
        <img src="${categoria.imgPath}" alt="" />
      </di>
      <div class="card-txt">
        <a href="#">${categoria.label}</a
        ><span class="icon">
          <i class="fa-solid fa-arrow-right"></i>
        </span>
      </div>
      `;

      contenedor.appendChild(elementoCategoria);
    }
  }
}
