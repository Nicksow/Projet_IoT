import {useNavigate} from "react-router-dom";
import {useCommand} from "../../useCommand";
import {useEffect} from "react";

export default function TakeAwaySendComponent(props){
    const id = props.id
    const typeT = "takeAwayCommand"
    const navigate = useNavigate()
    const {deleteAll,showKitchen,setTime,getTime,inputTime,inputTimeHandler} = useCommand();
    useEffect(() => {
        getTime(id)
    }, []);
    const onDel = ()=>{
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ?");
        if (confirmation) {
            deleteAll(id,typeT);
            navigate(-1)
        }
    }
    const onSend = ()=>{
        setTime(id,inputTime)
        showKitchen(id,typeT)
        setTimeout(() => {
            navigate(-1);
        }, 50);
    }
    return (
        <>
            <div className="mx-auto flex text-center w-32 h-14 p-4 rounded-lg shadow-md focus-within:shadow-xl bg-white overflow-hidden border-2 border-gray-400">
                <input placeholder="Exemple : 7h30"
                       className="outline-none text-sm text-gray-700 pr-2"
                       onChange={inputTimeHandler}
                       value={inputTime}
                       type="text"/>
            </div>
            <div className="flex flex-row p-2">
                <button className=" border-2 w-full h-16 mr-1 rounded-xl text-xl bg-red-500" onClick={onDel}>SUPPRIMER
                </button>
                <button className=" border-2 w-full h-16 ml-1 rounded-xl text-xl bg-green-500"
                        onClick={onSend}>ENVOYER
                </button>
            </div>
        </>
    )
}