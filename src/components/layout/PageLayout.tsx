import "../../styles/components/layout/PageLayout.css";
import { ReactNode } from "react";
import SimpleButton from "../shared/buttons/SimpleButton";
import { SVG_ICONS } from "../../helpers/svgIcons";
import { useNavigate } from "react-router-dom";

const PageLayout = (props: {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex column align-center justify-center">
      <div
        className="page-content h-full w-full flex column"
        style={{ gap: "10px" }}
      >
        <div
          className="w-full flex align-center justify-start"
          style={{ gap: "10px" }}
        >
          {props.showBackButton && (
            <SimpleButton
              icon={SVG_ICONS.GO_BACK}
              showTitle={false}
              title="Regresar"
              onClickItem={() => navigate(-1)}
            />
          )}
          <h2 className="page-title font-bold">
            {props.title ? props.title.toUpperCase() : ""}
          </h2>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default PageLayout;
