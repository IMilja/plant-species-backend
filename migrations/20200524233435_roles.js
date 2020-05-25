/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('role', (table) => {
    table.increments().primary();
    table.string('name', 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('role');
};
