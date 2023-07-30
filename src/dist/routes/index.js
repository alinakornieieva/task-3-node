"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const repositories_1 = require("../repositories");
const postNote_1 = require("./postNote");
const router = (0, express_1.Router)();
router.get("/", repositories_1.getAll);
router.get("/stats", repositories_1.getStats);
router.get("/:id", repositories_1.getNote);
router.post("/", postNote_1.postNote);
// router.delete()
// router.patch()
exports.default = router;
