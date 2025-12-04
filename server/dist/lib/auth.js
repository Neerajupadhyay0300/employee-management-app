"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashPassword = async (password) => {
    return bcryptjs_1.default.hash(password, 10);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hash) => {
    return bcryptjs_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
const createToken = (data) => {
    if (!process.env.JWT_SECRET)
        throw new Error("JWT_SECRET not defined");
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
};
exports.createToken = createToken;
//# sourceMappingURL=auth.js.map