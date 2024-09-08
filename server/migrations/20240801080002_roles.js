exports.up = function (knex) {
  return knex.schema.createTable("ROLES", (table) => {
    table.increments("role_id").unsigned().primary();
    table.string("name", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("ROLES");
};
