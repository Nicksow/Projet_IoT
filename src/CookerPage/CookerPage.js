import RestaurantCommandComponent from "./RestaurantCommandComponent";
import TakeAwayCommandComponent from "./TakeAwayCommandComponent";
import React, { useEffect} from "react";
import {CommandProvider, useCommand} from "../useCommand";

function InnerCookerPage() {
    const{number,takeAway,loadKitchenData} = useCommand();
    setTimeout(() => {
        window.location.reload();
    }, 120000);
    useEffect(() => {
        loadKitchenData();
    }, []);

    return (
        <div className="h-screen">
            <div className="h-full">
                <div className="bg-gray-100 h-1/2 p-3 flex flex-row-reverse overflow-auto flex-nowrap">
                    {number.map((command) => {
                        return (
                            <RestaurantCommandComponent
                                key={command.name}
                                id={command.name}
                            ></RestaurantCommandComponent>
                        );
                    })}
                </div>
                <div className="bg-gray-200 h-1/2 p-3 flex flex-row-reverse overflow-auto flex-nowrap">
                    {takeAway.map((command) => {
                        return (
                            <TakeAwayCommandComponent
                                key={command.id}
                                id={command.id}
                            ></TakeAwayCommandComponent>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function CookerPage() {
    return (
        <CommandProvider>
            <InnerCookerPage></InnerCookerPage>
        </CommandProvider>
    );
}
