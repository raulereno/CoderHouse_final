module.exports = function formatDate(date) {
    if (date) {
        return new Date(date)?.toLocaleString()
    }
    else {
        return "No ingreso"
    }

}

