const BaseModel = require('./BaseModel');

class Systematist extends BaseModel {
  static get tableName() {
    return 'systematist';
  }

  static get relationMappings() {
    return {
      plantSpecies: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'PlantSpecies',
        join: {
          from: 'systematist.id',
          to: 'plant_species.systematist_id',
        },
      },
    };
  }
}

module.exports = Systematist;
