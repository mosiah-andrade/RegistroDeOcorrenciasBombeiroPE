import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Cadastrar = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    cpf: "",
    email: "",
    numeroTelefone: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.password !== form.passwordConfirm) {
      setError("As senhas não coincidem.");
      return;
    }
    if (!form.email || !form.password) {
      setError("Preencha todos os campos.");
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        CPF: form.cpf,
        email: form.email,
        phone: form.numeroTelefone,
        password: form.password,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          alert("Cadastro realizado com sucesso!");
          navigate("/ocorrencias");
        } else {
          setError(data.message || "Erro ao cadastrar usuário");
        }
      })
      .catch(() => {
        setError("Erro de conexão com o servidor");
      });
  };

  return (
    <div className="flex h-max w-screen flex-col items-center justify-center bg-[linear-gradient(180deg,_#36312E_50.52%,_#D4D4D4_110.06%)] xl:flex-row">
      
      <div className="flex h-full w-full items-center justify-center p-6 xl:h-screen xl:w-1/2 xl:max-w-[700px]">
        
        <form 
          className="m-auto flex w-full flex-col p-8 xl:min-w-[320px] xl:max-w-none" 
          id="cadastrarForm" 
          onSubmit={handleSubmit}
          method="POST"
        >
          <img 
            src={logo} 
            alt="Logo" 
            className="mb-2 h-auto w-52 xl:h-[68px] xl:w-[241px]" 
          />
          <p className="my-5 text-left text-base font-normal text-white xl:text-[19px]">
            Crie sua conta
          </p>
          
          {error && <div className="mb-4 text-red-400">{error}</div>}

          <div className="mb-4">
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="h-[56px] w-full rounded-[8px] bg-white pl-[29px] text-gray-800 placeholder:text-[13px] placeholder:font-medium placeholder:text-[#A39787] focus:outline-none focus:ring-2 focus:ring-[#DF6A3F] xl:w-[355px]"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Primeiro Nome"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="h-[56px] w-full rounded-[8px] bg-white pl-[29px] text-gray-800 placeholder:text-[13px] placeholder:font-medium placeholder:text-[#A39787] focus:outline-none focus:ring-2 focus:ring-[#DF6A3F] xl:w-[355px]"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Sobrenome"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="cpf"
              name="cpf"
              className="h-[56px] w-full rounded-[8px] bg-white pl-[29px] text-gray-800 placeholder:text-[13px] placeholder:font-medium placeholder:text-[#A39787] focus:outline-none focus:ring-2 focus:ring-[#DF6A3F] xl:w-[355px]"
              value={form.cpf}
              onChange={handleChange}
              placeholder="CPF"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              className="h-[56px] w-full rounded-[8px] bg-white pl-[29px] text-gray-800 placeholder:text-[13px] placeholder:font-medium placeholder:text-[#A39787] focus:outline-none focus:ring-2 focus:ring-[#DF6A3F] xl:w-[355px]"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="numeroTelefone"
              name="numeroTelefone"
              className="h-[56px] w-full rounded-[8px] bg-white pl-[29px] text-gray-800 placeholder:text-[13px] placeholder:font-medium placeholder:text-[#A39787] focus:outline-none focus:ring-2 focus:ring-[#DF6A3F] xl:w-[355px]"
              value={form.numeroTelefone}
              onChange={handleChange}
              placeholder="Número de Telefone"
              required
            />
          </div>

          <div className="relative mb-4 w-full xl:w-[355px]">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="h-[56px] w-full rounded-[8px] bg-white pl-[29px] pr-12 text-gray-800 placeholder:text-[13px] placeholder:font-medium placeholder:text-[#A39787] focus:outline-none focus:ring-2 focus:ring-[#DF6A3F]"
              value={form.password}
              onChange={handleChange}
              placeholder="Senha"
              required
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

          <div className="relative mb-4 w-full xl:w-[355px]">
            <input
              type={showPasswordConfirm ? "text" : "password"}
              id="passwordConfirm"
              name="passwordConfirm"
              className="h-[56px] w-full rounded-[8px] bg-white pl-[29px] pr-12 text-gray-800 placeholder:text-[13px] placeholder:font-medium placeholder:text-[#A39787] focus:outline-none focus:ring-2 focus:ring-[#DF6A3F]"
              value={form.passwordConfirm}
              onChange={handleChange}
              placeholder="Confirme a Senha"
              required
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showPasswordConfirm ? (
                <FiEyeOff size={20} color="#A39787" />
              ) : (
                <FiEye size={20} color="#A39787" />
              )}
            </button>
          </div>

          <button 
            type="submit" 
            className="flex h-[50px] w-full items-center justify-center rounded-[6.5px] bg-[#DF6A3F] text-white
                       transition-colors duration-300 hover:bg-[#ee3c39] xl:w-[355px] cursor-pointer"
          >
            Cadastrar
          </button>

          <p className="mt-4 w-full text-left text-white xl:w-[355px]">
            Já tem uma conta?{" "}
<<<<<<< HEAD
            <a href="/" className="font-bold text-white no-underline hover:underline">
=======
            <a href="/login" className="font-bold text-white no-underline hover:underline">
>>>>>>> 410f64675b10bc54a4511653c28c101a6cd7fa03
              Fazer login
            </a>
          </p>
        </form>
      </div>

      <div 
        className="hidden flex-1 bg-cover bg-center bg-no-repeat xl:block xl:h-screen
                   bg-[url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0')]"
      ></div>
    </div>
  );
};

export default Cadastrar;