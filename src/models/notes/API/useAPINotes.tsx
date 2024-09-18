import { getMySQLDate } from "../../../helpers/dateParser";
import { IApiResponse } from "../../../interfaces/IApiResponse";
import { INote } from "../../../interfaces/INote";

export const useAPINotes = () => {
  const getNotesFromAPI = async (): Promise<INote[] | null> => {
    try {
      const data = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/getAll.php`
      );
      const response = (await data.json()) as IApiResponse;

      if (response.status === "error") {
        console.error("[ERROR] - ", response.error);
        return null;
      }

      const notes = response.results as INote[];

      if (!notes?.length) return null;

      return notes;
    } catch (err) {
      console.error("[ERROR] - Can't get notes from API! ", err);
      return null;
    }
  };

  const getNoteFromAPI = async (id: string): Promise<INote | null> => {
    try {
      const data = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/get.php?id=${id}`
      );
      const response = (await data.json()) as IApiResponse;

      if (response.status === "error") {
        console.error("[ERROR] - ", response.error);
        return null;
      }

      const note = response.results as INote;

      if (!note) return null;

      return note;
    } catch (err) {
      console.error("[ERROR] - Can't get note from API! ", err);
      return null;
    }
  };

  const createNoteOnAPI = async (
    _newData: Partial<INote>
  ): Promise<string | null> => {
    try {
      let newNoteID: number | string | null = null;

      await fetch(`${import.meta.env.VITE_API_ENDPOINT}/create.php`, {
        method: "POST",
        body: JSON.stringify({
          title: "Nota sin titulo",
          description: "**Sin descripción**",
          date: getMySQLDate(),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((data) => data.json())
        .then((response: IApiResponse) => {
          if (response.status === "error") {
            console.error("[ERROR] - ", response.error);
            newNoteID = null;
            return;
          }

          newNoteID = response.results.toString();
        });

      return newNoteID;
    } catch (err) {
      console.error("[ERROR] - Can't create note into API! ", err);
      return null;
    }
  };

  const updateNoteOnAPI = async (
    id: string,
    newData: Partial<INote>
  ): Promise<void> => {
    try {
      await fetch(`${import.meta.env.VITE_API_ENDPOINT}/update.php`, {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          title: newData.title,
          description: newData.description,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((data) => data.json())
        .then((response: IApiResponse) => {
          if (response.status === "error") {
            console.error("[ERROR] - ", response.error);
            return;
          }
        });
    } catch (err) {
      console.error("[ERROR] - Can't update note on API! ", err);
    }
  };

  const deleteNoteOnAPI = async (id: string): Promise<void> => {
    try {
      await fetch(`${import.meta.env.VITE_API_ENDPOINT}/delete.php?id=${id}`, {
        method: "DELETE",
      })
        .then((data) => data.json())
        .then((response: IApiResponse) => {
          if (response.status === "error") {
            console.error("[ERROR] - ", response.error);
          }
        });
    } catch (err) {
      console.error("[ERROR] - Can't delete note on API! ", err);
    }
  };

  const deleteAllNotesOnAPI = async (): Promise<void> => {
    try {
      return;
    } catch (err) {
      console.error("[ERROR] - Can't delete all notes on API! ", err);
    }
  };

  return {
    getNotesFromAPI,
    getNoteFromAPI,
    createNoteOnAPI,
    updateNoteOnAPI,
    deleteNoteOnAPI,
    deleteAllNotesOnAPI,
  };
};
