/* eslint-disable func-names */
const { Router } = require('express');
const PlantSpecies = require('../models/PlantSpecies');
const responses = require('../helpers/responses');
const {
  plantSpeciesValidationRules,
  plantSpeiesImageValidationRules,
  validate,
} = require('../helpers/validators');
const { multer, uploadImageToStorage } = require('../lib/imageUploader');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await PlantSpecies.query().withGraphFetched({
      genus: {
        botanicalFamily: true,
      },
    });

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id(\\d+)', async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await PlantSpecies.query().findById(id).withGraphFetched({
      genus: {
        botanicalFamily: true,
      },
      systematist: true,
    });

    if (!data) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.post('/', plantSpeciesValidationRules(), validate, async (req, res, next) => {
  try {
    const {
      croatianName,
      latinName,
      description,
      synonym,
      genusId,
      systematistId,
    } = req.body;

    const data = await PlantSpecies.query().insertAndFetch({
      croatianName,
      latinName,
      description,
      synonym,
      genusId,
      systematistId,
    }).withGraphFetched({
      genus: {
        botanicalFamily: true,
      },
    });

    return responses.successCreated(res, data);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id(\\d+)', plantSpeciesValidationRules(), validate, async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      croatianName,
      latinName,
      description,
      synonym,
      genusId,
      systematistId,
    } = req.body;

    const data = await PlantSpecies.query().patchAndFetchById(id, {
      croatianName,
      latinName,
      description,
      synonym,
      genusId,
      systematistId,
    }).withGraphFetched({
      genus: {
        botanicalFamily: true,
      },
    });

    if (!data) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});


router.delete('/:id(\\d+)', async (req, res, next) => {
  try {
    const { id } = req.params;

    const rowsDeleted = await PlantSpecies.query().deleteById(id);

    if (!rowsDeleted > 0) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successDeleted(res);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id(\\d+)/images', async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await PlantSpecies
      .relatedQuery('images')
      .for(id);

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.post('/:id(\\d+)/images', multer.single('image'), plantSpeiesImageValidationRules(), validate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { file } = req;
    const {
      name,
      description,
      source,
      uploadDate,
    } = req.body;


    let imageUrl;
    let fileName;
    let customUpload;

    if (file) {
      const fileInfo = await uploadImageToStorage(file);

      imageUrl = fileInfo.publicUrl;
      fileName = fileInfo.fileName;
      customUpload = true;
    } else {
      imageUrl = req.body.imageUrl;
    }

    const data = await PlantSpecies
      .relatedQuery('images')
      .for(id)
      .insertAndFetch({
        name,
        description,
        source,
        uploadDate,
        imageUrl,
        fileName,
        customUpload,
      });

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id(\\d+)/subspecies', async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await PlantSpecies
      .relatedQuery('subspecies')
      .for(id);

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id(\\d+)/useful-parts', async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await PlantSpecies
      .relatedQuery('usefulParts')
      .for(id);

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id(\\d+)/useful-parts/:usefulPartId', async (req, res, next) => {
  try {
    const {
      id,
      usefulPartId,
    } = req.params;

    const rowsDeleted = await PlantSpecies
      .relatedQuery('usefulParts')
      .for(id)
      .unrelate()
      .findById(usefulPartId);

    if (!rowsDeleted > 0) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successDeleted(res);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id(\\d+)/bioactive-substances', async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await PlantSpecies
      .query()
      .alias('ps')
      .select(
        'bs.id AS bioactiveSubstanceId',
        'bs.name',
        'mu.name AS measureUnitName',
        'ppbs.content',
        'up.id AS usefulPartId',
        'up.croatian_name as usefulPartCroatianName',
        'up.latin_name as usefulPartLatinName',
      )
      .join('plant_part as pp', 'id', 'pp.plant_species_id')
      .leftJoin('useful_part as up', 'pp.useful_part_id', 'up.id')
      .leftJoin('plant_part_bioactive_substance AS ppbs', function () {
        this.on('pp.plant_species_id', '=', 'ppbs.plant_species_id').andOn('pp.useful_part_id', '=', 'ppbs.useful_part_id');
      })
      .leftJoin('bioactive_substance as bs', 'ppbs.bioactive_substance_id', 'bs.id')
      .join('measure_unit AS mu', 'bs.measure_unit_id', 'mu.id')
      .where('ps.id', id);

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const {
      plantSpecies,
      bioactiveSubstances,
      botanicalFamilies,
      usefulParts,
    } = req.query;

    const data = await PlantSpecies
      .query()
      .alias('ps')
      .skipUndefined()
      .leftJoinRelated('genus.botanicalFamily', { alias: 'bf' })
      .leftJoinRelated('plantParts.bioactiveSubstances', { alias: 'bs' })
      .leftJoinRelated('usefulParts', { alias: 'up' })
      .where('ps.croatian_name', 'like', plantSpecies ? `${plantSpecies}%` : undefined)
      .orWhere('ps.latin_name', 'like', plantSpecies ? `${plantSpecies}%` : undefined)
      .whereIn('bf.id', botanicalFamilies)
      .whereIn('bs.id', bioactiveSubstances)
      .whereIn('up.id', usefulParts)
      .withGraphFetched({
        genus: {
          botanicalFamily: true,
        },
      })
      .groupBy('ps.id');

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
