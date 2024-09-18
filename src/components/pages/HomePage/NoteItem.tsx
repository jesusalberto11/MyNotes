import { useNavigate } from "react-router-dom";
import { INote } from "../../../interfaces/INote";
import Markdown from "react-markdown";

const NoteItem = (props: { note: INote }) => {
  const navigate = useNavigate();

  const { note } = props;

  return (
    <div
      key={note?.id}
      onClick={() => navigate(`/note/${note.id}`)}
      className="w-full h-full rounded-corners note-item "
    >
      <div
        className="note-description w-full h-full no-padding"
        style={{
          padding: "0px 0px !important",
          margin: "0px 0px !important",
        }}
      >
        <div
          className="markdown-body h-full"
          style={{
            padding: "0px 0px !important",
          }}
        >
          <Markdown>{note.description}</Markdown>
        </div>
      </div>
      <div className="w-full note-footer">
        <p className="source-sans-pro-font note-title">
          {note.title ? note.title : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default NoteItem;
