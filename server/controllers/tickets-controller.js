const knex = require("knex")(require("../knexfile"));

const buildTicketIdSubquery = (
  knex,
  currentUserId,
  currentUserRoleId,
  source = "all"
) => {
  if (
    currentUserRoleId == 2 ||
    currentUserRoleId == 3 ||
    (currentUserRoleId == 1 && source === "all")
  ) {
    return knex
      .withRecursive("user_hierarchy", (qb) => {
        qb.select("user_id")
          .from("USERS")
          .where("user_id", currentUserId)
          .unionAll(function () {
            this.select("u.user_id")
              .from("USERS as u")
              .innerJoin(
                "user_hierarchy as uh",
                "u.manager_user_id",
                "uh.user_id"
              );
          });
      })
      .select("tc.ticket_id")
      .from("TICKETS_CURRENT as tc")
      .join("user_hierarchy as uh", function () {
        this.on(
          "uh.user_id",
          knex.raw("coalesce(tc.assign_user_id, ?)", [currentUserId])
        );
      }); //Manager or Team Lead
  } else if (currentUserRoleId == 4) {
    return knex
      .select("ticket_id")
      .from("TICKETS_CURRENT")
      .where("created_user_id", currentUserId); //Customer
  } else if (currentUserRoleId == 1 && source === "filter") {
    return knex
      .select("ticket_id")
      .from("TICKETS_CURRENT")
      .where("assign_user_id", currentUserId); //Agent
  }
  return null;
};

const getAll = async (req, res) => {
  if (!req.user || !req.user.user_id || !req.user.role_id) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User/Role ID is required" });
  }

  const currentUserId = req.user.user_id;
  const currentUserRoleId = req.user.role_id;

  try {
    const ticketIdSubquery = buildTicketIdSubquery(
      knex,
      currentUserId,
      currentUserRoleId
    );
    const { email, priority, status } = req.query;

    let query = knex("TICKETS_CURRENT").whereIn("ticket_id", ticketIdSubquery);

    if (email) {
      query = query.where("created_email", email);
    }
    if (priority) {
      query = query.where("priority", priority);
    }
    if (status) {
      query = query.where("status", status);
    }
    const tickets = await query.orderBy("created_at", "desc");
    res.status(200).json(tickets);
  } catch (err) {
    res.status(400).send(`Error retrieving tickets: ${err}`);
  }
};

const getPrioritySummary = async (req, res) => {
  if (!req.user || !req.user.user_id || !req.user.role_id) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User/Role ID is required" });
  }
  const currentUserId = req.user.user_id;
  const currentUserRoleId = req.user.role_id;
  try {
    const ticketIdSubquery = buildTicketIdSubquery(
      knex,
      currentUserId,
      currentUserRoleId,
      "filter"
    );

    const tickets = await knex
      .with("TicketCounts", (qb) => {
        qb.select("priority")
          .count({ tickets: 9 })
          .from("TICKETS_CURRENT")
          .whereIn("ticket_id", ticketIdSubquery)
          .groupBy("priority")
          .orderBy("priority");
      })
      .select(
        "priority as name",
        "tickets",
        knex.raw(
          "ROUND(tickets * 100.0 / SUM(tickets) OVER (), 2) AS percentage"
        )
      )
      .from("TicketCounts");

    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).send(`Error retrieving info: ${error}`);
  }
};

