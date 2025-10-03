import { useState } from "react";
import "./Register.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Register() {
  const [usuario, setusuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [position, setPosition] = useState(null);
  const [confirmado, setConfirmado] = useState(false);
  const navigate = useNavigate();
  const estados = [
    { sigla: "AC", nome: "Acre" },
    { sigla: "AL", nome: "Alagoas" },
    { sigla: "AP", nome: "Amapá" },
    { sigla: "AM", nome: "Amazonas" },
    { sigla: "BA", nome: "Bahia" },
    { sigla: "CE", nome: "Ceará" },
    { sigla: "DF", nome: "Distrito Federal" },
    { sigla: "ES", nome: "Espírito Santo" },
    { sigla: "GO", nome: "Goiás" },
    { sigla: "MA", nome: "Maranhão" },
    { sigla: "MT", nome: "Mato Grosso" },
    { sigla: "MS", nome: "Mato Grosso do Sul" },
    { sigla: "MG", nome: "Minas Gerais" },
    { sigla: "PA", nome: "Pará" },
    { sigla: "PB", nome: "Paraíba" },
    { sigla: "PR", nome: "Paraná" },
    { sigla: "PE", nome: "Pernambuco" },
    { sigla: "PI", nome: "Piauí" },
    { sigla: "RJ", nome: "Rio de Janeiro" },
    { sigla: "RN", nome: "Rio Grande do Norte" },
    { sigla: "RS", nome: "Rio Grande do Sul" },
    { sigla: "RO", nome: "Rondônia" },
    { sigla: "RR", nome: "Roraima" },
    { sigla: "SC", nome: "Santa Catarina" },
    { sigla: "SP", nome: "São Paulo" },
    { sigla: "SE", nome: "Sergipe" },
    { sigla: "TO", nome: "Tocantins" },
  ];

  const buscaCep = async () => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cepLimpo}/json/`
        );
        const data = await response.json();
        console.log(data);
        if (!data.erro) {
          setLogradouro(data.logradouro);
          setBairro(data.bairro);
          setCidade(data.localidade);
          setEstado(data.uf);
        } else {
          toast.warning("CEP não encontrado");
        }
      } catch (error) {
        toast.error("Erro ao consultar o CEP:" + error);
      }
    }
  };

  function MoverMapa({ position }) {
    const map = useMap();

    if (position) {
      map.setView(position, 13);
    }

    return null;
  }

  const handleLocalizar = (e) => {
    e.preventDefault();
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      setPosition([lat, lng]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validações
    if (!usuario.trim()) {
      toast.warning("O usuario é obrigatório.");
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
      const response = await fetch("", {
        //implementar endpoint correto
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario,
          senha,
        }),
      });

      if (response.ok) {
        toast.success("Usuário cadastrado com sucesso!");
        setusuario("");
        setSenha("");
        setConfirmarSenha("");
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
        <div className="cadastro-form">
          <h2>Crie sua conta EcoVille!</h2>
          <p>Preencha os dados para criar sua conta.</p>

          <form onSubmit={handleSubmit}>
            <div className="section-conta">
              <h3>Dados da conta</h3>
              <input
                type="text"
                placeholder="Usuário"
                value={usuario}
                onChange={(e) => setusuario(e.target.value)}
              />
              <div className="linha">
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
              </div>
            </div>

            <div className="section-endereco">
              <h3>Endereço</h3>
              <div className="linha">
                <input
                  type="text"
                  placeholder="CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  onBlur={buscaCep}
                  maxLength={8}
                />
                <input
                  type="text"
                  placeholder="Número"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </div>

              <div className="linha">
                <input
                  type="text"
                  placeholder="Logradouro"
                  value={logradouro}
                  readOnly
                />
                <input
                  type="text"
                  placeholder="Complemento"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </div>

              <div className="linha">
                <input
                  type="text"
                  placeholder="Bairro"
                  value={bairro}
                  readOnly
                />
                <input
                  type="text"
                  placeholder="Cidade"
                  value={cidade}
                  readOnly
                />
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="">Estado</option>
                  {estados.map((uf) => (
                    <option key={uf.sigla} value={uf.sigla}>
                      {uf.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <h3>Geolocalização</h3>
            <div className="section-geo">
              <input
                type="number"
                step="any"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />

              <input
                type="number"
                step="any"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />

              <button onClick={handleLocalizar}>Localizar</button>
            </div>
            <MapContainer
              style={{ height: "400px", width: "80%", margin: "0 auto" }}
              center={position || [-23.5505, -46.6333]}
              zoom={position ? 13 : 5}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {position && <Marker position={position} />}
              {position && <MoverMapa position={position} />}
            </MapContainer>
            <div className="confirmacao-local">
              <label>
                <input
                  type="checkbox"
                  checked={confirmado}
                  onChange={(e) => setConfirmado(e.target.checked)}
                />
                Confirmo que essa é a localização informada
              </label>
            </div>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
