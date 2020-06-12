import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
export default function Login() {
  return (
    <section id="login">
      <div className="content">
        <h1>Entre</h1>
        <div className="main-content">
          <form action="">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              required
            />
            <input
              minLength={6}
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              required
            />
            <button type="submit">Entrar</button>
          </form>
          <div className="login-actions">
            <span>Novo no algo? </span>
            <Link to="/signup">
              <button>Cadastre-se</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
