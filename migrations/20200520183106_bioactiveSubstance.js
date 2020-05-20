
/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('bioactive_substance', (table) => {
    table.increments().primary();
    table.string('name');
    table.float('content');
    table
      .integer('unit_of_measure_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('unit_of_measure')
      .index('FK_unit_of_measure');
    table
      .integer('plant_part_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('plant_part');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('bioactive_substance');
};
