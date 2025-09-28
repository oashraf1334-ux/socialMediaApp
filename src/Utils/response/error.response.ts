import type { Request, Response, NextFunction } from "express";


export interface IError extends Error {
    status?: number;
}


export class ApplicationException extends Error {
    constructor(message: string, public status: number, options?: ErrorOptions) {
        super(message, options);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestException extends ApplicationException {
    constructor(message: string, options?: ErrorOptions) {
        super(message, 400, options);
    }
}
export class ConfilectException extends ApplicationException {
    constructor(message: string, options?: ErrorOptions) {
        super(message, 409, options);
    }
}
export class NotFoundException extends ApplicationException {
    constructor(message: string, options?: ErrorOptions) {
        super(message, 404, options);
    }
}


export const globalErrorHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status || 500).json({ 
        message: err.message || "Something went wrong!" ,
        stack:process.env.MODE ==="DEVELOPMENT" ? err.stack : undefined,
        cause: err.cause
    });
}





