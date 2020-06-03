
/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('plant_part_bioactive_substance', (table) => {
    table
      .primary(['plant_species_id', 'useful_part_id', 'bioactive_substance_id']);
    table
      .integer('plant_species_id')
      .unsigned();
    table
      .integer('useful_part_id')
      .unsigned();
    table
      .foreign(['plant_species_id', 'useful_part_id'], 'FK_plant_part_bioactive_substance')
      .references(['plant_species_id', 'useful_part_id'])
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
