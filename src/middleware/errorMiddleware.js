const logger =
    require("../utils/logger");

const errorHandler = (err, req, res, next) => {

    logger.error(err.message, {
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
    });

    const statusCode =
        res.statusCode === 200
            ? 500
            : res.statusCode;

    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack:
            process.env.NODE_ENV === "production"
                ? null
                : err.stack,
    });

};

module.exports = errorHandler;
