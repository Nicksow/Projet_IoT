import DishComponent from "./DishComponent";

export default function SoupMealComponent(){
    return(
        <div className="w-full flex flex-row flex-wrap border-b-2 border-gray-400">
            <DishComponent></DishComponent>
            <DishComponent></DishComponent>
        </div>
    )
}