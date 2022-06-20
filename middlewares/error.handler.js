const { ValidationError } = require('sequelize');

function logErrors(err, req, res, next) {
    // capture error and send it to next middleware
    console.log(err);
    next(err);
}

function boomErrorHanlder(err, req, res, next) {
    if(err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    } else {
        res.status(500).json({
            message: err.message,
            stack: err.stack,
        });
    }
    // If the error isn't controlated for boom, create general error handler
    next();
}

function ormErrorHandler(err, req, res, next) {
    // Validate if the error coming from sequealize
    if (err instanceof ValidationError) {
      res.status(409).json({
        statusCode: 409,
        message: err.name,
        errors: err.errors
      });
    }
    next(err);
}

module.exports = { logErrors, boomErrorHanlder, ormErrorHandler };
