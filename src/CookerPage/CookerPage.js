import CommandComponent from "../CommandComponent";

export default function CookerPage(){
    return(
        <div className="h-screen">
            <div className="h-full">
                <div className="bg-gray-100 h-1/2 p-4 flex flex-row-reverse overflow-auto flex-nowrap">
                    <CommandComponent></CommandComponent>
                </div>
                <div className="bg-gray-200 h-1/2 p-4 flex flex-row-reverse overflow-auto flex-nowrap">
                    <CommandComponent></CommandComponent>
                </div>
            </div>
        </div>
    )
}