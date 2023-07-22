const mongoose = require("mongoose");
const Ticket = require("./../models/ticket.model");
class TicketDao {
  constructor() {
    this.ticketCollection = Ticket;
  }
  async createTicket(ticket) {
    const newTicket = await this.ticketCollection.create(ticket);

    return newTicket;
  }
}

module.exports = TicketDao;
