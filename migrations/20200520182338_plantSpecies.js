/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('plant_species', (table) => {
    table.increments().primary();
    table.string('croatian_name').notNullable().index();
    table.string('latin_name').index();
    table.string('synonym');
    table.text('description').notNullable();
    table
      .integer('genus_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('genus')
      .index('FK_plantspecies_genus');
    table
      .integer('systematist_id')
      .unsigned()
      .references('id')
      .inTable('systematist')
      .index('FK_plantspecies_systematist');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('plant_species');
};
