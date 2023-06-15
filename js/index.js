obtenerInfo();
getProductDestacados();

function getProductDestacados() {
  const contenedor = document.getElementById("slider");
  const catid = "390f513f-0524-11ee-86d1-0a002700000a";

  getAllProducts("/products/cat", catid, contenedor);
  console.log(contenedor);
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
