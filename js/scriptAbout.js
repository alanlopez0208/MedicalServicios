//Agregamos el script del JQuery UI
$(function () {
  $("#slider-range").slider({
    range: true,
    step: 100,
    min: 0,
    max: 5000,
    values: [1000, 3500],
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
});

//Agregremos funcionalidad a los botones para abrir los filtros
function abrirFiltros(divFiltro) {
  var filtros =
    divFiltro.parentElement.getElementsByClassName("filtros-checkbox")[0];

  // Obtiene los elementos de los íconos
  var chevronDown = divFiltro.querySelector(".fa-chevron-down");
  var chevronUp = divFiltro.querySelector(".fa-chevron-up");

  if (chevronDown.style.display !== "none") {
    chevronDown.style.display = "none";
    chevronUp.style.display = "inline";
  }
  // Si el ícono de fa-chevron-up está visible, ocúltalo y muestra el ícono de fa-chevron-down
  else {
    chevronUp.style.display = "none";
    chevronDown.style.display = "inline";
  }
  filtros.classList.toggle("active");
}
