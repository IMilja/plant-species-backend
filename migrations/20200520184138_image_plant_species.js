/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('plant_species_image', (table) => {
    table
      .primary(['plant_species_id', 'image_id']);
    table
      .integer('plant_species_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('plant_species');
    table
      .integer('image_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('image');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('plant_species_image');
};
