const cleanUsers = () => {


    fetch(`http://${window.location.host}/api/users/cleanOldUsers`).then((result) => {
        console.log("🚀 ~ file: dashboard.js:5 ~ fetch ~ result:", result)
    }).catch((err) => {
        console.log("🚀 ~ file: dashboard.js:7 ~ fetch ~ err:", err)

    });

}