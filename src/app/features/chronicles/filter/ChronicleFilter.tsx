import { render } from "@testing-library/react";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, ButtonGroup, Card, CardContent, Header, Icon } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

export default observer( function ChroniclesFilter(){

    const [dataFilterBtn,setDataFilterBtn] = useState('type:basic');

    const {chronicleStore}= useStore();

    return(
            <Card>
                 <div style={{display:'flex !important'}}>
                    <h3> Filtry: </h3>
                    <Card.Description column >
                        Sortuj według:
                        <Button fluid basic onClick={()=>{chronicleStore.sortChroniclesByDate()}}>Daty</Button>
                        <Button fluid basic onClick={()=>{chronicleStore.sortChroniclesByName()}}>Tytułu</Button>
                    </Card.Description>
                 </div>
            </Card>

    );
});