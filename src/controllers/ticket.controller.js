const {
  getCartService,
  deleteProductInCartService,
} = require("../services/cart.service");
const {
  getOneProductService,
  updateProductService,
} = require("../services/products.service");
const { createTicketService } = require("../services/ticket.service");
const { v4: uuidv4 } = require("uuid");
const { sendTicketMail } = require("../utils/nodemailer");

const purchaseProducts = async (req, res) => {
  try {
    let ticket;
    let resultMailing;
    const cart = await getCartService(req.params);

    let sum = 0;
    const productsTicket = [];

    for (let index = 0; index < cart.products.length; index++) {
      if (cart.products[index].quantity <= cart.products[index].product.stock) {
        sum += cart.products[index].product.price;
        const product = await getOneProductService(
          cart.products[index].product._id
        );

        product.stock = product.stock - cart.products[index].quantity;

        await product.save();

        productsTicket.push(product);

        await deleteProductInCartService(
          req.params.cid,
          cart.products[index].product._id
        );
      }
    }

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
        "http://localhost:3001/payment"
      );
    }

    res.status(201).send({ status: "success", payload: ticket });
  } catch (error) {
    res.status(404).send({ status: "error", message: error.message });
  }
};

module.exports = { purchaseProducts };
