import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";
import ChroniclesList from "./ChroniclesList";



export default observer(function ChroniclesDashBoard(){

    const {chronicleStore} = useStore(); 
    const {loadChronicles} = chronicleStore;
    const {outpostId} = useParams<{outpostId: string}>();

    useEffect(()=>{
        if(outpostId) 
        loadChronicles(parseInt(outpostId)).then(
            () =>console.log(outpostId));
    },[loadChronicles,outpostId])

    if(chronicleStore.loadingInitial ) return <LoadingComponent content={"loading Polonicus"}/> 
    return(
        <Grid>
            <Grid.Column width='12'>
                <ChroniclesList />
            </Grid.Column>
            <Grid.Column width='4'>
                {/* chronicles options */}
                <Button primary as={Link} to={`/outposts/${outpostId}/chronicleCreate`} >Dodaj Kronike</Button>

            </Grid.Column>
        </Grid>
    );
});