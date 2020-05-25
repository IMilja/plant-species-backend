/* eslint-disable func-names */
/* eslint-disable implicit-arrow-linebreak */

exports.seed = function (knex) {
  return knex('role').del()
    .then(() =>
      knex('role').insert([
        {
          name: 'ADMIN',
        },
        {
          name: 'SUPER_ADMIN',
        },
      ]));
};
