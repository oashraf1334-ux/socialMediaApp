"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.NotFoundException = exports.ConfilectException = exports.BadRequestException = exports.ApplicationException = void 0;
class ApplicationException extends Error {
    status;
    constructor(message, status, options) {
        super(message, options);
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApplicationException = ApplicationException;
class BadRequestException extends ApplicationException {
    constructor(message, options) {
        super(message, 400, options);
    }
}
exports.BadRequestException = BadRequestException;
class ConfilectException extends ApplicationException {
    constructor(message, options) {
        super(message, 409, options);
    }
}
exports.ConfilectException = ConfilectException;
class NotFoundException extends ApplicationException {
    constructor(message, options) {
        super(message, 404, options);
    }
}
exports.NotFoundException = NotFoundException;
const globalErrorHandler = (err, req, res, next) => {
    return res.status(err.status || 500).json({
        message: err.message || "Something went wrong!",
        stack: process.env.MODE === "DEVELOPMENT" ? err.stack : undefined,
        cause: err.cause
    });
};
exports.globalErrorHandler = globalErrorHandler;
