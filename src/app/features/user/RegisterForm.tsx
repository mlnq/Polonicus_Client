import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, ButtonGroup, Form } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import MyFieldInput from '../../utils/MyFieldInput';


export default observer(function RegisterForm()
{
    const {userStore} = useStore();
    const {register}= userStore;
     return(
        <>
                <Formik
                    initialValues={{email:'',password:'',firstName:'',lastName:"",dateOfBirth:'',nationality:"",confirmPassword:''}} 
                    onSubmit={val =>register(val)}
                >
                {({handleSubmit, isSubmitting})=>
                (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyFieldInput placeholder="Email" name="email" label='Adres Email'/>
                        <MyFieldInput placeholder="Password" name="password" label='Hasło' type='password'/>
                        <MyFieldInput placeholder="Password" name="confirmPassword" label='Potwierdź hasło' type='password'/>
                        <MyFieldInput placeholder="FirstName" name="firstName" label='Imie'/>
                        <MyFieldInput placeholder="LastName" name="lastName" label='Nazwisko'/>
                        <MyFieldInput placeholder="DateOfBirth" name="dateOfBirth" label='Data urodzenia'/>
                        <MyFieldInput placeholder="Nationality" name="nationality" label='Narodowość'/>
                        
                        <ButtonGroup>
                            <Button loading={isSubmitting} positive content='Zatwierdź' type='submit' fluid/>
                        </ButtonGroup>  

                    </Form>
                )}
                </Formik>

      </>  
     );
});