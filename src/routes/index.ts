import { Router } from "express";
import { getAll, getNote, getStats } from "../repositories";
import { postNote } from "./postNote";

const router: Router = Router();

router.get("/", getAll);
router.get("/stats", getStats);
router.get("/:id", getNote);
router.post("/", postNote);
// router.delete()
// router.patch()

export default router;
