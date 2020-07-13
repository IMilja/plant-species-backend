/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments().primary();
    table.string('email', 255).unique().notNullable();
    table.string('password', 255).notNullable();
    table.boolean('active').defaultTo(false);
    table.string('activation_hash', 255);
    table.string('password_reset_hash', 255);
    table.string('refresh_token', 255);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('role_id')
      .unsigned()
      .references('id')
      .inTable('role');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user');
};
