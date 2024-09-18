import { IUserData } from "../interfaces/IUserData";

export const useAuth = () => {
  const isLoggedIn = false;
  const user: IUserData = {
    name: "Jesus Morales",
  };

  return {
    isLoggedIn,
    user,
  };
};
