/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('unit_of_measure', (table) => {
    table.increments().primary();
    table.string('name').notNullable().index();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('unit_of_measure');
};
