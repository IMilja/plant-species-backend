const { Router } = require('express');
const apiRoutes = require('./api');

const router = Router();

router.use('/api', apiRoutes);

module.exports = router;
