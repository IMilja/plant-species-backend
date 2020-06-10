const { Router } = require('express');
const responses = require('../helpers/responses');
const authController = require('../controllers/auth');

const router = Router();

router.use('/', authController);

router.use('*', (req, res) => responses.notFoundResponse(res, 'route not found'));

module.exports = router;
