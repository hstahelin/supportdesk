exports.seed = async function (knex) {
  await knex("STATUS").del();
  await knex("STATUS").insert([
    {
      status_id: 1,
      name: "New",
    },
    {
      status_id: 2,
      name: "In Progress",
    },
    {
      status_id: 3,
      name: "Escalated",
    },
    {
      status_id: 4,
      name: "Solved",
    },
    {
      status_id: 5,
      name: "Canceled",
    },
    {
      status_id: 6,
      name: "Pending",
    },
  ]);
};
