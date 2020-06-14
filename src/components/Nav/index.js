import React, { useState } from "react";
import "./styles.scss";
import {
  FaUser,
  FaHeart,
  FaQuestionCircle,
  FaInfoCircle,
  FaSearch
} from "react-icons/fa";
import {FiLogOut} from 'react-icons/fi'
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
export default function Nav({history}) {
  const [isvisible, setIsvisible] = useState(false);
  function toggleNavMenu() {
    if (isvisible) {
      setIsvisible(false);
    } else {
      setIsvisible(true);
    }
  }
  function handlelogout() {
    localStorage.removeItem("id");
    history.push("/")
  }
  return (
    <section id="nav">
      <div className="content">
        <nav>
          <div className="logo">
            <img src={Logo} alt="" />
            <h1>Halt</h1>
          </div>
          <form action="">
            <FaSearch color="#666" size={14} />
            <input type="text" placeholder="Busque por pontos, cidades, rotas..."/>
          </form>
          <button onClick={toggleNavMenu}>
            <Hamburger toggled={isvisible} toggle={setIsvisible} />{" "}
          </button>
        </nav>

        <ul className={isvisible ? "side-nav-visible" : "side-nav-hidden"}>
          <Link to="/profile">
            <li className="nav-item">
              <FaUser size={48} color="#f9f4f0" />
              Meu perfil
            </li>
          </Link>
          <Link to="/favorites">
            <li className="nav-item">
              <FaHeart size={48} color="#f9f4f0" />
              Favoritos
            </li>
          </Link>
          <Link to="/profile">
            <li className="nav-item">
              <FaQuestionCircle size={48} color="#f9f4f0" />
              Como dar um feedback?
            </li>
          </Link>
          <Link to="/profile">
            <li className="nav-item">
              <FaInfoCircle size={48} color="#f9f4f0" />
              Sobre o app
            </li>
          </Link>
            <li className="nav-item" onClick={handlelogout}>
              <FiLogOut size={48} color="#f9f4f0" />
              Sair
            </li>
        </ul>
      </div>
    </section>
  );
}
