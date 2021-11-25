import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Card, Container } from 'semantic-ui-react';
import { useStore } from '../../stores/store';
import MyFieldInput from '../../utils/MyFieldInput';
import * as Yup from 'yup';

export default observer(function LoginForm()
{
    const {userStore} = useStore();
    const {login}= userStore;


    const loginValidationSchema = Yup.object().shape({
        email: Yup.string().required('Email jest wymagany!'),
        password: Yup.string().required('Hasło jest wymagane!'),
    })

     return(
         <div className='box background'>

        <div className="ui fluid card userForm ">
        <div className="content" >
                <Formik
                    initialValues={{email:'',password:''}} 
                    onSubmit={val =>login(val)}
                >
                {({handleSubmit, isSubmitting})=>
                (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyFieldInput placeholder="Email" name="email" label='Adres Email'/>
                        <MyFieldInput placeholder="Password" name="password" label='Hasło' type='password'/>
                        
                            <Button icon='unlock' loading={isSubmitting} positive content='Zatwierdź' type='submit' fluid/>
                            <Button className='cleanBtn' as={Link} to={`/register`}  content='Nie posiadasz konta ? Zarejestruj się!'/>

                    </Form>
                )}
                </Formik>

      </div>  
      </div>  
      </div>

     );
});