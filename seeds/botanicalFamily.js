/* eslint-disable func-names */
/* eslint-disable implicit-arrow-linebreak */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('botanical_family').del()
    .then(() =>
      // Inserts seed entries
      knex('botanical_family').insert([
        {
          croatian_name: 'Usnače',
          latin_name: 'Lamiaceae',
        },
        {
          croatian_name: 'Koprivnjače',
          latin_name: 'Urticaceae',
        },
        {
          croatian_name: 'Glavočike',
          latin_name: 'Asteraceae ',
        },
        {
          croatian_name: 'Štitarke',
          latin_name: 'Apiaceae',
        },
        {
          croatian_name: 'Sljezovke',
          latin_name: 'Malvaceae',
        },
        {
          croatian_name: 'Strupnikovke',
          latin_name: 'Scrophulariaceae',
        },
        {
          croatian_name: 'Sirištare',
          latin_name: 'Gentianaceae',
        },
        {
          croatian_name: 'Pljuskavice',
          latin_name: 'Hypericaceae ',
        },
        {
          croatian_name: 'Trputci',
          latin_name: 'Plantaginaceae',
        },
        {
          croatian_name: 'Lovori',
          latin_name: 'Lauraceae',
        },
        {
          croatian_name: 'Ljubice',
          latin_name: 'Violaceae ',
        },
        {
          croatian_name: 'Konopljike',
          latin_name: 'Cannabaceae',
        },
        {
          croatian_name: 'Lukovi',
          latin_name: 'Alliaceae',
        },
        {
          croatian_name: 'Kupusnjače',
          latin_name: 'Brassicaceae',
        },
        {
          croatian_name: 'Pomoćnice',
          latin_name: 'Solanaceae',
        },
        {
          croatian_name: 'Rute',
          latin_name: 'Rutaceae',
        },
        {
          croatian_name: 'Irisi',
          latin_name: 'Iridaceae',
        },
        {
          croatian_name: 'Imele',
          latin_name: 'Loranthaceae',
        },
        {
          croatian_name: 'Čempresi',
          latin_name: 'Cupressaceae',
        },
      ]));
};
