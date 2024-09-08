exports.up = function (knex) {
  return knex.schema.createTable("STATUS", (table) => {
    table.increments("status_id").unsigned().primary();
    table.string("name", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("STATUS");
};
