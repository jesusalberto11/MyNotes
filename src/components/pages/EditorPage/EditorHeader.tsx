import { useNavigate } from "react-router-dom";
import { SVG_ICONS } from "../../../helpers/svgIcons";
import SimpleButton from "../../shared/buttons/SimpleButton";
import LoaderSpinner from "../../shared/ui/LoaderSpinner";
import Modal from "../../modals/Modal";
import HelpDialogContent from "./HelpDialogContent";
import { useRef } from "react";
import { useWindowsWidth } from "../../../hooks/useWindowsWidth";

const EditorHeader = (props: {
  hasChanged: boolean;
  isSavingChanges: boolean;
  saveChanges: Function;
  setShowView: Function;
}) => {
  const navigate = useNavigate();
  const { windowWidth } = useWindowsWidth();
  const HelpDialogRef = useRef<any>(null);

  return (
    <div
      className="editor-header w-full flex row align-center justify-between"
      style={{ gap: "10px" }}
    >
      <SimpleButton
        showTitle={false}
        title="Regresar"
        icon={SVG_ICONS.ARROW_LEFT}
        onClickItem={() => navigate(-1)}
      />
      {props.hasChanged && (
        <div
          className="w-full flex row align-center justify-end"
          style={{ height: "35px", gap: "10px" }}
        >
          <p className="save-changes-text">
            {props.isSavingChanges ? "Guardando..." : "Cambios sin guardar"}
          </p>
          <button
            className="save-note-btn rounded-corners flex centered"
            title="Guardar cambios"
            onClick={() => props.saveChanges()}
          >
            {props.isSavingChanges ? <LoaderSpinner /> : "Guardar cambios"}
          </button>
        </div>
      )}
      <div className="flex centered" style={{ gap: "10px" }}>
        {windowWidth <= 768 && (
          <SimpleButton
            showTitle={false}
            title="Mostrar resultado"
            icon={SVG_ICONS.EYE}
            onClickItem={() => props.setShowView((value: boolean) => !value)}
          />
        )}
        <SimpleButton
          showTitle={false}
          title="Mostrar ayuda"
          icon={SVG_ICONS.HELP}
          onClickItem={() => HelpDialogRef?.current.openModal()}
        />
      </div>
      <Modal ref={HelpDialogRef} title="Sintaxis básica de Markdown">
        <HelpDialogContent />
      </Modal>
    </div>
  );
};

export default EditorHeader;
