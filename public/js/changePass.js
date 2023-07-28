document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form_change_pass").addEventListener("submit", (evt) => {
        evt.preventDefault()
        changePassword()
    })
});

const newPassword = document.getElementById("new_password");
const newPassword_repeat = document.getElementById("new_password_repeat");

const changePassword = async () => {

    const token = document.querySelector("#token_restore").value

    if (newPassword.value !== newPassword_repeat.value) {
        setError("Las contraseñas no coinciden")
        newPassword.className += " error"
        newPassword_repeat.className += " error"
    } else {
        newPassword.className = "success"
        newPassword_repeat.className = "success"
        await sendNewPassword(newPassword.value, token)
    }
}

const sendNewPassword = async (newPassword, token) => {
    await fetch(`${window.location.protocol}//${window.location.host}/api/users/changePassword`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: newPassword, token: token }),
    }).then(res => res.json()).then(data => {
        console.log("🚀 ~ file: changePass.js:39 ~ sendNewPassword ~ data:", data)
        if (data.code === 304) {
            setError(data.message)
        }
        if (data.code === 202) {
            successChange(data.message)
            //Alerta con timer
            let timerInterval
            Swal.fire({
                title: 'Has cambiado exitosamente la contraseña!',
                html: 'Seras redirigido en <b></b> milliseconds.',
                timer: 4000,
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
                    window.location.replace("/");
                }
            })
        }
    }).catch(err => {
        console.log("err", err);
    })


}

const setError = (message, input) => {
    const span_error = document.querySelector(".password_error")
    span_error.innerHTML = message
    newPassword.className = "error";
    newPassword_repeat.className = "error";
}

const successChange = (message, input) => {
    const span_error = document.querySelector(".password_error")
    span_error.innerHTML = message
    span_error.className = "span_success"
    newPassword.className = "success";
    newPassword_repeat.className = "success";
}