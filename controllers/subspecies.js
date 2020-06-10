const { Router } = require('express');
const Subspecies = require('../models/Subspecies');
const responses = require('../helpers/responses');
const { subspeciesValidationRules, validate } = require('../helpers/validators');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await Subspecies.query();

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id([0-9]+)', async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Subspecies.query().findById(id);

    if (!data) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.post('/', subspeciesValidationRules(), validate, async (req, res, next) => {
  try {
    const {
      name,
      plantSpeciesId,
    } = req.body;

    const data = await Subspecies.query().insertAndFetch({
      name,
      plantSpeciesId,
    });

    return responses.successCreated(res, data);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id([0-9]+)', subspeciesValidationRules(), validate, async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      name,
      plantSpeciesId,
    } = req.body;

    const data = await Subspecies.query().patchAndFetchById(id, {
      name,
      plantSpeciesId,
    });

    if (!data) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});


router.delete('/:id([0-9]+)', async (req, res, next) => {
  try {
    const { id } = req.params;

    const rowsDeleted = await Subspecies.query().deleteById(id);

    if (!rowsDeleted > 0) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successDeleted(res);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
