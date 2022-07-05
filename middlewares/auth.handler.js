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

function checkRoles(...roles){
    roles.push('admin');
    return (req, res, next) => {
        const user = req.user;
        if(roles.includes(user.role)){
            next()
        } else {
            next(boom.forbidden("Don't have permission for this action"));
        }
    }
}

module.exports = { checkApiKey, checkRoles };
