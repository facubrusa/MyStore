const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
    const apiKey = req.headers['api'];
    // Validate if value matches with the secret api key
    if (apiKey !== config.apiKey) {
        return next(boom.unauthorized('Unauthorized'));
    }
    next();
}

module.exports = { checkApiKey };
