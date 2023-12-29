import {useEffect} from "react";
import {useCommand} from "../../useCommand";
import {useNavigate} from "react-router-dom";

export default function TakeAwayResearchBarComponent(props){
    const id = props.id
    const typeT = "takeAwayCommand"
    const navigate = useNavigate()
    const {loadDish, loadSoup, loadStarter, loadMain, inputText, inputHandler, inputButton, clearSearchbar} = useCommand();

    useEffect(() => {
        loadDish()
        loadSoup(id,typeT)
        loadStarter(id,typeT)
        loadMain(id,typeT)
    },[])

    return(
        <>
            <div className="text-center bg-cyan-400 h-10 flex items-center justify-center ">
                <button className={"fixed shadow left-2 w-[30px] h-[30px] flex justify-center items-center bg-white rounded-full text-black"} onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
                <p className="text-2xl">Commande : {id}</p>
            </div>
            <div className="flex flex-wrap">
                {Array.from({ length: 10 }, (_, index) => (
                    <button key={index} className="border-2 flex-1 h-10" value={index} onClick={()=>inputButton(index)}>
                        {index}
                    </button>
                ))}
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
        </>
    )
}