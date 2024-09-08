exports.up = function (knex) {
  return knex.schema.createTable("ASSIGN_HISTORY", (table) => {
    table.increments("assign_history_id").unsigned().primary();
    table.integer("ticket_id").unsigned().notNullable();
    table.integer("assign_user_id").unsigned().notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.integer("created_by_user_id").unsigned().notNullable();

    table
      .foreign("ticket_id")
      .references("ticket_id")
      .inTable("TICKETS")
      .onDelete("CASCADE");
    table
      .foreign("assign_user_id")
      .references("user_id")
      .inTable("USERS")
      .onDelete("CASCADE");
    table
      .foreign("created_by_user_id")
      .references("user_id")
      .inTable("USERS")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("ASSIGN_HISTORY");
};
