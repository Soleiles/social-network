const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// IF wrong route
router.use((req, res) => res.send('Wrong route'));

module.exports = router;