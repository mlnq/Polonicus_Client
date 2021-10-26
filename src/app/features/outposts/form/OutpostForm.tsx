import { observer } from "mobx-react-lite";
import React, { ChangeEvent,useEffect,useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, ButtonGroup, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { Outpost } from "../../../models/outpost";
import { useStore } from "../../../stores/store";


export default observer( function OutpostForm(){

    const {outpostStore} = useStore();
    const {createOutpost,updateOutpost,loading,loadOutpost,loadingInitial} = outpostStore;
    
    const history= useHistory();
    const {id} = useParams<{id: string}>();
    
    const [outpost, setOutpost] = useState({
        id:0,
        name: '',
        description: '',
        city: '',
        street: '',
        postalCode:'',
        population: 100,
        category:''
    })

    useEffect(()=>{
        if(id!== undefined) loadOutpost(parseInt(id)).then(o=>{setOutpost(o!)});
    },[id,loadOutpost])

    function handleSubmit(){
        if(!outpost.id) createOutpost(outpost).then(()=> history.push(`/outposts`))
        else updateOutpost(outpost).then(()=> history.push(`/outposts`))
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        const {name,value} = event.target;
        setOutpost({...outpost,[name]: value});
    }
    if(loadingInitial) return <LoadingComponent content="Wczytywanie formularza"/>;

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
                    <Button  loading={loading} positive content='Zatwierdź'/>
                    <Button as={Link} to={`/outposts`} basic color='grey' content='Cofnij'/>
                </ButtonGroup>  
            </Form>
        </Segment>
    )
});