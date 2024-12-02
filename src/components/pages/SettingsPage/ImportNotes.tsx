import { useState } from "react";
import { useNotes } from "../../../hooks/useNotes";
import { INote } from "../../../interfaces/INote";

const ImportNotes = () => {
  const { setNotes } = useNotes();

  const [hasChargedFile, setHasChargedFile] = useState<boolean>(false);

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e: any) => {
      try {
        const jsonContent = JSON.parse(e.target.result) as INote;

        if (Array.isArray(jsonContent)) {
          setHasChargedFile(true);
          await setNotes(jsonContent);
          alert("Notas cargadas correctamente");
        } else {
          alert(
            "El archivo JSON no contiene un array. Por favor, revisa el formato."
          );
        }
      } catch (error) {
        alert(
          "Error al leer el archivo JSON. Asegúrate de que el formato sea correcto."
        );
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      {hasChargedFile ? (
        <pre>{hasChargedFile && "Archivo cargado correctamente."}</pre>
      ) : (
        <input type="file" accept=".json" onChange={handleFileUpload} />
      )}
    </div>
  );
};

export default ImportNotes;
