// Update with your config settings.
const config = require('./config');

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: config.databaseUrl,
      port: config.databasePort,
      user: config.databaseUsername,
      password: config.databasePassword,
      database: config.databaseName,
      charset: 'utf8',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: config.databaseUrl,
      port: config.databasePort,
      user: config.databaseUsername,
      password: config.databasePassword,
      database: config.databaseName,
      charset: 'utf8',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

};
