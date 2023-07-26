const { createTicketService, calculateProductsStockService } = require("../services/ticket.service");
const { v4: uuidv4 } = require("uuid");
const { sendTicketMail } = require("../utils/nodemailer");

const purchaseProducts = async (req, res) => {
  try {
    let ticket;
    let resultMailing;
    const { cid } = req.params

    const { sum, productsTicket } = await calculateProductsStockService(cid);

    if (productsTicket.length) {
      ticket = await createTicketService({
        code: uuidv4(),
        purchase_datetime: new Date(),
        amount: sum,
        purchaser: req.user.username,
        products: productsTicket,
      });
      resultMailing = sendTicketMail(
        ticket,
        req.user,
        //TODO: variable de entorno
        "http://localhost:3001/payment"
      );
    }

    res.status(201).send({ status: "success", payload: ticket });
  } catch (error) {
    res.status(404).send({ status: "error", message: error.message });
  }
};

module.exports = { purchaseProducts };
