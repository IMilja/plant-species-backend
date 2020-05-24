/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('measure_unit', (table) => {
    table.increments().primary();
    table.string('name').notNullable().index();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('measure_unit');
};
