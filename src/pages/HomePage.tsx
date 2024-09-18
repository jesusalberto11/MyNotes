import { useEffect } from "react";
import NotesList from "../components/pages/HomePage/NotesList";

const HomePage = () => {
  useEffect(() => {
    document.title = "Inicio | MyNotes";
  }, []);

  return <NotesList />;
};

export default HomePage;
