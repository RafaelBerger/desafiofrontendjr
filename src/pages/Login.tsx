import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  isDark?: boolean;
}

function Login({ isDark = false }: LoginProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleAuth(e: any) {
    e.preventDefault();

    if (login === "admin" && password === "admin") {
      localStorage.setItem("isAuth", "true");

      navigate("/email");
    } else {
      console.log("erro");
    }
  }

  return (
    <section className="w-screen h-screen flex justify-center items-center bg-orange-300 p-4">
      <div className="w-full max-w-4xl h-auto md:h-4/6 bg-orange-500 rounded-2xl flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-4/6 flex flex-col justify-center items-center text-center md:text-left p-6">
          <h1 className="text-white font-bold text-2xl md:text-3xl pb-4">
            Bem Vindo
          </h1>

          <p className="text-white text-center text-sm md:text-lg">
            Simplifique sua comunicação. Onde cada mensagem encontra o seu
            lugar.
          </p>
        </div>

        <div className="w-full md:w-2/6 flex justify-center items-center bg-white p-6">
          <form
            className="w-full max-w-xs flex flex-col items-center"
            onSubmit={handleAuth}
          >
            <h1 className="font-medium text-xl md:text-2xl pb-6">
              Login de usuário
            </h1>

            <div className="w-full flex flex-col pb-5">
              <span className="pb-1 text-sm md:text-base">Login</span>
              <input
                type="text"
                placeholder="admin"
                className="border rounded-sm pl-2 h-10 w-full"
                onChange={(e) => setLogin(e.target.value)}
              />

              <span className="pb-1 pt-3 text-sm md:text-base">Senha</span>
              <input
                placeholder="admin"
                type="password"
                className="border rounded-sm pl-2 h-10 w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">
              <Button isDark={isDark} name="Login" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
