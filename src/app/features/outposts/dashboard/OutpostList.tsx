import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Segment,Item, Button, Label } from "semantic-ui-react";
import { Outpost } from "../../../models/outpost";
import { useStore } from "../../../stores/store";


interface Props{
    // deleteOutpost: (id: number)=> void;
    // submitting: boolean;
}

export default observer( function OutpostList(){


    const [target,setTarget] = useState(0);

    function handleOutpostDelete(event: SyntheticEvent<HTMLButtonElement>,id:number){
        let currentButton =parseInt(event.currentTarget.id);
        setTarget(currentButton);
        deleteOutpost(id);
    }

    const {outpostStore} = useStore();
    const {outposts,loading,deleteOutpost} = outpostStore;
    return (
        <Segment>
            <Item.Group divided>
                {
                    outposts.map( outpost =>
                        (
                            <Item key={outpost.id}>
                                <Item.Content>
                                    <Item.Header >{outpost.name}</Item.Header>
                                    <Item.Meta></Item.Meta>
                                    <Item.Description> 
                                        <div>{outpost.description}</div>  
                                        <div>{outpost.street}</div>
                                    </Item.Description>
                                    <Item.Extra>

                                        <Button 
                                            id={outpost.id}
                                            loading={loading && target === outpost.id} 
                                            onClick={(event) => handleOutpostDelete(event,outpost.id)} 
                                            floated='right' 
                                            content='Usuń' 
                                            color='black'
                                        />
                                        <Button onClick={() => outpostStore.selectOutpost(outpost.id)} floated='right' content='Podgląd' color='red'/>
                                        <Button floated='right' content='Czytaj' color='violet'/>

                                        <Label content={outpost.city}/>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        )    
                    )
                }
            </Item.Group>
        </Segment>
    );
});