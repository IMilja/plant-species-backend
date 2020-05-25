const { Router } = require('express');
const authController = require('../controllers/auth');

const router = Router();

router.use('/', authController);

module.exports = router;
