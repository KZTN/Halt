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

export default function Modal({ point, onClick }) {
  const [isfavorite, setIsfavorite] = useState(false);
  const [user, setUser] = useState(false);
  useEffect(() => {
    async function getData() {
      await api
        .get(`users/${localStorage.getItem("id")}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getData();
  }, []);
  /*   async function handleFavorite() {
    if (!isfavorite) {
      console.log('recebi a ordem de adicionar');
      await api
        .put(`/favorites/${voucher._id}`, null, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then(() => {
          if (isfavorite) {
            setIsfavorite(false);
          } else {
            setIsfavorite(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('recebi a ordem de deletar');
      await api
        .delete(`/favorites/${voucher._id}`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then(() => {
          if (isfavorite) {
            setIsfavorite(false);
          } else {
            setIsfavorite(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } */

  function popupWPP() {
    window.open(`https://wa.me/55${point.phone}`, "_top");
  }
  async function handleCloseModal() {
    await onClick({});
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
            <h1>
              <strong>{point.name}</strong>
            </h1>
            <div className="box-main-item">
              <h3>
                Avaliação: {point.rating}
                <FaStar size={12} color="#222" style={{ marginBottom: 1 }} />
              </h3>
            </div>
            <div className="box-main-item">
              <h3>Estadia: R${point.value}</h3>
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
            <div className="favorites" /* onClick={handleFavorite} */>
              <FiHeart size={24} color="#666" />
              {!isfavorite ? (
                <span>Adicionar a sua lista de favoritos</span>
              ) : (
                <span>Remover da sua lista de favoritos</span>
              )}
            </div>
          </div>
        </div>
        <div className="box-info">
          <div className="description"></div>
        </div>
      </div>
    </div>
  );
}
