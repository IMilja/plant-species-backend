const { Router } = require('express');
const BioactiveSubstance = require('../models/BioactiveSubstance');
const apiResponses = require('../helpers/apiResponses');
const { bioactiveSubstanceRules, validate } = require('../helpers/validators');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await BioactiveSubstance.query();

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.get('/:id([0-9]+)', async (req, res) => {
  try {
    const { id } = req.params;

    const data = await BioactiveSubstance.query().findById(id);

    if (!data) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.post('/', bioactiveSubstanceRules(), validate, async (req, res) => {
  try {
    const {
      name,
      content,
      plantPartId,
      measureUnitId,
    } = req.body;

    const data = await BioactiveSubstance.query().insertAndFetch({
      name,
      content,
      plantPartId,
      measureUnitId,
    });

    return apiResponses.successCreatedWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.patch('/:id([0-9]+)', bioactiveSubstanceRules(), validate, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      content,
      measureUnitId,
    } = req.body;

    const data = await BioactiveSubstance.query().patchAndFetchById(id, {
      name,
      content,
      measureUnitId,
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

    const rowsDeleted = await BioactiveSubstance.query().deleteById(id);

    if (!rowsDeleted > 0) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseDeleted(res);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

module.exports = router;
