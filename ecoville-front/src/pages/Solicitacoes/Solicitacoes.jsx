import Menu from "../../components/Menu/Menu.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardPonto from "../../components/Cards/CardResidente.jsx";
import "./Solicitacoes.css";
import { useNavigate } from "react-router";
import CardResidente from "../../components/Cards/CardResidente.jsx";

const Solicitacoes = () => {
  const solicitacoesExemplo = [
    {
      id: 1,
      numeroSolicitacao: 1023,
      itens: {
        plastico: "12kg",
        papel: "5kg",
        vidro: "8kg",
      },
      dataColeta: "2025-10-07",
      status: "AGUARDANDO",
    },
    {
      id: 2,
      numeroSolicitacao: 1024,
      itens: {
        metal: "3kg",
        vidro: "10kg",
      },
      dataColeta: "2025-10-02",
      status: "COLETADA",
    },
    {
      id: 3,
      numeroSolicitacao: 1025,
      itens: {
        organico: "20kg",
      },
      dataColeta: "2025-09-28",
      status: "FINALIZADA",
    },
    {
      id: 4,
      numeroSolicitacao: 1026,
      itens: {
        plastico: "7kg",
        papel: "2kg",
      },
      dataColeta: "2025-10-12",
      status: "AGUARDANDO",
    },
    {
      id: 5,
      numeroSolicitacao: 1027,
      itens: {
        eletronicos: "4kg",
        vidro: "6kg",
      },
      dataColeta: "2025-10-05",
      status: "COLETADA",
    },
  ];

  const [coletas, setColetas] = useState([]);

  const handleCancelar = (id) => {
    console.log("Cancelar solicitação", id);
    // TODO: Implementar cancelamento (issue #12)
  };

  const handleEditar = (id) => {
    console.log("Editar solicitação", id);
    // TODO: Implementar edição, modal ou nova tela (issue #12)
  };

  const handleFeedback = (id) => {
    console.log("Feedback da solicitação", id);
    // TODO: Implementar feedback, modal! (issue #12)
  };
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate("/locais/novo");
  };

  /* TODO: Implementar busca de solicitações
  const fetchColetas = async () => {
    try {
      const userID = localStorage.getItem("tipoPerfil");
      const res = await fetch("http://localhost:3000/coletas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          usuarioId: userID,
        },
      });

      if (!res.ok) throw new Error("Erro ao buscar coletas");
      const data = await res.json();
      if (data.length === 0) {
        toast.warning("Nenhum ponto encontrado!");
      }

      setColetas(data);
    } catch (err) {
      toast.error(`Erro ao buscar coletas: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchColetas();
  }, []);
*/
  return (
    <>
      <Menu />
      <div className="locais">
        <h2>Minhas solicitações</h2>
        <button className="btn-cadastrar" onClick={cadastrar}>
          + Nova
        </button>

        <div className="div-cards">
          {solicitacoesExemplo.map((sol) => (
            <CardResidente
              key={sol.id}
              solicitacao={sol}
              onCancelar={(id) => handleCancelar(id)}
              onEditar={(id) => handleEditar(id)}
              onFeedback={(id) => handleFeedback(id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Solicitacoes;
