import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Icon, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import styles from './navbar.module.css';

export default observer(function NavBar(){

    const {userStore} = useStore();
    const {user,logout}=userStore;

    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to="/" exact header>
                    <img src="/assets/logo.svg" alt="logo" style={{marginRight: 10 }} />
                    PolonicusApp
                </Menu.Item>
                {/* <Menu.Item as={NavLink} to="/outposts" name="Wszystkie Placówki"/> */}

                <Menu.Item as={NavLink} to="/chronicles" name="Wszystkie Kroniki"/>
               

                <Menu.Item>
                </Menu.Item>

                {
                    userStore.isLogged? 
                    (
                        <Menu.Item position='right'>
                            <Icon name="user" />
                        <Dropdown text={`${user?.email}`} pointing="top left" >
                        <Dropdown.Menu  >
                            <Dropdown.Item as={Link} to="/accountDetails" text="Szczegóły konta"/>
                            <Dropdown.Item as={Link} to="/outposts" text="Mój panel placówek"/>
                            <Dropdown.Item as={Link} to="/" text="Mój panel kronik"/>
                            <Dropdown.Item onClick={logout} text="wyloguj"/>
                        </Dropdown.Menu>
                        </Dropdown>
                        </Menu.Item>
                    )
                    : null

                }
               
            </Container>
        </Menu>
    )
});