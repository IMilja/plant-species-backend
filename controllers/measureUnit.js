const { Router } = require('express');
const MeasureUnit = require('../models/MeasureUnit');
const apiResponses = require('../helpers/apiResponses');
const { measureUnitValidationRules, validate } = require('../helpers/validators');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await MeasureUnit.query();

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.get('/:id([0-9]+)', async (req, res) => {
  try {
    const { id } = req.params;

    const data = await MeasureUnit.query().findById(id);

    if (!data) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.post('/', measureUnitValidationRules(), validate, async (req, res) => {
  try {
    const {
      name,
    } = req.body;

    const data = await MeasureUnit.query().insertAndFetch({
      name,
    });

    return apiResponses.successCreatedWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.patch('/:id([0-9]+)', measureUnitValidationRules(), validate, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
    } = req.body;

    const data = await MeasureUnit.query().patchAndFetchById(id, {
      name,
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

    const rowsDeleted = await MeasureUnit.query().deleteById(id);

    if (!rowsDeleted > 0) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseDeleted(res);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

module.exports = router;
