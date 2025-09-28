"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReposetorie = void 0;
const database_reposetorie_1 = require("./database.reposetorie");
const error_response_1 = require("../../Utils/response/error.response");
class UserReposetorie extends database_reposetorie_1.DatabaseReposetories {
    model;
    constructor(model) {
        super(model);
        this.model = model;
    }
    async createUser({ data, options }) {
        const [user] = await this.create({ data, options }) || [];
        if (!user)
            throw new error_response_1.BadRequestException("fail to signup");
        return user;
    }
}
exports.UserReposetorie = UserReposetorie;
