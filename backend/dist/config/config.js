"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const getEnvVar_1 = require("./getEnvVar");
const getConfig = () => {
    return {
        DB_CONNECTION_STRING: (0, getEnvVar_1.getEnvVar)("DB_CONNECTION_STRING"),
    };
};
exports.getConfig = getConfig;
