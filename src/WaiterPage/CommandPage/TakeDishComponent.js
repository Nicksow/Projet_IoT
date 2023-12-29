import {useCommand} from "../../useCommand";

export default function TakeDishComponent(props){
    const tableId = props.id
    const typeR = "restaurantCommand"
    const {soup, deleteSoup, starter, deleteStarter, main, deleteMain, menu, deleteMenu} = useCommand();

    return(
        <>
            <div className="border-b-2">
                <p className="text-xl bg-blue-400 pl-2">Potages</p>
                <div className="flex flex-row flex-wrap p-4 pb-2 ">
                    {soup.map((data)=>{
                        return(
                            <div className="bg-green-400 w-20 h-8 mr-2 mb-2 text-center text-lg rounded-lg"
                                 key={data.dishId}
                                 onClick={() => deleteSoup(tableId,data.dishId,typeR)}>
                                {data.count} x {data.dishId}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="border-b-2">
                <p className="bg-blue-400 text-xl pl-2">Entrées</p>
                <div className="flex flex-row flex-wrap p-4 pb-2 ">
                    {starter.map((data)=>{
                        return(
                            <div className="bg-green-400 w-20 h-8 mr-2 mb-2 text-center text-lg rounded-lg"
                                 key={data.dishId}
                                 onClick={() => deleteStarter(tableId,data.dishId,typeR)}>
                                {data.count} x {data.dishId}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="border-b-2">
                <p className="bg-blue-400 text-xl pl-2">Plats</p>
                <div className="flex flex-row flex-wrap p-4 pb-2 ">
                    {main.map((data)=>{
                        return(
                            <div className="bg-green-400 w-24 h-8 mr-4 mb-2 text-center text-lg rounded-lg"
                                 key={data.dishId}
                                 onClick={() => deleteMain(tableId,data.dishId,typeR)}>
                                {data.count} x {data.dishId}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="border-b-2">
                <p className="bg-blue-400 text-xl pl-2">Menus</p>
                <div className="flex flex-row flex-wrap p-4 pb-2 ">
                    {menu.map((data)=>{
                        return(
                            <div className="bg-green-400 w-28 h-8 mr-4 mb-2 text-center text-lg rounded-lg"
                                 key={data.dishId}
                                 onClick={() => deleteMenu(tableId,data.dishId)}>
                                {data.count} x {data.dishId}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}