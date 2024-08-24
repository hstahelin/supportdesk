exports.seed = async function (knex) {
  await knex("comments").del();
  await knex("comments").insert([
    {
      ticket_id: 1,
      comments: "Need to know if it is a Mac or Windows PC.",
      comments_by: 4,
      created_date: "2024-08-01 10:06:30",
    },
    {
      ticket_id: 1,
      comments:
        "Received your message, will follow up with the information later today.",
      comments_by: 10,
      created_date: "2024-08-01 10:09:30",
    },
    {
      ticket_id: 1,
      comments: "System is MacBook Pro.",
      comments_by: 10,
      created_date: "2024-08-01 11:15:30",
    },
    {
      ticket_id: 1,
      comments: "Need to escalate to VPN agent.",
      comments_by: 4,
      created_date: "2024-08-01 11:22:00",
    },
    {
      ticket_id: 2,
      comments: "We need more data to better understand the situation.",
      comments_by: 5,
      created_date: "2024-09-02 10:05:00",
    },
    {
      ticket_id: 2,
      comments:
        "Got your request, Ill provide the details later today or by tomorrow.",
      comments_by: 10,
      created_date: "2024-09-03 10:05:00",
    },
    {
      ticket_id: 5,
      comments: "Please provide more information to help us resolve the issue.",
      comments_by: 8,
      created_date: "2024-09-03 10:05:00",
    },
    {
      ticket_id: 5,
      comments:
        "Message received, Ill get back to you with the information within today or tomorrow.",
      comments_by: 10,
      created_date: "2024-09-04 10:05:00",
    },
    {
      ticket_id: 6,
      comments: "Further clarification is needed to address the problem.",
      comments_by: 9,
      created_date: "2024-09-04 10:05:00",
    },
    {
      ticket_id: 6,
      comments:
        "Received your note, will send you the information by end of today",
      comments_by: 11,
      created_date: "2024-09-05 10:05:00",
    },
    {
      ticket_id: 9,
      comments: "More specifics are necessary to pinpoint the issue.",
      comments_by: 6,
      created_date: "2024-09-05 10:05:00",
    },
    {
      ticket_id: 9,
      comments: "Thanks for your message, Ill follow up with the details later",
      comments_by: 11,
      created_date: "2024-09-06 10:05:00",
    },
    {
      ticket_id: 10,
      comments: "We require additional context to diagnose the problem.",
      comments_by: 7,
      created_date: "2024-09-06 10:05:00",
    },
    {
      ticket_id: 10,
      comments: "Message received, Ill get back to you with the information",
      comments_by: 11,
      created_date: "2024-09-07 10:05:00",
    },
    {
      ticket_id: 13,
      comments: "Please supply more details to facilitate troubleshooting.",
      comments_by: 4,
      created_date: "2024-09-01 11:05:00",
    },
    {
      ticket_id: 13,
      comments: "Message received, Ill get back to you with the information",
      comments_by: 12,
      created_date: "2024-09-01 14:05:00",
    },
    {
      ticket_id: 14,
      comments:
        "Additional input is needed to accurately assess the situation.",
      comments_by: 5,
      created_date: "2024-09-01 13:05:00",
    },
    {
      ticket_id: 14,
      comments: "Message received, Ill get back to you with the information",
      comments_by: 12,
      created_date: "2024-09-01 15:05:00",
    },
  ]);
};
