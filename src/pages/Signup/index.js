import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "react-phone-number-input/input";
import api from "../../services/mongodb";

import "./styles.scss";
export default function Signup({ history }) {
  const [namefield, setNamefield] = useState("");
  const [phonefield, setPhonefield] = useState("");
  const [emailfield, setEmailfield] = useState("");
  const [passwordfield, setPasswordfield] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    await api
      .post("/users", {
        name: namefield,
        phone: phonefield,
        email: emailfield,
        password: passwordfield,
      })
      .then(async (response) => {
        if (response.data) {
          await api
            .post("/sessions", { password: passwordfield, email: emailfield })
            .then((response) => {
              if (response.data) {
                localStorage.setItem("id", response.data);
                history.push("/dashboard");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
  }
  return (
    <section id="signup">
      <div className="content">
        <h1>Registro</h1>
        <div className="main-content">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nome"
              value={namefield}
              onChange={(e) => setNamefield(e.target.value)}
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
              value={emailfield}
              onChange={(e) => setEmailfield(e.target.value)}
              placeholder="E-mail"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              value={passwordfield}
              onChange={(e) => setPasswordfield(e.target.value)}
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
