const router = require('express').Router();

const routesAPI = require('./api');

router.use('/api', routesAPI);

router.use(req, res) => {
    res.status(404).send('404Error');
};

module.exports = router;