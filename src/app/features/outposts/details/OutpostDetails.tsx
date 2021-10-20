import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";



export default function OutpostDetails()
{

    const {outpostStore} = useStore();
    const {selectedOutpost, cancelSelectedOutpost,formOpen} = outpostStore;

    if(! selectedOutpost) return <LoadingComponent/>;

    return (
        <Card fluid>
            <Card.Content>
                    <Card.Header>
                        {selectedOutpost?.name}
                    </Card.Header>
                    <Card.Meta>
                        {selectedOutpost?.city}
                    </Card.Meta>
                    <Card.Description>
                        {selectedOutpost?.description}
                    </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group>
                        <Button onClick={() => formOpen(selectedOutpost?.id)} basic color='red' content='Edit'/>
                        <Button onClick={cancelSelectedOutpost} basic color='grey' content='cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    );
}