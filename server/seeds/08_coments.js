exports.seed = async function (knex) {
  await knex("comments").del();
  await knex("comments").insert([
    {
      ticket_id: 1,
      comments: "Need to know if it is a Mac or Windows PC.",
      comments_by: 4,
      created_date: "2024-08-01 10:05:00",
    },
  ]);
};
