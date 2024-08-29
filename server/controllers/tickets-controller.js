const knex = require("knex")(require("../knexfile"));

const getAll = async (req, res) => {
  try {
    const { email } = req.query;

    let query = knex("tickets_current");

    if (email) {
      query = query.where("created_email", email);
    }

    const tickets = await query.orderBy("created_at", "desc");
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
      user_id: created_by_user_id,
      priority: priority_id,
      assign: assign_user_id,
    } = req.body;

    const newTicket = { title, description, created_by_user_id };
    const ticketResult = await trx("tickets").insert(newTicket);
    const newTicketId = ticketResult[0];

    const createdTicket = await trx("tickets")
      .where({ ticket_id: newTicketId })
      .first();

    const statusTicketHistory = {
      ticket_id: createdTicket.ticket_id,
      status_id: 1,
      created_at: createdTicket.created_at,
      created_by_user_id: createdTicket.created_by_user_id,
    };
    const statusTicketHistoryResult = await trx("status_history").insert(
      statusTicketHistory
    );

    const priorityTicketHistory = {
      ticket_id: createdTicket.ticket_id,
      priority_id: priority_id,
      created_at: createdTicket.created_at,
      created_by_user_id: createdTicket.created_by_user_id,
    };
    const priorityTicketHistoryResult = await trx("priority_history").insert(
      priorityTicketHistory
    );

    if (assign_user_id) {
      const assignTicketHistory = {
        ticket_id: createdTicket.ticket_id,
        assign_user_id: assign_user_id,
        created_at: createdTicket.created_at,
        created_by_user_id: createdTicket.created_by_user_id,
      };
      const assignTicketHistoryResult = await trx("assign_history").insert(
        assignTicketHistory
      );
    }

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
      .orderBy("created_at", "desc");
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).send(`Error retrieving comments: ${error}`);
  }
};

const createComment = async (req, res) => {
  try {
    const { comments, comments_by } = req.body;
    const ticketId = req.params.id;
    const newComment = {
      comments,
      comments_by_user_id: comments_by,
      ticket_id: ticketId,
    };
    const commentResult = await knex("comments").insert(newComment);
    const newCommentId = commentResult[0];

    const createdComment = await knex("comments")
      .where("comment_id", newCommentId)
      .first();

    res.status(201).json(createdComment);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new Comment: ${error}`,
    });
  }
};

module.exports = {
  getAll,
  getStatusSummary,
  getPrioritySummary,
  create,
  getOne,
  getComments,
  createComment,
};
