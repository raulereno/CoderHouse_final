document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form_restart").addEventListener("submit", (evt) => {
        evt.preventDefault()
        generateLinkToRestart()
    })
});


const generateLinkToRestart = () => {
    const email = document.getElementById("input_restart_username")
    console.log("🚀 ~ file: restartPass.js:11 ~ generateLinkToRestart ~ email:", email.value)


    fetch(`${window.location.origin}/api/users/recover/generatelink`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.value }),
    })
        .then(res => res.json())
        .then(res => {
            console.log("🚀 ~ file: restartPass.js:26 ~ generateLinkToRestart ~ res:", res)
            if (res.code == 404 && res.status === "Not found") {
                setError(res.message, email)
            } else {
                successLink(res.payload, email)
            }
        }).catch(err => {
            console.log(err.message);
        })
}

const setError = (message, input) => {
    const span = document.getElementById("username_restart_error")
    span.innerHTML = message
    input.className = "error";
    console.log(message);
    // document.querySelector(".username_restart_error")?.innerHTML = message
}

const successLink = (message, input) => {
    const span = document.getElementById("username_restart_error")
    span.innerHTML = message
    span.className = "span_success"
    input.className = "success";
    // document.querySelector(".username_restart_error")?.innerHTML = message
}