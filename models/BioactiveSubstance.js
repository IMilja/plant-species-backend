const BaseModel = require('./BaseModel');

class BioactiveSubstance extends BaseModel {
  static get tableName() {
    return 'bioactive_substance';
  }

  static get relationMappings() {
    return {
      plantPart: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'PlantPart',
        join: {
          from: [
            'bioactive_substance.plant_part_id',
          ],
          to: [
            'plant_part.id',
          ],
        },
      },
    };
  }
}

module.exports = BioactiveSubstance;
