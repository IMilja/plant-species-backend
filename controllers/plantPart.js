const { Router } = require('express');
const PlantPart = require('../models/PlantPart');
const BioactiveSubstance = require('../models/BioactiveSubstance');
const apiResponses = require('../helpers/apiResponses');
const { imageValidationRules, validate } = require('../helpers/validators');
const { multer, uploadImageToStorage } = require('../lib/imageUploader');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const {
      usefulPartId,
      plantSpeciesId,
      description,
    } = req.body;

    const data = await PlantPart.query().insertAndFetch({
      usefulPartId,
      plantSpeciesId,
      description,
    })
      .withGraphFetched({
        usefulPart: true,
      });

    return apiResponses.successCreatedWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.patch('/:plantSpeciesId([0-9]+)/:usefulPartId([0-9]+)', async (req, res) => {
  try {
    const {
      plantSpeciesId,
      usefulPartId,
    } = req.params;

    const {
      description,
    } = req.body;

    const data = await PlantPart.query().patchAndFetchById([plantSpeciesId, usefulPartId], {
      description,
    });

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(req, error.message);
  }
});

router.delete('/:plantSpeciesId([0-9]+)/:usefulPartId([0-9]+)', async (req, res) => {
  try {
    const {
      plantSpeciesId,
      usefulPartId,
    } = req.params;


    const rowsDeleted = await PlantPart.query().deleteById([plantSpeciesId, usefulPartId]);

    if (!rowsDeleted > 0) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseDeleted(res);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.get('/:plantSpeciesId([0-9]+)/:usefulPartId([0-9]+)/images', async (req, res) => {
  try {
    const {
      plantSpeciesId,
      usefulPartId,
    } = req.params;

    const data = await PlantPart
      .relatedQuery('images')
      .for([plantSpeciesId, usefulPartId]);

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.post('/:plantSpeciesId([0-9]+)/:usefulPartId([0-9]+)/images', multer.single('image'), imageValidationRules(), validate, async (req, res) => {
  try {
    const {
      plantSpeciesId,
      usefulPartId,
    } = req.params;
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

    const data = await PlantPart
      .relatedQuery('images')
      .for([plantSpeciesId, usefulPartId])
      .insertAndFetch({
        name,
        description,
        source,
        uploadDate,
        imageUrl,
        fileName,
        customUpload,
      });

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.get('/:plantSpeciesId([0-9]+)/:usefulPartId([0-9]+)/bioactive-substances', async (req, res) => {
  try {
    const {
      plantSpeciesId,
      usefulPartId,
    } = req.params;

    const data = await PlantPart
      .relatedQuery('bioactiveSubstances')
      .for([plantSpeciesId, usefulPartId]);

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.post('/:plantSpeciesId([0-9]+)/:usefulPartId([0-9]+)/bioactive-substances', async (req, res) => {
  try {
    const {
      plantSpeciesId,
      usefulPartId,
    } = req.params;
    const {
      bioactiveSubstanceId,
      content,
    } = req.body;

    const rowsRelated = await PlantPart
      .relatedQuery('bioactiveSubstances')
      .for([plantSpeciesId, usefulPartId])
      .relate({
        id: bioactiveSubstanceId,
        content,
      });

    if (!rowsRelated > 0) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    const bioactiveSubstance = await BioactiveSubstance
      .query()
      .findById(bioactiveSubstanceId)
      .withGraphFetched({
        measureUnit: true,
      });

    const data = {
      bioactiveSubstanceId: bioactiveSubstance.id,
      name: bioactiveSubstance.name,
      measureUnitName: bioactiveSubstance.measureUnit.name,
      content,
    };

    return apiResponses.successCreatedWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.delete(
  '/:plantSpeciesId([0-9]+)/:usefulPartId([0-9]+)/bioactive-substances/:bioactiveSubstanceId([0-9]+)',
  async (req, res) => {
    try {
      const {
        plantSpeciesId,
        usefulPartId,
        bioactiveSubstanceId,
      } = req.params;

      const rowsDeleted = await PlantPart
        .relatedQuery('bioactiveSubstances')
        .for([plantSpeciesId, usefulPartId])
        .unrelate()
        .findById(bioactiveSubstanceId);

      if (!rowsDeleted > 0) {
        return apiResponses.notFoundResponse(res, 'Resource not found');
      }

      return apiResponses.successResponseDeleted(res);
    } catch (error) {
      return apiResponses.ErrorResponse(res, error.message);
    }
  },
);

module.exports = router;
