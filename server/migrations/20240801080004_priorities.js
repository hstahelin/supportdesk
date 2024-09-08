exports.up = function (knex) {
  return knex.schema.createTable("PRIORITIES", (table) => {
    table.increments("priority_id").unsigned().primary();
    table.string("name", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("PRIORITIES");
};
