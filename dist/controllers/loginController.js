"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __importDefault(require("md5"));
const connectiondb_1 = __importDefault(require("../database/connectiondb"));
exports.default = {
    index(request, response) {
        const { user, password } = request.body;
        const cripto = md5_1.default(password);
        try {
            connectiondb_1.default.query(`SELECT * FROM users WHERE user_name="${user}"`, (err, result) => {
                if (err) {
                    return console.log("erro massa" + err);
                }
                if (!result) {
                    return response.json({ message: "usuario não encotrado" });
                }
                if (result.length > 0) {
                    if (result[0].user_password !== cripto) {
                        return response.json({ message: "usuario e senha incorretos" });
                    }
                }
                response.json(result);
            });
        }
        catch (e) {
            console.log("errinho" + e);
        }
    }
};
