/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments().primary();
    table.string('user_name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
    table.string('name', 255);
    table.string('surname', 255);
    table.integer('role_id')
      .unsigned()
      .references('id')
      .inTable('role');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user');
};
