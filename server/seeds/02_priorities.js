exports.seed = async function (knex) {
  await knex("priorities").del();
  await knex("priorities").insert([
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
