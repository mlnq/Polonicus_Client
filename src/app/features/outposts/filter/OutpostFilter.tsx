import React from "react";
import { Button, Card, Header, Search, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";


export default function OutpostFiler(){
    const {outpostStore}= useStore();

    return (
        <Card>
        <div style={{display:'flex !important'}}>
           <h3> Filtry: </h3>
           <Card.Description column >
               Sortuj według:
               <Button fluid basic onClick={()=>{outpostStore.sortChroniclesByName()}}>Nazwy placówki</Button>
               <Button fluid basic onClick={()=>{outpostStore.sortChroniclesByCity()}}>Miejscowości</Button>
           </Card.Description>
        </div>
        </Card>
    );
}