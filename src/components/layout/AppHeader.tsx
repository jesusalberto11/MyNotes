import "../../styles/components/layout/AppHeader.css";
import UserCircle from "../user/UserCircle";

const AppHeader = () => {
  return (
    <header className="app-header flex align-center justify-center">
      <div className="header-items w-full flex align-center justify-between">
        <div
          className="flex align-center justify-center"
          style={{ gap: "10px" }}
        >
          <p
            className="source-sans-pro-font light"
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            MYNOTES
          </p>
        </div>
        <UserCircle />
      </div>
    </header>
  );
};

export default AppHeader;
