exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      user_id: 1,
      first_name: "AI",
      last_name: "Assistant",
      email: "AI.Assistant@supportdesk.com",
      manager_user_id: null,
      is_active: true,
      role_id: 5,
      password: "AI.Assistant@supportdesk.com",
    },
    {
      user_id: 2,
      first_name: "Robin",
      last_name: "Nico",
      email: "robinnico@supportdesk.com",
      manager_user_id: null,
      is_active: true,
      role_id: 2,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
    {
      user_id: 3,
      first_name: "Jane",
      last_name: "Smith",
      email: "janesmith@supportdesk.com",
      manager_user_id: 2,
      is_active: true,
      role_id: 3,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
    {
      user_id: 4,
      first_name: "Alice",
      last_name: "Johnson",
      email: "alicejohnson@supportdesk.com",
      manager_user_id: 2,
      is_active: true,
      role_id: 3,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
    {
      user_id: 5,
      first_name: "Bob",
      last_name: "Brown",
      email: "bobbrown@supportdesk.com",
      manager_user_id: 3,
      is_active: true,
      role_id: 1,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
    {
      user_id: 6,
      first_name: "Charlie",
      last_name: "Davis",
      email: "charliedavis@supportdesk.com",
      manager_user_id: 3,
      is_active: true,
      role_id: 1,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
    {
      user_id: 7,
      first_name: "Eve",
      last_name: "Martinez",
      email: "evemartinez@supportdesk.com",
      manager_user_id: 3,
      is_active: true,
      role_id: 1,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
    {
      user_id: 8,
      first_name: "Frank",
      last_name: "Clark",
      email: "frankclark@supportdesk.com",
      manager_user_id: 4,
      is_active: true,
      role_id: 1,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
    {
      user_id: 9,
      first_name: "Grace",
      last_name: "Miller",
      email: "gracemiller@supportdesk.com",
      manager_user_id: 4,
      is_active: true,
      role_id: 1,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
    {
      user_id: 10,
      first_name: "Hank",
      last_name: "Wilson",
      email: "hankwilson@supportdesk.com",
      manager_user_id: 4,
      is_active: true,
      role_id: 1,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
    {
      user_id: 11,
      first_name: "Ivy",
      last_name: "Moore",
      email: "ivy.moore@company.com",
      manager_user_id: null,
      is_active: true,
      role_id: 4,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
    {
      user_id: 12,
      first_name: "Alice",
      last_name: "Smith",
      email: "alice.smith@company.com",
      manager_user_id: null,
      is_active: true,
      role_id: 4,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
    {
      user_id: 13,
      first_name: "Bob",
      last_name: "Johnson",
      email: "bob.johnson@company.com",
      manager_user_id: null,
      is_active: true,
      role_id: 4,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
    {
      user_id: 14,
      first_name: "Charlie",
      last_name: "Williams",
      email: "charlie.williams@company.com",
      manager_user_id: null,
      is_active: true,
      role_id: 4,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
    {
      user_id: 15,
      first_name: "Diana",
      last_name: "Brown",
      email: "diana.brown@company.com",
      manager_user_id: null,
      is_active: true,
      role_id: 4,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
    {
      user_id: 16,
      first_name: "Edward",
      last_name: "Jones",
      email: "edward.jones@company.com",
      manager_user_id: null,
      is_active: true,
      role_id: 4,
      password: "$2a$10$9f6RjhRnL7pSa6PkjlZ3u.kfmCFfM9StLYsoKuaK8o0UIKH3qTdKC",
    },
  ]);
};
