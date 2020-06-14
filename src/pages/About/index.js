import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
export default function About({ history }) {
  return (
    <section id="about">
      <div className="content">
        <div className="header">
          <div className="wrapper">
            <h1>Halt</h1>
            <span>contato</span>
          </div>
          <div className="wrapper-actions">
            <Link to="/dashboard">Ver mapa</Link>
            <Link to="/profile">Ver perfil</Link>
          </div>
        </div>
        <div className="text">
          <div className="text-section">
            <div className="text-wrapper">
              <div className="wrapper-item">
                <div className="text-item">
                  Mais do que um aplicativo, nós somos uma ferramenta!
                </div>
                <div className="text-item">
                  A Halt surgiu para localizar o melhor ponto de parada para
                  você e seu caminhão.
                </div>
                <div className="text-item">
                  Por meio do localizador, indicaremos os lugares mais próximos
                  e se possuem estrutura para pernoite, refeições boas, normas
                  de higiene contra o covid-19 ou mesmo segurança para minorias.
                  Sim, aqui pensamos em todxs!
                </div>
              </div>
              <div className="wrapper-item">
                <div className="vertical-text"><span>Sobre o APP</span></div>
              </div>
            </div>
            <div className="text-section">
              <div className="text-wrapper">
                <div className="wrapper-item">
                  <img src={Logo} alt="" srcset="" />
                </div>
                <div className="wrapper-item">
                  <div className="text-ask">
                    “Ah, mas como saber se as avaliações são verdadeiras?”
                  </div>
                  <div className="text-item">
                    Todas avaliações são feitas pelos usuários da Halt, na aba
                    “Como dar um feedback”. Já os selos são garantidos ao ponto
                    de parada se ele receber, no mínimo, 10 selos na mesma
                    categoria por diferentes caminhoneirxs.
                  </div>
                </div>
              </div>
            </div>
            <div className="text-section">
              <div className="text-ask">
                “E por que os pontos estão em diferentes cores?”
              </div>
              <div className="text-item">
                Os locais de parada podem aparecer em duas cores no mapa: verde
                ou caramelo. Esses últimos são pontos de publicidade!
              </div>
            </div>
            <div className="text-section">
              <div className="text-ask">
                “Sou dono de um ponto de parada e quero divulgá-lo.”
              </div>
              <div className="text-item">
                Sem problemas! Para divulgação nós alteramos o ícone do seu
                estabelecimento e impulsionamos ele na busca. Mais informações
                estão na aba “Quero divulgar”.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
