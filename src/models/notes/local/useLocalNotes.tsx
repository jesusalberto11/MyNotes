import localforage from "localforage";
import { INote } from "../../../interfaces/INote";

const LOCALFORAGE_KEY: string = "notes";

export const useLocalNotes = () => {
  const getNotesFromLocalDB = async (): Promise<INote[] | null> => {
    try {
      const notes = (await localforage.getItem(LOCALFORAGE_KEY)) as INote[];

      if (!notes) {
        await localforage.setItem(LOCALFORAGE_KEY, []);
        return [];
      }

      return notes;
    } catch (err) {
      console.error("[ERROR] - Can't get notes from localForage! ", err);
      return null;
    }
  };

  const getNoteFromLocalDB = async (id: string): Promise<INote | null> => {
    try {
      const data = await getNotesFromLocalDB();
      const notes = data as INote[];

      if (!notes) return null;

      const note = notes.find((item) => item.id === id);

      if (!note) return null;

      return note;
    } catch (err) {
      console.error("[ERROR] - Can't get note from localForage! ", err);
      return null;
    }
  };

  const createNoteOnLocalDB = async (
    newData: Partial<INote>
  ): Promise<string | null> => {
    try {
      const newNoteID: string = crypto.randomUUID();

      const newNote: Partial<INote> = {
        id: newNoteID,
        ...newData,
      };

      const notes = await localforage.getItem(LOCALFORAGE_KEY);

      if (!notes) {
        await localforage.setItem(LOCALFORAGE_KEY, new Array());
        await localforage.setItem(LOCALFORAGE_KEY, [newNote]);
      }

      await localforage.setItem(LOCALFORAGE_KEY, [
        ...(notes as INote[]),
        newNote,
      ]);

      return newNoteID;
    } catch (err) {
      console.error("[ERROR] - Can't create note into localForage! ", err);
      return null;
    }
  };

  const updateNoteOnLocalDB = async (
    id: string,
    newData: Partial<INote>
  ): Promise<void> => {
    try {
      const notes = await getNotesFromLocalDB();

      if (!notes) return;

      const noteIndex = notes.findIndex((note) => note.id === id);

      if (noteIndex === -1) return;

      notes[noteIndex] = {
        ...notes[noteIndex],
        ...newData,
      };

      await localforage.setItem(LOCALFORAGE_KEY, notes);
    } catch (err) {
      console.error("[ERROR] - Can't update note into localForage! ", err);
    }
  };

  const deleteNoteOnLocalDB = async (id: string): Promise<void> => {
    try {
      const notes = await getNotesFromLocalDB();

      if (!notes) return;

      const noteIndex = notes.findIndex((note) => note.id === id);

      if (noteIndex === -1) return;

      const filteredNotes = notes.filter((note) => note.id !== id);

      await localforage.setItem(LOCALFORAGE_KEY, filteredNotes);
    } catch (err) {
      console.error("[ERROR] - Can't delete note on localForage! ", err);
    }
  };

  const deleteAllNotesOnLocalDB = async (): Promise<void> => {
    try {
      await localforage.setItem(LOCALFORAGE_KEY, new Array());
    } catch (err) {
      console.error("[ERROR] - Can't delete all notes on localForage! ", err);
    }
  };

  return {
    getNotesFromLocalDB,
    getNoteFromLocalDB,
    createNoteOnLocalDB,
    updateNoteOnLocalDB,
    deleteNoteOnLocalDB,
    deleteAllNotesOnLocalDB,
  };
};
