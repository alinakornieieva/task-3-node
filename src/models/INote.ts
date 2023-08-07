export interface INote {
  id: string;
  archived: Boolean;
  note: string;
  created: string;
  category: string;
  content: string;
  dates: string | null;
}
