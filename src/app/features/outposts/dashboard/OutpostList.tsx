import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Segment,Item, Button, Label, Modal, Header, Icon } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { Outpost } from "../../../models/outpost";
import { useStore } from "../../../stores/store";


interface Props{
    // deleteOutpost: (id: number)=> void;
    // submitting: boolean;
}

export default observer( function OutpostList(){
    
    
    const {outpostStore} = useStore();
    const {outposts,loading,deleteOutpost,loadOutposts} = outpostStore;
    
    const [target,setTarget] = useState(0);
    const [open, setOpen] = React.useState(false)
    //cur id to delete
    const [currentId, setCurrentId] = React.useState(0);

    // function handleOutpostDelete(event: SyntheticEvent<HTMLButtonElement>,id:number){
    //     let currentButton =parseInt(event.currentTarget.id);
    //     setTarget(currentButton);
    //     deleteOutpost(id);
    // }
    function handleOutpostDelete(id:number){

            let currentModalButton = currentId;
            setTarget(currentModalButton);
            deleteOutpost(id);
        }
    
    // if(outposts.length === 1)  loadOutposts();
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
                                    </Item.Description>
                                    <Item.Extra>

                                        {/* <Button 
                                            id={outpost.id}
                                            loading={loading && target === outpost.id} 
                                            onClick={(event) => handleOutpostDelete(event,outpost.id)} 
                                            floated='right' 
                                            content='Usuń' 
                                            color='black'
                                        /> */}

                                        <Modal id={outpost.id}
                                            basic
                                            onClose={() => setOpen(false)}
                                            onOpen={() => 
                                                {
                                                    console.log(outpost.id)   
                                                    setCurrentId(outpost.id);
                                                    setOpen(true)}
                                                }
                                            open={open}
                                            size='small'
                                            trigger={
                                                <Button color='black' floated='right'
                                                >
                                                    Usuń
                                                </Button>
                                            }
                                            >
                                            <Header icon>
                                                <Icon name='trash' />
                                                Usuwanie placówki
                                            </Header>

                                            {
                                                    loading && target === currentId ?
                                                    (
                                                        <LoadingComponent content={`Usuwanie placówki`}/>
                                                    )
                                                    :
                                                    (
                                                        <Modal.Content>
                                                        <p>
                                                            Czy napewno chcesz usunąć daną placówkę ?
                                                        </p>
                                                        </Modal.Content>
                                                    )

                                            }
                                            <Modal.Actions>
                                                <Button basic color='red' inverted onClick={() => 
                                                    {
                                                        console.log(currentId)
                                                        setOpen(false)
                                                    }
                                                    }>
                                                <Icon name='remove' /> Nie
                                                </Button>

                                             
                                                <Button id={outpost.id} color='green' inverted 
                                                        onClick={async (event) => {
                                                            await console.log(outpost.id)
                                                            await handleOutpostDelete(currentId);
                                                            await console.log('usunięto : '+ currentId)
                                                            await setOpen(false);}}
                                                >
                                                    
                                                <Icon name='checkmark' /> Tak
                                                </Button>

                                            </Modal.Actions>
                                        </Modal>

                                        <Button as={Link} to={`/outposts/${outpost.id}`} floated='right' content='Podgląd' color='red'/>
                                        <Button as={Link} to={`/outposts/${outpost.id}/chronicle`} floated='right' content='Kroniki placówki' color='violet'/>
                                       
                                        
                                        <Label > <Icon className="fitIcon" name="map marker alternate"></Icon> {outpost.city}, {outpost.country}</Label>   
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