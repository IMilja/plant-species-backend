const { Router } = require('express');
const Systematist = require('../models/Systematist');
const responses = require('../helpers/responses');
const { systematistValidationRules, validate } = require('../helpers/validators');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await Systematist.query();

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id([0-9]+)', async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Systematist.query().findById(id);

    if (!data) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.post('/', systematistValidationRules(), validate, async (req, res, next) => {
  try {
    const {
      name,
    } = req.body;

    const data = await Systematist.query().insertAndFetch({
      name,
    });

    return responses.successCreated(res, data);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id([0-9]+)', systematistValidationRules(), validate, async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      name,
    } = req.body;

    const data = await Systematist.query().patchAndFetchById(id, {
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


router.delete('/:id([0-9]+)', async (req, res, next) => {
  try {
    const { id } = req.params;

    const rowsDeleted = await Systematist.query().deleteById(id);

    if (!rowsDeleted > 0) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successDeleted(res);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
