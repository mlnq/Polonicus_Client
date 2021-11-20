import React from "react";
import { Button, Header, Search, Segment } from "semantic-ui-react";


export default function OutpostFiler(){


    return (
    
        <>
                <Header>Filtry</Header>
                <div className="ui  column grid" >

                    <div className="row" >
                        <Search></Search>
                        <Button content="Szukaj"/>
                    </div>
                    <div className="column" >
                        <Search></Search>
                        <Button content="Szukaj"/>
                    </div>

                </div>
        </>
    );
}