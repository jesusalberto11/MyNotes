import { useEffect } from "react";
import PageLayout from "../components/layout/PageLayout";
import ChangeTheme from "../components/pages/SettingsPage/ChangeTheme";
import SettingsItem from "../components/pages/SettingsPage/SettingsItem";
import ExportNotes from "../components/pages/SettingsPage/ExportNotes";
import { SVG_ICONS } from "../helpers/svgIcons";
import ImportNotes from "../components/pages/SettingsPage/ImportNotes";

const SettingsPage = () => {
  useEffect(() => {
    document.title = "Ajustes | MyNotes";
  }, []);

  return (
    <PageLayout title="Ajustes" showBackButton={true}>
      <SettingsItem
        title="Tema"
        description="Cambiar el tema de la aplicación."
        icon={SVG_ICONS.THEME}
      >
        <ChangeTheme />
      </SettingsItem>
      <SettingsItem
        title="Idioma"
        description="Cambiar el idioma de la aplicación."
        icon={SVG_ICONS.TRANSLATE}
      >
        <ChangeTheme />
      </SettingsItem>
      <SettingsItem
        title="Exportar"
        description="Exporta todas tus notas a un archivo."
        icon={SVG_ICONS.EXPORT}
      >
        <ExportNotes />
      </SettingsItem>
      <SettingsItem
        title="Importar"
        description="Importa todas tus notas desde un archivo."
        icon={SVG_ICONS.IMPORT}
      >
        <ImportNotes />
      </SettingsItem>
    </PageLayout>
  );
};

export default SettingsPage;
