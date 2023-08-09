import { Request, Response } from "express";
import { INote } from "../models/INote";
import { IStats } from "../models/IStats";
import { Note } from "../models/notes.js";

export const getAll = async (req: Request, res: Response) => {
  try {
    const notes = await Note.findAll();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ message: "Such note doesn`t exist" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const result: IStats[] = [];
    let categories: string[] = [];
    const notes = await Note.findAll();
    notes.forEach((item: any) => {
      categories.push(item.category);
    });
    categories = Array.from(new Set(categories));
    categories.forEach((item) => {
      const active = notes.filter(
        (cur: any) => cur.category === item && !cur.archived
      ).length;
      const archived = notes.filter(
        (cur: any) => cur.category === item && cur.archived
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
    await Note.destroy({ where: { id } });
    res.status(200).json({ message: "Note was deleted" });
  } catch (error) {
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};

export const postNote = async (req: Request, res: Response) => {
  try {
    const { note, content, dates, category, created }: INote = req.body;
    await Note.create({ note, content, dates, category, created });
    res.status(200).json({ message: "Note was created" });
  } catch (error) {
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};

export const patchNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { note, content, dates, category }: INote = req.body;
    await Note.update(
      { note, content, dates, category },
      {
        where: { id },
      }
    );
    res.status(200).json({ message: "Note was updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mesage: "Something went wrong", error });
  }
};
