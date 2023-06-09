function agregarCarrito(productoId) {
  const idsLocal = localStorage.getItem("id");

  if (idsLocal != null) {
    const ids = JSON.parse(idsLocal);
    if (!ids.hasOwnProperty(productoId)) {
      ids[productoId] = 1;
      localStorage.setItem("id", JSON.stringify(ids));
    }
  } else {
    const producto = { [productoId]: 1 };
    localStorage.setItem("id", JSON.stringify(producto));
  }
  mostrarVentana();
}

function mostrarVentana() {
  Swal.fire({
    title: "Guardo",
    text: "Se ha guardado el producto de manera correcta",
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
      // Acción a realizar cuando se hace clic en el botón de confirmación
      // Por ejemplo, puedes llamar a una función o ejecutar un código específico
      setTimeout(function () {
        location.reload();
      });
    }
  });
}
