import { IUserData } from "../interfaces/IUserData";
import { useAuthUser } from "../models/user/useAuthUser";

export const useAuth = () => {
  const { authUser } = useAuthUser();

  const isLoggedIn = false;
  const user: IUserData = {
    name: "Jesus Morales",
  };

  return {
    isLoggedIn,
    user,
    authUser,
  };
};
