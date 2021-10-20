import { observer } from 'mobx-react-lite';
import React from "react";
import { Grid} from "semantic-ui-react";
import { Outpost } from "../../../models/outpost";
import { useStore } from "../../../stores/store";
import OutpostDetails from "../details/OutpostDetails";
import OutpostForm from "../form/OutpostForm";
import OutpostList from "./OutpostList";

interface Props{
  outposts: Outpost[];
  deleteOutpost: (id: number)=> void;
  submitting: boolean;
}

export default observer(function OutpostDashboard({deleteOutpost,
    // submitting
}:Props){

    const {outpostStore} = useStore();   
    const {selectedOutpost, editMode} = outpostStore; 
    
    return(
        <Grid>
            <Grid.Column width='10'>
                <OutpostList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedOutpost && !editMode &&
                 <OutpostDetails/>}
                
                {editMode &&
                <OutpostForm/>
                }
               
            </Grid.Column>
        </Grid>
    );
});