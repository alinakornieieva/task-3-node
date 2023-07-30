import { INote } from "../models/INote";

export let data: INote[] = [
  {
    id: 1,
    archived: false,
    note: "Dentist appointment on the 27/07/2023",
    created: "July 20, 2023",
    category: "Task",
    content: "It`s a content for task 1",
    dates: ["27/07/2023"],
  },
  {
    id: 24,
    archived: true,
    note: "Buy milk",
    created: "July 24, 2023",
    category: "Task",
    content: "Important!!!",
    dates: [],
  },
  {
    id: 2,
    archived: false,
    note: "Idea 1",
    created: "July 25, 2023",
    category: "Idea",
    content: "It`s a content for idea 1",
    dates: [],
  },
  {
    id: 10,
    archived: false,
    note: "Idea 27/07/2023 - 30/07/2023",
    created: "July 27, 2023",
    category: "Idea",
    content: "It`s a content for idea",
    dates: ["27/07/2023, 30/07/2023"],
  },
  {
    id: 11,
    archived: false,
    note: "Write a message",
    created: "July 27, 2023",
    category: "Random Thought",
    content: "Write a message to Ann and offer to go to the cafe",
    dates: [],
  },
  {
    id: 1166,
    archived: false,
    note: "Go walking",
    created: "July 27, 2023",
    category: "Idea",
    content: "Don`t forget earphones",
    dates: [],
  },
  {
    id: 2087,
    archived: true,
    note: "Start to learn french",
    created: "July 27, 2023",
    category: "Random Thought",
    content: "Find tutor or just start with Duolingo",
    dates: [],
  },
];

export const addNote = (note: INote) => {
  data.push(note);
};

export const removeNote = (id: number) => {
  data = data.filter((item: INote) => item.id !== id);
};

export const updateNote = (
  id: number,
  note: INote["note"],
  content: INote["content"],
  dates: INote["dates"],
  category: INote["category"]
) => {
  const index = data.findIndex((item) => {
    if (item.id == id) return true;
  });
  data[index] = { ...data[index], note, content, dates, category };
};
