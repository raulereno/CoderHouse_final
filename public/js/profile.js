document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form_files")?.addEventListener("submit", (evt) => {
        evt.preventDefault();
        sendFiles();
    })
    addTextChosenFiles()
})

const sendFiles = async () => {
    const uid = document.getElementById('user_id').value
    const file1 = document.getElementById('file_identification').files[0]
    const newFile1 = file1 && new File([file1], `identification.${file1.name.split('.')[1]}`, { type: `${file1.type}` })
    const file2 = document.getElementById('file_address').files[0]
    const newFile2 = file2 && new File([file2], `address.${file2.name.split('.')[1]}`, { type: `${file2.type}` })
    const file3 = document.getElementById('file_status_count').files[0]
    const newFile3 = file3 && new File([file3], `statusCount.${file3.name.split('.')[1]}`, { type: `${file3.type}` })

    const aux = [newFile1, newFile2, newFile3]

    const form = new FormData();
    aux.forEach(file => {
        if (file) {
            form.append(file.name.split('.')[0], file)
        }
    })

    await fetch(`${window.location.origin}/api/users/${uid}/documents`, {
        method: 'post',
        body: form
    }).then(res => res.json()).then(res => {
        if (res.status === "success" && res.message?.includes('Archivo/s agregado con exito')) {
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
                    window.location.replace("/profile");
                }
            })
        }
    })

}

const addTextChosenFiles = () => {
    const file1 = document.getElementById('file_identification');
    const fileChosen1 = document.getElementById('file-chosen_identification');
    file1.addEventListener('change', function () {
        fileChosen1.textContent = this.files[0].name
    })

    const file2 = document.getElementById('file_address');
    const fileChosen2 = document.getElementById('file-chosen_address');
    file2.addEventListener('change', function () {
        fileChosen2.textContent = this.files[0].name
    })

    const file3 = document.getElementById('file_status_count');
    const fileChosen3 = document.getElementById('file-chosen_status_count');
    file3.addEventListener('change', function () {
        fileChosen3.textContent = this.files[0].name
    })
}