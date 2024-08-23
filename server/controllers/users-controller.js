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

module.exports = {
  getAll,
};
