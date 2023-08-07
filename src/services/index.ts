import { Request, Response } from "express";
import db from "../db.js";
import { INote } from "../models/INote";
import { IStats } from "../models/IStats";

export const getAll = async (req: Request, res: Response) => {
  try {
    const notes = await db.query(`SELECT * FROM notes`);
    res.status(200).json(notes.rows);
  } catch (error) {
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const note = await db.query(`SELECT * FROM notes WHERE id = ${id}`);
    if (note.rows < 1) {
      return res.status(404).json({ message: "Such note doesn`t exist" });
    }
    res.status(200).json(note.rows[0]);
  } catch (error) {
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const result: IStats[] = [];
    const categories: string[] = [];
    const notes = await db.query(`SELECT * FROM notes`);
    notes.forEach((item: INote) => {
      categories.push(item.category);
    });
    categories.forEach((item) => {
      const active = notes.filter(
        (cur: INote) => cur.category === item && !cur.archived
      ).length;
      const archived = notes.filter(
        (cur: INote) => cur.category === item && cur.archived
      ).length;
      result.push({ item, active, archived });
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const note = await db.query(`DELETE FROM notes WHERE id = ${id}`);
    res.status(200).json({ message: "Note was deleted" });
  } catch (error) {
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};

export const postNote = async (req: Request, res: Response) => {
  try {
    const { note, content, dates, category, created }: INote = req.body;
    await db.query(
      `INSERT INTO "notes" ("note", "created", "category", "content", "dates")
        VALUES($1, $2, $3, $4, $5)`,
      [note, created, category, content, dates]
    );
    res.status(200).json({ message: "Note was created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ mesage: "Something went wrong" });
  }
};

export const patchNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { note, content, dates, category }: INote = req.body;
    await db.query(
      "UPDATE notes SET note = $1, category = $2, content = $3, dates = $4 WHERE id = $5",
      [note, category, content, dates, id]
    );
    res.status(200).json({ message: "Note was updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};
