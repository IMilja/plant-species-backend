const { Router } = require('express');
const UsefulPart = require('../models/UsefulPart');
const apiResponses = require('../helpers/apiResponses');
const { usefulPartValidationRules, validate } = require('../helpers/validators');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await UsefulPart.query();

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.get('/:id([0-9]+)', async (req, res) => {
  try {
    const { id } = req.params;

    const data = await UsefulPart.query().findById(id);

    if (!data) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.post('/', usefulPartValidationRules(), validate, async (req, res) => {
  try {
    const {
      croatianName,
      latinName,
    } = req.body;

    const data = await UsefulPart.query().insertAndFetch({
      croatianName,
      latinName,
    });

    return apiResponses.successCreatedWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.patch('/:id([0-9]+)', usefulPartValidationRules(), validate, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      croatianName,
      latinName,
    } = req.body;

    const data = await UsefulPart.query().patchAndFetchById(id, {
      croatianName,
      latinName,
    });

    if (!data) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});


router.delete('/:id([0-9]+)', async (req, res) => {
  try {
    const { id } = req.params;

    const rowsDeleted = await UsefulPart.query().deleteById(id);

    if (!rowsDeleted > 0) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseDeleted(res);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

module.exports = router;
