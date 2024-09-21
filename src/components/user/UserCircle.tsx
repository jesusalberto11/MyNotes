import "../../styles/components/user/UserCircle.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useRef } from "react";
import Modal from "../modals/Modal";

const UserCircle = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logOutUser } = useAuth();
  const userDialogRef = useRef<any>(null);

  const handleButtonAction = () => {
    if (!isLoggedIn) {
      navigate("/login");
      userDialogRef?.current?.closeModal();
      return;
    }

    userDialogRef?.current?.openModal();
  };

  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };

  return (
    <>
      <div
        className="user-circle circle flex centered"
        onClick={() => handleButtonAction()}
      >
        <p style={{ fontSize: "18px" }}>
          {isLoggedIn ? user.name.slice(0, 2).toUpperCase() : "I"}
        </p>
      </div>
      <Modal ref={userDialogRef} title="Tus datos">
        <p>a</p>
        <button onClick={() => handleLogout()}>Cerrar sesión</button>
      </Modal>
    </>
  );
};

export default UserCircle;
