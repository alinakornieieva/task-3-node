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
exports.getStats = exports.getNote = exports.getAll = void 0;
const index_1 = require("../index");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = index_1.data;
        res.status(200).json(notes);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ mesage: "Something went wrong" });
    }
});
exports.getAll = getAll;
const getNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const notes = index_1.data;
        const index = notes.findIndex((item) => {
            if (item.id === id)
                return true;
        });
        if (index === -1) {
            return res.status(404).json({ message: "Such note doesn`t exist" });
        }
        res.status(200).json(notes[index]);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ mesage: "Something went wrong" });
    }
});
exports.getNote = getNote;
const getStats = (req, res) => {
    try {
        const notes = index_1.data;
        const result = [];
        const categories = ["Task", "Random Thought", "Idea"];
        categories.forEach((item) => {
            const active = notes.filter((cur) => cur.category === item && !cur.archived).length;
            const archived = notes.filter((cur) => cur.category === item && cur.archived).length;
            result.push({ item, active, archived });
        });
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ mesage: "Something went wrong" });
    }
};
exports.getStats = getStats;
