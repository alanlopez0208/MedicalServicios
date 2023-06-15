function agregarCarrito(productoId, categoriaId, catagologoId) {
  const idsLocal = localStorage.getItem("id");

  if (idsLocal != null) {
    const ids = JSON.parse(idsLocal);

    if (!ids.hasOwnProperty(productoId)) {
      const producto = {
        categoriaId: categoriaId,
        catalogoId: catagologoId,
        cantidad: 1,
      };
      ids[productoId] = producto;
      localStorage.setItem("id", JSON.stringify(ids));
    }
  } else {
    const producto = {
      [productoId]: {
        categoriaId: categoriaId,
        catalogoId: catagologoId,
        cantidad: 1,
      },
    };
    console.log(producto);
    localStorage.setItem("id", JSON.stringify(producto));
  }
  const main = document.querySelector("main");
  main.classList.add("activo");
  mostrarVentana();
}

function mostrarVentana() {
  Swal.fire({
    title: "Agregado",
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
      actualizarCarrito();
    } else if (result.isDismissed) {
      actualizarCarrito();
    }
  });
}
