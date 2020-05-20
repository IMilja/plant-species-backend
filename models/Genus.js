const BaseModel = require('./BaseModel');

class Genus extends BaseModel {
  static get tableName() {
    return 'genus';
  }

  static get relationMappings() {
    return {
      botanicalFamily: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'BotanicalFamily',
        join: {
          from: 'genus.botanical_family_id',
          to: 'botanical_family.id',
        },
      },
      plantSpecies: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'PlantSpecies',
        join: {
          from: 'genus.id',
          to: 'plant_species.genus_id',
        },
      },
    };
  }
}

module.exports = Genus;
