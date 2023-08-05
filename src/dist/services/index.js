"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchArchived = exports.patchNote = exports.postNote = exports.deleteNote = exports.getStats = exports.getNote = exports.getAll = void 0;
const uuid_1 = require("uuid");
const repositories_1 = require("../repositories");
const getAll = (req, res) => {
    try {
        res.status(200).json(repositories_1.data);
    }
    catch (error) {
        res.status(500).json({ mesage: "Something went wrong", error });
    }
};
exports.getAll = getAll;
const getNote = (req, res) => {
    try {
        const id = req.params.id;
        const index = repositories_1.data.findIndex((item) => {
            if (item.id === id)
                return true;
        });
        if (index === -1) {
            return res.status(404).json({ message: "Such note doesn`t exist" });
        }
        res.status(200).json(repositories_1.data[index]);
    }
    catch (error) {
        res.status(500).json({ mesage: "Something went wrong", error });
    }
};
exports.getNote = getNote;
const getStats = (req, res) => {
    try {
        const result = [];
        const categories = [];
        repositories_1.data.forEach((item) => {
            categories.push(item.category);
        });
        categories.forEach((item) => {
            const active = repositories_1.data.filter((cur) => cur.category === item && !cur.archived).length;
            const archived = repositories_1.data.filter((cur) => cur.category === item && cur.archived).length;
            result.push({ item, active, archived });
        });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ mesage: "Something went wrong", error });
    }
};
exports.getStats = getStats;
const deleteNote = (req, res) => {
    try {
        const id = req.params.id;
        const index = repositories_1.data.findIndex((item) => {
            if (item.id === id)
                return true;
        });
        if (index === -1) {
            return res.status(404).json({ message: "Such note doesn`t exist" });
        }
        (0, repositories_1.removeNote)(id);
        res.status(200).json({ message: "Note was deleted", notes: repositories_1.data });
    }
    catch (error) {
        res.status(500).json({ mesage: "Something went wrong", error });
    }
};
exports.deleteNote = deleteNote;
const postNote = (req, res) => {
    try {
        const { note, content, dates, category, created } = req.body;
        (0, repositories_1.addNote)({
            note,
            content,
            dates,
            category,
            created,
            id: (0, uuid_1.v4)(),
            archived: false,
        });
        res.status(200).json({ message: "Note was created" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ mesage: "Something went wrong" });
    }
};
exports.postNote = postNote;
const patchNote = (req, res) => {
    try {
        const id = req.params.id;
        const index = repositories_1.data.findIndex((item) => {
            if (item.id === id)
                return true;
        });
        if (index === -1) {
            return res.status(404).json({ message: "Such note doesn`t exist" });
        }
        const { note, content, dates, category } = req.body;
        (0, repositories_1.updateNote)(id, note, content, dates, category);
        res.status(200).json({ message: "Note was updated" });
    }
    catch (error) {
        res.status(500).json({ mesage: "Something went wrong", error });
    }
};
exports.patchNote = patchNote;
const patchArchived = (req, res) => {
    try {
        const id = req.params.id;
        const index = repositories_1.data.findIndex((item) => {
            if (item.id === id)
                return true;
        });
        if (index === -1) {
            return res.status(404).json({ message: "Such note doesn`t exist" });
        }
        (0, repositories_1.updateArchived)(id);
        res.status(200).json({ message: "Note was updated" });
    }
    catch (error) {
        res.status(500).json({ mesage: "Something went wrong", error });
    }
};
exports.patchArchived = patchArchived;
