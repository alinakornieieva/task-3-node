import { Router } from "express";
import {
  deleteNote,
  getAll,
  getNote,
  getStats,
  patchNote,
  postNote,
} from "../services";
import { validate } from "../services/validate";
import {
  idSchema,
  noteSchema,
  updatedNoteSchema,
} from "../services/validation";

const router: Router = Router();

router.get("/", getAll);
router.get("/stats", getStats);
router.get("/:id", validate(idSchema), getNote);
router.post("/", validate(noteSchema), postNote);
router.delete("/:id", validate(idSchema), deleteNote);
router.patch("/:id", validate(updatedNoteSchema), patchNote);

export default router;
