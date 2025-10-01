import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Menu from "../../components/Menu/Menu.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

import "./Dashboard.css";

function Dashboard() {
  
  const siglasEstados = {
    Acre: "AC",
    Alagoas: "AL",
    Amapá: "AP",
    Amazonas: "AM",
    Bahia: "BA",
    Ceará: "CE",
    "Distrito Federal": "DF",
    "Espírito Santo": "ES",
    Goiás: "GO",
    Maranhão: "MA",
    "Mato Grosso": "MT",
    "Mato Grosso do Sul": "MS",
    "Minas Gerais": "MG",
    Pará: "PA",
    Paraíba: "PB",
    Paraná: "PR",
    Pernambuco: "PE",
    Piauí: "PI",
    "Rio de Janeiro": "RJ",
    "Rio Grande do Norte": "RN",
    "Rio Grande do Sul": "RS",
    Rondônia: "RO",
    Roraima: "RR",
    "Santa Catarina": "SC",
    "São Paulo": "SP",
    Sergipe: "SE",
    Tocantins: "TO",
  };

  const [locais, setLocais] = useState([]);
  const [estadosConvertidos, setestadosConvertidos] = useState([]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            padding: "5px",
          }}
        >
          <p>{data.nome}</p>
          <p style={{ color: "#2e7d32" }}>Quantidade: {data.quantidade}</p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    fetch("http://localhost:3000/dashboard")
      .then(async (response) => {
        const data = await response.json();
        setLocais(data.locais);

        const dadosOrdenados = data.estados
          .map((estado) => ({
            sigla: siglasEstados[estado.nome] || estado.nome,
            nome: estado.nome,
            quantidade: estado.quantidade,
          }))
          .sort((a, b) => b.quantidade - a.quantidade);

        setestadosConvertidos(dadosOrdenados);
        console.log(dadosOrdenados);
      })
      .catch(() => {
        toast.error("Erro ao fazer a requisição!");
      });
  }, []);

  return (
    <>
      <Menu />
      <div className="dashboard">
        <div className="card">
          <h2>Distribuição dos pontos de coletas</h2>
          <MapContainer
            style={{ height: "400px", width: "80%", margin: "0 auto" }}
            center={[-23.5505, -46.6333]}
            zoom={5}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locais.map((local) => (
              <Marker
                key={`${local.nome}-${local.latitude}-${local.longitude}`}
                position={[local.latitude, local.longitude]}
              >
                <Popup>
                  <span>{local.nome}</span>
                  <p>{local.descricao}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="card">
          <h2>Distribuição por estado</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={estadosConvertidos}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sigla" />
              <YAxis allowDecimals={false} />
              <Tooltip content={CustomTooltip} />
              <Legend />
              <Bar dataKey="quantidade" fill="#2e7d32">
                <LabelList dataKey="quantidade" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
