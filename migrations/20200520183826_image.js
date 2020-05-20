/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.createTable('image', (table) => {
    table.increments().primary();
    table.string('name').notNullable();
    table.text('description');
    table.string('source').notNullable();
    table.timestamp('upload_date').notNullable().defaultTo(knex.fn.now());
    table.string('image_source').notNullable();
    table.string('file_name');
    table.boolean('custom_upload').defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('image');
};
