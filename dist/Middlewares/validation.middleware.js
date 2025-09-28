"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalFields = exports.validation = void 0;
const error_response_1 = require("../Utils/response/error.response");
const zod_1 = __importDefault(require("zod"));
const validation = (schema) => {
    return (req, res, next) => {
        const validationErrors = [];
        for (const key of Object.keys(schema)) {
            if (!schema[key])
                continue;
            const validationResult = schema[key].safeParse(req[key]);
            if (!validationResult.success) {
                const errors = validationResult.error;
                validationErrors.push({
                    key,
                    issues: errors.issues.map((issue) => ({ message: issue.message, path: issue.path })),
                });
            }
            if (validationErrors.length > 0) {
                throw new error_response_1.BadRequestException("validation error", { cause: validationErrors });
            }
        }
        return next();
    };
};
exports.validation = validation;
exports.generalFields = {
    username: zod_1.default.string().min(2).max(100),
    email: zod_1.default.email(),
    password: zod_1.default.string().min(6).max(100),
    confirmPassword: zod_1.default.string().min(6).max(100),
    otp: zod_1.default.string().regex(/^\d{6}/)
};
