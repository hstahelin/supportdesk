const knex = require("knex")(require("../knexfile"));

const getAll = async (req, res) => {
  try {
    const { email } = req.query;

    let query = knex("tickets_current");

    if (email) {
      query = query.where("created_email", email);
    }

    const tickets = await query.orderBy("created_date", "desc");
    res.status(200).json(tickets);
  } catch (err) {
    res.status(400).send(`Error retrieving tickets: ${err}`);
  }
};

const getStatusSummary = async (req, res) => {
  try {
    const tickets = await knex("status_summary");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).send(`Error retrieving info: ${err}`);
  }
};

const getPrioritySummary = async (req, res) => {
  try {
    const tickets = await knex("priority_summary");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).send(`Error retrieving info: ${err}`);
  }
};

const create = async (req, res) => {
  const trx = await knex.transaction();
  try {
    const {
      title,
      description,
      user_id: contact_user_id,
      priority: priority_id,
      assign: assigned_user_id,
    } = req.body;

    const newTicket = { title, description, contact_user_id };
    const ticketResult = await trx("tickets").insert(newTicket);
    const newTicketId = ticketResult[0];

    const createdTicket = await trx("tickets")
      .where({ ticket_id: newTicketId })
      .first();

    const newTicketHistory = {
      ticket_id: createdTicket.ticket_id,
      change_date: createdTicket.created_date,
      changed_by: createdTicket.contact_user_id,
      priority_id: priority_id,
      status_id: 1,
      assigned_user_id: assigned_user_id || null,
    };

    const ticketHistoryResult = await trx("tickets_history").insert(
      newTicketHistory
    );
    const newTicketHistoryId = ticketHistoryResult[0];

    const createdTicketHistory = await trx("tickets_history")
      .where({ history_id: newTicketHistoryId })
      .first();

    await trx.commit();

    res.status(201).json(createdTicket);
  } catch (error) {
    await trx.rollback();
    res.status(500).json({
      message: `Unable to create new Ticket: ${error.message}`,
    });
  }
};

const getOne = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticketFound = await knex("tickets_current")
      .where("ticket_id", ticketId)
      .first();
    if (!ticketFound) {
      return res.status(404).json({
        message: `Ticket ID ${ticketId} not found`,
      });
    }
    res.status(200).json(ticketFound);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve Ticket: ${error.message}`,
    });
  }
};

const getComments = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const comments = await knex("comments_history")
      .where("ticket_id", ticketId)
      .orderBy("created_date", "desc");
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).send(`Error retrieving comments: ${err}`);
  }
};

module.exports = {
  getAll,
  getStatusSummary,
  getPrioritySummary,
  create,
  getOne,
  getComments,
};
