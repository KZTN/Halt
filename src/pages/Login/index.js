import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import api from '../../services/mongodb';
import "./styles.scss";

export default function Login({history}) {
  const [emailfield, setEmailfield] = useState("");
  const [passwordfield, setPasswordfield] = useState("");
  useEffect(() => {
    if(localStorage.getItem("id")) {
      history.push("/dashboard");
    }
  }, [history]);
  async function handleSubmit(e) {
    e.preventDefault();
    await api.post('/sessions', {password: passwordfield, email: emailfield}).then((response) => {
      if(response.data) {
        localStorage.setItem("id", response.data);
        history.push("/dashboard");
      }
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <section id="login">
      <div className="content">
        <h1>Entre</h1>
        <div className="main-content">
          <form onSubmit={handleSubmit}>
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
              minLength={6}
              type="password"
              name="password"
              id="password"
              value={passwordfield}
              onChange={(e) => setPasswordfield(e.target.value)}
              placeholder="Senha"
              required
            />
            <button type="submit">Entrar</button>
          </form>
          <div className="login-actions">
            <span>Novo no Halt? </span>
            <Link to="/signup">
              <button>Cadastre-se</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
