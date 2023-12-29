import {useCommand} from "../../useCommand";
import {useNavigate} from "react-router-dom";

export default function SendComponent(props){
    const tableId = props.id
    const typeR = "restaurantCommand"
    const navigate = useNavigate()
    const {deleteAll,showKitchen} = useCommand();
    const onDel = () => {
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ?");
        if (confirmation) {
            deleteAll(tableId, typeR);
            navigate(-1)
        }
    }
    const onSend = () => {
        showKitchen(tableId, typeR)
        navigate(-1)
    }
    return(
        <div className="flex flex-row p-2">
            <button className=" border-2 w-full h-16 mr-1 rounded-xl text-xl bg-red-500"
                    onClick={onDel}>SUPPRIMER
            </button>
            <button className=" border-2 w-full h-16 ml-1 rounded-xl text-xl bg-green-500"
                    onClick={onSend}>ENVOYER
            </button>
        </div>
    )
}