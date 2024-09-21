import { IUserData } from "../interfaces/IUserData";
import { useAuthUser } from "../models/user/useAuthUser";
import { userUserStore } from "../store/UserStore";

export const useAuth = () => {
  const { accessToken, isLoggedIn, setTokens, logOut } = userUserStore();
  const { authUser } = useAuthUser();

  const user: IUserData = {
    name: "Jesus Morales",
  };

  const checkForSavedToken = () => {
    const savedToken = localStorage.getItem("token");
    const refreshSavedToken = localStorage.getItem("refreshToken");

    if (!savedToken || !refreshSavedToken) {
      logOutUser();
      console.log("El token se borró mi rey");

      return;
    }

    const isTokenValid = verifyToken(savedToken);
    const isRefreshTokenValid = verifyToken(refreshSavedToken);

    if (!isTokenValid || !isRefreshTokenValid) {
      logOutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      console.log("se venció el tiempo del token mi rey");

      return;
    }

    setTokens(savedToken, refreshSavedToken);
  };

  const verifyToken = (token: any) => {
    if (!token) return;

    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded.exp * 1000 > Date.now();
  };

  const logOutUser = () => {
    logOut();
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  return {
    isLoggedIn,
    user,
    authUser,
    logOutUser,
    accessToken,
    checkForSavedToken,
  };
};
