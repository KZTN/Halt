import React, {useEffect} from "react";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import MapContainer from "../../components/Map";
import Nav from "../../components/Nav";
import "./styles.scss";
export default function Dashboard({history}) {
  const MapWrapped = withScriptjs(withGoogleMap(MapContainer));
  useEffect(() => {
    if(!localStorage.getItem("id")) {
      history.push("/login");
    }
  }, [history]);
  return (
    <>
      <Nav history={history}/>
      <section id="dashboard">
        <div className="map">
          <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </section>
    </>
  );
}
