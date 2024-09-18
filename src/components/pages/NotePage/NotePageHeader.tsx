import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../modals/ConfirmDialog";
import SimpleButton from "../../shared/buttons/SimpleButton";
import { SVG_ICONS } from "../../../helpers/svgIcons";
import { useNotes } from "../../../hooks/useNotes";

const NotePageHeader = (props: {
  id: string;
  title: string;
  description: string;
}) => {
  const navigate = useNavigate();
  const { updateNote, deleteNote } = useNotes();

  const confirmDialogRef = useRef<any>(null);

  const handleTitleChange = async (newTitle: string) => {
    if (!props.id) return;

    await updateNote(props.id, {
      title: newTitle,
      description: props.description,
    }).then(() => {
      console.log("updatedtitle");
    });
  };

  const handleDeleteNote = async () => {
    if (!props.id) return;

    await deleteNote(props.id).then(() => {
      navigate("/");
    });
  };

  return (
    <div
      className="w-full flex align-center justify-between"
      style={{ height: "35px", gap: "10px" }}
    >
      <div className="flex align-center" style={{ gap: "10px" }}>
        <SimpleButton
          showTitle={false}
          title="Regresar"
          icon={SVG_ICONS.ARROW_LEFT}
          onClickItem={() => navigate("/")}
        />
        <div className="w-full flex column align-start justify-center">
          <p
            className="source-sans-pro-font light"
            style={{ fontSize: "14px", letterSpacing: "2px" }}
          >
            NOMBRE DE LA NOTA
          </p>
          <p
            className="note-title"
            style={{ fontSize: "14px" }}
            contentEditable={props.title ? true : false}
            onBlur={(e) => handleTitleChange(e.target.innerText)}
            suppressContentEditableWarning={true}
          >
            {props.title}
          </p>
        </div>
      </div>
      <div className="flex w-auto align-center" style={{ gap: "10px" }}>
        <SimpleButton
          showTitle={false}
          title="Editar nota"
          icon={SVG_ICONS.EDIT}
          onClickItem={() => navigate(`/editor/${props.id}`)}
        />
        <SimpleButton
          showTitle={false}
          title="Eliminar nota"
          icon={SVG_ICONS.DELETE}
          onClickItem={() => confirmDialogRef?.current.openDialog()}
        />
      </div>
      <ConfirmDialog ref={confirmDialogRef} action={handleDeleteNote} />
    </div>
  );
};

export default NotePageHeader;
