/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('image_plant_part', (table) => {
    table
      .primary(['plant_part_id', 'image_id']);
    table
      .integer('plant_part_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('plant_part');
    table
      .integer('image_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('image');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('image_plant_part');
};
