const { Router } = require('express');
const BioactiveSubstance = require('../models/BioactiveSubstance');
const responses = require('../helpers/responses');
const { bioactiveSubstanceValidationRules, validate } = require('../helpers/validators');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await BioactiveSubstance
      .query()
      .withGraphFetched({
        measureUnit: true,
      });

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id(\\d+)', async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await BioactiveSubstance.query().findById(id);

    if (!data) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.post('/', bioactiveSubstanceValidationRules(), validate, async (req, res, next) => {
  try {
    const {
      name,
      measureUnitId,
    } = req.body;

    const data = await BioactiveSubstance
      .query()
      .insertAndFetch({
        name,
        measureUnitId,
      })
      .withGraphFetched({
        measureUnit: true,
      });

    return responses.successCreated(res, data);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id(\\d+)', bioactiveSubstanceValidationRules(), validate, async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      name,
      measureUnitId,
    } = req.body;

    const data = await BioactiveSubstance
      .query()
      .patchAndFetchById(id, {
        name,
        measureUnitId,
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

    const rowsDeleted = await BioactiveSubstance
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

    const data = await BioactiveSubstance
      .query()
      .where('name', 'like', `${q}%`);

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
