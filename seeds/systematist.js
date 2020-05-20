/* eslint-disable func-names */
/* eslint-disable implicit-arrow-linebreak */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('systematist').del()
    .then(() =>
      // Inserts seed entries
      knex('systematist').insert([
        {
          name: 'L.',
        },
        {
          name: 'Ph. Gaertn. B. mey. et Scherb',
        },
        {
          name: '(DC.) Hell',
        },
        {
          name: 'Moench',
        },
        {
          name: 'Mill.',
        },
        {
          name: '(Mill.) Nym. ex A. W. Hill',
        },
      ]));
};
