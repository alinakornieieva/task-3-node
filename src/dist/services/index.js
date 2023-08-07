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
exports.patchNote = exports.postNote = exports.deleteNote = exports.getStats = exports.getNote = exports.getAll = void 0;
const db_js_1 = __importDefault(require("../db.js"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield db_js_1.default.query(`SELECT * FROM notes`);
        res.status(200).json(notes.rows);
    }
    catch (error) {
        res.status(500).json({ mesage: "Something went wrong", error });
    }
});
exports.getAll = getAll;
const getNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const note = yield db_js_1.default.query(`SELECT * FROM notes WHERE id = ${id}`);
        if (note.rows < 1) {
            return res.status(404).json({ message: "Such note doesn`t exist" });
        }
        res.status(200).json(note.rows[0]);
    }
    catch (error) {
        res.status(500).json({ mesage: "Something went wrong", error });
    }
});
exports.getNote = getNote;
const getStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = [];
        const categories = [];
        const notes = yield db_js_1.default.query(`SELECT * FROM notes`);
        notes.forEach((item) => {
            categories.push(item.category);
        });
        categories.forEach((item) => {
            const active = notes.filter((cur) => cur.category === item && !cur.archived).length;
            const archived = notes.filter((cur) => cur.category === item && cur.archived).length;
            result.push({ item, active, archived });
        });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ mesage: "Something went wrong", error });
    }
});
exports.getStats = getStats;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const note = yield db_js_1.default.query(`DELETE FROM notes WHERE id = ${id}`);
        res.status(200).json({ message: "Note was deleted" });
    }
    catch (error) {
        res.status(500).json({ mesage: "Something went wrong", error });
    }
});
exports.deleteNote = deleteNote;
const postNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { note, content, dates, category, created } = req.body;
        yield db_js_1.default.query(`INSERT INTO "notes" ("note", "created", "category", "content", "dates")
        VALUES($1, $2, $3, $4, $5)`, [note, created, category, content, dates]);
        res.status(200).json({ message: "Note was created" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ mesage: "Something went wrong" });
    }
});
exports.postNote = postNote;
const patchNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { note, content, dates, category } = req.body;
        yield db_js_1.default.query("UPDATE notes SET note = $1, category = $2, content = $3, dates = $4 WHERE id = $5", [note, category, content, dates, id]);
        res.status(200).json({ message: "Note was updated" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mesage: "Something went wrong", error });
    }
});
exports.patchNote = patchNote;
