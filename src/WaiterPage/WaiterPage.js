import {NavLink, useNavigate} from "react-router-dom";
import {CommandProvider, useCommand} from "../useCommand";
import {useEffect, useState} from "react";

function InnerWaiterPage(){
    const navigate = useNavigate()
    const [number, setNumber] = useState([])
    const{takeAway,loadTakeAway, addTakeAway} = useCommand();
    useEffect(() => {
        fetch('http://localhost:3001/tableNumber')
            .then(response => response.json())
            .then(data => {
                setNumber(data)
            });
        loadTakeAway();
    }, []);
    const onAddClick = () =>{
        addTakeAway()
        loadTakeAway()
    }

    return(
        <>
            <div className="text-center bg-cyan-400 h-10 flex items-center justify-center ">
                <button
                    className={"fixed shadow left-2 w-[30px] h-[30px] flex justify-center items-center bg-white rounded-full text-black"}
                    onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor"
                         className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
                <p className="text-2xl"> En Salle</p>
            </div>
            <div className="flex flex-row flex-wrap p-2">
                {number.map((number) => {
                    return (
                        <div key={number.id} className="mx-auto">
                            <NavLink to={`/${number.name}/commande`}>
                                <div
                                    className={`flex-1 w-28 p-4 m-1 rounded-xl ${number.show === 1 ? 'bg-red-500' : 'bg-green-500'}`}>
                                    <p className="text-6xl text-center">
                                        {number.name}
                                    </p>
                                </div>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
            <div className="text-center bg-cyan-400 h-10 flex items-center justify-center p-4 text-2xl">
                <p className="flex-1"> A Emporter</p>
                <button className="bg-blue-400 w-8 rounded-xl" onClick={onAddClick}>+</button>
            </div>
            <div className="p-2">
                {takeAway.map((takeAway) => {
                    return (
                        <div className="flex flex-row mb-2" key={takeAway.id}>
                            <NavLink to={`/${takeAway.id}/emporter`} className="flex-1" >
                                <div className="bg-gray-300 p-2 rounded-xl mr-2">
                                    <p className="text-2xl">Commande {takeAway.id} : {takeAway.wantedTime}</p>
                                </div>
                            </NavLink>
                            <NavLink to={`/${takeAway.id}/emporter/détails`}>
                                <div className="bg-gray-300 rounded-xl p-2 w-12">
                                    <img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" alt="viewIcon"/>
                                </div>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default function WaiterPage() {
    return (
        <CommandProvider>
            <InnerWaiterPage/>
        </CommandProvider>
    )
}

