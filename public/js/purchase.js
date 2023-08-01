document.addEventListener("DOMContentLoaded", () => {
  //Añadiendo funcionalidad al boton de finalizar compra
  document.getElementById("purchase_products")?.addEventListener("click", purchaseProducts);
});

const purchaseProducts = () => {

  const cartId = localStorage.getItem('cartId');

  Swal.fire({
    title:
      "Te gustaría continuar para finalizar el pago?",
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Continuar",
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      fetch(
        `${window.location.protocol}//${window.location.host}/api/payment/payment-intents`,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartId: cartId })
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "success" && res.payload?.url) {
            window.location = res.payload?.url
          }
        });
    }
  });
};
