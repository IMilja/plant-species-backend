/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('plant_part', (table) => {
    table.increments().primary();
    table
      .integer('plantspecies_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('plant_species')
      .index();
    table
      .integer('usefulpart_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('useful_part')
      .index();
    table.unique(['plantspecies_id', 'usefulpart_id']);
    table.text('description');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('plant_part');
};
