/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('plant_part', (table) => {
    table
      .primary(['plant_species_id', 'useful_part_id']);
    table
      .integer('plant_species_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('plant_species')
      .index();
    table
      .integer('useful_part_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('useful_part')
      .index();
    table.text('description');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('plant_part');
};
