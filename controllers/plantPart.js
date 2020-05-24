const { Router } = require('express');
const PlantPart = require('../models/PlantPart');
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
    });

    return apiResponses.successCreatedWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.patch('/:id([0-9]+)', async (req, res) => {
  try {
    const { id } = req.params;

    const {
      description,
    } = req.body;

    const data = await PlantPart.query().patchAndFetchById(id, {
      description,
    });

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(req, error.message);
  }
});

router.delete('/:id([0-9]+)', async (req, res) => {
  try {
    const { id } = req.params;

    const rowsDeleted = await PlantPart.query().deleteById(id);

    if (!rowsDeleted > 0) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseDeleted(res);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.get('/:id([0-9]+)/images', async (req, res) => {
  try {
    const { id } = req.params;

    const data = await PlantPart
      .relatedQuery('images')
      .for(id);

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.post('/:id([0-9]+)/images', multer.single('image'), imageValidationRules(), validate, async (req, res) => {
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

    const data = await PlantPart
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

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.get('/:id([0-9]+)/bioactive-substances', async (req, res) => {
  try {
    const { id } = req.params;

    const data = await PlantPart
      .relatedQuery('bioactiveSubstances')
      .for(id);

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

module.exports = router;
