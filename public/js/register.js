const username_input = document.querySelectorAll(".input_register");
const span_error = document.querySelectorAll(".span_error");
const password_input = document.querySelectorAll(".register_password");

document.addEventListener("DOMContentLoaded", () => {
  submitRegisterForm();
  removeError();
});
const submitRegisterForm = () => {
  document
    .getElementById("register_form")
    ?.addEventListener("submit", async (evt) => {
      evt.preventDefault();

      const formData = getFieldsInForm(evt.target);

      if (formData.password !== formData.confirm_password) {
        password_input.forEach((input) => {
          input.className = "error";
        });
        document.querySelector(".password_error").innerHTML =
          "Las contraseñas no coinciden";
      } else {
        await fetch(`${window.location.origin}/api/users/register`, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.code === 409) {
              addErrorInput(res);
            }
            if (res.status === "success") {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuario creado correctamente",
                showConfirmButton: false,
                timer: 2500,
              }).then(() => {
                window.location.replace("/login");
              });
            }
          });
      }
    });
};

const addErrorInput = (response) => {
  if (response.message.includes("email")) {
    username_input[0].className = "error";
    span_error[0].innerHTML = response.message;
  }
  if (response.message.includes("username")) {
    username_input[1].className = "error";
    span_error[1].innerHTML = response.message;
  }
};

const removeError = () => {
  password_input.forEach((input) => {
    input.addEventListener("keyup", (evt) => {
      password_input[0].className = "";
      password_input[1].className = "";
      document.querySelector(".password_error").innerHTML = "";
    });
  });
  username_input.forEach((input) => {
    input.addEventListener("keyup", (evt) => {
      input.className = "";
      span_error.forEach((span) => {
        span.innerHTML = "";
      });
    });
  });
};
