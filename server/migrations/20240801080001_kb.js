exports.up = function (knex) {
  return knex.schema.createTable("KB", (table) => {
    table.increments("kb_id").primary();
    table.string("title", 255).notNullable();
    table.text("description", "mediumtext").notNullable();
    table.text("solution", "mediumtext").notNullable();
    table.boolean("is_public").defaultTo(false).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("KB");
};
