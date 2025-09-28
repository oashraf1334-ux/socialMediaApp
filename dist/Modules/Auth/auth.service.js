"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../DB/models/user.model");
const error_response_1 = require("../../Utils/response/error.response");
const user_reposetorie_1 = require("../../DB/reposetories/user.reposetorie");
const hash_1 = require("../../Utils/security/hash");
const email_event_1 = require("../../Utils/email/email.event");
const generateOTP_1 = require("../../Utils/generateOTP");
const token_1 = require("../../Utils/security/token");
class AuthService {
    _userModel = new user_reposetorie_1.UserReposetorie(user_model_1.userModel);
    constructor() { }
    signup = async (req, res) => {
        const { username, email, password } = req.body;
        const checkUser = await this._userModel.findOne({ filter: { email }, options: { lean: true } });
        if (checkUser)
            throw new error_response_1.ConfilectException("User already exists");
        const otp = (0, generateOTP_1.generateOTP)();
        const user = await this._userModel.createUser({
            data: [{
                    username, email,
                    password: await (0, hash_1.generateHash)(password),
                    confirmEmailOTP: await (0, hash_1.generateHash)(String(otp))
                }],
            options: { validateBeforeSave: true }
        }) || [];
        email_event_1.emailEvent.emit("confirmEmail", { to: email, username, otp });
        return res.status(201).json({ message: "user created successfully", user });
    };
    login = async (req, res) => {
        const { email, password } = req.body;
        const user = await this._userModel.findOne({
            filter: { email }
        });
        if (!user)
            throw new error_response_1.NotFoundException("User not found");
        if (!(0, hash_1.compareHash)(password, user.password))
            throw new error_response_1.BadRequestException("Email or password wrong");
        const accessToken = await (0, token_1.generateToken)({
            payload: { _id: user._id }
        });
        return res.status(200).json({ message: "user logged in successfully", accessToken });
    };
    confirmEmail = async (req, res) => {
        const { email, otp } = req.body;
        const user = await this._userModel.findOne({
            filter: {
                email,
                confirmEmailOTP: { $exists: true },
                confirmedAt: { $exists: false }
            }
        });
        if (!user)
            throw new error_response_1.NotFoundException("Invalid Account");
        if (!(0, hash_1.compareHash)(otp, user.confirmEmailOTP))
            throw new error_response_1.BadRequestException("Invalid OTP");
        await this._userModel.updateOne({
            filter: { email },
            update: {
                confirmedAt: Date.now(),
                $unset: { confirmEmailOTP: true }
            }
        });
        return res.status(200).json({ message: "user confirmed successfully" });
    };
}
exports.default = new AuthService();
