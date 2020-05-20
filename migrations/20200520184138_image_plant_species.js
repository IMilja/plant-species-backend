/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('image_plant_species', (table) => {
    table
      .primary(['plantspecies_id', 'image_id']);
    table
      .integer('plantspecies_id')
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
  return knex.schema.dropTableIfExists('image_plant_species');
};
