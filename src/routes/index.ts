import { Router } from "express";
import {
  deleteNote,
  getAll,
  getNote,
  getStats,
  patchNote,
  postNote,
} from "../services";

const router: Router = Router();

router.get("/", getAll);
router.get("/stats", getStats);
router.get("/:id", getNote);
router.post("/", postNote);
router.delete("/:id", deleteNote);
router.patch("/:id", patchNote);

export default router;
