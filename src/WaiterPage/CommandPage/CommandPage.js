import React from 'react';
import {CommandProvider, useCommand} from '../../useCommand';
import ResearchBarComponent from './ResearchBarComponent';
import { useParams } from 'react-router-dom';
import DishListComponent from "./DishListComponent/DishListComponent";
import TakeDishComponent from "./TakeDishComponent";
import SendComponent from "./SendComponent";

function InnerCommandPage() {
    const { id } = useParams();

    return (
        <div className="h-screen">
            <ResearchBarComponent id={id}/>
            <DishListComponent id ={id}/>
            <TakeDishComponent id ={id}/>
            <SendComponent id={id} />
        </div>
    )
}

export default function CommandPage(){
    return(
        <CommandProvider>
            <InnerCommandPage></InnerCommandPage>
        </CommandProvider>
    )
}