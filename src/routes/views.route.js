const { Router } = require("express");
const { formLoginUser, formRegisterUser, formRecoverPass, restorePassword, profileView, dashboardView } = require("../controllers/user.controller");
const { getAllProducts } = require("../controllers/products.controller");
const isLogged = require("../middlewares/isLogged");
const { getCart } = require("../controllers/cart.controller");
const { getAllMessages } = require("../controllers/chat.controller");
const { paymentMethods, renderSuccessPayment } = require("../controllers/payment.controller");
const isAuth = require("../middlewares/isAuth");

const viewsRoute = Router();

//Renders relacionados con el usuario
viewsRoute.get("/login", formLoginUser);
viewsRoute.get("/register", formRegisterUser);
viewsRoute.get("/recover", formRecoverPass)
viewsRoute.get("/restorepass/:token", restorePassword);
viewsRoute.get("/profile", isLogged, profileView);
//Render relacionado con el dashboard
viewsRoute.get("/dashboard", isLogged, isAuth, dashboardView);
//Renders relacionados con los productos
viewsRoute.get("/products", isLogged, getAllProducts);
//Renders relacionados con el carrito
viewsRoute.get("/cart/:cid", isLogged, getCart);
//Renders relacionados con el chat
viewsRoute.get("/chat", isLogged, getAllMessages);
//Renders relacionados con el pago
viewsRoute.get('/success', isLogged, renderSuccessPayment)


module.exports = viewsRoute