
/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('plant_part_bioactive_substance', (table) => {
    table
      .primary(['plant_part_id', 'bioactive_substance_id']);
    table
      .integer('plant_part_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('plant_part');
    table
      .integer('bioactive_substance_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('bioactive_substance')
      .onDelete('CASCADE');
    table.string('content');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('plant_part_bioactive_substance');
};
