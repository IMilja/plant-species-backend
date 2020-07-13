const { Router } = require('express');
const Image = require('../models/Image');
const responses = require('../helpers/responses');
const { deleteImageFromStorage } = require('../lib/imageUploader');
const {
  isAuthenticated,
} = require('../lib/jwtTokens');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const {
      plantSpeciesId,
    } = req.query;

    const data = await Image
      .query()
      .alias('img')
      .joinRelated('plantParts.usefulPart', { alias: 'pp' })
      .skipUndefined()
      .where('pp.plant_species_id', plantSpeciesId)
      .select(
        'img.id',
        'img.name',
        'img.description',
        'img.source',
        'img.upload_date',
        'img.image_url',
        'croatian_name',
        'latin_name',
      );

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id(\\d+)', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;

    const image = await Image
      .query()
      .select('file_name AS fileName')
      .findOne({
        id,
        custom_upload: 1,
      });

    const rowsDeleted = await Image.query().deleteById(id);

    if (!rowsDeleted) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    if (image) {
      deleteImageFromStorage(image.fileName);
    }

    return responses.successDeleted(res);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id(\\d+)', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      source,
      uploadDate,
    } = req.body;

    const data = await Image.query().patchAndFetchById(id, {
      name,
      description,
      source,
      uploadDate,
    });

    if (!data) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
