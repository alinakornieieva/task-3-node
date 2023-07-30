import { Request, Response } from "express";
import { data } from "../index";
import { INote } from "../models/INote";
import { IStats } from "../models/IStata";

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const notes = data;
    res.status(200).json(notes);
  } catch (e) {
    console.log(e);
    res.status(500).json({ mesage: "Something went wrong" });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const notes = data;
    const index = notes.findIndex((item) => {
      if (item.id === id) return true;
    });
    if (index === -1) {
      return res.status(404).json({ message: "Such note doesn`t exist" });
    }
    res.status(200).json(notes[index]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ mesage: "Something went wrong" });
  }
};

export const getStats = (req: Request, res: Response) => {
  try {
    const notes = data;
    const result: IStats[] = [];
    const categories = ["Task", "Random Thought", "Idea"];
    categories.forEach((item) => {
      const active = notes.filter(
        (cur) => cur.category === item && !cur.archived
      ).length;
      const archived = notes.filter(
        (cur) => cur.category === item && cur.archived
      ).length;
      result.push({ item, active, archived });
    });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ mesage: "Something went wrong" });
  }
};
