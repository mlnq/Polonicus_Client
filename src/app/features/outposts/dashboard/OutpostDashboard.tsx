import { observer } from 'mobx-react-lite';
import React, { useEffect } from "react";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Grid} from "semantic-ui-react";
import { Outpost } from "../../../models/outpost";
import { useStore } from "../../../stores/store";
import OutpostDetails from "../details/OutpostDetails";
import OutpostFilter from '../filter/OutpostFilter';
import OutpostForm from "../form/OutpostForm";
import OutpostList from "./OutpostList";
import LoadingComponent from '../../../layout/LoadingComponent';


export default observer(function OutpostDashboard(){

    const {outpostStore,userStore} = useStore();   
    const {outpostRegistry,loadOutposts} = outpostStore;
    const {isLogged}=userStore;


  
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

                {
                    isLogged?(
                        <Button as={Link} to="/outpostCreate" name="outpostCreate" negative content='Stwórz Placówke'/>
                    ):null
                }
                 <OutpostFilter/>


            </Grid.Column>
        </Grid>
    );
});