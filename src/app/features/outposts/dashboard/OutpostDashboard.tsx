import { observer } from 'mobx-react-lite';
import React, { useEffect } from "react";
import { useParams } from 'react-router';
import { Grid} from "semantic-ui-react";
import LoadingComponent from '../../../layout/LoadingComponent';
import { Outpost } from "../../../models/outpost";
import { useStore } from "../../../stores/store";
import OutpostDetails from "../details/OutpostDetails";
import OutpostForm from "../form/OutpostForm";
import OutpostList from "./OutpostList";


export default observer(function OutpostDashboard(){

    const {outpostStore} = useStore();   
    const {outpostRegistry,loadOutposts} = outpostStore;


  
    useEffect(()=>{
       if(outpostRegistry.size <= 0 ) loadOutposts();

    },[outpostRegistry.size,loadOutposts]);


    if(outpostStore.loadingInitial ) return <LoadingComponent content={"loading Polonicus"}/> 
    return(
        <Grid>
            <Grid.Column width='12'>
                <OutpostList />
            </Grid.Column>
            <Grid.Column width='4'>
                whatever man
            </Grid.Column>
        </Grid>
    );
});