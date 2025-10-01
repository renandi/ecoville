import React from "react";
import { Link, useNavigate } from "react-router";
import "./Menu.css"; // Importe o CSS

const Menu = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("usuarioID");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/locais" className="nav-link">
            Locais
          </Link>
        </li>
      </ul>

      <button className="logout-button" onClick={handleLogout}>
        Sair
      </button>
    </nav>
  );
};

export default Menu;
