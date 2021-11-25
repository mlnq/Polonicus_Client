import { LatLngExpression } from "leaflet";
import { relative } from "path";
import React, { useEffect, useState } from "react";
// import { Map, Marker, TileLayer, Popup, MapLayer } from "react-leaflet";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L from 'leaflet';
import { Button, Icon, Label } from "semantic-ui-react";
import pointer from '../../../resources/blueMarker.png'
import Markere from './Markere'
import { getSVG } from "./getSVG";
import { useStore } from "../../stores/store";
import { Link } from "react-router-dom";
import LoadingComponent from "../../layout/LoadingComponent";

 

export default function OutpostMap() {

  const {outpostStore,utilsStore} = useStore();
  const {outpostRegistry,loadAllOutposts,outposts,allOutposts} = outpostStore;

  useEffect( () =>{
    if(!allOutposts)
    {
      loadAllOutposts();
    }

  },[loadAllOutposts]);
  
  console.log(outposts)

  const position : LatLngExpression = [53.132488, 23.168840];
  const zoom : number = 3.8;
  // let positions: LatLngExpression[] =[
  //   [52.2573504,21.0385742],[53.1343092,23.1472411]];
    
  return (
    <div className='mapContainer'>

       <MapContainer className='map' center={position} zoom={zoom} scrollWheelZoom={false}>
            <TileLayer
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                  
           {/* <Marker position={position} >
              <Popup>
                  <Button>dfddfdf</Button>
              </Popup>
            </Marker> */}
          
              {
                outposts.map((outpost)=>
                          (
                          <Marker  position={[Number(outpost.coord_latitude),Number(outpost.coord_longtiude)]} key={outpost.id}>
                            <Popup>
                                <div style={{display:"flex",flexDirection:'column'}}>
                                  <span><strong>Nazwa placówki: </strong>{outpost.name}</span>
                                  <span><strong>Miasto: </strong> {outpost.city}</span>
                                  <span><strong>Ulica: </strong> {outpost.street}</span>
                                  {/* <Button as={Link} to={``}>Przeczytaj kroniki</Button> */}
                                </div>
                            </Popup>
                          </Marker>
                          )
                          )
              }
  

        </MapContainer>
    </div>
  );

 
}

{
  /* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer> */
}
