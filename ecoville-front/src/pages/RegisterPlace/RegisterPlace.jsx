import { useState } from "react";
import Menu from "../../components/Menu/Menu.jsx";
import "./RegisterPlace.css";
import { toast } from "react-toastify";

function RegisterPlace() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    cep: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
    latitude: "",
    longitude: "",
    residuos: [],
  });

  const residuosDisponiveis = [
    "Orgânico",
    "Vidro",
    "Plástico",
    "Metal",
    "Papel",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheck = (residuo) => {
    setForm((prev) => {
      const jaSelecionado = prev.residuos.includes(residuo);
      return {
        ...prev,
        residuos: jaSelecionado
          ? prev.residuos.filter((r) => r !== residuo)
          : [...prev.residuos, residuo],
      };
    });
  };

  const handleCepChange = (e) => {
    let cep = e.target.value.replace(/\D/g, "");
    setForm({ ...form, cep });

    if (cep.length === 8) {
      buscarCep(cep);
    }
  };

  const buscarCep = async (cep) => {
    try {
      const res = await fetch(`http://localhost:3000/cep/${cep}`);
      if (!res.ok) throw new Error("Erro ao buscar CEP");
      const dados = await res.json();
      setForm((prev) => ({
        ...prev,
        logradouro: dados.logradouro || "",
        bairro: dados.bairro || "",
        localidade: dados.localidade || "",
        uf: dados.uf || "",
        latitude: dados.coordenada?.latitude || "",
        longitude: dados.coordenada?.longitude || "",
      }));
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível buscar o CEP");
    }
  };

  const handleSubmit = async (e) => {
    const userID = localStorage.getItem("usuarioID");
    e.preventDefault();
    if (!form.nome.trim()) {
      toast.warning("O nome é obrigatório.");
      return;
    }

    if (!form.descricao.trim()) {
      toast.warning("A descrição é obrigatória.");
      return;
    }

    if (!form.cep || form.cep.length !== 8) {
      toast.warning("O CEP é obrigatório e deve ter 8 dígitos.");
      return;
    }

    if (form.residuos.length === 0) {
      toast.warning("Selecione pelo menos um resíduo.");
      return;
    }

    const payload = {
      nome: form.nome,
      descricao: form.descricao,
      endereco: {
        cep: form.cep,
        logradouro: form.logradouro,
        bairro: form.bairro,
        localidade: form.localidade,
        uf: form.uf,
      },
      coordenadas: {
        latitude: form.latitude,
        longitude: form.longitude,
      },
      residuos: form.residuos,
    };

    try {
      const res = await fetch("http://localhost:3000/coletas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          usuarioId: userID,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar ponto");

      toast.success("Ponto cadastrado com sucesso!");
      setForm({
        nome: "",
        descricao: "",
        cep: "",
        logradouro: "",
        bairro: "",
        localidade: "",
        uf: "",
        latitude: "",
        longitude: "",
        residuos: [],
      });
    } catch (err) {
      console.error(err);
      toast.error("Erro ao cadastrar ponto" + err);
    }
  };

  return (
    <>
      <Menu />
      <div className="cadastro-container">
        <div className="cadastro-box">
          <div className="cadastro-form">
            <h2>Cadastre um novo ponto de coleta</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={form.nome}
                onChange={handleChange}
              />

              <textarea
                name="descricao"
                placeholder="Descrição"
                value={form.descricao}
                onChange={handleChange}
              />

              <input
                type="text"
                name="cep"
                placeholder="CEP"
                value={form.cep}
                onChange={handleCepChange}
                maxLength={8}
              />

              <input
                type="text"
                placeholder="Logradouro"
                value={form.logradouro}
                readOnly
              />
              <input
                type="text"
                placeholder="Bairro"
                value={form.bairro}
                readOnly
              />
              <input
                type="text"
                placeholder="Cidade"
                value={form.localidade}
                readOnly
              />
              <input type="text" placeholder="UF" value={form.uf} readOnly />
              <div className="checkbox-group">
                <label>Resíduos:</label>
                {residuosDisponiveis.map((res) => (
                  <label key={res}>
                    <input
                      type="checkbox"
                      checked={form.residuos.includes(res)}
                      onChange={() => handleCheck(res)}
                    />
                    {res}
                  </label>
                ))}
              </div>
              <button type="submit">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPlace;
