const BaseModel = require('./BaseModel');

class UsefulPart extends BaseModel {
  static get tableName() {
    return 'useful_part';
  }

  static get relationMappings() {
    return {
      plantSpecies: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'PlantSpecies',
        join: {
          from: 'useful_part.id',
          through: {
            from: 'plant_part.useful_part_id',
            to: 'plant_part.plant_species_id',
            modelClass: 'PlantPart',
          },
          to: 'plant_species.id',
        },
      },
    };
  }
}

module.exports = UsefulPart;
