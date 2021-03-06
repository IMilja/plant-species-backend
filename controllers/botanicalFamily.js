const { Router } = require('express');
const BotanicalFamily = require('../models/BotanicalFamily');
const responses = require('../helpers/responses');
const { botanicalFamilyValidationRules, validate } = require('../helpers/validators');
const {
  isAuthenticated,
} = require('../lib/jwtTokens');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await BotanicalFamily
      .query();

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id(\\d+)', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await BotanicalFamily
      .query()
      .findById(id);

    if (!data) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.post('/', isAuthenticated, botanicalFamilyValidationRules(), validate, async (req, res, next) => {
  try {
    const {
      croatianName,
      latinName,
    } = req.body;

    const data = await BotanicalFamily
      .query()
      .insertAndFetch({
        croatianName,
        latinName,
      });

    return responses.successCreated(res, data);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id(\\d+)', isAuthenticated, botanicalFamilyValidationRules(), validate, async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      croatianName,
      latinName,
    } = req.body;

    const data = await BotanicalFamily
      .query()
      .patchAndFetchById(id, {
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

    const rowsDeleted = await BotanicalFamily
      .query()
      .deleteById(id);

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

    const data = await BotanicalFamily
      .query()
      .where('croatian_name', 'like', `${q}%`)
      .orWhere('latin_name', 'like', `${q}%`);

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
