import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, Polygon } from "react-google-maps";
import { isMobile } from "react-device-detect";
import styles from "./GoogleMapStyles.json";
import "./styles.scss";
import Form from "../Form";
import dataset from "../../data/dataset.json";
import coordinates from "./polygons.json";
let Arrcoordinates = coordinates[0].geojson.coordinates[0][0];
let cordArr = [];

Arrcoordinates.map((coordinate) =>
    cordArr.push({ lat: coordinate[1], lng: coordinate[0] })
);
export default function Map() {
    const [elem, setElem] = useState({ lat: -23.46278, lng:  -46.53333 });
    const [fieldpressed, setFieldpressed] = useState(false);
    const [zoomChanged, setzoomChanged] = useState(5);
    async function getCords() {

          const apigeolocation = await fetch(
            'https://location.services.mozilla.com/v1/geolocate?key=test'
          ).then((el) => el.json());
          setElem({ lat: apigeolocation.location.lat, lng: apigeolocation.location.lng })    
      }
    
      useEffect(() => {
        getCords();
      }, []);
    function handleInputField(data) {
        try {
            const result = dataset.filter(
                (e) =>
                    e.formatted_name &&
                    e.formatted_name.toLowerCase() ===
                        data.inputfield.toLowerCase()
            );
            if (result) {
                setFieldpressed(true);
                if (!isMobile) {
                    setzoomChanged(13);
                    setTimeout(() => {
                        setzoomChanged(15);
                    }, 500);
                } else {
                    setzoomChanged(15);
                }
                setElem({
                    lat: result[0].location.coordinates[0],
                    lng: result[0].location.coordinates[1],
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (

        <>
            <GoogleMap
                streetViewControl={false}
                defaultZoom={15}
                defaultCenter={{ lat: elem.lat, lng: elem.lng }}
                center={{ lat: elem.lat, lng: elem.lng }}
                zoom={fieldpressed ? zoomChanged : 15}
                onZoomChanged={() => setFieldpressed(false)}
                defaultOptions={{
                    styles: styles,
                    mapTypeControl: false,
                    streetViewControl: false,
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
                {dataset
                    .filter((city) => city.location && city.danger >= 2)
                    .map((city) => (
                        <Marker
                            icon={
                                city.danger === 4
                                    ? {
                                          url: require("./circle.png"),
                                          scaledSize: new window.google.maps.Size(
                                              9,
                                              9
                                          ),
                                      }
                                    : city.danger === 3
                                    ? {
                                          url: require("./circle_y.png"),
                                          scaledSize: new window.google.maps.Size(
                                              9,
                                              9
                                          ),
                                      }
                                    : {
                                          url: require("./circle_b.png"),
                                          scaledSize: new window.google.maps.Size(
                                              9,
                                              9
                                          ),
                                      }
                            }
                            key={city._id}
                            position={{
                                lat: city.location.coordinates[0],
                                lng: city.location.coordinates[1],
                            }}
                        />
                    ))}
            </GoogleMap>
        </>
    );
}
