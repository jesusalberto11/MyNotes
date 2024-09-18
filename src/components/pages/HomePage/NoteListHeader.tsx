import "../../../styles/components/pages/HomePage/NoteListHeader.css";
import { ReactNode } from "react";
import SimpleButton from "../../shared/buttons/SimpleButton";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../../../hooks/useNotes";
import { INote } from "../../../interfaces/INote";
import { SVG_ICONS } from "../../../helpers/svgIcons";

const NoteListHeader = (props: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { createNote } = useNotes();

  const handleAddNote = async () => {
    const newNote: Partial<INote> = {
      title: "Nota sin titulo",
      description: "",
      date: new Date(),
      bgColor: "#ffffff",
      textColor: "#000000",
    };

    await createNote(newNote).then((id) => {
      if (id) {
        navigate(`/note/${id}`);
      }
    });
  };

  return (
    <div
      className="notes-list-header w-full flex row align-center justify-end"
      style={{ gap: "10px" }}
    >
      {props.children}
      <button
        className="add-note-btn flex centered rounded-corners"
        onClick={() => handleAddNote()}
        title="Añadir nota"
      >
        Añadir nota
      </button>
      <SimpleButton
        showTitle={false}
        title="Open settings"
        icon={SVG_ICONS.SETTINGS}
        onClickItem={() => navigate("/settings")}
      />
    </div>
  );
};

export default NoteListHeader;
