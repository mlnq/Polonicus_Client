import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar(){

    const {outpostStore} = useStore();

    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.svg" alt="logo" style={{marginRight: 10 }} />
                    PolonicusApp
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={() => outpostStore.formOpen()} positive content='create'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}