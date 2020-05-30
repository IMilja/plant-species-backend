const BaseModel = require('./BaseModel');

class BioactiveSubstance extends BaseModel {
  static get tableName() {
    return 'bioactive_substance';
  }

  static get relationMappings() {
    return {
      plantParts: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'PlantPart',
        join: {
          from: 'bioactive_substance.id',
          through: {
            from: 'plant_part_bioactive_substance.bioactive_substance_id',
            to: 'plant_part_bioactive_substance.plant_part_id',
            extra: [
              'content',
            ],
          },
          to: 'plant_part.id',
        },
      },
      measureUnit: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'MeasureUnit',
        join: {
          from: 'bioactive_substance.measure_unit_id',
          to: 'measure_unit.id',
        },
      },
    };
  }
}

module.exports = BioactiveSubstance;
