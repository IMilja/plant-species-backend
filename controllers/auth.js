const { Router } = require('express');
const User = require('../models/User');
const apiResponses = require('../helpers/apiResponses');
const { generateAccessToken } = require('../lib/jwtTokens');

const router = Router();

router.post('/login', async (req, res) => {
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
      return apiResponses.notFoundResponse(res, 'Netočno korisničko ime ili lozinka');
    }

    const validPassword = await user.verifyPassword(password);

    if (!validPassword) {
      return apiResponses.notFoundResponse(res, 'Netočno korisničko ime ili lozinka');
    }

    const accessToken = generateAccessToken({
      id: user.id,
      username: user.userName,
      role: user.role.name,
    });

    return res.status(200).json({
      status: 'success',
      accessToken,
    });
  } catch (error) {
    return apiResponses.ErrorResponse(res, error.message);
  }
});

module.exports = router;
