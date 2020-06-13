import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, Polygon } from "react-google-maps";
import { isMobile } from "react-device-detect";
import styles from "./GoogleMapStyles.json";
import "./styles.scss";
import Modal from "../Modal";
import moment from "moment";

import dataset from "../../data/dataset.json";
import coordinates from "./polygons.json";
let Arrcoordinates = coordinates[0].geojson.coordinates[0][0];
let cordArr = [];

Arrcoordinates.map((coordinate) =>
  cordArr.push({ lat: coordinate[1], lng: coordinate[0] })
);
console.log(dataset);
export default function Map() {
  const [elem, setElem] = useState({ lat: -23.46278, lng: -46.53333 });
  const [fieldpressed, setFieldpressed] = useState(false);
  const [mouseover, setMouseover] = useState(false);
  const [selectedpoint, setSelectedpoint] = useState();
  const [zoomChanged, setzoomChanged] = useState(5);
  const [modalisopen, setModalisopen] = useState(false);

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

  useEffect(() => {
    async function getCords() {
      const apigeolocation = await fetch(
        "https://location.services.mozilla.com/v1/geolocate?key=test"
      ).then((el) => el.json());
      setElem({
        lat: apigeolocation.location.lat,
        lng: apigeolocation.location.lng,
      });
    }
    getCords();
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
  function handleCloseModal(data) {
    setModalisopen(false);
  }
  return (
    <>
      {modalisopen ? (
        <Modal point={selectedpoint} onClick={handleCloseModal} />
      ) : null}
      <GoogleMap
        streetViewControl={false}
        defaultZoom={2}
        defaultCenter={{ lat: elem.lat, lng: elem.lng }}
        center={{ lat: elem.lat, lng: elem.lng }}
        zoom={fieldpressed ? zoomChanged : 2}
        onZoomChanged={() => setFieldpressed(false)}
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
        {dataset[0].map((point) => (
          <Marker
            icon={
              point.fav
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
              setMouseover(true);
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
              setMouseover(false);
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
