import * as Yup from "yup";

export const idSchema = Yup.object({
  params: Yup.object({
    id: Yup.number().required(),
  }),
}).noUnknown(true);

export const noteSchema = Yup.object({
  body: Yup.object({
    note: Yup.string().min(3).required(),
    content: Yup.string().min(5).required(),
    dates: Yup.array().required(),
    category: Yup.string().required(),
    id: Yup.number().required(),
    archived: Yup.boolean().required(),
  }),
}).noUnknown(true);

export const updatedNoteSchema = Yup.object({
  body: Yup.object({
    note: Yup.string().min(3).required(),
    content: Yup.string().min(5).required(),
    dates: Yup.array().required(),
    category: Yup.string().required(),
  }),
  params: Yup.object({
    id: Yup.number().required(),
  }),
}).noUnknown(true);
