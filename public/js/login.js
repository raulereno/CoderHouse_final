const inputLogin = document.querySelectorAll(".input_login");
const spanError = document.querySelectorAll(".span_error");

document.addEventListener("DOMContentLoaded", () => {
  submitLoginForm();
  removeError();
});

const submitLoginForm = () => {
  document
    .getElementById("login_form")
    ?.addEventListener("submit", async (evt) => {
      evt.preventDefault();
      const formData = getFieldsInForm(evt.target);

      await fetch(`http://${window.location.host}/api/users/login`, {
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
          if (res.payload == "login success") {
            localStorage.setItem("cartId", res.cartId);
            window.location.replace("/products");
          }
          if (res.code === 404 && res.status === "Not found") {
            addErrorInput(res);
          }
          if (res.code === 403 && res.status === "Error") {
            addErrorInput(res);
          }
        });
    });
};
const addErrorInput = (response) => {
  const numField = response.code === 404 ? 0 : 1;
  const input = inputLogin[numField];
  const span = spanError[numField];
  input.className = "error";
  span.innerHTML = response.message;
};

const removeError = () => {
  document.querySelectorAll(".input_login").forEach((input) => {
    input.addEventListener("keyup", (evt) => {
      input.className = "";
      spanError.forEach((span) => {
        span.innerHTML = "";
      });
    });
  });
};
