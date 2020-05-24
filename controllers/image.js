const { Router } = require('express');
const Image = require('../models/Image');
const apiResponses = require('../helpers/apiResponses');
const { deleteImageFromStorage } = require('../lib/imageUploader');

const router = Router();

router.delete('/:id([0-9]+)', async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image
      .query()
      .select('file_name AS fileName')
      .findOne({
        id,
        custom_upload: 1,
      });

    const rowsDeleted = await Image.query().deleteById(id);

    if (!rowsDeleted) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    if (image) {
      deleteImageFromStorage(image.fileName);
    }

    return apiResponses.successResponseDeleted(res);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

router.patch('/:id([0-9]+)', async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      source,
      uploadDate,
    } = req.body;

    const data = await Image.query().patchAndFetchById(id, {
      name,
      description,
      source,
      uploadDate,
    });

    if (!data) {
      return apiResponses.notFoundResponse(res, 'Resource not found');
    }

    return apiResponses.successResponseWithData(res, data);
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

module.exports = router;
