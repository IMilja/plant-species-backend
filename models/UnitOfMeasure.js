const BaseModel = require('./BaseModel');

class UnitOfMeasure extends BaseModel {
  static get tableName() {
    return 'unit_of_measure';
  }

  static get relationMappings() {
    return {
      bioactiveSubstances: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'BioactiveSubstances',
        join: {
          from: 'unit_of_measure.id',
          to: 'bioactive_substance.unit_of_measure_id',
        },
      },
    };
  }
}

module.exports = UnitOfMeasure;
