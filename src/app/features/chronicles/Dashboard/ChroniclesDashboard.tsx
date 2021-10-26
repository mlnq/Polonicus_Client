import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";
import ChroniclesList from "./ChroniclesList";



export default observer(function ChroniclesDashBoard(){

    const {chronicleStore} = useStore(); 
    const {loadChronicles} = chronicleStore;
    const {id} = useParams<{id:string}>();

    useEffect(()=>{
        if(id) loadChronicles(parseInt(id)).then(() =>console.log(id));
    },[loadChronicles,id])

    if(chronicleStore.loadingInitial ) return <LoadingComponent content={"loading Polonicus"}/> 
    return(
        <Grid>
            <Grid.Column width='12'>
                <ChroniclesList />
            </Grid.Column>
            <Grid.Column width='4'>
                chronicles options
            </Grid.Column>
        </Grid>
    );
});