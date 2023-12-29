import React from 'react';
import {CommandProvider} from '../../useCommand';
import TakeAwayResearchBarComponent from './TakeAwayResearchBarComponent';
import { useParams } from 'react-router-dom';
import TakeAwayDishListComponent from "./TakeAwayDishListComponent/TakeAwayDishListComponent";
import TakeAwayTakeDishComponent from "./TakeAwayTakeDishComponent";
import TakeAwaySendComponent from "./TakeAwaySendComponent";

function TakeAwayInnerCommandPage() {
    const { id } = useParams();


    return (
        <div className="h-screen">
            <TakeAwayResearchBarComponent id={id}/>
            <TakeAwayDishListComponent id ={id}/>
            <TakeAwayTakeDishComponent id ={id}/>
            <TakeAwaySendComponent id={id} />
        </div>
    )
}

export default function TakeAwayCommandPage(){
    return(
        <CommandProvider>
            <TakeAwayInnerCommandPage></TakeAwayInnerCommandPage>
        </CommandProvider>
    )
}