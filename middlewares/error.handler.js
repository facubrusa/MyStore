function logErrors(err, req, res, next) {
    // capture error and send it to next middleware
    next(err);
}

function errorHandler(err, req, res, next) {
    res.status(500).json({
        error: true,
        message: err.message,
        stack: err.stack,
    });
}

function boomErrorHanlder(err, req, res, next) {
    if(err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    // If the error isn't controlated for boom, send to general error handler
    next();
}

module.exports = { logErrors, errorHandler, boomErrorHanlder };
