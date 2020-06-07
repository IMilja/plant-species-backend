const { Router } = require('express');
const Genus = require('../models/Genus');
const apiResponses = require('../helpers/apiResponses');
const { genusValidationRules, validate } = require('../helpers/validators');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await Genus.query()
      .withGraphFetched({
        botanicalFamily: true,
      });

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.get('/:id([0-9]+)', async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Genus.query().findById(id);

    if (!data) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.post('/', genusValidationRules(), validate, async (req, res) => {
  try {
    const {
      name,
      botanicalFamilyId,
    } = req.body;

    const data = await Genus.query().insertAndFetch({
      name,
      botanicalFamilyId,
    })
      .withGraphFetched({
        botanicalFamily: true,
      });

    return apiResponses.successCreatedWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.patch('/:id([0-9]+)', genusValidationRules(), validate, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      botanicalFamilyId,
    } = req.body;

    const data = await Genus.query().patchAndFetchById(id, {
      name,
      botanicalFamilyId,
    })
      .withGraphFetched({
        botanicalFamily: true,
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

    const rowsDeleted = await Genus.query().deleteById(id);

    if (!rowsDeleted > 0) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseDeleted(res);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

module.exports = router;
