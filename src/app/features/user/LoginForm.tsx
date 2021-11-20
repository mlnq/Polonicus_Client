import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, ButtonGroup } from 'semantic-ui-react';
import { useStore } from '../../stores/store';
import MyFieldInput from '../../utils/MyFieldInput';

export default observer(function LoginForm()
{
    const {userStore} = useStore();
    const {login}= userStore;
     return(
        <>
                <Formik
                    initialValues={{email:'',password:''}} 
                    onSubmit={val =>login(val)}
                >
                {({handleSubmit, isSubmitting})=>
                (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyFieldInput placeholder="Email" name="email" label='Adres Email'/>
                        <MyFieldInput placeholder="Password" name="password" label='Hasło' type='password'/>
                        
                        <ButtonGroup>
                            <Button loading={isSubmitting} positive content='Zatwierdź' type='submit' fluid/>
                        </ButtonGroup>  
                    </Form>
                )}
                </Formik>

      </>  
     );
});