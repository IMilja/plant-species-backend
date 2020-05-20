/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('subspecies', (table) => {
    table.increments().primary();
    table.string('name').notNullable();
    table
      .integer('plantspecies_id')
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
