import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label } from "semantic-ui-react";
import Chronicle from "../../../models/chronicle";



interface Props{
  chronicle: Chronicle,
  target:number,
  chronicleDelete: (event: SyntheticEvent<HTMLButtonElement>,id: number) => void,
}


export default observer( 
function ChroniclesItem({chronicle,target,chronicleDelete}:Props)
{

  console.log(chronicle.id);
return(
<Item >
            <Item.Image
              size="tiny"
              src="https://react.semantic-ui.com/images/wireframe/image.png"
            ></Item.Image>

            <Item.Content>
              <Item.Header>{chronicle.name}</Item.Header>
              <Item.Meta>
                <Label className="date">{chronicle.publicationDate}</Label>
              </Item.Meta>
              <Item.Description>
                {chronicle.description.slice(0, 10)}...
              </Item.Description>
            </Item.Content>
            <Item.Extra>
              <Button.Group vertical color="red" floated="right">
                <Button
                  id={chronicle.id}
                  loading={target === chronicle.id}
                  onClick={(event) =>{
                    chronicleDelete(event, chronicle.id);
                    }
                  }
                  floated="right"
                  content="Usuń"
                  icon="trash"
                />
                <Button
                  as={Link}
                  to={`/outposts/${chronicle.outpostId}`}
                  floated="right"
                  content="Edycja"
                  color="red"
                  icon="edit"
                />
                <Button
                  as={Link}
                  to={`/outposts/${chronicle.outpostId}/chronicle/${chronicle.id}/details`}
                  floated="right"
                  content="Wyświetl całość"
                  color="violet"
                  icon="level down alternate"
                />
              </Button.Group>
            </Item.Extra>
</Item>);
});