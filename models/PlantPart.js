const BaseModel = require('./BaseModel');

class PlantspeciesUsefulpart extends BaseModel {
  static get tableName() {
    return 'plant_part';
  }

  static get relationMappings() {
    return {
      usefulPart: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'UsefulPart',
        join: {
          from: 'plant_part.usefulpart_id',
          to: 'useful_part.id',
        },
      },
      plantSpecies: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'PlantSpecies',
        join: {
          from: 'plant_part.plantspecies_id',
          to: 'plant_species.id',
        },
      },
      bioactiveSubstances: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'BioactiveSubstance',
        join: {
          from: 'plant_part.id',
          to: 'bioactive_substance.plant_part_id',
        },
      },
      images: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'Image',
        join: {
          from: [
            'plant_part.id',
          ],
          through: {
            from: 'plant_part_image.plant_part_id',
            to: 'plant_part_image.image_id',
          },
          to: [
            'image.id',
          ],
        },
      },
    };
  }
}

module.exports = PlantspeciesUsefulpart;
