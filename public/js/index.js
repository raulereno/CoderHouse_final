const getFieldsInForm = (form) => {
  const formData = {};
  Object.keys(form).forEach((element) => {
    const field = form[element];
    const name = field.name;
    const value = field.value;

    if ((field.type === "text" || field.type === "password") && name !== "") {
      formData[name] = value;
    }
  });

  return formData;
};

document.addEventListener("DOMContentLoaded", () => {
  submitCreateForm();
  openModalCreate();
  submitUpdateForm();
  showButtonsToAdmin();
  showButtonsToOwner();
});
//


const submitCreateForm = () => {
  document.querySelector("#create_form")?.addEventListener("submit", (evt) => {
    evt.preventDefault();
    createProduct();
  });
};

const submitUpdateForm = () => {
  document
    .querySelector("#form_updateProduct")
    ?.addEventListener("submit", (evt) => {
      evt.preventDefault();
      send_update(evt);
    });
};

const openModalCreate = () => {
  document.querySelector("#createProduct")?.addEventListener("click", () => {
    const miModal = new bootstrap.Modal(document.getElementById(`createModal`));
    miModal.show();
  });
};

const openModalUpdate = async (id) => {
  const miModal = new bootstrap.Modal(document.getElementById(`updateModal`));
  miModal.show();

  const title = document.querySelector(`.card-title${id}`);
  const description = document.querySelector(`.description${id}`);
  const price = document.querySelector(`.price${id}`);
  const stock = document.querySelector(`.stock${id}`);

  const input_title = document.getElementById("input_title");
  const input_description = document.getElementById("input_description");
  const input_price = document.getElementById("input_price");
  const input_stock = document.getElementById("input_stock");
  const productId = document.getElementById("productId");

  input_title.value = title.innerHTML;
  input_description.value = description.innerHTML;
  input_price.value = Number(price.innerHTML.replace("$", ""));
  input_stock.value = stock.innerHTML.split(" ")[1];
  productId.value = id;
};

const send_update = async (evt) => {
  evt.preventDefault();
  const idProduct = document.querySelector(
    "#form_updateProduct input[name='productId']"
  ).value;
  const title = document.querySelector(
    "#form_updateProduct input[name='title']"
  ).value;
  const description = document.querySelector(
    "#form_updateProduct input[name='description']"
  ).value;
  const price = document.querySelector(
    "#form_updateProduct input[name='price']"
  ).value;
  const stock = document.querySelector(
    "#form_updateProduct input[name='stock']"
  ).value;
  const image = document.querySelector(
    "#form_updateProduct input[name='image']"
  ).value;

  await fetch(`${window.location.origin}/api/products/${idProduct}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, price, image, stock }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 401 && res.status === "Unauthorized") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: res.message,
          showConfirmButton: false,
        });
      }
      //Los botones se muestran solo a los dueños pero por seguridad dejo alerta tambien
      else if (res.status === "Unauthorized" && res.message?.includes("No tienes autorización para modificar este producto")) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "No tienes autorización para modificar este producto",
          showConfirmButton: false,
        });
      }
      else {
        window.location.reload();
      }
    });
};

const createProduct = async () => {
  const title = document.querySelector("#input_create_title").value;
  const description = document.querySelector("#input_create_description").value;
  const price = document.querySelector("#input_create_price").value;
  const stock = document.querySelector("#input_create_stock").value;
  const image = document.querySelector("#input_create_image").value;
  // const fileUpload = document.querySelector("#fileUpload");
  // const file = fileUpload.files[0];

  await fetch(`${window.location.origin}/api/products`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, price, stock, image }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("🚀 ~ file: index.js:145 ~ .then ~ res:", res)
      if (res.code === 401 && res.status === "Unauthorized") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: res.message,
          showConfirmButton: false,
        });
      } else if (res.code === 400 && res.message === "ValidationError") {
        Swal.fire({
          position: "center",
          icon: "error",
          html: `<ul> ${Object.keys(res.errores).map((elm) => {
            return `<li>${elm}: ${res.errores[elm]}</li>`;
          })} </ul>`,
          showConfirmButton: false,
        });
      } else {
        let timerInterval
        Swal.fire({
          title: 'Has agregado el producto con exito',
          html: 'Seras redirigido en <b></b> milliseconds.',
          timer: 2500,
          icon: 'success',
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            window.location.reload();
          }
        })

      }
    });
};

const deleteProduct = async (id) => {
  Swal.fire({
    title: "Estas seguro que quieres borrar este producto?",
    showDenyButton: true,
    showCancelButton: true,
    denyButtonText: `Borrar`,
    showConfirmButton: false,
    reverseButtons: true,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isDenied) {
      await fetch(`${window.location.origin}/api/products/${id}`, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {

          if (res.code === 401 && res.status === "Unauthorized") {
            Swal.fire({
              position: "center",
              icon: "error",
              title: res.message,
              showConfirmButton: false,
            });
          }
          //Los botones se muestran solo a los dueños pero por seguridad dejo alerta tambien
          else if (res.payload?.includes("No tienes autorización para modificar este producto")) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "No tienes autorización para modificar este producto",
              showConfirmButton: false,
            });
          }
          else {
            window.location.reload();
          }
        }).catch(err => {
          console.log(err);
        });
    }
  });
};
const showButtonsToAdmin = () => {
  const rol = document.getElementById("user_rol")?.innerHTML.split(" ")[1];
  const pencilButton = document.querySelectorAll(".icon_pencil");
  const deleteButton = document.querySelectorAll(".icon_trash");

  if (rol === "admin") {
    pencilButton.forEach((button) => (button.style.display = "flex"));
    deleteButton.forEach((button) => (button.style.display = "flex"));
  }
};


const showButtonsToOwner = () => {
  const email = document.getElementById("user_email")?.innerHTML
  const rol = document.getElementById("user_rol")?.innerHTML.split(" ")[1];

  const pencilButton = document.querySelectorAll(`.icon_pencil`);
  const deleteButton = document.querySelectorAll(`.icon_trash`);
  pencilButton.forEach((button) => {
    if (button.classList[1] === email && rol !== "usuario") {
      button.style.display = "flex"
    }
  });
  deleteButton.forEach((button) => {
    if (button.classList[1] === email && rol !== "usuario") {
      button.style.display = "flex"
    }
  });
}

const changeRol = () => {
  const link = document.getElementById("changeRolLink")
  fetch(`${window.location.origin}/${link?.dataset.path}`).then(res => res.json()).then(res => {

    if (res.code === 406 && res.message?.includes('Falta los siguientes documentos para ser premium')) {
      Swal.fire({
        icon: 'error',
        title: 'Te faltan documentos para convertirte en premium',
        showCancelButton: true,
        confirmButtonText: 'Ir a cargar documentos',
        cancelButtonText: 'Más tarde',
        reverseButtons: true,
        html: `<ul>${res.missingDocs?.map(element => {
          return `<li>${element}</li>`
        })}</ul>`
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("/profile");
        }
      })
    }
    else if (res.status === "success" && res.message?.includes('El usuario a cambiado de rol')) {
      Swal.fire({
        title: res.message,
        timer: 2000,
        icon: 'success',
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.replace("/products");
        }
      })
    }

  }).catch(err => {
    //TODO: MANEJAR ERROR
  })
}