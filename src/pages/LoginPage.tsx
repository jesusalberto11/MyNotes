import "../styles/components/pages/LoginPage/LoginPage.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, []);

  const onSubmit = async (e: any): Promise<void> => {
    e.preventDefault();

    setErrorMsg("");
    setIsLoading(true);

    await signIn(email, password)
      .then((_response) => {
        setIsLoading(false);
        setEmail("");
        setPassword("");
        //setUser(response)

        navigate("/");
      })
      .catch((error: string) => {
        setIsLoading(false);
        setErrorMsg(error);
      });
  };

  const signIn = async (e: string, p: string): Promise<void> => {
    console.log(e, p);
  };

  return (
    <div className="h-full w-full flex column centered">
      <div className="login-form-container">
        <div className="form-items">
          <h1>Acceder a MyNotes</h1>
          <hr />
          <button className="login-button google-btn">
            <svg
              className="svg"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                fill="#4285f4"
                fillOpacity="1"
                fillRule="evenodd"
                stroke="none"
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
              ></path>
              <path
                fill="#34a853"
                fillOpacity="1"
                fillRule="evenodd"
                stroke="none"
                d="M9.003 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.26c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"
              ></path>
              <path
                fill="#fbbc05"
                fillOpacity="1"
                fillRule="evenodd"
                stroke="none"
                d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z"
              ></path>
              <path
                fill="#ea4335"
                fillOpacity="1"
                fillRule="evenodd"
                stroke="none"
                d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"
              ></path>
            </svg>
            Continuar con Google
          </button>
          <div
            className="w-full flex row align-center justify-between"
            style={{ gap: "10px" }}
          >
            <hr />
            <p>O</p>
            <hr />
          </div>
          <form
            onSubmit={onSubmit}
            className="flex column"
            style={{ gap: "15px" }}
          >
            <div className="form-item flex">
              <label htmlFor="email" hidden>
                Email
              </label>
              <input
                id="email"
                className="login-form-input"
                placeholder="Email *"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-item flex">
              <label htmlFor="password" hidden>
                Contraseña
              </label>
              <input
                id="password"
                className="login-form-input"
                type="password"
                placeholder="Contraseña *"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMsg && <p>{errorMsg}</p>}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <button className="login-button flex centered" type="submit">
                Acceder
              </button>
            )}
            <hr />
            <div className="create-account">
              <p>¿No tienes cuenta?</p>
              <Link className="link" to="/">
                Crea una
              </Link>
            </div>
            <Link className="link" to="/">
              Regresar al inicio
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
