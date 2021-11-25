import React, { useEffect } from "react";
import { Card, Header } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import OutpostMap from "./OutpostMap";


export default function OutpostMapPanel(){

   


    return(
        <div  >
            <div className='testt'></div>
            <div className='test'></div>

            <div className='roundedMapDiv'>
                   <h3> Sprawdź skąd pochodzą opowiedziane historie!</h3>
            </div>
            <OutpostMap/>
        </div>   
    );
}