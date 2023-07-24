const cleanUsers = () => {


    fetch(`${window.location.origin}/api/users/cleanOldUsers`)
        .then((result) => result.json())
        .then((res) => {
            if (res.status === "success") {
                //TODO: Poner sweet alert con contador y cuando termine haga reload
                alert(`Se han eliminado ${res.deleteUsers !== 1 ? res.deleteUsers + " usuarios inactivos" : res.deleteUsers + " usuario inactivo"}`)
            }

        }).catch((err) => {
            console.log("🚀 ~ file: dashboard.js:7 ~ fetch ~ err:", err)

        });

}