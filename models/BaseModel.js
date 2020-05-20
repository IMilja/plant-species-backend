const { Model, snakeCaseMappers } = require('objection');
const Knex = require('knex');
const config = require('../config');
const knexConfig = require('../knexfile')[config.nodeEnv];

const knex = Knex(knexConfig);

Model.knex(knex);

class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

module.exports = BaseModel;
