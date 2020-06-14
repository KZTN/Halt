import React, { useState, useEffect } from "react";
import api from "../../services/mongodb";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import "./styles.scss";
export default function Favorites({ history }) {
  const [user, setUser] = useState(null);
  const [modalisopen, setModalisopen] = useState(false);
  const [selectedpoint, setSelectedpoint] = useState();

  async function getUserData() {
    await api
      .get(`/users/${localStorage.getItem("id")}`)
      .then((response) => {
        console.log(JSON.stringify(response.data[0]));
        setUser(response.data[0]);
      })

      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    if (user === null) {
      getUserData();
    }
  }, [user]);
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      history.push("/login");
    }
  });
  function isOpen() {
    return "Aberto!";
  }
  function handleclick(favitem) {
    setSelectedpoint(favitem);
    setModalisopen(true);
  }
  function handleCloseModal() {
    setModalisopen(false);
    setSelectedpoint(null);
  }

  return (
    <>
      {modalisopen ? (
        <Modal point={selectedpoint} onClick={handleCloseModal} user={user} />
      ) : null}
      {user !== null ? (
        <section id="favorites">
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
            <header>
              <h1>Seus pontos favoritos</h1>
            </header>
            <div className="wrapper-favorites">
              {user.favorites.map((favitem) => (
                <div
                  className="wrapper-item"
                  onClick={() => handleclick(favitem)}
                  key={favitem._id}
                >
                  <div className="item-thumbnail">
                    <img src={favitem.thumbnail} alt="" srcset="" />
                  </div>
                  <div className="wrapper-body">
                    <div className="wrapper-header">
                      <span>{favitem.name}</span>
                      <span>{favitem.rating}</span>
                    </div>
                    <div className="wrapper-content">
                      <span>{isOpen()}</span>
                      <span>
                        {favitem.address.length > 25
                          ? favitem.address.slice(0, 25) + "..."
                          : favitem.address}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
