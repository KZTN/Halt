import React, { useEffect, useState } from "react";
import "./styles.scss";
import { FaTimes, FaWhatsapp, FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import api from "../../services/mongodb";
import CovidSeal from "../../assets/covid_seal.png";
import LGBTSeal from "../../assets/lgbt_seal.png";
import VeganSeal from "../../assets/vegan_seal.png";
import WifiSeal from "../../assets/wifi_seal.png";
import WomanSeal from "../../assets/woman_seal.png";

export default function Modal({ point, onClick, user, onChange }) {
  const [isfavorite, setIsfavorite] = useState(false);
  const [favchanged, setFavchanged] = useState(false);
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState();
  useEffect(() => {
    user.favorites.map((favitem) => {
      if (favitem !== null) {
        if (favitem._id === point._id) {
          setIsfavorite(true);
        }
      }
    });
  }, [point._id, user.favorites]);

  async function handleFavorite() {
    if (!isfavorite) {
      await api
        .post("/favorite", { _id: user._id, favorite_id: point._id })
        .then(() => {
          alert("Adicionado a sua lista de favoritos");
          setIsfavorite(true);
          setFavchanged(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await api
        .put("/favorite", { _id: user._id, favorite_id: point._id })
        .then(() => {
          alert("Removido da sua lista de favoritos");
          setIsfavorite(false);
          setFavchanged(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function popupWPP() {
    window.open(`https://wa.me/${point.phone}`, "_top");
  }
  async function handleCloseModal() {
    await onClick({});
    if (favchanged) {
      await onChange(true);
    }
  }
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [handleCloseModal]);

  async function handleSubmit(e) {
    e.preventDefault();
    await api
      .post("/comment", {
        location_id: point._id,
        author: user._id,
        comment: comment,
        rate: rate,
      })
      .then(() => {
        alert("Comentário enviado com sucesso");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="modal">
      <div className="content">
        <div className="close-button">
          <span>#{point._id}</span>
          <button onClick={handleCloseModal}>
            <FaTimes size={24} color="#444" />
          </button>
        </div>
        <div className="details">
          <div className="box-img">
            <img src={point.thumbnail} />
          </div>
          <div className="box-main-details">
            <h1 style={{ marginBottom: 20 }}>
              <strong>{point.name}</strong>
            </h1>
            <div className="box-main-item" style={{ marginBottom: 2 }}>
              <h3>Estadia: R${point.value}</h3>
            </div>
            <div className="box-main-item" style={{ marginBottom: 2 }}>
              <h3>
                Avaliação: {point.rating}
                <FaStar size={12} color="#222" style={{ marginBottom: 1 }} />
              </h3>
            </div>
            <div className="box-main-item" style={{ marginBottom: 10 }}>
              <h5>
                Horário de funcionamento: {point.open_time} às {point.close_time}
              </h5>
            </div>
            <div className="box-wrapper-seals">
              {point.woman_seal ? (
                <div className="wrapper-item">
                  <img src={WomanSeal} alt="" srcset="" />
                </div>
              ) : null}
              {point.vegan_seal ? (
                <div className="wrapper-item">
                  <img src={VeganSeal} alt="" srcset="" />
                </div>
              ) : null}
              {point.lgbt_seal ? (
                <div className="wrapper-item">
                  <img src={LGBTSeal} alt="" srcset="" />
                </div>
              ) : null}
              {point.wifi_seal ? (
                <div className="wrapper-item">
                  <img src={WifiSeal} alt="" srcset="" />
                </div>
              ) : null}
              {point.covid_seal ? (
                <div className="wrapper-item">
                  <img src={CovidSeal} alt="" srcset="" />
                </div>
              ) : null}
            </div>
            <div className="contact" onClick={popupWPP}>
              <FaWhatsapp size={24} color="#fff" style={{ marginRight: 5 }} />
              <span>Entre em contato</span>
            </div>
            <div className="favorites" onClick={handleFavorite}>
              <FiHeart size={24} color="#666" />
              {!isfavorite ? (
                <span>Adicionar a sua lista de favoritos</span>
              ) : (
                <span>Remover da sua lista de favoritos</span>
              )}
            </div>
            <div className="comments">
              <h1>Comentários:</h1>
              {point.comments.map((e) => (
                <div className="comment">
                  <div className="comment-header">
                    <div className="comment-author">
                        <img src={e.author.thumbnail? e.author.thumbnail: "https://media.discordapp.net/attachments/697512026251067472/711345678885847140/user-solid.png"} alt="" />
                      <span>{e.author.name}</span>
                    </div>
                    <div className="comment-rating">
                      <span>{e.rate}</span>
                      <FaStar
                        size={12}
                        color="#222"
                        style={{ marginBottom: 1 }}
                      />
                    </div>
                  </div>

                  <div className="comment-body">
                    <span>{e.comment}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="make-comment">
              <h1>faça um comentário:</h1>
              <form onSubmit={handleSubmit}>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Descreva em detalhes o que achou deste estabelecimento."
                ></textarea>
                <div className="wrap">
                  <input
                    type="number"
                    placeholder="nota"
                    min="1"
                    max="5"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                  <button type="submit">Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
