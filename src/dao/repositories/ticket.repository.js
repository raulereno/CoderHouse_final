const TicketDao = require("../ticket.dao");
const ticketSchema = require("../../models/ticket.model");

const ticketDao = new TicketDao();

class TicketRepository {

  async getTicket(tid) {
    try {
      const result = await ticketDao.getTicket(tid);
      return result;
    } catch (error) {
      throw new Error(error)
    }
  }
  async createTicket(ticket) {
    try {
      const result = await ticketDao.createTicket(ticket);
      return result;
    } catch (error) {
      throw new Error(error)
    }
  }
}
module.exports = TicketRepository;
