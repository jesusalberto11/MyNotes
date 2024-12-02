import { INote } from "../../interfaces/INote";
import { useAuth } from "../../hooks/useAuth";
import { useAPINotes } from "./API/useAPINotes";
import { useLocalNotes } from "./local/useLocalNotes";

export const useNotesModel = () => {
  const { isLoggedIn } = useAuth();
  const {
    getNotesFromAPI,
    getNoteFromAPI,
    createNoteOnAPI,
    updateNoteOnAPI,
    deleteNoteOnAPI,
    deleteAllNotesOnAPI,
  } = useAPINotes();
  const {
    getNotesFromLocalDB,
    getNoteFromLocalDB,
    createNoteOnLocalDB,
    updateNoteOnLocalDB,
    deleteNoteOnLocalDB,
    deleteAllNotesOnLocalDB,
    setNotesOnLocalDB,
  } = useLocalNotes();

  const getNotes = async (): Promise<INote[] | null> => {
    if (isLoggedIn) {
      return await getNotesFromAPI();
    } else {
      return await getNotesFromLocalDB();
    }
  };

  const setNotes = async (newNotes: INote): Promise<void> => {
    await setNotesOnLocalDB(newNotes);
  };

  const getNote = async (id: string): Promise<INote | null> => {
    if (isLoggedIn) {
      return await getNoteFromAPI(id);
    } else {
      return await getNoteFromLocalDB(id);
    }
  };

  const createNote = async (
    newData: Partial<INote>
  ): Promise<string | null> => {
    if (isLoggedIn) {
      return await createNoteOnAPI(newData);
    } else {
      return await createNoteOnLocalDB(newData);
    }
  };

  const updateNote = async (
    id: string,
    newData: Partial<INote>
  ): Promise<void> => {
    if (isLoggedIn) {
      return await updateNoteOnAPI(id, newData);
    } else {
      return await updateNoteOnLocalDB(id, newData);
    }
  };

  const deleteNote = async (id: string): Promise<void> => {
    if (isLoggedIn) {
      return await deleteNoteOnAPI(id);
    } else {
      return await deleteNoteOnLocalDB(id);
    }
  };

  const deleteAllNotes = async (): Promise<void> => {
    if (isLoggedIn) {
      return await deleteAllNotesOnAPI();
    } else {
      return await deleteAllNotesOnLocalDB();
    }
  };

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
