const knex = require("knex")(require("../knexfile"));

const getAll = async (req, res) => {
  const { role } = req.query;

  try {
    let query = knex("users_list");
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
          .select(knex.raw("CAST(LPAD(user_id, 5, '0') AS CHAR(255)) AS path")) // Create a path for ordering
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
      .join("users_list as ul", "uh.user_id", "ul.user_id")
      .orderBy("uh.path");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(`Error retrieving users: ${error}`);
  }
};

module.exports = {
  getAll,
  getReportingUsers,
};
