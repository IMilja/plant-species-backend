const BaseModel = require('./BaseModel');

class Subspecies extends BaseModel {
  static get tableName() {
    return 'subspecies';
  }

  static get relationMappings() {
    return {
      plantSpecies: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'PlantSpecies',
        join: {
          from: 'subspecies.plantspecies_id',
          to: 'plant_species.id',
        },
      },
    };
  }
}

module.exports = Subspecies;
