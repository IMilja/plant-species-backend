/* eslint-disable func-names */
/* eslint-disable implicit-arrow-linebreak */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('useful_part').del()
    .then(() =>
      // Inserts seed entries
      knex('useful_part').insert([
        {
          croatian_name: 'Nadzemni dio',
          latin_name: 'Herba',
        },
        {
          croatian_name: 'List',
          latin_name: 'Folium',
        },
        {
          croatian_name: 'Cvijet',
          latin_name: 'Flos',
        },
        {
          croatian_name: 'Korijen',
          latin_name: 'Radix',
        },
        {
          croatian_name: 'Češer',
          latin_name: 'Strobuli',
        },
        {
          croatian_name: 'Rizom',
          latin_name: 'Rhizoma',
        },
        {
          croatian_name: 'Lukovica',
          latin_name: 'Bulbus',
        },
        {
          croatian_name: 'Sjeme',
          latin_name: 'Semen',
        },
        {
          croatian_name: 'Plod',
          latin_name: 'Fructus',
        },
        {
          croatian_name: 'Drvo',
          latin_name: 'Lignum',
        },
        {
          croatian_name: 'Ulje',
          latin_name: 'Olium',
        },
        {
          croatian_name: 'Eterično ulje',
          latin_name: 'Aetherolium',
        },
      ]));
};
