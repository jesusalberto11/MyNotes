import { IApiResponse } from "../../interfaces/IApiResponse";
import { userUserStore } from "../../store/UserStore";

export const useAuthUser = () => {
  const { setTokens } = userUserStore();

  const authUser = async (
    email: string,
    password: string
  ): Promise<IApiResponse | null> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_AUTH_ENDPOINT}/auth.php`,
        {
          method: "POST",
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) {
        const errorData: IApiResponse = await response.json();
        return errorData;
      }

      const data: IApiResponse = await response.json();

      setTokens(data.results.accessToken, data.results.refreshToken);
      localStorage.setItem("token", data.results.accessToken);
      localStorage.setItem("refreshToken", data.results.refreshToken);

      return data;
    } catch (err) {
      console.error("[ERROR] - Can't auth user! ", err);
      return null;
    }
  };

  return {
    authUser,
  };
};
