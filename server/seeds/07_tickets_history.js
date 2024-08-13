exports.seed = async function (knex) {
  await knex("tickets_history").del();
  await knex("tickets_history").insert([
    {
      ticket_id: 1,
      change_date: "2024-08-01 9:00:00",
      changed_by: 10,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 2,
      change_date: "2024-08-01 10:30:00",
      changed_by: 10,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 3,
      change_date: "2024-08-02 8:45:00",
      changed_by: 10,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 4,
      change_date: "2024-08-02 11:00:00",
      changed_by: 10,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 5,
      change_date: "2024-08-02 14:15:00",
      changed_by: 10,
      priority_id: 2,
      status_id: 1,
    },
    {
      ticket_id: 6,
      change_date: "2024-08-03 9:00:00",
      changed_by: 11,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 7,
      change_date: "2024-08-03 10:00:00",
      changed_by: 11,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 8,
      change_date: "2024-08-04 8:00:00",
      changed_by: 11,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 9,
      change_date: "2024-08-04 9:15:00",
      changed_by: 11,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 10,
      change_date: "2024-08-05 8:30:00",
      changed_by: 11,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 11,
      change_date: "2024-08-05 11:00:00",
      changed_by: 12,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 12,
      change_date: "2024-08-05 13:00:00",
      changed_by: 12,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 13,
      change_date: "2024-08-06 9:00:00",
      changed_by: 12,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 14,
      change_date: "2024-08-06 10:30:00",
      changed_by: 12,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 15,
      change_date: "2024-08-06 12:00:00",
      changed_by: 12,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 16,
      change_date: "2024-08-07 8:00:00",
      changed_by: 13,
      priority_id: 1,
      status_id: 1,
    },
    {
      ticket_id: 17,
      change_date: "2024-08-07 10:00:00",
      changed_by: 13,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 18,
      change_date: "2024-08-07 11:00:00",
      changed_by: 13,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 19,
      change_date: "2024-08-08 8:00:00",
      changed_by: 13,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 20,
      change_date: "2024-08-08 9:30:00",
      changed_by: 13,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 21,
      change_date: "2024-08-08 11:00:00",
      changed_by: 14,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 22,
      change_date: "2024-08-08 13:00:00",
      changed_by: 14,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 23,
      change_date: "2024-08-09 8:00:00",
      changed_by: 14,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 24,
      change_date: "2024-08-09 9:00:00",
      changed_by: 14,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 25,
      change_date: "2024-08-09 10:30:00",
      changed_by: 14,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 26,
      change_date: "2024-08-09 12:00:00",
      changed_by: 15,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 27,
      change_date: "2024-08-09 13:00:00",
      changed_by: 15,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 28,
      change_date: "2024-08-10 8:00:00",
      changed_by: 15,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 29,
      change_date: "2024-08-10 9:00:00",
      changed_by: 15,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 30,
      change_date: "2024-08-10 10:00:00",
      changed_by: 15,
      priority_id: 3,
      status_id: 1,
    },
    {
      ticket_id: 1,
      change_date: "2024-08-01 10:00:00",
      changed_by: 4,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 4,
    },
    {
      ticket_id: 2,
      change_date: "2024-08-01 10:35:00",
      changed_by: 5,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 5,
    },
    {
      ticket_id: 3,
      change_date: "2024-08-02 9:45:00",
      changed_by: 6,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 6,
    },
    {
      ticket_id: 4,
      change_date: "2024-08-02 11:10:00",
      changed_by: 7,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 7,
    },
    {
      ticket_id: 5,
      change_date: "2024-08-02 14:25:00",
      changed_by: 8,
      priority_id: 2,
      status_id: 1,
      assigned_user_id: 8,
    },
    {
      ticket_id: 6,
      change_date: "2024-08-03 9:10:00",
      changed_by: 9,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 9,
    },
    {
      ticket_id: 7,
      change_date: "2024-08-03 10:20:00",
      changed_by: 4,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 4,
    },
    {
      ticket_id: 8,
      change_date: "2024-08-04 8:05:00",
      changed_by: 5,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 5,
    },
    {
      ticket_id: 9,
      change_date: "2024-08-04 9:25:00",
      changed_by: 6,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 6,
    },
    {
      ticket_id: 10,
      change_date: "2024-08-05 8:32:00",
      changed_by: 7,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 7,
    },
    {
      ticket_id: 11,
      change_date: "2024-08-05 11:10:00",
      changed_by: 8,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 8,
    },
    {
      ticket_id: 12,
      change_date: "2024-08-05 13:40:00",
      changed_by: 9,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 9,
    },
    {
      ticket_id: 13,
      change_date: "2024-08-06 9:05:00",
      changed_by: 4,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 4,
    },
    {
      ticket_id: 14,
      change_date: "2024-08-06 10:50:00",
      changed_by: 5,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 5,
    },
    {
      ticket_id: 15,
      change_date: "2024-08-06 12:10:00",
      changed_by: 6,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 6,
    },
    {
      ticket_id: 16,
      change_date: "2024-08-07 8:05:00",
      changed_by: 7,
      priority_id: 1,
      status_id: 1,
      assigned_user_id: 7,
    },
    {
      ticket_id: 17,
      change_date: "2024-08-07 10:40:00",
      changed_by: 8,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 8,
    },
    {
      ticket_id: 18,
      change_date: "2024-08-07 11:02:00",
      changed_by: 9,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 9,
    },
    {
      ticket_id: 19,
      change_date: "2024-08-08 8:03:00",
      changed_by: 4,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 4,
    },
    {
      ticket_id: 20,
      change_date: "2024-08-08 9:35:00",
      changed_by: 5,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 5,
    },
    {
      ticket_id: 21,
      change_date: "2024-08-08 11:50:00",
      changed_by: 6,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 6,
    },
    {
      ticket_id: 22,
      change_date: "2024-08-08 13:40:00",
      changed_by: 7,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 7,
    },
    {
      ticket_id: 23,
      change_date: "2024-08-09 11:00:00",
      changed_by: 8,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 8,
    },
    {
      ticket_id: 24,
      change_date: "2024-08-09 9:30:00",
      changed_by: 9,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 9,
    },
    {
      ticket_id: 25,
      change_date: "2024-08-09 11:30:00",
      changed_by: 4,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 4,
    },
    {
      ticket_id: 26,
      change_date: "2024-08-09 12:10:00",
      changed_by: 5,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 5,
    },
    {
      ticket_id: 27,
      change_date: "2024-08-09 13:30:00",
      changed_by: 6,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 6,
    },
    {
      ticket_id: 28,
      change_date: "2024-08-10 8:40:00",
      changed_by: 7,
      priority_id: 3,
      status_id: 1,
      assigned_user_id: 7,
    },
  ]);
};
