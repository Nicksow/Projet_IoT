import {useEffect, useState} from "react";
import CustomPopup from "./PopupComponent";

export default function ResearchBarComponent(props){
    const [dish, setDish] = useState([])
    const [soup, setSoup] = useState([])
    const [inputText, setInputText] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);
    const popupCloseHandler = () => {
        setVisibility(false);
    };
    useEffect(() => {
        fetch('http://localhost:3001/plats')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDish(data)
            });

    }, []);
    useEffect(() => {
        fetch('http://localhost:3001/restaurantCommand/soup')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSoup(data)
            });
    }, []);
    const inputHandler = (e) => {
        setInputText(e.target.value);
    };
    function clearSearchbar(){
        setInputText("");
    }
    function dishOnClick(id){
        console.log(id)
        setSelectedDish(id);
        setVisibility(true);
    }
    const filteredData = dish.filter((data) => {
        if (inputText === '') {
            return data;
        }
        else {
            const nameMatch = data.name.toLowerCase().includes(inputText.toLowerCase());
            const idMatch = data.id.toLowerCase().includes(inputText.toLowerCase());
            return nameMatch || idMatch;
        }
    })

    function onSoupClick(dishId){
        console.log("Envoie de "+ dishId + " dans potage")
        setVisibility(false);
        fetch(`http://localhost:3001/restaurantCommand/soup/${props.id}/${dishId}`,{
            method:'POST',
        }).then(response => response.json())
            .then(data => {
                setSoup(data);
            });
    }
    return(
        <>
            <div className="text-center bg-cyan-400 h-10 flex items-center justify-center ">
                <p className="text-2xl"> Table  {props.id}</p>
            </div>
            <div className='max-w-md mx-auto flex'>
                <div className="relative flex items-center w-full h-12 rounded-lg shadow-md focus-within:shadow-xl bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        onChange={inputHandler}
                        value={inputText}
                        type="text"
                        id="search"
                        placeholder="Rechercher" />
                </div>
                <button className="w-36 border-2 bg-red-500 rounded-lg" onClick={clearSearchbar}>EFFACER</button>
            </div>
            <div className="flex flex-col">
                <div className="border-b-4 h-80 p-2 overflow-auto flex-nowrap">
                    {filteredData.map((data)=>{
                        return(
                            <>
                                <div className="text-lg pl-6 pt-1 mb-2 h-10 rounded-lg bg-gray-200 overflow-hidden text-ellipsis line-clamp-1" onClick={() => dishOnClick(data.id)}>{data.id}. {data.name}</div>
                                <CustomPopup onClose={popupCloseHandler} show={visibility} title={selectedDish}>
                                    <button className="w-20 p-2 mr-4 mt-4 border-2 bg-gray-100 rounded-lg" onClick={() => onSoupClick(selectedDish)}>Potage</button>
                                    <button className="w-20 p-2 mr-4 mt-4 border-2 bg-gray-100 rounded-lg">Entrée</button>
                                    <button className="w-20 p-2 mr-4 mt-4 border-2 bg-gray-100 rounded-lg">Plat</button>
                                </CustomPopup>
                            </>

                        )
                    })}
                </div>
                <div className="border-b-2">
                    <p className="text-xl  bg-blue-400">Potages</p>
                    <div className="flex flex-row flex-wrap p-4 pb-2 ">
                        {soup.map((data)=>{
                            return(
                                <div className="bg-green-400 w-20 h-8 mr-2 mb-2 text-center text-lg rounded-lg">{data.count} x {data.dishId}</div>
                            )
                        })}
                    </div>
                </div>
                <div className="border-b-2">
                    <p className="bg-blue-400 text-xl">Entrées</p>
                    <div className="flex flex-row flex-wrap p-4 pb-2 ">

                    </div>
                </div>
                <div className="border-b-2">
                    <p className="bg-blue-400 text-xl">Plats</p>
                    <div className="flex flex-row flex-wrap p-4 pb-2 ">

                    </div>
                </div>
            </div>
        </>
    )
}