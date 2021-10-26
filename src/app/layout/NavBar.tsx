import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar(){

    const {outpostStore} = useStore();

    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to="/" exact header>
                    <img src="/assets/logo.svg" alt="logo" style={{marginRight: 10 }} />
                    PolonicusApp
                </Menu.Item>
                <Menu.Item as={NavLink} to="/outposts" name="Placówki"/>
                
                {/* <Menu.Item name="Twoje kroniki"/> */}
                {/* <Menu.Item name="Wydarzenia"/> */}
                <Menu.Item>
                    <Button as={NavLink} to="/outpostCreate" name="outpostCreate" negative content='Stwórz Placówke'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}