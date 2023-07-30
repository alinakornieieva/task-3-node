"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const repositories_1 = require("../repositories");
const router = (0, express_1.Router)();
router.get("/all", repositories_1.getAll);
// router.get()
// router.get()
// router.post()
// router.delete()
// router.patch()
exports.default = router;
