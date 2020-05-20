/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('useful_part', (table) => {
    table.increments().primary();
    table.string('croatian_name').notNullable().index();
    table.string('latin_name').index();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('useful_part');
};
