
/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('bioactive_substance', (table) => {
    table.increments().primary();
    table.string('name');
    table
      .integer('measure_unit_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('measure_unit')
      .index('FK_measure_unit');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('bioactive_substance');
};
