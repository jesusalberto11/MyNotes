import "../styles/components/editor/Editor.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import EditorHeader from "../components/pages/EditorPage/EditorHeader";
import EditorFooter from "../components/pages/EditorPage/EditorFooter";
import LoaderSpinner from "../components/shared/ui/LoaderSpinner";
import { useNotes } from "../hooks/useNotes";
import { useWindowsWidth } from "../hooks/useWindowsWidth";
import { INote } from "../interfaces/INote";

const EditorPage = () => {
  const navigate = useNavigate();

  const { windowWidth } = useWindowsWidth();
  const { id } = useParams();
  const { getNote, updateNote } = useNotes();

  const [note, setNote] = useState<INote | null>(null);
  const [newText, setNewText] = useState<string>("");
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [isSavingChanges, setIsSavingChanges] = useState<boolean>(false);
  const [textLines, setTextLines] = useState<number>(0);
  const [showView, setShowView] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    getNote(id).then((response) => {
      if (response) {
        setNote(response);
        setNewText(response?.description);

        document.title = "Editor | MyNotes";
      } else {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    setTextLines(newText.split(/\r|\r\n|\n/).length);
  }, [newText]);

  const handleEditorOnChange = (text: string) => {
    setHasChanged(note?.description !== text);
    setNewText(text);
  };

  const saveChanges = async () => {
    if (!note) return;
    setIsSavingChanges(true);

    await updateNote(note.id, { title: note.title, description: newText }).then(
      () => {
        setHasChanged(false);
        setIsSavingChanges(false);
      }
    );
  };

  return (
    <>
      {note ? (
        <div
          className="w-full h-full editor-page-layout"
          style={{ gap: "5px" }}
        >
          <EditorHeader
            hasChanged={hasChanged}
            isSavingChanges={isSavingChanges}
            saveChanges={saveChanges}
            setShowView={setShowView}
          />

          <div className="editor-and-view-container">
            {windowWidth >= 768 ? (
              <>
                <div
                  className="text-editor-container w-full flex"
                  style={{ flexGrow: "1" }}
                >
                  <textarea
                    id="text-editor"
                    className="w-full h-full text-editor"
                    onChange={(e) => handleEditorOnChange(e.target.value)}
                    defaultValue={newText}
                    spellCheck="false"
                  ></textarea>
                </div>

                <div
                  className="view-container w-full"
                  style={{ flexGrow: "1" }}
                >
                  <div className="markdown-body">
                    <Markdown>{newText}</Markdown>
                  </div>
                </div>
              </>
            ) : (
              <>
                {showView ? (
                  <div
                    className="view-container w-full"
                    style={{ flexGrow: "1" }}
                  >
                    <div className="markdown-body">
                      <Markdown>{newText}</Markdown>
                    </div>
                  </div>
                ) : (
                  <div
                    className="text-editor-container w-full flex"
                    style={{ flexGrow: "1" }}
                  >
                    <textarea
                      id="text-editor"
                      className="w-full h-full text-editor"
                      onChange={(e) => handleEditorOnChange(e.target.value)}
                      defaultValue={newText}
                      spellCheck="false"
                    ></textarea>
                  </div>
                )}
              </>
            )}
          </div>
          <EditorFooter
            title={note.title}
            textLength={newText.length}
            lineCount={textLines}
          />
        </div>
      ) : (
        <div className="h-full w-full flex centered">
          <LoaderSpinner />
        </div>
      )}
    </>
  );
};

export default EditorPage;
