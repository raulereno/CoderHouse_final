let cartId = localStorage.getItem("cartId");

document.addEventListener("DOMContentLoaded", () => {
  cleanCart();
  addEndPoint();
});

const addEndPoint = () => {
  const link = document.getElementById("link_cart");
  if (link) link.href += cartId;
};

const addToCart = async (pid) => {

  const buttonAdd = document.getElementById(`buttonAddToCart_${pid}`)
  buttonAdd.style.backgroundColor = 'GREEN'
  buttonAdd.innerText = '🛒👌'
  buttonAdd.disabled = true

  const cid = cartId;

  await fetch(`${window.location.protocol}//${window.location.host}/api/cart/${cid}/product/${pid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => res.json()).then(res => {
    if (res.status === "error" && res.payload?.includes('Stock insuficiente')) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: res.payload?.split(":")[1],
        showConfirmButton: false,
      });
      setTimeout(() => {
        buttonAdd.style.backgroundColor = 'RED'
        buttonAdd.innerText = 'Stock insuficiente'
        buttonAdd.disabled = true
      }, 1500);
      return
    }
    if (res.code === 401 && res.message?.includes(
      "No puede comprar tu propio producto")) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: res.message,
        showConfirmButton: false,
      });
      setTimeout(() => {
        buttonAdd.style.backgroundColor = 'GREY'
        buttonAdd.innerText = '❌'
        buttonAdd.disabled = true
      }, 1500);
      return
    } else {
      setTimeout(() => {
        buttonAdd.style.backgroundColor = 'BLUE'
        buttonAdd.innerText = 'Agregar al carrito'
        buttonAdd.disabled = false
      }, 1500);
    }
    //
  });
};

const minusQuantity = (pid) => {
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity");
  if (Number(quantity.innerHTML) !== 0) {
    quantity.innerHTML = Number(quantity.innerHTML) - 1;
    setQuantity(pid);
  }
};
const plusQuantity = (pid, max) => {
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity");
  if (Number(quantity.innerHTML) < max) {
    quantity.innerHTML = Number(quantity.innerHTML) + 1;
    setQuantity(pid);
  }
};

const setQuantity = async (pid) => {
  const cid = cartId;
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity").innerHTML;

  await fetch(`${window.location.protocol}//${window.location.host}/api/cart/${cid}/product/${pid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: Number(quantity) }),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.reload();
    });
};

const deleteProductInCart = async (pid) => {
  const cid = cartId;

  await fetch(`${window.location.protocol}//${window.location.host}/api/cart/${cid}/product/${pid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      window.location.reload();
    });
};
const cleanCart = () => {
  document.getElementById("clean_cart")?.addEventListener("click", async () => {
    const cid = cartId;

    await fetch(`${window.location.protocol}//${window.location.host}/api/cart/${cid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
      });
  });
};
