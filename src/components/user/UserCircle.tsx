import "../../styles/components/user/UserCircle.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const UserCircle = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  return (
    <div
      className="user-circle circle flex centered"
      onClick={() => navigate("/login")}
    >
      <p style={{ fontSize: "18px" }}>
        {isLoggedIn ? user.name.slice(0, 2).toUpperCase() : "I"}
      </p>
    </div>
  );
};

export default UserCircle;
