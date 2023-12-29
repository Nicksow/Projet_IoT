import {useCommand} from "../../useCommand";

export default function TakeAwayTakeDishComponent(props){
    const id = props.id
    const typeT = "takeAwayCommand"
    const {soup, deleteSoup, starter, deleteStarter, main, deleteMain} = useCommand();

    return(
        <>
            <div className="border-b-2">
                <p className="text-xl bg-blue-400 pl-2">Potages</p>
                <div className="flex flex-row flex-wrap p-4 pb-2 ">
                    {soup.map((data)=>{
                        return(
                            <div className="bg-green-400 w-20 h-8 mr-2 mb-2 text-center text-lg rounded-lg"
                                 key={data.dishId}
                                 onClick={() => deleteSoup(id,data.dishId,typeT)}>
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
                                 onClick={() => deleteStarter(id,data.dishId,typeT)}>
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
                                 onClick={() => deleteMain(id,data.dishId,typeT)}>
                                {data.count} x {data.dishId}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}