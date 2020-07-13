const jwt = require('jsonwebtoken');
const config = require('../config');
const responses = require('../helpers/responses');

/**
 * Generate Access Token
 * @param {Array} data
 */
function generateAccessToken(data, expiresIn = '7d') {
  const sub = {
    id: data.id,
    username: data.username,
    role: data.role,
  };

  return jwt.sign(sub, config.jwtSecret, { expiresIn });
}

/**
 * Check if access token is sent in request
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return responses.unauthorizedResponse(res, 'no access token provided');

  return jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return responses.unauthorizedResponse(res, err.message);
    }
    req.user = user;
    return next();
  });
}

function isSuperAdmin(req, res, next) {
  const {
    user,
  } = req;

  if (user.role !== 'SUPER_ADMIN') {
    return responses.forbiddenResponse(res, 'forbidenResponse');
  }
  return next();
}

module.exports = {
  generateAccessToken,
  isAuthenticated,
  isSuperAdmin,
};
