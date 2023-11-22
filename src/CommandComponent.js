import SoupMealComponent from "./CookerPage/SoupMealComponent";
import StarterMealComponent from "./CookerPage/StarterMealComponent";
import MainMealComponent from "./CookerPage/MainMealComponent";

export default function CommandComponent(){
    return(
        <div className="h-full flex flex-col ml-4 min-w-48 max-w-48">
            <div className="bg-orange-500 h-8 p-1 text-xl rounded-t-xl flex flex-row">
                <p className="flex-1 bg">Table</p>
                <p className="float-right">Time</p>
            </div>
            <div className="bg-orange-200 flex-1 p-1 text-center overflow-auto">
                <SoupMealComponent></SoupMealComponent>
                <StarterMealComponent></StarterMealComponent>
                <MainMealComponent></MainMealComponent>
            </div>
            <div className="bg-orange-500 h-8 p-1 text-xl text-right">
                <p>Time</p>
            </div>
        </div>
    )
}