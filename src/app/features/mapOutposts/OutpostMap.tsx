import { LatLngExpression } from "leaflet";
import React from "react";
// import { Map, Marker, TileLayer, Popup, MapLayer } from "react-leaflet";
import { MapContainer,Marker, TileLayer, Popup } from "react-leaflet";

//TODO usztywnić mapę..
export default function OutpostMap() {
  const position : LatLngExpression = [59.91174337077401, 10.750425582038146];
  const zoom : number = 15;
  return (
       <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} style={{height: '400px',width: '80%',margin:'0 auto;'}}>
            <TileLayer
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                // Placeholder, we'll put our markers here
            }
        </MapContainer>
       

  );
}

 {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer> */}