const cleanUsers = () => {
    fetch(`${window.location.protocol}//${window.location.host}/api/users/cleanOldUsers`)
        .then((result) => result.json())
        .then((res) => {
            if (res.status === "success") {
                let timerInterval
                Swal.fire({
                    title: `Se han eliminado ${res.deleteUsers !== 1 ? res.deleteUsers + " usuarios inactivos" : res.deleteUsers + " usuario inactivo"}`,
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
                        window.location.replace("/dashboard");
                    }
                })

            }

        }).catch((err) => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: err.message,
                showConfirmButton: false,
            });
        });
}