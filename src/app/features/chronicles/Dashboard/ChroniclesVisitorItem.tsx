import { ContentState, convertFromRaw, EditorState } from "draft-js";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Icon, Item, Label, Modal } from "semantic-ui-react";
import Chronicle from "../../../models/chronicle";
import { useStore } from "../../../stores/store";
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
      const {chronicleStore} =useStore();

      const [editorState,setEditorState] = useState<EditorState>
      (EditorState.createWithContent(ContentState.createFromText('Brak treści... uzupełnij dane edytując wpis')));
  
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

            <Item.Content className="itemContent">
              <Item.Header>{chronicle.name}</Item.Header>
              <Item.Meta>
                <Label className="date">
                  <span>
                  <Icon name='calendar alternate outline' style={{ display: 'inline'}}/>
                  <span style={{marginLeft: '5px' }}>
                  {chronicleStore.dateFormat(chronicle)}
                  </span>
                  </span>
                </Label>
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
              </Button.Group>
            </Item.Extra>
</Item>);
});