var socket = io();
let messages = [];
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#chat_form").addEventListener("submit", (evt) => {
    evt.preventDefault();

    sendMessages();
  });
});

socket.on("all messages", async (res) => {
  messages = res;

  showMessages(messages);
});

const showMessages = (messages) => {
  const container_messages = document.querySelector("#messages");
  container_messages.innerHTML = "";
  messages.forEach((element) => {
    const message = document.createElement("li");
    message.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg><span><b>${element.user}</b></span> : <span>${element.message}</span>`;

    container_messages.appendChild(message);
  });
};

const sendMessages = async () => {
  let email = document.querySelector("#user_name");
  let message = document.querySelector("#user_message");

  await fetch(`${window.location.protocol}//${window.location.host}/api/chat`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: email.value, message: message.value }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "error") {
        alert(data.error);
      }
    }).catch(err => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.message,
        showConfirmButton: false,
      });
    });

  message.value = "";
};
