"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.post("/user", (req, res) => {
    res.send("TODO: Create user.");
});
app.get("/user", (req, res) => {
    res.send("TODO: Get all users");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
