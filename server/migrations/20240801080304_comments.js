exports.up = function (knex) {
  return knex.schema.createTable("COMMENTS", (table) => {
    table.increments("comment_id").primary();
    table.integer("ticket_id").unsigned().notNullable();
    table.text("comments", "mediumtext").notNullable();
    table.integer("comments_by_user_id").unsigned().notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();

    table
      .foreign("ticket_id")
      .references("ticket_id")
      .inTable("TICKETS")
      .onDelete("CASCADE");
    table
      .foreign("comments_by_user_id")
      .references("user_id")
      .inTable("USERS")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("COMMENTS");
};
