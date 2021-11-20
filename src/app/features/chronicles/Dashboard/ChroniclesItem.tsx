import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Item, Label } from "semantic-ui-react";
import Chronicle from "../../../models/chronicle";
import { useStore } from "../../../stores/store";



interface Props{
  chronicle: Chronicle,
  target:number,
  chronicleDelete: (event: SyntheticEvent<HTMLButtonElement>,id: number) => void,
}


export default observer( 
function ChroniclesItem({chronicle,target,chronicleDelete}:Props)
{
  const { chronicleId } = useParams<{ chronicleId: string }>();
  const {userStore} =useStore();
  const {isLogged}=userStore;
  // console.log(chronicle.id);

  let DateString = ('0' + chronicle.publicationDate.getDate()).slice(-2) + '/'
+ ('0' + (chronicle.publicationDate.getMonth()+1)).slice(-2) + '/'
+ chronicle.publicationDate.getFullYear();

return(
<Item >
            <Item.Image
              size="tiny"
              src="https://react.semantic-ui.com/images/wireframe/image.png"
            ></Item.Image>

            <Item.Content>
              <Item.Header>{chronicle.name}</Item.Header>
              <Item.Meta>
                <Label className="date">{DateString}</Label>
              </Item.Meta>
              <Item.Description>
                {/* {chronicle.description.slice(0, 10)}... */} ...
              </Item.Description>
            </Item.Content>
            <Item.Extra>
              <Button.Group vertical color="red" floated="right">
                
                {
                  //sprawdzenie czy id jest jego z kroniką zgodne 
                  //czy ma permisje i
                  //czy jest zalogowany
                  isLogged? (
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
                    />)
                  :
                  null
                }
                <Button
                  as={Link}
                  to={`/outposts/${chronicle.outpostId}/editChronicle/${chronicle.id}`}
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