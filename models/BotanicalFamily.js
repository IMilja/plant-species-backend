const BaseModel = require('./BaseModel');

class BotanicalFamily extends BaseModel {
  static get tableName() {
    return 'botanical_family';
  }

  static get relationMappings() {
    return {
      genera: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'Genus',
        join: {
          from: 'botanical_family.id',
          to: 'genus.botanical_family_id',
        },
      },
    };
  }
}

module.exports = BotanicalFamily;
