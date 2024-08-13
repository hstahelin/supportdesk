const knex = require("knex")(require("../knexfile"));

const getAll = async (req, res) => {
  try {
    const tickets = await knex("tickets_current");
    res.status(200).json(tickets);
  } catch (err) {
    res.status(400).send(`Error retrieving tickets: ${err}`);
  }
};

module.exports = {
  getAll,
};
