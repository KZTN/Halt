import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./styles.scss";
export default function Home() {
  return (
    <section id="home">
      <div className="content">
        <div className="upper-content"></div>
        <div className="bottom-content">
          <div className="title-content">
            <h1>
              Hora de <br />
              uma pausa?
            </h1>
            <span>
            Encontre as melhores paradas de pernoite e alimentação para você e seu caminhão.
            </span>
          </div>
          <div className="options-content">
            <span>Começe agora</span>
            <Link to="/Login">
              <button>
                <FaArrowRight color="#fff" size={28} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
