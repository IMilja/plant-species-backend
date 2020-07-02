const { Router } = require('express');
const Genus = require('../models/Genus');
const responses = require('../helpers/responses');
const { genusValidationRules, validate } = require('../helpers/validators');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await Genus
      .query()
      .withGraphFetched({
        botanicalFamily: true,
      });

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id(\\d+)', async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Genus
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

router.post('/', genusValidationRules(), validate, async (req, res, next) => {
  try {
    const {
      name,
      botanicalFamilyId,
    } = req.body;

    const data = await Genus
      .query()
      .insertAndFetch({
        name,
        botanicalFamilyId,
      })
      .withGraphFetched({
        botanicalFamily: true,
      });

    return responses.successCreated(res, data);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id(\\d+)', genusValidationRules(), validate, async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      name,
      botanicalFamilyId,
    } = req.body;

    const data = await Genus
      .query()
      .patchAndFetchById(id, {
        name,
        botanicalFamilyId,
      })
      .withGraphFetched({
        botanicalFamily: true,
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

    const rowsDeleted = await Genus
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

module.exports = router;
