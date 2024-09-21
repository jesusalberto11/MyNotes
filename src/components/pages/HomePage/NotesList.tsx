import "../../../styles/components/pages/HomePage/NotesList.css";
import { useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import NoteListHeader from "./NoteListHeader";
import NoNotesImg from "/no_notes.svg";
import { useNotes } from "../../../hooks/useNotes";
import { INote } from "../../../interfaces/INote";
import SearchInput from "../../shared/data-entry/SearchInput";
import LoaderSpinner from "../../shared/ui/LoaderSpinner";
import { useAuth } from "../../../hooks/useAuth";

const NotesList = () => {
  const { isLoggedIn } = useAuth();
  const { getNotes } = useNotes();
  const [notes, setNotes] = useState<INote[] | null>(null);
  const [filteredNotes, setFilteredNotes] = useState<INote[] | null>(null);

  useEffect(() => {
    if (isLoggedIn === null) return;

    getNotes().then((response) => {
      setNotes(response);
      setFilteredNotes(response);
    });
  }, [isLoggedIn]);

  return (
    <>
      {filteredNotes ? (
        <div className="w-full h-full flex column" style={{ gap: "10px" }}>
          <NoteListHeader>
            <SearchInput
              placeholder="Buscar nota"
              list={notes}
              setList={setFilteredNotes}
            />
          </NoteListHeader>
          {filteredNotes.length === 0 ? (
            <div
              className="w-full h-full flex column centered"
              style={{ gap: "25px" }}
            >
              <img
                src={NoNotesImg}
                loading="lazy"
                alt="No hay notas"
                height={"auto"}
                width={"260px"}
                title="No hay notas, click para añadir una."
              />
              <h2>No hay notas!</h2>
            </div>
          ) : (
            <div
              className="w-full flex warp row"
              style={{ gap: "10px", paddingBottom: "10px" }}
            >
              {filteredNotes.map((note) => (
                <NoteItem key={note?.id} note={note} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex centered">
          <LoaderSpinner />
        </div>
      )}
    </>
  );
};

export default NotesList;
