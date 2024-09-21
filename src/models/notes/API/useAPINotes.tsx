import { getMySQLDate } from "../../../helpers/dateParser";
import { useAuth } from "../../../hooks/useAuth";
import { IApiResponse } from "../../../interfaces/IApiResponse";
import { INote } from "../../../interfaces/INote";
import { userUserStore } from "../../../store/UserStore";

export const useAPINotes = () => {
  const { accessToken, logOutUser } = useAuth();
  const { setTokens } = userUserStore();

  const getNotesFromAPI = async (): Promise<INote[] | null> => {
    try {
      let notes: INote[] | null = null;

      const data = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/getAll.php`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const newToken = await refreshAccessToken(refreshToken);
          if (newToken) {
            localStorage.setItem("token", newToken);
            setTokens(newToken, refreshToken);

            const data = await fetch(
              `${import.meta.env.VITE_API_ENDPOINT}/getAll.php`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${newToken}`,
                  "Content-Type": "application/json",
                },
              }
            );

            const response = (await data.json()) as IApiResponse;
            return (notes = response.results);
          }
        }
      }

      const response = (await data.json()) as IApiResponse;

      if (response.status === "error") {
        console.error("[ERROR] - ", response.error);
        return null;
      }

      notes = response.results as INote[];

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

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_AUTH_ENDPOINT}/refreshAuth.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      //YA SI EL TOKEN NO ES VALIDO, LISTO, LOGOUT
      if (res.status === 401) {
        console.log("The refresh token its invalid");
        logOutUser();
        //TODO: MEJORAR ESTO, HACER LOGOUT
      }

      const data = await res.json();
      return data.accessToken;
    } catch (err) {
      console.error("Error refreshing token:", err);
      return null;
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
