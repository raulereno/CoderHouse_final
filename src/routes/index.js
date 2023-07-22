const { Router } = require("express");
const viewsRoute = require("./views.route");
const userRoute = require("./user.route");
const cartRoute = require("./cart.route");
const chatRoute = require("./chat.route");
const paymentRoute = require("./payment.route");
const productsRoute = require("./products.route");

const routes = Router();

routes.use("/", viewsRoute);
routes.use("/api/users", userRoute);
routes.use("/api/products", productsRoute);
routes.use("/api/cart", cartRoute);
routes.use("/api/chat", chatRoute);
routes.use("/api/payment", paymentRoute);

module.exports = routes;
