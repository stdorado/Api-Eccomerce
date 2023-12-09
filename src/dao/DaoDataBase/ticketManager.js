import Ticket from "../model/Ticket.js";


export class TicketManager {
  async createTicket(products, totalAmount) {
    try {
      const newTicket = await Ticket.create({ products, totalAmount });
      return newTicket;
    } catch (error) {
      throw error;
    }
  }

  async getTicketById(id) {
    try {
      const ticket = await Ticket.findById(id);
      return ticket;
    } catch (error) {
      throw error;
    }
  }
}