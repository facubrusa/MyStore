const boom = require('@hapi/boom');

// Function that validates the request dynamically
function validatorHandler(schema, property) {
    // Propery can be: body / query / params
    // It depends on the http method (GET, POST, PATH, DELETE)
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if(error) {
            // capture error and send it to next middleware
            next(boom.badRequest(error));
        }
        // if we have any error, send empty to next middleware
        next();
    }
}

module.exports = validatorHandler;
