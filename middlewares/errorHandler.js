const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal server error";

    if (err.statusCode) {
        statusCode = err.statusCode;
    }
    if (err.message) {
        message = err.message;
    }

    res.status(statusCode).json({ message, data: null });
};

module.exports = errorHandler;
