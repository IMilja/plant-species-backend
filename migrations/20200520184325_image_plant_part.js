/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('plant_part_image', (table) => {
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
      .inTable('image')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('plant_part_image');
};
