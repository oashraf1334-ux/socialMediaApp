"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.userSchema = exports.RoleEnum = exports.GenderEnum = void 0;
const mongoose_1 = require("mongoose");
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["male"] = "MALE";
    GenderEnum["female"] = "FEMALE";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["user"] = "USER";
    RoleEnum["admin"] = "ADMIN";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
exports.userSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Types.ObjectId,
        auto: true,
        required: true
    },
    firstName: { type: String, required: true, minLength: 3, maxLength: 25 },
    lastName: { type: String, required: true, minLength: 3, maxLength: 25 },
    email: { type: String, required: true, unique: true },
    confirmEmailOTP: { type: String },
    confirmedAt: { type: Date },
    password: { type: String, required: true },
    resetPasswordOTP: { type: String },
    changeCredentialsTime: { type: String },
    phone: { type: String },
    address: { type: String },
    gender: { type: String, enum: Object.values(GenderEnum), default: GenderEnum.male },
    role: { type: String, enum: Object.values(RoleEnum), default: RoleEnum.user },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
exports.userSchema.virtual("username")
    .set(function (value) {
    const [firstName, lastName] = value.split(" ") || [];
    this.set({ firstName, lastName });
}).get(function () {
    return `${this.firstName} ${this.lastName}`;
});
exports.userModel = mongoose_1.models.User || (0, mongoose_1.model)("User", exports.userSchema);
