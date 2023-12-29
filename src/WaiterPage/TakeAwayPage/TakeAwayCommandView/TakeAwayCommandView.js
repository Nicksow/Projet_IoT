import {useNavigate, useParams} from "react-router-dom";
import {CommandProvider, useCommand} from "../../../useCommand";
import {useEffect, useState} from "react";

function InnerTakeAwayCommandView(){
    const { id } = useParams();
    const navigate = useNavigate()
    const typeT = "takeAwayCommand"
    const {soup, loadSoup, starter, loadStarter, main, loadMain} = useCommand();
    const [sum, setSum] = useState(0)
    useEffect(() => {
        loadSoup(id,typeT)
        loadStarter(id,typeT)
        loadMain(id,typeT)
        fetch(`http://localhost:3001/takeAway/getTotal/${id}`)
            .then(response => response.json())
            .then(data => {
                setSum(data[0].total)
            });
    },[])

    return(
        <div>
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
                <p className="text-2xl">Commande : {id}</p>
            </div>
            <div className="p-4">
                <div className="bg-gray-300 p-2 mb-4 rounded-xl">
                    {soup.map((data)=>{
                        return(
                            <div className="flex flex-row" key={data.dishId}>
                                <p className="flex-1  overflow-hidden text-ellipsis line-clamp-1">{data.count} x {data.dishId} | {data.name}</p>
                                <p className="float-right">{data.price * data.count}€</p>
                            </div>
                        )
                    })}
                    {starter.map((data)=>{
                        return (
                            <div className="flex flex-row" key={data.dishId}>
                                <p className="flex-1  overflow-hidden text-ellipsis line-clamp-1">{data.count} x {data.dishId} | {data.name}</p>
                                <p className="float-right">{data.price * data.count}€</p>
                            </div>
                        )
                    })}
                    {main.map((data) => {
                        return (
                            <div className="flex flex-row" key={data.dishId}>
                                <p className="flex-1  overflow-hidden text-ellipsis line-clamp-1">{data.count} x {data.dishId} | {data.name}</p>
                                <p className="float-right">{data.price * data.count}€</p>
                            </div>
                        )
                    })}
                </div>
                <div className="bg-gray-300 p-2 rounded-xl">
                    <div className="flex flex-row">
                        <p className="flex-1">Total : </p>
                        <p className="float-right">{sum}€</p>
                    </div>
                    <div className="flex flex-row">
                        <p className="flex-1">Total (-10%) : </p>
                        <p className="float-right">{(sum * 0.9).toFixed(2)}€</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default function TakeAwayCommandView(){
    return(
        <CommandProvider>
            <InnerTakeAwayCommandView/>
        </CommandProvider>
    )
}