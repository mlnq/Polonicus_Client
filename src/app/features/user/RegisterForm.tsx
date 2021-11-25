import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, ButtonGroup, Form, Header } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import MyFieldInput from '../../utils/MyFieldInput';
import pl from 'date-fns/locale/pl';

import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import MyDateInput from "../../utils/MyDateInput";
import * as Yup from 'yup';


export default observer(function RegisterForm()
{
    registerLocale('pl', pl);
    const {userStore} = useStore();
    const {register}= userStore;
    const [startDate, setStartDate] = useState(new Date());


    const registerValidationSchema = Yup.object().shape({
        email: Yup.string().required('Email jest wymagany!'),
        password: Yup.string().required('Hasło jest wymagane!'),
        confirmPassword: Yup.string().required('Potwierdzenie hasła jest wymagane!'),
        dateOfBirth: Yup.string().required('Data urodzenia jest wymagana!').nullable(),
        firstName: Yup.string().required('Imie jest wymagane!'),
        lastName: Yup.string().required('Nazwisko jest wymagane!'),
    })


     return(
        <div className='box background'>

        <div className="ui fluid card userForm ">
        <Header>Rejestracja</Header>
        <div className="content" >
                <Formik
                    validationSchema={registerValidationSchema} 
                    initialValues={{email:'',password:'',firstName:'',lastName:"",dateOfBirth:'',nationality:"",confirmPassword:''}} 
                    onSubmit={val =>register(val)}
                >
                {({handleSubmit, isSubmitting})=>
                (
                    <form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyFieldInput placeholder="Email" name="email" label='Adres Email'/>
                        <MyFieldInput placeholder="Password" name="password" label='Hasło' type='password'/>
                        <MyFieldInput placeholder="Password" name="confirmPassword" label='Potwierdź hasło' type='password'/>
                        <MyFieldInput placeholder="FirstName" name="firstName" label='Imie'/>
                        <MyFieldInput placeholder="LastName" name="lastName" label='Nazwisko'/>
                        
                        <MyDateInput
                        label="Data urodzenia"
                        name="dateOfBirth"
                        dateFormat="dd.MM.yyyy"
                        locale="pl"
                        />

                        {/* <ReactDatePicker 
                        dateFormat="yyyy/MM/dd"
                        locale="pl"
                        selected={startDate} onChange={(date:Date) => setStartDate(date)}/> */}
                        {/* <MyFieldInput placeholder="DateOfBirth" name="dateOfBirth" label='Data urodzenia'/> */}
                        <MyFieldInput placeholder="Nationality" name="nationality" label='Narodowość'/>
                        
                        <Button icon='lock' loading={isSubmitting} positive content='Zatwierdź' type='submit' fluid/>
                    </form>
                )}
                </Formik>

      </div>  
      </div>  
      </div>  
     );
});