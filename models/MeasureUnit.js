const BaseModel = require('./BaseModel');

class MeasureUnit extends BaseModel {
  static get tableName() {
    return 'measure_unit';
  }

  static get relationMappings() {
    return {
      bioactiveSubstances: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'BioactiveSubstances',
        join: {
          from: 'measure_unit.id',
          to: 'bioactive_substance.measure_unit_id',
        },
      },
    };
  }
}

module.exports = MeasureUnit;
