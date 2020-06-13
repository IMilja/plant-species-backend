const { Router } = require('express');
const MeasureUnit = require('../models/MeasureUnit');
const responses = require('../helpers/responses');
const { measureUnitValidationRules, validate } = require('../helpers/validators');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await MeasureUnit.query();

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id(\\d+)', async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await MeasureUnit.query().findById(id);

    if (!data) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.post('/', measureUnitValidationRules(), validate, async (req, res, next) => {
  try {
    const {
      name,
    } = req.body;

    const data = await MeasureUnit.query().insertAndFetch({
      name,
    });

    return responses.successCreated(res, data);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id(\\d+)', measureUnitValidationRules(), validate, async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      name,
    } = req.body;

    const data = await MeasureUnit.query().patchAndFetchById(id, {
      name,
    });

    if (!data) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});


router.delete('/:id(\\d+)', async (req, res, next) => {
  try {
    const { id } = req.params;

    const rowsDeleted = await MeasureUnit.query().deleteById(id);

    if (!rowsDeleted > 0) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successDeleted(res);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
