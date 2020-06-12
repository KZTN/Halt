import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "react-phone-number-input/input";

import "./styles.scss";
export default function Signup() {
  const [phonefield, setPhonefield] = useState("");
  return (
    <section id="signup">
      <div className="content">
        <h1>Registro</h1>
        <div className="main-content">
          <form action="">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nome"
              required
            />
            <Input
              country="BR"
              name="phone"
              id="phone"
              value={phonefield}
              onChange={setPhonefield}
              placeholder="Telefone"
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              required
            />
            <button type="submit">Cadastrar</button>
          </form>
          <div className="login-actions">
            <span>Já possui uma conta? </span>
            <Link to="/login">
              <button>Entre</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
