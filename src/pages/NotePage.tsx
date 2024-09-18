import "../styles/components/pages/NotePage/NotePage.css";
import { useEffect, useState } from "react";
import { useNotes } from "../hooks/useNotes";
import { useNavigate, useParams } from "react-router-dom";
import { INote } from "../interfaces/INote";
import NotePageHeader from "../components/pages/NotePage/NotePageHeader";
import LoaderSpinner from "../components/shared/ui/LoaderSpinner";
import Markdown from "react-markdown";

const NotePage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { getNote } = useNotes();

  const [note, setNote] = useState<INote | null>(null);

  useEffect(() => {
    if (!id) return;

    getNote(id).then((response) => {
      response ? setNote(response) : navigate("/");

      document.title = `${response?.title} | MyNotes`;
    });
  }, []);

  return (
    <>
      {note ? (
        <div
          className="h-full w-full flex column"
          style={{ gap: "10px", paddingBottom: "10px" }}
        >
          <NotePageHeader
            id={note.id}
            title={note.title}
            description={note.description}
          />
          {note.description.length === 0 ? (
            <p>Nota vacía</p>
          ) : (
            <div
              className="view-container w-full"
              style={{ flexBasis: "100px", flexGrow: "1" }}
            >
              <div className="markdown-body">
                <Markdown>{note.description}</Markdown>
              </div>
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

export default NotePage;
