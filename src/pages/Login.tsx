import Button from "../components/Button";
import { Link } from "react-router-dom";

interface LoginProps {
  isDark?: boolean;
}

function Login({ isDark = false }: LoginProps) {
  return (
    <section className="w-screen h-screen flex justify-center items-center bg-orange-300 p-4">
      <div className="w-full max-w-4xl h-auto md:h-4/6 bg-orange-500 rounded-2xl flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-4/6 flex flex-col justify-center items-center text-center md:text-left p-6">
          <h1 className="text-white font-bold text-2xl md:text-3xl pb-4">
            Bem Vindo
          </h1>

          <p className="text-white text-sm md:text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit
            explicabo amet maxime ab ex dignissimos earum repudiandae voluptates
            eum dolore.
          </p>
        </div>

        <div className="w-full md:w-2/6 flex justify-center items-center bg-white p-6">
          <div className="w-full max-w-xs flex flex-col items-center">
            <h1 className="font-medium text-xl md:text-2xl pb-6">
              Login de usuário
            </h1>

            <div className="w-full flex flex-col pb-5">
              <span className="pb-1 text-sm md:text-base">Login</span>
              <input
                type="text"
                placeholder="Email ou Apelido"
                className="border rounded-sm pl-2 h-10 w-full"
              />

              <span className="pb-1 pt-3 text-sm md:text-base">Senha</span>
              <input
                type="password"
                className="border rounded-sm pl-2 h-10 w-full"
              />
            </div>

            <Link
              to="/email"
              className="w-full flex justify-center items-center"
            >
              <Button isDark={isDark} name="Login" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
