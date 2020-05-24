const { Router } = require('express');
const PlantPart = require('../models/PlantPart');
const apiResponses = require('../helpers/apiResponses');

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

module.exports = router;
