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

module.exports = {
  getAll,
  getStatusSummary,
  getPrioritySummary,
};
