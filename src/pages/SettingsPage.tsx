import { useEffect } from "react";
import PageLayout from "../components/layout/PageLayout";
import ChangeTheme from "../components/pages/SettingsPage/ChangeTheme";
import SettingsItem from "../components/pages/SettingsPage/SettingsItem";
import { SVG_ICONS } from "../helpers/svgIcons";

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
    </PageLayout>
  );
};

export default SettingsPage;
