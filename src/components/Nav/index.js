import React, { useState } from "react";
import "./styles.scss";
import {
  FaBars,
  FaUser,
  FaHeart,
  FaQuestionCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
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
          <h1>Halt</h1>{" "}
          <button onClick={toggleNavMenu}>
            <FaBars color="#222" size={32} />
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
