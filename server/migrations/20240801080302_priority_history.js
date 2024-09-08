exports.up = function (knex) {
  return knex.schema.createTable("PRIORITY_HISTORY", (table) => {
    table.increments("priority_history_id").unsigned().primary();
    table.integer("ticket_id").unsigned().notNullable();
    table.integer("priority_id").unsigned().notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.integer("created_by_user_id").unsigned().notNullable();

    table
      .foreign("ticket_id")
      .references("ticket_id")
      .inTable("TICKETS")
      .onDelete("CASCADE");
    table
      .foreign("priority_id")
      .references("priority_id")
      .inTable("PRIORITIES")
      .onDelete("CASCADE");
    table
      .foreign("created_by_user_id")
      .references("user_id")
      .inTable("USERS")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("PRIORITY_HISTORY");
};
