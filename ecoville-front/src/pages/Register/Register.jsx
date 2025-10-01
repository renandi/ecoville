import { useState } from "react";
import plantaLogin from "../../assets/planta-login.jpg";
import "./Register.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Register() {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [cpf, setCPF] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const formatarCPF = (cpf) => {
    const apenasNumeros = cpf.replace(/\D/g, "");

    if (apenasNumeros.length <= 3) {
      return apenasNumeros;
    }
    if (apenasNumeros.length <= 6) {
      return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}`;
    }
    if (apenasNumeros.length <= 9) {
      return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(
        3,
        6
      )}.${apenasNumeros.slice(6, 9)}`;
    }
    return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(
      3,
      6
    )}.${apenasNumeros.slice(6, 9)}-${apenasNumeros.slice(9, 11)}`;
  };

  const handleCPFChange = (e) => {
    const formattedCPF = formatarCPF(e.target.value);
    setCPF(formattedCPF);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cpfSemFormato = cpf.replace(/\D/g, "");
    // Validações
    if (!nome.trim()) {
      toast.warning("O nome é obrigatório.");
      return;
    }

    if (!genero) {
      toast.warning("O sexo é obrigatório.");
      return;
    }

    if (!cpfSemFormato.trim() || cpfSemFormato.trim().length !== 11) {
      toast.warning("O CPF é obrigatório e deve conter 11 dígitos.");
      return;
    }

    if (!dataNasc) {
      toast.warning("A data de nascimento é obrigatória.");
      return;
    }

    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    const dia = hoje.getDate() - nascimento.getDate();

    const isMaiorDeIdade =
      idade > 18 || (idade === 18 && (mes > 0 || (mes === 0 && dia >= 0)));
    if (!isMaiorDeIdade) {
      toast.warning("É necessário ter mais de 18 anos.");
      return;
    }

    if (!email.trim()) {
      toast.warning("O e-mail é obrigatório.");
      return;
    }

    if (!senha.trim()) {
      toast.warning("A senha é obrigatória.");
      return;
    }

    if (senha !== confirmarSenha) {
      toast.warning("Senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          sexo: genero[0].toUpperCase(),
          cpf: cpfSemFormato,
          nascimento: dataNasc,
          email,
          senha,
        }),
      });

      if (response.ok) {
        toast.success("Usuário cadastrado com sucesso!");
        setNome("");
        setGenero("");
        setCPF("");
        setDataNasc("");
        setSenha("");
        setConfirmarSenha("");
        setEmail("");
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.warning(`Erro: ${errorData.erro}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <div className="cadastro-banner">
          <img src={plantaLogin} alt="Banner" />
        </div>
        <div className="cadastro-form">
          <h2>Cadastre-se no Recicla365!</h2>
          <p>Preencha os dados para criar sua conta.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <select value={genero} onChange={(e) => setGenero(e.target.value)}>
              <option value="">Gênero</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>

            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={handleCPFChange}
            />

            <input
              type="date"
              placeholder="Data de nascimento"
              value={dataNasc}
              onChange={(e) => setDataNasc(e.target.value)}
            />

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
