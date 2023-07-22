module.exports = function isAuth(rol, options) {

  if (rol === "admin" || rol === "premium") {
    return options.fn(this);
  } else {
    return "";
  }
};
