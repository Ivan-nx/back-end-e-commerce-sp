"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.api = axios_1.default.create({
    baseURL: process.env.ASAAS_API_URL,
    headers: {
        access_token: process.env.ASAAS_API_ACCESS_TOKEN,
    },
});
