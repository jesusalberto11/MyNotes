import { useNotesModel } from "../models/notes/useNotesModel";

export const useNotes = () => {
  const {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
    deleteAllNotes,
  } = useNotesModel();

  return {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
    deleteAllNotes,
  };
};
