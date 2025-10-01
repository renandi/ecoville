import React from "react";
import "./CardPonto.css";
import { FaMapMarkerAlt, FaRecycle, FaTrash } from "react-icons/fa";

function CardPonto({ ponto, onDelete }) {
  const handleDeleteClick = () => {
    if (window.confirm(`Deseja realmente deletar "${ponto.nome}"?`)) {
      onDelete(ponto.id);
    }
  };
  return (
    <div className="cards">
      <h3 className="cards-title">{ponto.nome}</h3>
      <p>Descrição: {ponto.descricao}</p>
      <p className="cards-info">
        <FaMapMarkerAlt className="icon" />
        {ponto.endereco.logradouro}, {ponto.endereco.localidade}
      </p>
      <p className="cards-info">
        <FaRecycle className="icon" />
        <strong> Resíduos:</strong>{" "}
        {ponto.residuos.length > 2
          ? `${ponto.residuos.slice(0, 2).join(", ")} e outros`
          : ponto.residuos.join(", ")}
      </p>

      <button className="delete-btn" onClick={handleDeleteClick}>
        <FaTrash />
        Deletar
      </button>
    </div>
  );
}

export default CardPonto;
