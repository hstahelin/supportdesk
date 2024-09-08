exports.seed = async function (knex) {
  await knex("roles").del();
  await knex("roles").insert([
    {
      role_id: 1,
      name: "Agent",
    },
    {
      role_id: 2,
      name: "Manager",
    },
    {
      role_id: 3,
      name: "Team Lead",
    },
    {
      role_id: 4,
      name: "Customer",
    },
    {
      role_id: 5,
      name: "AI Assistant",
    },
  ]);
};
