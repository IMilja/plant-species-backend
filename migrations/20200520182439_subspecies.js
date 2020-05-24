/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('subspecies', (table) => {
    table.increments().primary();
    table.string('name').notNullable();
    table
      .integer('plant_species_id')
      .unsigned()
      .references('id')
      .inTable('plant_species')
      .notNullable()
      .index('FK_subspecies_plantspecies');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('subspecies');
};
