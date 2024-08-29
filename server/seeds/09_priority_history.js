exports.seed = async function (knex) {
  await knex("priority_history").del();
  await knex("priority_history").insert([
    {
      ticket_id: 1,
      priority_id: 3,
      created_at: "2024-08-01 9:00:00",
      created_by_user_id: 10,
    },
    {
      ticket_id: 2,
      priority_id: 3,
      created_at: "2024-08-01 10:30:00",
      created_by_user_id: 10,
    },
    {
      ticket_id: 3,
      priority_id: 3,
      created_at: "2024-08-02 8:45:00",
      created_by_user_id: 10,
    },
    {
      ticket_id: 4,
      priority_id: 2,
      created_at: "2024-08-02 11:00:00",
      created_by_user_id: 10,
    },
    {
      ticket_id: 5,
      priority_id: 2,
      created_at: "2024-08-02 14:15:00",
      created_by_user_id: 10,
    },
    {
      ticket_id: 6,
      priority_id: 1,
      created_at: "2024-08-03 9:00:00",
      created_by_user_id: 11,
    },
    {
      ticket_id: 7,
      priority_id: 3,
      created_at: "2024-08-03 10:00:00",
      created_by_user_id: 11,
    },
    {
      ticket_id: 8,
      priority_id: 3,
      created_at: "2024-08-04 8:00:00",
      created_by_user_id: 11,
    },
    {
      ticket_id: 9,
      priority_id: 3,
      created_at: "2024-08-04 9:15:00",
      created_by_user_id: 11,
    },
    {
      ticket_id: 10,
      priority_id: 2,
      created_at: "2024-08-05 8:30:00",
      created_by_user_id: 11,
    },
    {
      ticket_id: 11,
      priority_id: 2,
      created_at: "2024-08-05 11:00:00",
      created_by_user_id: 12,
    },
    {
      ticket_id: 12,
      priority_id: 1,
      created_at: "2024-08-05 13:00:00",
      created_by_user_id: 12,
    },
    {
      ticket_id: 13,
      priority_id: 3,
      created_at: "2024-08-06 9:00:00",
      created_by_user_id: 12,
    },
    {
      ticket_id: 14,
      priority_id: 3,
      created_at: "2024-08-06 10:30:00",
      created_by_user_id: 12,
    },
    {
      ticket_id: 15,
      priority_id: 3,
      created_at: "2024-08-06 12:00:00",
      created_by_user_id: 12,
    },
    {
      ticket_id: 16,
      priority_id: 2,
      created_at: "2024-08-07 8:00:00",
      created_by_user_id: 13,
    },
    {
      ticket_id: 17,
      priority_id: 2,
      created_at: "2024-08-07 10:00:00",
      created_by_user_id: 13,
    },
    {
      ticket_id: 18,
      priority_id: 1,
      created_at: "2024-08-07 11:00:00",
      created_by_user_id: 13,
    },
    {
      ticket_id: 19,
      priority_id: 3,
      created_at: "2024-08-08 8:00:00",
      created_by_user_id: 13,
    },
    {
      ticket_id: 20,
      priority_id: 3,
      created_at: "2024-08-08 9:30:00",
      created_by_user_id: 13,
    },
    {
      ticket_id: 21,
      priority_id: 3,
      created_at: "2024-08-08 11:00:00",
      created_by_user_id: 14,
    },
    {
      ticket_id: 22,
      priority_id: 2,
      created_at: "2024-08-08 13:00:00",
      created_by_user_id: 14,
    },
    {
      ticket_id: 23,
      priority_id: 2,
      created_at: "2024-08-09 8:00:00",
      created_by_user_id: 14,
    },
    {
      ticket_id: 24,
      priority_id: 1,
      created_at: "2024-08-09 9:00:00",
      created_by_user_id: 14,
    },
    {
      ticket_id: 25,
      priority_id: 3,
      created_at: "2024-08-09 10:30:00",
      created_by_user_id: 14,
    },
    {
      ticket_id: 26,
      priority_id: 3,
      created_at: "2024-08-09 12:00:00",
      created_by_user_id: 15,
    },
    {
      ticket_id: 27,
      priority_id: 3,
      created_at: "2024-08-09 13:00:00",
      created_by_user_id: 15,
    },
    {
      ticket_id: 28,
      priority_id: 2,
      created_at: "2024-08-10 8:00:00",
      created_by_user_id: 15,
    },
    {
      ticket_id: 29,
      priority_id: 2,
      created_at: "2024-08-10 9:00:00",
      created_by_user_id: 15,
    },
    {
      ticket_id: 30,
      priority_id: 1,
      created_at: "2024-08-10 10:00:00",
      created_by_user_id: 15,
    },
  ]);
};
