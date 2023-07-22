module.exports = function isNotAdmin(rol, options) {
    if (rol !== "admin") {
        return options.fn(this);
    } else {
        return "";
    }
};
