"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = __importDefault(require("mysql2/promise"));
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./logger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 8080;
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
pool.getConnection()
    .then((connection) => {
    console.log("Database connected!");
    connection.release();
})
    .catch((err) => {
    console.error("Database connection failed:", err);
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield pool.query('SELECT * FROM pokemon;');
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}));
app.get('/pokemon', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield pool.query('SELECT * FROM pokemon;');
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}));
app.get("/identifier", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield pool.query("SELECT pokemon.identifier FROM pokemon;");
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}));
app.listen(port, () => {
    logger_1.default.info(`Server running on port: ${port}`);
});
