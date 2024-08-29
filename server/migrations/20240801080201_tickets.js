exports.up = function (knex) {
  return knex.schema.createTable("TICKETS", (table) => {
    table.increments("ticket_id").unsigned().primary();
    table.string("title", 255).notNullable();
    table.string("description", 255).notNullable();
    table.integer("created_by_user_id").unsigned().notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();

    table
      .foreign("created_by_user_id")
      .references("user_id")
      .inTable("USERS")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("TICKETS");
};
