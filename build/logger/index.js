"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, label, printf } = winston_1.format;
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: combine(timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: "app.log" }),
    ],
});
exports.default = logger;
//# sourceMappingURL=index.js.map