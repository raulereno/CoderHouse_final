const { Router } = require("express");
const isLogged = require("../middlewares/isLogged");
const { paymentMethods, createPayment, successPay, renderSuccessPayment } = require("../controllers/payment.controller");

const route = Router();

route.post('/payment-intents', isLogged, createPayment)
route.get('/successPayment', isLogged, successPay)
route.get('/fail', async (req, res) => { res.send("checkout") })


module.exports = route;
