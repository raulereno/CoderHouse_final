document.addEventListener("DOMContentLoaded", () => {
    showAlert()
})

const showAlert = () => {

    let timerInterval
    Swal.fire({
        title: 'Muchas gracias por su compra, estara recibiendo un mail con la confirmación pronto.',
        html: 'Seras redirigido en <b></b> milliseconds.',
        timer: 5000,
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
            window.location.href = "/";
        }
    })

}
