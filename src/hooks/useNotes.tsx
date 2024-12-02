import { useNotesModel } from "../models/notes/useNotesModel";

export const useNotes = () => {
  const {
    getNotes,
    getNote,
    setNotes,
    createNote,
    updateNote,
    deleteNote,
    deleteAllNotes,
  } = useNotesModel();

  return {
    getNotes,
    getNote,
    setNotes,
    createNote,
    updateNote,
    deleteNote,
    deleteAllNotes,
  };
};
