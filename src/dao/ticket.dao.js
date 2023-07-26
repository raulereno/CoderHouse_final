const mongoose = require("mongoose");
const Ticket = require("./../models/ticket.model");
class TicketDao {
  constructor() {
    this.ticketCollection = Ticket;
  }

  async getTicket(tid) {
    try {
      const ticket = await this.ticketCollection.findOne({ _id: tid }).populate({
        path: "products.product",
      })
      return ticket
    } catch (error) {
      throw new Error(error)
    }
  }
  async createTicket(ticket) {
    try {
      const newTicket = await this.ticketCollection.create(ticket);

      return newTicket;
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = TicketDao;
