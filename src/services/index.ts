import { Request, Response } from "express";
import { data, removeNote, addNote, updateNote } from "../repositories";
import { INote } from "../models/INote";
import { IStats } from "../models/IStats";

export const getAll = (req: Request, res: Response) => {
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};

export const getNote = (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const index = data.findIndex((item) => {
      if (item.id === id) return true;
    });
    if (index === -1) {
      return res.status(404).json({ message: "Such note doesn`t exist" });
    }
    res.status(200).json(data[index]);
  } catch (error) {
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};

export const getStats = (req: Request, res: Response) => {
  try {
    const result: IStats[] = [];
    const categories = ["Task", "Random Thought", "Idea"];
    categories.forEach((item) => {
      const active = data.filter(
        (cur) => cur.category === item && !cur.archived
      ).length;
      const archived = data.filter(
        (cur) => cur.category === item && cur.archived
      ).length;
      result.push({ item, active, archived });
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};

export const deleteNote = (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const index = data.findIndex((item) => {
      if (item.id === id) return true;
    });
    if (index === -1) {
      return res.status(404).json({ message: "Such note doesn`t exist" });
    }
    removeNote(id);
    res.status(200).json({ message: "Note was deleted", notes: data });
  } catch (error) {
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};

export const postNote = (req: Request, res: Response) => {
  try {
    const { note, content, dates, category, created, id, archived }: INote =
      req.body;
    const index = data.findIndex((item) => {
      if (item.id === id) return true;
    });
    if (index !== -1) {
      return res.status(404).json({ message: "Such note already exists" });
    }
    addNote({ note, content, dates, category, created, id, archived });
    res.status(200).json({ message: "Note was created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ mesage: "Something went wrong" });
  }
};

export const patchNote = (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const index = data.findIndex((item) => {
      if (item.id === id) return true;
    });
    if (index === -1) {
      return res.status(404).json({ message: "Such note doesn`t exist" });
    }
    const { note, content, dates, category }: INote = req.body;
    updateNote(id, note, content, dates, category);
    res.status(200).json({ message: "Note was updated" });
  } catch (error) {
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};
