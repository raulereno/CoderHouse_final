const TicketDao = require("../ticket.dao");
const ticketSchema = require("../../models/ticket.model");

const ticketDao = new TicketDao();

class TicketRepository {
  async createTicket(ticket) {
    const result = await ticketDao.createTicket(ticket);
    return result;
  }
}
module.exports = TicketRepository;
