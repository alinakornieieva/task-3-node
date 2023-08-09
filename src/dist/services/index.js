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
exports.patchNote = exports.postNote = exports.deleteNote = exports.getStats = exports.getNote = exports.getAll = void 0;
const notes_js_1 = require("../models/notes.js");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield notes_js_1.Note.findAll();
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).json({ mesage: "Something went wrong", error });
    }
});
exports.getAll = getAll;
const getNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const note = yield notes_js_1.Note.findByPk(id);
        if (!note) {
            return res.status(404).json({ message: "Such note doesn`t exist" });
        }
        res.status(200).json(note);
    }
    catch (error) {
        res.status(500).json({ mesage: "Something went wrong", error });
    }
});
exports.getNote = getNote;
const getStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = [];
        let categories = [];
        const notes = yield notes_js_1.Note.findAll();
        notes.forEach((item) => {
            categories.push(item.category);
        });
        categories = Array.from(new Set(categories));
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
        yield notes_js_1.Note.destroy({ where: { id } });
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
        yield notes_js_1.Note.create({ note, content, dates, category, created });
        res.status(200).json({ message: "Note was created" });
    }
    catch (error) {
        res.status(500).json({ mesage: "Something went wrong", error });
    }
});
exports.postNote = postNote;
const patchNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { note, content, dates, category } = req.body;
        yield notes_js_1.Note.update({ note, content, dates, category }, {
            where: { id },
        });
        res.status(200).json({ message: "Note was updated" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mesage: "Something went wrong", error });
    }
});
exports.patchNote = patchNote;
