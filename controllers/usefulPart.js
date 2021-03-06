const { Router } = require('express');
const UsefulPart = require('../models/UsefulPart');
const responses = require('../helpers/responses');
const { usefulPartValidationRules, validate } = require('../helpers/validators');
const {
  isAuthenticated,
} = require('../lib/jwtTokens');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await UsefulPart.query();

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id(\\d+)', async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await UsefulPart.query().findById(id);

    if (!data) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.post('/', isAuthenticated, usefulPartValidationRules(), validate, async (req, res, next) => {
  try {
    const {
      croatianName,
      latinName,
    } = req.body;

    const data = await UsefulPart.query().insertAndFetch({
      croatianName,
      latinName,
    });

    return responses.successCreated(res, data);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id(\\d+)', isAuthenticated, usefulPartValidationRules(), validate, async (req, res, next) => {
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
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});


router.delete('/:id(\\d+)', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;

    const rowsDeleted = await UsefulPart.query().deleteById(id);

    if (!rowsDeleted > 0) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successDeleted(res);
  } catch (error) {
    return next(error);
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query;

    const data = await UsefulPart
      .query()
      .where('croatian_name', 'like', `${q}%`)
      .orWhere('latin_name', 'like', `${q}%`);

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
