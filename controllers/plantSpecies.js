const { Router } = require('express');
const PlantSpecies = require('../models/PlantSpecies');
const apiResponses = require('../helpers/apiResponses');
const { plantSpeciesValidationRules, validate } = require('../helpers/validators');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await PlantSpecies.query().withGraphFetched({
      genus: {
        botanicalFamily: true,
      },
    });

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.get('/:id([0-9]+)', async (req, res) => {
  try {
    const { id } = req.params;

    const data = await PlantSpecies.query().findById(id).withGraphFetched({
      genus: {
        botanicalFamily: true,
      },
      systematist: true,
    });

    if (!data) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.post('/', plantSpeciesValidationRules(), validate, async (req, res) => {
  try {
    const {
      croatianName,
      latinName,
      description,
      synonym,
      genusId,
      systematistId,
    } = req.body;

    const data = await PlantSpecies.query().insertAndFetch({
      croatianName,
      latinName,
      description,
      synonym,
      genusId,
      systematistId,
    }).withGraphFetched({
      genus: {
        botanicalFamily: true,
      },
    });

    return apiResponses.successCreatedWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.patch('/:id([0-9]+)', plantSpeciesValidationRules(), validate, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      croatianName,
      latinName,
      description,
      synonym,
      genusId,
      systematistId,
    } = req.body;

    const data = await PlantSpecies.query().patchAndFetchById(id, {
      croatianName,
      latinName,
      description,
      synonym,
      genusId,
      systematistId,
    }).withGraphFetched({
      genus: {
        botanicalFamily: true,
      },
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

    const rowsDeleted = await PlantSpecies.query().deleteById(id);

    if (!rowsDeleted > 0) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseDeleted(res);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.get('/:id([0-9]+)/images', async (req, res) => {
  try {
    const { id } = req.params;

    const data = await PlantSpecies
      .relatedQuery('images')
      .for(id);

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.get('/:id([0-9]+)/subspecies', async (req, res) => {
  try {
    const { id } = req.params;

    const data = await PlantSpecies
      .relatedQuery('subspecies')
      .for(id);

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.get('/:id([0-9]+)/useful-parts', async (req, res) => {
  try {
    const { id } = req.params;

    const data = await PlantSpecies
      .relatedQuery('usefulParts')
      .for(id);

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

module.exports = router;
