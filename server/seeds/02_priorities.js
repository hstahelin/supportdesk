exports.seed = async function (knex) {
  await knex("PRIORITIES").del();
  await knex("PRIORITIES").insert([
    {
      priority_id: 1,
      name: "High",
    },
    {
      priority_id: 2,
      name: "Medium",
    },
    {
      priority_id: 3,
      name: "Low",
    },
  ]);
};
