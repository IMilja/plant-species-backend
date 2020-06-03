const BaseModel = require('./BaseModel');

class PlantPart extends BaseModel {
  static get idColumn() {
    return ['plant_species_id', 'useful_part_id'];
  }

  static get tableName() {
    return 'plant_part';
  }

  static get relationMappings() {
    return {
      usefulPart: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'UsefulPart',
        join: {
          from: 'plant_part.useful_part_id',
          to: 'useful_part.id',
        },
      },
      plantSpecies: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'PlantSpecies',
        join: {
          from: 'plant_part.plant_species_id',
          to: 'plant_species.id',
        },
      },
      bioactiveSubstances: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'BioactiveSubstance',
        join: {
          from: [
            'plant_part.plant_species_id',
            'plant_part.useful_part_id',
          ],
          through: {
            from: [
              'plant_part_bioactive_substance.plant_species_id',
              'plant_part_bioactive_substance.useful_part_id',
            ],
            to: 'plant_part_bioactive_substance.bioactive_substance_id',
            extra: [
              'content',
            ],
          },
          to: 'bioactive_substance.id',
        },
      },
      images: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'Image',
        join: {
          from: [
            'plant_part.plant_species_id',
            'plant_part.useful_part_id',
          ],
          through: {
            from: [
              'plant_part_image.plant_species_id',
              'plant_part_image.useful_part_id',
            ],
            to: 'plant_part_image.image_id',
          },
          to: 'image.id',
        },
      },
    };
  }
}

module.exports = PlantPart;
