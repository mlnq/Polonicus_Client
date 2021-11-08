import { ContentState, convertFromRaw, Editor, EditorState } from "draft-js";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { store, useStore } from "../../../stores/store";
import TextEditor from "../../../utils/TextEditor";
import TextView from "../../../utils/TextView";

import storedState from "./test.json";


export default observer (function OutpostDetails()
{

    const {chronicleStore} = useStore();
    const {selectedChronicle,loadChronicle} = chronicleStore;
    const {id} = useParams<{id: string}>();
    const {outpostId} = useParams<{outpostId: string}>();

    const [editorState,setEditorState] = useState<EditorState>
    (EditorState.createWithContent(ContentState.createFromText('Brak treści... uzupełnij dane edytując wpis')));


    useEffect(()=>{
        if(id && outpostId) 
        {
            
            loadChronicle(parseInt(outpostId),parseInt(id)).then(
                ch=>{

                    try{
                        let obj = JSON.parse(ch!.description);
                        console.log(convertFromRaw(obj))
                        setEditorState(EditorState.createWithContent(convertFromRaw(obj)));
                    }
                    catch(e)
                    {
                        setEditorState(EditorState.createWithContent(ContentState.createFromText(ch!.description)));
                    }
                }

            )
        };
    },[id,loadChronicle])
    
    //obsługa w sytuacji kiedy outpost nie istnieje w kodzie
    if(!selectedChronicle) return <LoadingComponent/>;


    function readRawDataJSON(desc:any){
        let obj = JSON.parse(desc);
        let contentState = convertFromRaw(obj);    
        setEditorState(EditorState.createWithContent(contentState));
    }
    ///TEST
    let obj:any; 
    obj= storedState;
    const contentState = convertFromRaw(obj);
    const editorStatee = EditorState.createWithContent(contentState);
    
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
                        {
                        selectedChronicle.description ?
                        <TextView data={editorState}/>
                        :null
                        }
                        {/* {selectedChronicle?.description} */}
                    </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group>
                        <Button as={Link} to={`/outposts/${outpostId}/editChronicle/${id}`}  basic color='red' content='Edit'/>
                        <Button as={Link} to={`/outposts/${outpostId}/chronicle`} basic color='grey' content='cancel'/>
                </Button.Group>
            </Card.Content>
            

           
            {/* <TextTestEditor ></TextTestEditor> */}
        </Card>
    );
});