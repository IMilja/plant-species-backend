const BaseModel = require('./BaseModel');

class Image extends BaseModel {
  static get tableName() {
    return 'image';
  }

  static get relationMappings() {
    return {
      plantParts: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'PlantPart',
        join: {
          from: 'image.id',
          through: {
            from: 'plant_part_image.image_id',
            to: [
              'plant_part_image.plant_species_id',
              'plant_part_image.useful_part_id',
            ],
          },
          to: [
            'plant_part.plant_species_id',
            'plant_part.useful_part_id',
          ],
        },
      },
      plantSpecies: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'PlantSpecies',
        join: {
          from: 'image.id',
          through: {
            from: 'plant_species_image.image_id',
            to: 'plant_species_image.plant_species_id',
          },
          to: 'plant_part.id',
        },
      },
    };
  }
}

module.exports = Image;
