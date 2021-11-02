import { Formik,Form, Field, ErrorMessage} from "formik";
import { observer } from "mobx-react-lite";
import React, { ChangeEvent,useEffect,useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, ButtonGroup, FormField, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { Outpost } from "../../../models/outpost";
import { useStore } from "../../../stores/store";
import * as Yup from 'yup';
import MyFieldInput from "../../../utils/MyFieldInput";
import MyFieldTextArea from "../../../utils/MyFieldTextArea";

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

    const outpostValidationSchema = Yup.object().shape({
        name: Yup.string().required('Nazwa placówki jest wymagana!'),
        description: Yup.string().required('Opis placówki jest wymagane!'),
        city: Yup.string().required('Miasto jest wymagane!'),
        street: Yup.string().required('Ulica jest wymagana!'),
        population: Yup.string().required('Ilość populacji jest wymagana!'),
        category: Yup.string().required('Kategoria jest wymagana!'),
    })

    useEffect(()=>{
        if(id!== undefined) loadOutpost(parseInt(id)).then(
            o=>{
                //usuwa nulle
                o = JSON.parse(JSON.stringify(o).replace(/:null/gi, ":\"\"")); 
                console.log(o);
            setOutpost(o!) ;
        });
        
    },[id,loadOutpost])

    function handleFormSubmit(outpost: Outpost){
        if(!outpost.id) createOutpost(outpost).then(()=> history.push(`/outposts`))
        else updateOutpost(outpost).then(()=> history.push(`/outposts`))
    }

    if(loadingInitial) return <LoadingComponent content="Wczytywanie formularza"/>;


    return(
        <Segment clearing>
            <Formik 
            validationSchema={outpostValidationSchema} 
            enableReinitialize 
            initialValues={outpost} 
            onSubmit={values =>handleFormSubmit(values)} >
                {({handleSubmit, isValid, dirty, isSubmitting})=>
                (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        {/* value w teroii też moge usunac w praktyce jest problem jak 
                        z bazy danych przekazuje wartośc pustą wtedy wyskakuje null */}
                        {/* <FormField>
                        <Field placeholder='name' value={outpost.name || ' '} name='name' />
                        </FormField> */}
                        <MyFieldInput  placeholder="Nazwa" name="name" label='Nazwa placówki'/> 
                        <MyFieldTextArea rows={4}  placeholder="Opis" name="description" label='Opis'/> 
                        <MyFieldInput  placeholder="Miasto" name="city" label='Miasto'/> 
                        <MyFieldInput  placeholder="Ulica" name="street" label='Ulica'/> 
                        <MyFieldInput  placeholder="Populacja Miasta" name="population" label='Populacja'/> 
                        <MyFieldInput  placeholder="Kategoria Placówki" name="category" label='Kategoria'/> 

                        {/* <Field placeholder='description' value={outpost.description} name='description' />
                        <Field placeholder='city' value={outpost.city || ' '} name='city' />
                        <Field placeholder='street' value={outpost.street || ' '} name='street' />
                        <Field placeholder='population' type='number' value={outpost.population || ' '} name='population' />
                        <Field placeholder='category' value={outpost.category || ' '} name='category' /> */}
                        <ButtonGroup>
                            <Button  
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} positive content='Zatwierdź'/>
                            <Button as={Link} to={`/outposts`} basic color='grey' content='Cofnij'/>
                        </ButtonGroup>  
                    </Form>
                )}
            </Formik>
        </Segment>
    )
});