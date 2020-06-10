const { Router } = require('express');
const User = require('../models/User');
const responses = require('../helpers/responses');
const { generateAccessToken } = require('../lib/jwtTokens');

const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await User.query().first().where({
      email,
    }).withGraphFetched({
      role: true,
    });

    if (!user) {
      return responses.unauthorizedResponse(res, 'Netočno korisničko ime ili lozinka');
    }

    const validPassword = await user.verifyPassword(password);

    if (!validPassword) {
      return responses.unauthorizedResponse(res, 'Netočno korisničko ime ili lozinka');
    }

    const accessToken = generateAccessToken({
      id: user.id,
      username: user.userName,
      role: user.role.name,
    });

    return responses.successResponse(res, accessToken);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
