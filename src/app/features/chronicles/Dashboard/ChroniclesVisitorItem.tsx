import { ContentState, convertFromRaw, EditorState } from "draft-js";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Icon, Item, Label, Modal } from "semantic-ui-react";
import Chronicle from "../../../models/chronicle";
import TextView from "../../../utils/TextView";



interface Props{
  chronicle: Chronicle,
  target:number,
  chronicleDelete: (event: SyntheticEvent<HTMLButtonElement>,id: number) => void,
}


export default observer(function ChroniclesVisitorItem({chronicle,target,chronicleDelete}:Props)
{
      const { chronicleId } = useParams<{ chronicleId: string }>();
      const [open, setOpen] = React.useState(false)

      const [editorState,setEditorState] = useState<EditorState>
      (EditorState.createWithContent(ContentState.createFromText('Brak treści... uzupełnij dane edytując wpis')));
  
  
      
    let DateString = ('0' + chronicle.publicationDate.getDate()).slice(-2) + '/'
    + ('0' + (chronicle.publicationDate.getMonth()+1)).slice(-2) + '/'
    + chronicle.publicationDate.getFullYear();
      
    const viewText= () =>{
      try{
        console.log(chronicle)

        let obj = JSON.parse(chronicle!.description);
        console.log(convertFromRaw(obj))
        setEditorState(EditorState.createWithContent(convertFromRaw(obj)));
    }
    catch(e)
    {
        setEditorState(EditorState.createWithContent(ContentState.createFromText(chronicle!.description)));
    }
    }

  // console.log(chronicle.id);
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
            </Item.Content>
            <Item.Extra>
              <Button.Group vertical color="red" floated="right">

                {
                   <Modal
                   open={open}
                   onClose={() => setOpen(false)}
                   onOpen={() => {
                    setOpen(true);
                    viewText();
                   }}
                   trigger={<Button>Wyświetl</Button>}
                 >
                   <Modal.Header>{chronicle.name}</Modal.Header>
                   <Modal.Content image scrolling >
                     {/* <Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped /> */}
             
                     <TextView data={editorState}/>

                   </Modal.Content>
                   <Modal.Actions>
                     <Button onClick={() => setOpen(false)} primary>
                       Powrót <Icon name='chevron right' />
                     </Button>
                   </Modal.Actions>
                 </Modal>
                }
                {/* <Button
                  as={Link}
                  to={`/outposts/${chronicle.outpostId}/chronicle/${chronicle.id}/details`}
                  floated="right"
                  content="Wyświetl całość"
                  color="violet"
                  icon="level down alternate"
                /> */}
              </Button.Group>
            </Item.Extra>
</Item>);
});