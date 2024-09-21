import { IApiResponse } from "../../interfaces/IApiResponse";

export const useAuthUser = () => {
  const authUser = async (
    email: string,
    password: string
  ): Promise<IApiResponse | null> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_ENDPOINT}`, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        const errorData: IApiResponse = await response.json();
        return errorData;
      }

      const data: IApiResponse = await response.json();
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
