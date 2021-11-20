import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import NavBar from "../../layout/NavBar";
import { useStore } from "../../stores/store";
import LoginForm from "../user/LoginForm";

export default function HomePage()
{
    const {userStore} = useStore();

    return (
        <>
        <div>
                {userStore.isLogged ?
                    (<>
                        <h1 style={{display:'flex',justifyContent:'center'}}>Przejdz do placówek</h1>        
                        <Button as={Link} to={`/outposts`} basic color='grey' content='Placówki'/>
                    </>)
                    :
                    (<>
                        <h1 style={{display:'flex',justifyContent:'center'}}>LOGOWANIE</h1>        
                        <Button as={Link} to={`/login`} basic color='grey' content='Logowanie'/>
                        <Button as={Link} to={`/register`} basic color='grey' content='Rejestracja'/>

                    </>)
                }
        </div>
        </>
    )
}