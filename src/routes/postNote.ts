import { Request, Response } from "express";
import { data } from "../index";
import { INote } from "../models/INote";

export const postNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { note, content, dates, category, created, id, archived }: INote =
      req.body;
    const notes = data;
    notes.push({ note, content, dates, category, created, id, archived });
    res.status(200).json({ message: "Note was created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ mesage: "Something went wrong" });
  }
};
