exports.up = function (knex) {
  return knex.schema.createTable("USERS", (table) => {
    table.increments("user_id").unsigned().primary();
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("password", 255).notNullable();
    table.integer("manager_user_id").unsigned().nullable();
    table.boolean("is_active").defaultTo(true).notNullable();
    table.integer("role_id").unsigned().notNullable().defaultTo(4);

    table
      .foreign("manager_user_id")
      .references("user_id")
      .inTable("USERS")
      .onDelete("CASCADE");
    table
      .foreign("role_id")
      .references("role_id")
      .inTable("ROLES")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("USERS");
};
