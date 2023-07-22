const {
  getAllProducts,
  createOneProduct,
  createManyProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { Router } = require("express");
const isAuth = require("../middlewares/isAuth");
const passport = require("passport");
const isLogged = require("../middlewares/isLogged");
const hasPermissions = require("../middlewares/hasPermissions");
const productsRoute = Router();

productsRoute.post("/", isLogged, hasPermissions, createOneProduct);
productsRoute.post("/fulldb", isLogged, isAuth, createManyProducts);
productsRoute.put("/:pid", isLogged, hasPermissions, updateProduct);
productsRoute.delete("/:pid", isLogged, hasPermissions, deleteProduct);

module.exports = productsRoute;
