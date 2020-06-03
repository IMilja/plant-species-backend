/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('plant_part_image', (table) => {
    table
      .primary(['plant_species_id', 'useful_part_id', 'image_id']);
    table
      .integer('plant_species_id')
      .unsigned();
    table
      .integer('useful_part_id')
      .unsigned();
    table
      .foreign(['plant_species_id', 'useful_part_id'])
      .references(['plant_species_id', 'useful_part_id'])
      .inTable('plant_part');
    table
      .integer('image_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('image')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('plant_part_image');
};
