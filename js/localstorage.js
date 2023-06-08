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
}
