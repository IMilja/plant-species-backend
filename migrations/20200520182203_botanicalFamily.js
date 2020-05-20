/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('botanical_family', (table) => {
    table.increments().primary();
    table.string('croatian_name').notNullable().index();
    table.string('latin_name').notNullable().index();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('botanical_family');
};
