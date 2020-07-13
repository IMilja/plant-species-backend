const { Router } = require('express');
const Role = require('../models/Role');
const responses = require('../helpers/responses');
const {
  isAuthenticated,
} = require('../lib/jwtTokens');

const router = Router();

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const data = await Role
      .query();

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
