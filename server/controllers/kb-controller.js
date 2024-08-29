const knex = require("knex")(require("../knexfile"));

const getAll = async (req, res) => {
  try {
    const kb = await knex("kb");
    res.status(200).json(kb);
  } catch (err) {
    res.status(400).send(`Error retrieving KB's: ${err}`);
  }
};

const getOne = async (req, res) => {
  try {
    const kbId = req.params.id;

    const kb = await knex("kb").where("kb_id", kbId).first();
    res.status(200).json(kb);
  } catch (err) {
    res.status(400).send(`Error retrieving KB's: ${err}`);
  }
};
module.exports = {
  getAll,
  getOne,
};
