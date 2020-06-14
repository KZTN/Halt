import React, { useState, useEffect } from "react";
import api from "../../services/mongodb";
import {FaArrowLeft} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import "./styles.scss";
import Input from "react-phone-number-input/input";

export default function Credentials({ history }) {
  const [thumbnailfield, setThumbnailfield] = useState("");
  const [phonefield, setPhonefield] = useState("");
  const [namefield, setNamefield] = useState("");
  const [passwordfield, setPasswordfield] = useState("");

  const [user, setUser] = useState();
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    async function getUserData() {
      await api
        .get(`/users/${localStorage.getItem("id")}`)
        .then((response) => {
          setUser(response.data[0]);
          setIsloading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsloading(false);
        });
    }
    if (localStorage.getItem("id") && isloading === true) {
      getUserData();
    } else if (!localStorage.getItem("id")) {
      history.push("/login");
    }
  });

  return (
    <>
      {isloading ? null : (
        <section id="credentials">
          <div className="content">
            <div className="header">
              <div className="wrapper">
                <h1>Halt</h1>
                <span>contato</span>
              </div>
            </div>
            <div className="me">
              <img
                src={
                  user.thumbnail
                    ? user.thumbnail
                    : "https://media.discordapp.net/attachments/697512026251067472/711345678885847140/user-solid.png"
                }
                alt=""
              />
              <div className="greetings">
                <span>Seus dados pessoais</span>
              </div>
            </div>
            <div className="box-actions">
                <Link to="/profile"><button><FaArrowLeft color="#333" size={24}/> </button></Link>
            </div>
            <form action="">
              <div className="card-credentials">
                <div className="card-item">
                  <label htmlFor="thumbnail">Envie um link com sua foto</label>
                </div>
                <div className="card-item">
                  <input
                    type="text"
                    id="thumbnail"
                    name="thumbnail"
                    value={thumbnailfield}
                    onChange={(e) => setThumbnailfield(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit">salvar</button>
              <div className="card-credentials">
                <div className="card-item">
                  <label htmlFor="thumbnail">Telefone</label>
                </div>
                <div className="card-item">
                  <Input
                    country="BR"
                    type="text"
                    id="phone"
                    name="phone"
                    value={phonefield}
                    placeholder={user.phone}
                    onChange={(e) => setPhonefield(e.target.value)}
                  />
                </div>
                <div className="card-item">
                  <label htmlFor="thumbnail">Nome</label>
                </div>
                <div className="card-item">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={namefield}
                    placeholder={user.name}
                    onChange={(e) => setNamefield(e.target.value)}
                  />
                </div>
                <div className="card-item">
                  <label htmlFor="thumbnail">Senha</label>
                </div>
                <div className="card-item">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={passwordfield}
                    onChange={(e) => setPasswordfield(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit">salvar</button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
