const knex = require("knex")(require("../knexfile"));

const getAll = async (req, res) => {
  try {
    const { email } = req.query;

    let query = knex("tickets_current");

    if (email) {
      query = query.where("created_email", email);
    }

    const tickets = await query;
    res.status(200).json(tickets);
  } catch (err) {
    res.status(400).send(`Error retrieving tickets: ${err}`);
  }
};

module.exports = {
  getAll,
};
