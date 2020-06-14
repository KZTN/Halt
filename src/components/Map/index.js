import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, Polygon } from "react-google-maps";
import styles from "./GoogleMapStyles.json";
import "./styles.scss";
import Modal from "../Modal";
import Nav from "../Nav";

import moment from "moment";
import dataset from "../../data/dataset.json";
import coordinates from "./polygons.json";
import api from "../../services/mongodb";
let Arrcoordinates = coordinates[0].geojson.coordinates[0][0];
let cordArr = [];

Arrcoordinates.map((coordinate) =>
  cordArr.push({ lat: coordinate[1], lng: coordinate[0] })
);
console.log(dataset);
export default function Map({ history }) {
  const [elem, setElem] = useState({ lat: -23.4026363, lng: -46.3296255 });
  const [selectedpoint, setSelectedpoint] = useState();
  const [zoomChanged, setzoomChanged] = useState(14);
  const [modalisopen, setModalisopen] = useState(false);
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState([]);
  const [isloading, setIsloading] = useState(true);

  async function getCords() {
    const apigeolocation = await fetch(
      "https://location.services.mozilla.com/v1/geolocate?key=test"
    ).then((el) => el.json());
    setElem({
      lat: apigeolocation.location.lat,
      lng: apigeolocation.location.lng,
    });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => {
        getCords();
      },
      (err) => {
        console.log(err);
        if (err.code === 2) {
          getCords();
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }, []);

  async function getUserData() {
    await api
      .get(`/users/${localStorage.getItem("id")}`)
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function getLocationData() {
    await api
      .get(`/locations/`)
      .then((response) => {
        setPoints(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getUserData();
    getLocationData();
  }, []);
  useEffect(() => {
    if (user !== null && points.length !== 0) {
      setIsloading(false);
    }
  }, [user, points.length]);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedpoint(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  function isopened(selectedpoint) {
    var format = "hh:mm";
    var time = moment();
    var beforetime = moment(selectedpoint.open_time, format);
    var aftertime = moment(selectedpoint.close_time, format);

    if (time.isBetween(beforetime, aftertime)) {
      return "aberto";
    } else {
      return "fechado";
    }
  }
  function handleCloseModal() {
    setModalisopen(false);
    setSelectedpoint(null);
  }
  async function handleRefreshMap(data) {
    if (data) {
      getUserData();
    }
  }
  function handleInputField(data) {
    setzoomChanged(12);
    setTimeout(() => {
      setzoomChanged(14);
    }, 500);
    setElem({
      lat: data.location.coordinates[0],
      lng: data.location.coordinates[1],
    });
  }

  return (
    <>
      <Nav onSubmit={handleInputField} />
      {modalisopen ? (
        <Modal
          point={selectedpoint}
          onClick={handleCloseModal}
          user={user}
          onChange={handleRefreshMap}
        />
      ) : null}
      <GoogleMap
        streetViewControl={false}
        defaultZoom={14}
        defaultCenter={{ lat: -23.4026363, lng: -46.3296255 }}
        center={{ lat: elem.lat, lng: elem.lng }}
        zoom={zoomChanged}
        defaultOptions={{
          styles: styles,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        <Polygon
          paths={cordArr}
          options={{
            strokeColor: "rgba(0,0,0,0.5)",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "rgba(255,255,255,0.2)",
            fillOpacity: 0.35,
          }}
        />
        <Marker
          icon={{
            url: require("./pin_me.png"),
            scaledSize: new window.google.maps.Size(60, 60),
          }}
          position={{
            lat: elem.lat,
            lng: elem.lng,
          }}
        />
        {points.map((point) => (
          <Marker
            icon={
              isloading
                ? null
                : user.favorites.filter((e) =>
                    e !== null ? e._id === point._id : null
                  ).length !== 0
                ? {
                    url: require("./fav_pin.png"),
                    scaledSize: new window.google.maps.Size(40, 40),
                  }
                : {
                    url: require("./pin.png"),
                    scaledSize: new window.google.maps.Size(40, 40),
                  }
            }
            key={point._id}
            position={{
              lat: point.location.coordinates[0],
              lng: point.location.coordinates[1],
            }}
            onClick={() => {
              setSelectedpoint(point);
              setElem({
                lat: point.location.coordinates[0],
                lng: point.location.coordinates[1],
              });
            }}
          />
        ))}
        {selectedpoint && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedpoint(null);
            }}
            position={{
              lat: selectedpoint.location.coordinates[0],
              lng: selectedpoint.location.coordinates[1],
            }}
          >
            <div
              onClick={() => {
                setModalisopen(true);
              }}
              className="box-info"
            >
              <h3>{selectedpoint.name}</h3>
              <span>Avaliação: {selectedpoint.rating}⋆</span>
              <strong>{isopened(selectedpoint)}</strong>
              <div className="box-content"></div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}
