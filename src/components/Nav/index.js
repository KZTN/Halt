import React, { useState } from "react";
import "./styles.scss";
import {
  FaUser,
  FaHeart,
  FaQuestionCircle,
  FaInfoCircle,
  FaSearch
} from "react-icons/fa";
import api from '../../services/mongodb';
import {FiLogOut} from 'react-icons/fi'
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
export default function Nav({onSubmit}) {
  const [isvisible, setIsvisible] = useState(false);
  const [inputfield, setInputfield] = useState("");
async function handlesubmit(e) {
  e.preventDefault();

  await api.get(`/search/${inputfield}`).then(async (response) => {
    if(response.data.length) {
      await onSubmit(
        response.data[0]
      );
    }
  }).catch((error) => {
    console.log(error);
  });
  setInputfield("");
}
  function toggleNavMenu() {
    if (isvisible) {
      setIsvisible(false);
    } else {
      setIsvisible(true);
    }
  }
  function handlelogout() {
    localStorage.removeItem("id");
    window.location.href = '/';
    }
  return (
    <section id="nav">
      <div className="content">
        <nav>
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <form onSubmit={handlesubmit}>
            <FaSearch color="#666" size={14} />
            <input type="text" value={inputfield} onChange={(e) => setInputfield(e.target.value)} placeholder="Busque por pontos, cidades, rotas..."/>
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
          <Link to="/about">
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
