const { Router } = require('express');
const PlantPart = require('../models/PlantPart');
const BioactiveSubstance = require('../models/BioactiveSubstance');
const UsefulPart = require('../models/UsefulPart');
const responses = require('../helpers/responses');
const {
  usefulPartImageValidationRules,
  plantPartBioactiveSubstanceRules,
  usefulPartAssigmentRules,
  validate,
} = require('../helpers/validators');
const { multer, uploadImageToStorage } = require('../lib/imageUploader');
const {
  isAuthenticated,
} = require('../lib/jwtTokens');

const router = Router();

router.post('/', isAuthenticated, usefulPartAssigmentRules(), validate, async (req, res, next) => {
  try {
    const {
      usefulPartId,
      plantSpeciesId,
      description,
    } = req.body;

    const data = await PlantPart
      .query()
      .insertAndFetch({
        usefulPartId,
        plantSpeciesId,
        description,
      })
      .withGraphFetched({
        usefulPart: true,
      });

    return responses.successCreated(res, data);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:plantSpeciesId/:usefulPartId', isAuthenticated, async (req, res, next) => {
  try {
    const {
      plantSpeciesId,
      usefulPartId,
    } = req.params;

    const {
      description,
    } = req.body;

    const data = await PlantPart
      .query()
      .patchAndFetchById([plantSpeciesId, usefulPartId], {
        description,
      });

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:plantSpeciesId/:usefulPartId', isAuthenticated, async (req, res, next) => {
  try {
    const {
      plantSpeciesId,
      usefulPartId,
    } = req.params;


    const rowsDeleted = await PlantPart
      .query()
      .deleteById([plantSpeciesId, usefulPartId]);

    if (!rowsDeleted > 0) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successDeleted(res);
  } catch (error) {
    return next(error);
  }
});

router.get('/:plantSpeciesId/:usefulPartId/images', async (req, res, next) => {
  try {
    const {
      plantSpeciesId,
      usefulPartId,
    } = req.params;

    const data = await PlantPart
      .relatedQuery('images')
      .for([plantSpeciesId, usefulPartId]);

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.post('/:plantSpeciesId/:usefulPartId/images', isAuthenticated, multer.single('image'), usefulPartImageValidationRules(), validate, async (req, res, next) => {
  try {
    const {
      plantSpeciesId,
      usefulPartId,
    } = req.params;
    const { file } = req;
    const {
      name,
      description,
      source,
      uploadDate,
    } = req.body;


    let imageUrl;
    let fileName;
    let customUpload;

    if (file) {
      const fileInfo = await uploadImageToStorage(file);

      imageUrl = fileInfo.publicUrl;
      fileName = fileInfo.fileName;
      customUpload = true;
    } else {
      imageUrl = req.body.imageUrl;
    }

    const data = await PlantPart
      .relatedQuery('images')
      .for([plantSpeciesId, usefulPartId])
      .insertAndFetch({
        name,
        description,
        source,
        uploadDate,
        imageUrl,
        fileName,
        customUpload,
      });

    const usefulPart = await UsefulPart
      .query()
      .select(
        'croatian_name',
        'latin_name',
      )
      .findById(usefulPartId);

    const dataSet = {
      ...data,
      ...usefulPart,
    };

    return responses.successResponse(res, dataSet);
  } catch (error) {
    return next(error);
  }
});

router.get('/:plantSpeciesId/:usefulPartId/bioactive-substances', async (req, res, next) => {
  try {
    const {
      plantSpeciesId,
      usefulPartId,
    } = req.params;

    const data = await PlantPart
      .relatedQuery('bioactiveSubstances')
      .for([plantSpeciesId, usefulPartId]);

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.post('/:plantSpeciesId/:usefulPartId/bioactive-substances',
  isAuthenticated,
  plantPartBioactiveSubstanceRules(),
  validate,
  async (req, res, next) => {
    try {
      const {
        plantSpeciesId,
        usefulPartId,
      } = req.params;
      const {
        bioactiveSubstanceId,
        content,
      } = req.body;

      const rowsRelated = await PlantPart
        .relatedQuery('bioactiveSubstances')
        .for([plantSpeciesId, usefulPartId])
        .relate({
          id: bioactiveSubstanceId,
          content,
        });

      if (!rowsRelated > 0) {
        return responses.notFoundResponse(res, 'resource not found');
      }

      const bioactiveSubstance = await BioactiveSubstance
        .query()
        .findById(bioactiveSubstanceId)
        .withGraphFetched({
          measureUnit: true,
        });

      const data = {
        bioactiveSubstanceId: bioactiveSubstance.id,
        name: bioactiveSubstance.name,
        measureUnitName: bioactiveSubstance.measureUnit.name,
        content,
      };

      return responses.successCreated(res, data);
    } catch (error) {
      return next(error);
    }
  });

router.delete(
  '/:plantSpeciesId/:usefulPartId/bioactive-substances/:bioactiveSubstanceId',
  isAuthenticated,
  async (req, res, next) => {
    try {
      const {
        plantSpeciesId,
        usefulPartId,
        bioactiveSubstanceId,
      } = req.params;

      const rowsDeleted = await PlantPart
        .relatedQuery('bioactiveSubstances')
        .for([plantSpeciesId, usefulPartId])
        .unrelate()
        .findById(bioactiveSubstanceId);

      if (!rowsDeleted > 0) {
        return responses.notFoundResponse(res, 'resource not found');
      }

      return responses.successDeleted(res);
    } catch (error) {
      return next(error);
    }
  },
);

module.exports = router;
