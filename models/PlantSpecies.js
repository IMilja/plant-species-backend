const BaseModel = require('./BaseModel');

class PlantSpecies extends BaseModel {
  static get tableName() {
    return 'plant_species';
  }

  static get relationMappings() {
    return {
      subspecies: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'Subspecies',
        join: {
          from: 'plant_species.id',
          to: 'subspecies.plantspecies_id',
        },
      },
      systematist: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Systematist',
        join: {
          from: 'plant_species.systematist_id',
          to: 'systematist.id',
        },
      },
      genus: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Genus',
        join: {
          from: 'plant_species.genus_id',
          to: 'genus.id',
        },
      },
      usefulParts: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'UsefulPart',
        join: {
          from: 'plant_species.id',
          through: {
            from: 'plant_part.plantspecies_id',
            to: 'plant_part.usefulpart_id',
            modelClass: 'PlantPart',
            extra: ['description'],
          },
          to: 'useful_part.id',
        },
      },
      plantParts: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'PlantPart',
        join: {
          from: 'plant_species.id',
          to: 'plant_part.plantspecies_id',
        },
      },
      images: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'Image',
        join: {
          from: 'plant_species.id',
          through: {
            from: 'plant_species_image.plantspecies_id',
            to: 'plant_species_image.image_id',
          },
          to: 'image.id',
        },
      },
    };
  }
}

module.exports = PlantSpecies;
