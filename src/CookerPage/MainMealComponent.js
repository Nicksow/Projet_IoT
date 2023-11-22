import DishComponent from "./DishComponent";
import MenuComponent from "./MenuComponent";

export default function MainMealComponent(){
    return(
        <div className="w-full flex flex-row flex-wrap border-b-2 border-gray-400">
            <DishComponent></DishComponent>
            <DishComponent></DishComponent>
            <DishComponent></DishComponent>
            <DishComponent></DishComponent>
            <MenuComponent></MenuComponent>
        </div>
    )
}