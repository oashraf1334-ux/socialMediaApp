"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateToken = async ({ payload, secret = process.env.ACCESS_USER_SIGNATURE, options = { expiresIn: Number(process.env.ACCESS_USER_EXPIRES_IN) } }) => {
    return await (0, jsonwebtoken_1.sign)(payload, secret, options);
};
exports.generateToken = generateToken;
