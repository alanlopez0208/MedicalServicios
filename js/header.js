let menu = document.querySelector("#menu-icon");
let navBar = document.querySelector(".navBar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navBar.classList.toggle("open");
};

let tabInputs = document.querySelectorAll(".tabInput");

function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.031 };
  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    mapId: "e3450f6b880d26c1",
  });
}
window.initMap = initMap;

local = localStorage.getItem("id");
const carrito = document.getElementById("icon-carrito");
if (local != null) {
  id = JSON.parse(local);
  const numeroPropiedades = Object.keys(id).length;

  carrito.innerText = numeroPropiedades;
} else {
  carrito.innerText = 0;
}
