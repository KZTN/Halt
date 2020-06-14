import React, { useState, useEffect } from "react";
import { FaPen, FaMap, FaInfo } from "react-icons/fa";
import {Link} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'

import api from "../../services/mongodb";
import "./styles.scss";
export default function Profile({ history }) {
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
  function handlelogout() {
    localStorage.removeItem("id");
    history.push("/")
  }
  return (
    <>
      {isloading ? null : (
        <section id="profile">
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
                <span>Olá, {user.name}</span>
              </div>
            </div>
            <div className="box-actions">
              <Link to="/credentials">
                <div className="box-item">
                  <FaPen color="#000" size={48} />
                  <span>Meus dados</span>
                </div>
              </Link>
              <Link to="/dashboard">
                <div className="box-item">
                  <FaMap color="#000" size={48} />
                  <span>Ver mapa</span>
                </div>
              </Link>
              <div className="box-item">
                <FaInfo color="#000" size={48} />
                <span>Informações do app</span>
              </div>
              <div className="box-item" onClick={handlelogout}>
                <FiLogOut color="#000" size={48} />
                <span>Sair</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
