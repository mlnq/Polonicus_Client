import { observer } from "mobx-react-lite";
import React, { ChangeEvent,useState } from "react";
import { ButtonGroup, Form, Segment } from "semantic-ui-react";
import { Outpost } from "../../../models/outpost";
import { useStore } from "../../../stores/store";


export default observer( function OutpostForm(){

    const {outpostStore} = useStore();
    const {selectedOutpost, formClose,createOutpost,updateOutpost,loading} = outpostStore;


    const initialState = selectedOutpost ?? {
        id:0,
        name: 'a',
        description: 'a',
        city: 'a',
        street: 'a',
        postalCode:'a',
        population: 100,
        category:'a'
    }

    const [outpost,setOutpost] = useState(initialState);

    function handleSubmit(){
        outpost.id ? updateOutpost(outpost) : createOutpost(outpost);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        const {name,value} = event.target;
        setOutpost({...outpost,[name]: value});
    }
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='name' value={outpost.name} name='name' onChange={handleInputChange}/>
                <Form.TextArea placeholder='description' value={outpost.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='city' value={outpost.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='street' value={outpost.street} name='street' onChange={handleInputChange}/>
                <Form.Input placeholder='population' type='number' value={outpost.population} name='population' onChange={handleInputChange}/>
                <Form.Input placeholder='category' value={outpost.category} name='category' onChange={handleInputChange}/>
                <ButtonGroup>
                    <Form.Button loading={loading} positive content='Submit'/>
                    <Form.Button onClick={formClose} content='Cancel'/>
                </ButtonGroup>
            </Form>
        </Segment>
    )
});