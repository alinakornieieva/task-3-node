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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNote = void 0;
const index_1 = require("../index");
const postNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { note, content, dates, category, created, id, archived } = req.body;
        const notes = index_1.data;
        notes.push({ note, content, dates, category, created, id, archived });
        res.status(200).json({ message: "Note was created" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ mesage: "Something went wrong" });
    }
});
exports.postNote = postNote;
