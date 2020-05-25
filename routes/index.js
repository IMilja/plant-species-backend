const { Router } = require('express');
const apiRoutes = require('./api');
const authRoutes = require('./auth');

const router = Router();

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

module.exports = router;
