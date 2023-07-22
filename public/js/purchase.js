document.addEventListener("DOMContentLoaded", () => {
  //Añadiendo funcionalidad al boton de finalizar compra
  document
    .getElementById("purchase_products")
    .addEventListener("click", purchaseProducts);
});

const purchaseProducts = () => {

  const cartId = localStorage.getItem('cartId')


  Swal.fire({
    title:
      "Los productos que no tenemos en stock quedaran almacenados en tu carrito para más adelante, te gustaría continuar para finalizar el pago?",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonCancel: "Cancelar",
    confirmButtonText: "Continuar",
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      fetch(`${window.location.protocol}//${window.location.host}/api/cart/${cartId}/purchase`, { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "success") {
            Swal.fire({
              title:
                "Pronto recibiras un mail a " +
                res.payload.purchaser +
                " para continuar con el paso final",
              html: `<p>Total: $${res.payload.amount}</p> <p>Codigo: <strong>${res.payload.code}</strong></p> <h3>Seras redirigido al Inicio en <b></b> milliseconds.</h3>`,
              icon: "success",
              timer: 10000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer().querySelector("b");
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft();
                }, 100);
              },
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                window.location.replace("/products");
              }
            });
          }
        });
    }
  });
};
