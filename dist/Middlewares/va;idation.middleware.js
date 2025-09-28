"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = (schema) => {
    return (req, res, next) => {
        console.log(schema);
        console.log(Object.keys(schema));
        return next();
    };
};
exports.validation = validation;
