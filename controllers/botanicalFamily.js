const { Router } = require('express');
const BotanicalFamily = require('../models/BotanicalFamily');
const apiResponses = require('../helpers/apiResponses');
const { botanicalFamilyValidationRules, validate } = require('../helpers/validators');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await BotanicalFamily.query();

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.get('/:id([0-9]+)', async (req, res) => {
  try {
    const { id } = req.params;

    const data = await BotanicalFamily.query().findById(id);

    if (!data) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.post('/', botanicalFamilyValidationRules(), validate, async (req, res) => {
  try {
    const {
      croatianName,
      latinName,
    } = req.body;

    const data = await BotanicalFamily.query().insertAndFetch({
      croatianName,
      latinName,
    });

    return apiResponses.successCreatedWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.patch('/:id([0-9]+)', botanicalFamilyValidationRules(), validate, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      croatianName,
      latinName,
    } = req.body;

    const data = await BotanicalFamily.query().patchAndFetchById(id, {
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

    const rowsDeleted = await BotanicalFamily.query().deleteById(id);

    if (!rowsDeleted > 0) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseDeleted(res);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

module.exports = router;
