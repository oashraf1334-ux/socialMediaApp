"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_controller_1 = __importDefault(require("./Modules/Auth/auth.controller"));
const users_controller_1 = __importDefault(require("./Modules/users/users.controller"));
const error_response_1 = require("./Utils/response/error.response");
const connection_1 = __importDefault(require("./DB/connection"));
(0, dotenv_1.config)({ path: node_path_1.default.resolve('./config/.env.dev') });
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again later."
    }
});
const bootstrap = async () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)(), express_1.default.json(), (0, helmet_1.default)(), limiter);
    await (0, connection_1.default)();
    const port = Number(process.env.PORT) || 5000;
    app.get("/users", (req, res) => {
        res.status(200).json({ message: "Hello from users route" });
    });
    app.use("/api/auth", auth_controller_1.default);
    app.use("/api/users", users_controller_1.default);
    app.use('/*Dummy', (req, res) => {
        res.status(404).json({ message: "Route not found" });
    });
    app.use(error_response_1.globalErrorHandler);
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
};
exports.bootstrap = bootstrap;
