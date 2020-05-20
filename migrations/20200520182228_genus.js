/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('genus', (table) => {
    table.increments().primary();
    table.string('name').notNullable().index();
    table
      .integer('botanical_family_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('botanical_family')
      .index('FK_genus_botanicalfamily');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('genus');
};
