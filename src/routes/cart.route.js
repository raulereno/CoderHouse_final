const { Router } = require("express");
const {
  createCart,
  addProductToCart,
  getCart,
  deleteProductInCart,
  deleteCart,
  addManyProductsToCart,
  updateQuantityProduct,
} = require("../controllers/cart.controller");
const isLogged = require("../middlewares/isLogged");
const { purchaseProducts } = require("../controllers/ticket.controller");
const { isOwner, isCartOwner } = require("../middlewares/isOwner");

const route = Router();

//Ruta eliminada debido a que la creación del carrito se hace al registrarse un usuario.
// route.post("/", createCart);//✅
route.post("/:cid/product/:pid", isLogged, isOwner, isCartOwner, addProductToCart);
route.put("/:cid/product/:pid", isLogged, updateQuantityProduct);
route.delete("/:cid/product/:pid", isLogged, isCartOwner, deleteProductInCart);
route.put("/:cid", isLogged, isCartOwner, addManyProductsToCart);
route.delete("/:cid", isLogged, isCartOwner, deleteCart);
route.get("/:cid/purchase", isLogged, isCartOwner, purchaseProducts);

module.exports = route;
