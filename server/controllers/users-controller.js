const knex = require("knex")(require("../knexfile"));

const getAll = async (req, res) => {
  const { role } = req.query;

  try {
    let query = knex("USERS_LIST");
    if (role) query = query.where("user_role", role);
    const tickets = await query;
    res.status(200).json(tickets);
  } catch (err) {
    res.status(400).send(`Error retrieving users: ${err}`);
  }
};

const getReportingUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    const users = await knex
      .withRecursive("user_hierarchy", (qb) => {
        qb.select("user_id")
          .select(knex.raw("0 AS level"))
          .select(knex.raw("CAST(LPAD(user_id, 5, '0') AS CHAR(255)) AS path")) //Path for ordering
          .from("USERS")
          .where("user_id", userId)
          .unionAll(function () {
            this.select("u.user_id")
              .select(knex.raw("uh.level + 1"))
              .select(
                knex.raw(
                  "CONCAT(uh.path, '-', LPAD(u.user_id, 5, '0')) AS path"
                )
              )
              .from("USERS as u")
              .innerJoin(
                "user_hierarchy as uh",
                "u.manager_user_id",
                "uh.user_id"
              );
          });
      })
      .select("ul.*")
      .select("uh.level")
      .from("user_hierarchy as uh")
      .join("USERS_LIST as ul", "uh.user_id", "ul.user_id")
      .orderBy("uh.path");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(`Error retrieving users: ${error}`);
  }
};

const buildTicketIdSubquery = (knex, currentUserId, currentUserRoleId) => {
  if (currentUserRoleId == 2 || currentUserRoleId == 3) {
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
  } else if (currentUserRoleId == 1) {
    return knex
      .select("ticket_id")
      .from("TICKETS_CURRENT")
      .where("assign_user_id", currentUserId); //Agent
  }
  return null;
};

const getNotifications = async (req, res) => {
  const currentUserId = req.user.user_id;
  const currentUserRoleId = req.user.role_id;
  try {
    const ticketIdSubquery = buildTicketIdSubquery(
      knex,
      currentUserId,
      currentUserRoleId
    );

    const notifications = await knex
      .select("tt.*", "tc.title")
      .from("TICKETS_CURRENT as tc")
      .join("TICKETS_TIMELINE as tt", "tc.ticket_id", "tt.ticket_id")
      .whereIn("tc.ticket_id", ticketIdSubquery)
      .orderBy("tt.created_at", "desc");
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).send(`Error retrieving data: ${error}`);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await knex("USERS")
      .where("user_id", id)
      .first()
      .select(
        "user_id",
        "first_name",
        "last_name",
        "email",
        "manager_user_id",
        "role_id"
      );
    res.status(200).json(userFound);
  } catch (error) {
    res.status(400).send(`Error retrieving user: ${error}`);
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name, email, role_id, manager_user_id } = req.body;
  const userNewData = {
    first_name,
    last_name,
    email,
    role_id,
    manager_user_id: role_id == 4 ? null : manager_user_id,
  };

  try {
    const rowsUpdated = await knex("USERS")
      .where("user_id", userId)
      .update(userNewData);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `user with ID ${userId} not found`,
      });
    }

    return res.status(200).json({
      message: `User with ID ${userId} was successfully updated`,
    });
  } catch (error) {
    console.error(`Error updating User with ID ${userId}:`, error);
    return res.status(500).json({
      message: `Unable to update User with ID ${userId}`,
    });
  }
};
module.exports = {
  getAll,
  getReportingUsers,
  getNotifications,
  getOne,
  updateUser,
};
