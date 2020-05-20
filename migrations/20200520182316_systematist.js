/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('systematist', (table) => {
    table.increments().primary();
    table.string('name').notNullable().index();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('systematist');
};
