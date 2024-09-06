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
    const { title, solution, is_public } = req.body;
    const newKB = {
      title,
      solution,
      is_public,
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

const updateKB = async (req, res) => {
  try {
    const kbId = req.params.id;
    const { title, solution, is_public } = req.body;

    const newKBData = {
      title,
      solution,
      is_public,
    };

    const rowsUpdated = await knex("kb").where("kb_id", kbId).update(newKBData);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `KB with ID ${kbId} not found`,
      });
    }

    return res.status(200).json({
      message: `KB with ID ${kbId} was successfully updated`,
    });
  } catch (error) {
    console.error(`Error updating KB with ID ${kbId}:`, error);
    return res.status(500).json({
      message: `Unable to update KB with ID ${kbId}`,
    });
  }
};

module.exports = {
  getAll,
  getOne,
  createKB,
  updateKB,
};
