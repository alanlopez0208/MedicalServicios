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

async function obtenerInfo() {
  const API_URL = "http://api.medicalsantacruz.com";

  const xhr = new XMLHttpRequest();

  xhr.open("POST", `${API_URL}/info`);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.response);

      document.getElementById("banner_text").innerText = data.welcome;

      document.getElementById("featured").innerText = data.featured;

      document.getElementById("nosotros-texto").innerText = data.description;
    }
  };

  xhr.send(JSON.stringify({}));
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
        <p>${categoria.label}</p>
      </div>
      `;

      contenedor.appendChild(elementoCategoria);
    }
  }
}
