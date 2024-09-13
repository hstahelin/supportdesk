const knex = require("knex")(require("../knexfile"));
const User = {
  create: async (user) => {
    try {
      const existingUser = await knex("USERS")
        .where({ email: user.email })
        .first();
      if (existingUser) {
        throw new Error("Email already in use.");
      }
      const [user_id] = await knex("USERS").insert(user);
      return user_id;
    } catch (error) {
      throw error;
    }
  },
  findByEmail: (email) => {
    return knex("USERS").where({ email }).first();
  },
  findById: (user_id) => {
    return knex("USERS").where({ user_id }).first();
  },
};

module.exports = User;