const getStatusSummary = async (req, res) => {
  if (!req.user || !req.user.user_id || !req.user.role_id) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User/Role ID is required" });
  }
  const currentUserId = req.user.user_id;
  const currentUserRoleId = req.user.role_id;
  try {
    const ticketIdSubquery = buildTicketIdSubquery(
      knex,
      currentUserId,
      currentUserRoleId,
      "filter"
    );

    const tickets = await knex
      .with("TicketCounts", (qb) => {
        qb.select("status")
          .count({ tickets: 9 })
          .from("TICKETS_CURRENT")
          .whereIn("ticket_id", ticketIdSubquery)
          .groupBy("status")
          .orderBy("status");
      })
      .select(
        "status as name",
        "tickets",
        knex.raw(
          "ROUND(tickets * 100.0 / SUM(tickets) OVER (), 2) AS percentage"
        )
      )
      .from("TicketCounts");

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
    const ticketResult = await trx("TICKETS").insert(newTicket);
    const newTicketId = ticketResult[0];

    const createdTicket = await trx("TICKETS")
      .where({ ticket_id: newTicketId })
      .first();

    const statusTicketHistory = {
      ticket_id: createdTicket.ticket_id,
      status_id: 1,
      created_at: createdTicket.created_at,
      created_by_user_id: createdTicket.created_by_user_id,
    };
    const statusTicketHistoryResult = await trx("STATUS_HISTORY").insert(
      statusTicketHistory
    );

    const priorityTicketHistory = {
      ticket_id: createdTicket.ticket_id,
      priority_id: priority_id,
      created_at: createdTicket.created_at,
      created_by_user_id: createdTicket.created_by_user_id,
    };
    const priorityTicketHistoryResult = await trx("PRIORITY_HISTORY").insert(
      priorityTicketHistory
    );

    if (assign_user_id) {
      const assignTicketHistory = {
        ticket_id: createdTicket.ticket_id,
        assign_user_id: assign_user_id,
        created_at: createdTicket.created_at,
        created_by_user_id: createdTicket.created_by_user_id,
      };
      const assignTicketHistoryResult = await trx("ASSIGN_HISTORY").insert(
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
  const currentUserId = req.user.user_id;
  const currentUserRoleId = req.user.role_id;
  try {
    const ticketIdSubquery = buildTicketIdSubquery(
      knex,
      currentUserId,
      currentUserRoleId
    );
    const ticketId = req.params.id;

    let query = knex("TICKETS_CURRENT").where({ ticket_id: ticketId }).first();

    let ticketFound = await query;

    if (!ticketFound) {
      return res.status(404).json({
        message: `Ticket ID ${ticketId} not found`,
      });
    }

    const ticketAccess = await knex("TICKETS_CURRENT")
      .where({ ticket_id: ticketId })
      .andWhere("ticket_id", "in", ticketIdSubquery)
      .first();

    if (!ticketAccess) {
      res.status(403).json({
        message: `You don't have access to Ticket ${ticketId}`,
      });
    }
    res.status(200).json(ticketAccess);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve Ticket: ${error.message}`,
    });
  }
};

const getComments = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const comments = await knex("COMMENTS_HISTORY")
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
    const commentResult = await knex("COMMENTS").insert(newComment);
    const newCommentId = commentResult[0];

    const createdComment = await knex("COMMENTS")
      .where("comment_id", newCommentId)
      .first();

    res.status(201).json(createdComment);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new Comment: ${error}`,
    });
  }
};

const getTimeline = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const timeline = await knex("TICKETS_TIMELINE")
      .where("ticket_id", ticketId)
      .orderBy("created_at");

    res.status(200).json(timeline);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve timeline for Ticket: ${error.message}`,
    });
  }
};

const updateTicket = async (req, res) => {
  const trx = await knex.transaction();

  try {
    const ticket_id = req.params.id;
    const { status_id, priority_id, assign_user_id, description, user_id } =
      req.body;

    if (!ticket_id || !user_id) {
      throw new Error("Missing required fields");
    }

    const ticketFound = await trx("TICKETS_CURRENT")
      .where("ticket_id", ticket_id)
      .first();

    if (!ticketFound) {
      throw new Error("Ticket not found");
    }

    // STATUS
    if (ticketFound.status_id != status_id && status_id) {
      const newStatus = { ticket_id, status_id, created_by_user_id: user_id };
      await trx("STATUS_HISTORY").insert(newStatus);
    }

    // PRIORITY
    if (ticketFound.priority_id != priority_id && priority_id) {
      const newPriority = {
        ticket_id,
        priority_id,
        created_by_user_id: user_id,
      };
      await trx("PRIORITY_HISTORY").insert(newPriority);
    }

    // ASSIGN
    if (ticketFound.assign_user_id != assign_user_id && assign_user_id) {
      const newAssign = {
        ticket_id,
        assign_user_id,
        created_by_user_id: user_id,
      };
      await trx("ASSIGN_HISTORY").insert(newAssign);
    }

    // DESCRIPTION
    if (ticketFound.description != description && description) {
      await trx("TICKETS")
        .update({ description })
        .where("ticket_id", ticket_id);
    }

    await trx.commit();

    const ticketUpdated = await knex("TICKETS_CURRENT")
      .where("ticket_id", ticket_id)
      .first();

    res.status(200).json(ticketUpdated);
  } catch (error) {
    await trx.rollback();
    console.error(`Error updating ticket: ${error.message}`);
    res
      .status(500)
      .json({ message: `Unable to update Ticket: ${error.message}` });
  } finally {
    trx.destroy();
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
  getTimeline,
  updateTicket,
};
