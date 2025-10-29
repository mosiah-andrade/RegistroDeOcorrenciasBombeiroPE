import { useState } from "react";
import logo from "../../assets/logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoged, setKeepLoged] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [visivel, setVisivel] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password, keepLoged }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "/ocorrencias";
      } else {
        setError(data.message || "Erro ao fazer login");
      }
    } catch {
      setError("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[linear-gradient(180deg,_#36312E_50.52%,_#D4D4D4_110.06%)] xl:flex-row">
      
      <div className="flex h-full w-full items-center justify-center p-6 xl:h-screen xl:w-1/2 xl:max-w-[700px]">
        
        <form 
          className="m-auto flex w-full flex-col p-8 xl:min-w-[320px] xl:max-w-none" 
          id="loginForm" 
          onSubmit={handleSubmit}
        >
          <img 
            src={logo} 
            alt="Logo" 
            className="mb-2 h-auto w-52 xl:h-[68px] xl:w-[241px]" 
          />
          <p className="my-5 text-left text-base font-normal text-white xl:text-[19px]">
            Que bom ter você de volta
          </p>
          
          {error && <div className="mb-4 text-red-400">{error}</div>}

          <div className="mb-4">
            <input
              type="text"
              id="emailOrCPF"
              name="email ou CPF"
              className="h-[56px] w-full rounded-[8px] bg-white pl-[29px] text-gray-800 placeholder:text-[13px] placeholder:font-medium placeholder:text-[#A39787] focus:outline-none focus:ring-2 focus:ring-[#DF6A3F] xl:w-[355px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
            />
          </div>

          <div className="relative mb-4 w-full xl:w-[355px]">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="h-[56px] w-full rounded-[8px] bg-white pl-[29px] pr-12 text-gray-800 placeholder:text-[13px] placeholder:font-medium placeholder:text-[#A39787] focus:outline-none focus:ring-2 focus:ring-[#DF6A3F]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showPassword ? (
                <FiEyeOff size={20} color="#A39787" />
              ) : (
                <FiEye size={20} color="#A39787" />
              )}
            </button>
          </div>


          <div className="flex w-full cursor-pointer items-center justify-start gap-3 pt-4 pb-8 text-sm text-gray-400 xl:w-[355px]">
            <input
              type="checkbox"
              id="keepLogedCheckbox"
              className="peer hidden" 
              checked={keepLoged}
              onChange={(e) => setKeepLoged(e.target.checked)}
            />
            <label
              htmlFor="keepLogedCheckbox"
              className="relative flex h-6 w-6 shrink-0  items-center justify-center rounded-md border-2 border-gray-400 transition-all
                         peer-checked:border-[#DF6A3F] peer-checked:bg-[#DF6A3F]"
            onClick={() => setVisivel(!visivel)}
            >
              {visivel && (
              <span className=" text-xl leading-none peer-checked:block">
                🐾
              </span>
              )}
              
            </label>
            <label htmlFor="keepLogedCheckbox" className=" font-['Poppins',_sans-serif] text-white">
                Mantenha-me logado
            </label>
          </div>

          <button 
            type="submit" 
            className=" flex h-[50px] w-full items-center justify-center rounded-[6.5px] bg-[#DF6A3F] text-white
                       transition-colors duration-300 hover:bg-[#ee3c39] xl:w-[355px] cursor-pointer"
          >
            Entrar
          </button>

          <p className="mt-4 w-full text-left text-white xl:w-[355px]">
            Não tem uma conta?{" "}
            <a href="/cadastrar" className="font-bold text-white no-underline hover:underline">
              Cadastrar
            </a>
          </p>
        </form>
      </div>

      <div 
        className="hidden flex-1 bg-cover bg-center bg-no-repeat xl:block xl:h-screen
                   bg-[url('/imgs/catOnTree.png')]"
      ></div>
    </div>
  );
};

export default Login;