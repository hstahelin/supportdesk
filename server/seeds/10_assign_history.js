exports.seed = async function (knex) {
  await knex("ASSIGN_HISTORY").del();
  await knex("ASSIGN_HISTORY").insert([
    {
      ticket_id: 1,
      assign_user_id: 5,
      created_at: "2024-08-01 9:30:00",
      created_by_user_id: 5,
    },
    {
      ticket_id: 2,
      assign_user_id: 6,
      created_at: "2024-08-01 11:30:00",
      created_by_user_id: 6,
    },
    {
      ticket_id: 3,
      assign_user_id: 7,
      created_at: "2024-08-02 8:49:00",
      created_by_user_id: 7,
    },
    {
      ticket_id: 4,
      assign_user_id: 8,
      created_at: "2024-08-02 11:05:00",
      created_by_user_id: 8,
    },
    {
      ticket_id: 5,
      assign_user_id: 9,
      created_at: "2024-08-03 14:15:00",
      created_by_user_id: 9,
    },
    {
      ticket_id: 6,
      assign_user_id: 10,
      created_at: "2024-08-03 9:10:00",
      created_by_user_id: 10,
    },
    {
      ticket_id: 7,
      assign_user_id: 5,
      created_at: "2024-08-03 12:00:00",
      created_by_user_id: 5,
    },
    {
      ticket_id: 8,
      assign_user_id: 6,
      created_at: "2024-08-04 8:10:00",
      created_by_user_id: 6,
    },
    {
      ticket_id: 9,
      assign_user_id: 7,
      created_at: "2024-08-04 9:16:00",
      created_by_user_id: 7,
    },
    {
      ticket_id: 10,
      assign_user_id: 8,
      created_at: "2024-09-06 8:35:00",
      created_by_user_id: 8,
    },
    {
      ticket_id: 26,
      assign_user_id: 6,
      created_at: "2024-08-09 12:10:00",
      created_by_user_id: 6,
    },
    {
      ticket_id: 27,
      assign_user_id: 7,
      created_at: "2024-08-09 13:01:00",
      created_by_user_id: 7,
    },
    {
      ticket_id: 28,
      assign_user_id: 8,
      created_at: "2024-08-10 9:00:00",
      created_by_user_id: 2,
    },
    {
      ticket_id: 29,
      assign_user_id: 9,
      created_at: "2024-08-10 13:00:00",
      created_by_user_id: 9,
    },
    {
      ticket_id: 30,
      assign_user_id: 10,
      created_at: "2024-08-10 10:45:00",
      created_by_user_id: 10,
    },
  ]);
};
