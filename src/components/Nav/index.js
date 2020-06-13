import React, { useState } from "react";
import "./styles.scss";
import {
  FaUser,
  FaHeart,
  FaQuestionCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
export default function Form() {
  const [isvisible, setIsvisible] = useState(false);
  function toggleNavMenu() {
    if (isvisible) {
      setIsvisible(false);
    } else {
      setIsvisible(true);
    }
  }
  return (
    <section id="nav">
      <div className="content">
        <nav>
          <div className="logo">
            <img src={Logo} alt="" />
            <h1>Halt</h1>
          </div>
          <button onClick={toggleNavMenu}>
            <Hamburger toggled={isvisible} toggle={setIsvisible} />{" "}
          </button>
        </nav>

        <ul className={isvisible ? "side-nav-visible" : "side-nav-hidden"}>
          <Link to="/profile">
            <li className="nav-item">
              <FaUser size={48} color="#222" />
              Meu perfil
            </li>
          </Link>
          <Link to="/profile">
            <li className="nav-item">
              <FaHeart size={48} color="#222" />
              Favoritos
            </li>
          </Link>
          <Link to="/profile">
            <li className="nav-item">
              <FaQuestionCircle size={48} color="#222" />
              Como dar um feedback?
            </li>
          </Link>
          <Link to="/profile">
            <li className="nav-item">
              <FaInfoCircle size={48} color="#222" />
              Sobre o app
            </li>
          </Link>
        </ul>
      </div>
    </section>
  );
}
