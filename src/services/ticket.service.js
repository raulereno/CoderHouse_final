const { sendTicketMail } = require("../utils/nodemailer");
const TicketRepository = require("./../dao/repositories/ticket.repository");
const { getCartService, deleteProductInCartService, updateQuantityProductService } = require("./cart.service");
const { getOneProductService } = require("./products.service");

const ticketRepository = new TicketRepository();


const getOneTicketService = async (tid) => {
  try {
    const ticket = await ticketRepository.getTicket(tid);
    return ticket;
  } catch (error) {
    throw Error(error);
  }
};
const createTicketService = async (ticket) => {
  try {
    const newTicket = await ticketRepository.createTicket(ticket);
    return newTicket;
  } catch (error) {
    throw Error(error);
  }
};



const sendTicketService = async (tid, user) => {

  try {
    const ticket = await getOneTicketService(tid)
    const cart = await getCartService(user)

    for (let index = 0; index < cart.products?.length; index++) {
      const product = await getOneProductService(
        cart.products[index].product._id
      );
      if (cart.products[index].quantity <= cart.products[index].product.stock) {
        product.stock = product.stock - cart.products[index].quantity;


        await deleteProductInCartService(
          cart._id,
          cart.products[index].product._id
        );
      } else {
        const aux = cart.products[index].quantity - product.stock
        await updateQuantityProductService({ cid: cart._id, pid: product._id }, { quantity: aux })
        product.stock = 0;
      }
      await product.save();

    }

    await sendTicketMail(ticket, user)

    return cart
  } catch (error) {
    throw new Error(error)
  }

}

const calculateProductsStockService = async (user) => {

  const cart = await getCartService(user);
  const productsTicket = [];
  let sum = 0;

  for (let index = 0; index < cart.products.length; index++) {
    if (cart.products[index].quantity <= cart.products[index].product.stock) {
      sum += cart.products[index].product.price * cart.products[index].quantity;
      const product = await getOneProductService(
        cart.products[index].product._id
      );

      productsTicket.push({ product, quantity: cart.products[index].quantity });

    } else {
      sum += cart.products[index].product.price * cart.products[index].product.stock;
      const product = await getOneProductService(
        cart.products[index].product._id
      );
      productsTicket.push({ product, quantity: cart.products[index].product.stock });
    }
  }

  return { productsTicket, sum }

}

module.exports = { createTicketService, calculateProductsStockService, sendTicketService };
