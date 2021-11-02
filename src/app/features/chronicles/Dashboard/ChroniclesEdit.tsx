import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";



export default observer (function OutpostDetails()
{

    const {chronicleStore} = useStore();
    const {selectedChronicle,loadChronicle} = chronicleStore;
    const {id} = useParams<{id: string}>();
    const {outpostId} = useParams<{outpostId: string}>();

    useEffect(()=>{
        if(id && outpostId) loadChronicle(parseInt(outpostId),parseInt(id));
    },[id,loadChronicle])
    
    //obsługa w sytuacji kiedy outpost nie istnieje w kodzie
    if(!selectedChronicle) return <LoadingComponent/>;

    return (
        <Card fluid>
            <Card.Content>
                    <Card.Header>
                        {selectedChronicle?.name}
                    </Card.Header>
                    <Card.Meta>
                        {'Kartka z kalendarza dzień: '+ selectedChronicle?.publicationDate}
                    </Card.Meta>
                    <Card.Description>
                        {selectedChronicle?.description}
                    </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group>
                        <Button as={Link} to={`/editOutpost/${id}`}  basic color='red' content='Edit'/>
                        <Button as={Link} to={`/outposts`} basic color='grey' content='cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    );
});