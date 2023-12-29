import CustomPopup from "./PopupComponent";
import {useCommand} from "../../../useCommand";
import {useState} from "react";
export default function DishListComponent(props){
    const tableId = props.id
    const typeR = "restaurantCommand"
    const {addSoup, addStarter, addMain, addMenu, filteredData } = useCommand();
    const [visibility, setVisibility] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);
    function dishOnClick(id){
        setSelectedDish(id);
        setVisibility(true);
    }

    function onSoupButtonClick(dishId){
        setVisibility(false);
        addSoup(tableId,dishId,typeR)
    }

    function onStarterButtonClick(dishId){
        setVisibility(false);
        addStarter(tableId,dishId,typeR)
    }

    function onMainButtonClick(dishId){
        setVisibility(false);
        addMain(tableId,dishId,typeR)
    }
    function onMenuButtonClick(dishId){
        setVisibility(false);
        addMenu(tableId,dishId)
    }

    return(
        <div className="flex flex-col">
            <div className="border-b-4 h-80 p-2 overflow-auto flex-nowrap">
                {filteredData.map((data)=>{
                    return(
                        <div key={data.id}>
                            <div className="text-lg pl-6 pt-1 mb-2 h-10 rounded-lg bg-gray-200 overflow-hidden text-ellipsis line-clamp-1" onClick={() => dishOnClick(data.id)}>{data.id}. {data.name}</div>
                            <CustomPopup onClose={()=>setVisibility(false)} show={visibility} title={selectedDish}>
                                <button className="w-20 p-2 mr-4 ml-6 mt-4 border-2 bg-gray-100 rounded-lg" onClick={() => onSoupButtonClick(selectedDish)}>Potage</button>
                                <button className="w-20 p-2 mr-4 ml-6 mt-4 border-2 bg-gray-100 rounded-lg" onClick={() => onStarterButtonClick(selectedDish)}>Entrée</button>
                                <button className="w-20 p-2 mr-4 ml-6 mt-4 border-2 bg-gray-100 rounded-lg" onClick={() => onMainButtonClick(selectedDish)}>Plat</button>
                                <button className="w-20 p-2 mr-4 ml-6 mt-4 border-2 bg-gray-100 rounded-lg" onClick={() => onMenuButtonClick(selectedDish)}>Menu</button>
                            </CustomPopup>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}