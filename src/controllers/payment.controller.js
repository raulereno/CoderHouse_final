const { createPaymentService } = require("../services/payment.service");
const { sendTicketService } = require("../services/ticket.service");

const paymentMethods = (req, res) => {
  res.render("payment", {
    title: "Desafio - Pago",
    style: "index.css",
  });
};

const createPayment = async (req, res, next) => {
  try {
    const { cartId } = req.body
    const result = await createPaymentService(cartId, req.user.username)

    res.status(200).send({ status: 'success', payload: result })

  } catch (error) {
    next(error)
  }
}

const successPay = async (req, res, next) => {
  try {
    const { ticket, cid } = req.query

    await sendTicketService(ticket, cid, req.user.username)

    res.redirect('/success')
  } catch (error) {
    next(error)
  }
}

const renderSuccessPayment = async (req, res, next) => {
  try {

    res.render("checkoutSuccess", {
      title: "Desafio - Pago",
      style: "index.css",
    });

  } catch (error) {
    next(error)
  }
}


module.exports = { paymentMethods, createPayment, successPay, renderSuccessPayment };
