import { useNotes } from "../../../hooks/useNotes";

const FILE_NAME: string = "my_notes.json";

const ExportNotes = () => {
  const { getNotes } = useNotes();

  const manejarDescarga = async () => {
    const notes = await getNotes();
    const notesJSON = JSON.stringify(notes, null, 2);
    const link = document.createElement("a");
    const file = new Blob([notesJSON], { type: "application/json" });

    link.href = URL.createObjectURL(file);
    link.download = `${FILE_NAME}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <button onClick={manejarDescarga}> Descargar Notas </button>;
};

export default ExportNotes;
