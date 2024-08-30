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

const createKB = async (req, res) => {
  try {
    const { title, solution } = req.body;
    const newKB = {
      title,
      solution,
    };
    const insertResult = await knex("kb").insert(newKB);
    const newKBId = insertResult[0];

    const createdKB = await knex("kb").where("kb_id", newKBId).first();

    res.status(201).json(createdKB);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new KB: ${error}`,
    });
  }
};

module.exports = {
  getAll,
  getOne,
  createKB,
};
