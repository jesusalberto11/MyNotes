import "../../../styles/components/pages/SettingsPage/SettingsItem.css";
import { ReactNode } from "react";
import SVGIcon from "../../shared/ui/SVGIcon";

const SettingsItem = (props: {
  title: string;
  description: string;
  icon: string;
  children: ReactNode;
}) => {
  return (
    <div className="settings-item-container">
      <div className="flex centered" style={{ gap: "10px" }}>
        <div className="flex centered" style={{ minWidth: "30px" }}>
          <SVGIcon icon={props.icon} />
        </div>
        <div
          className="flex column align-start justify-center"
          style={{ gap: "5px" }}
        >
          <p className="settings-item-title">{props.title}</p>
          <p className="settings-item-description">{props.description}</p>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default SettingsItem;
