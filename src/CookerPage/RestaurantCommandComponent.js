import { useEffect, useState } from "react";

export default function RestaurantCommandComponent({ id}) {
    const [soup, setSoup] = useState([]);
    const [starter, setStarter] = useState([]);
    const [main, setMain] = useState([]);
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/restaurantCommand/soup/${id}`)
            .then(async (response) => setSoup(await response.json()));
        fetch(`http://localhost:3001/restaurantCommand/starter/${id}`)
            .then(async (response) => setStarter(await response.json()));
        fetch(`http://localhost:3001/restaurantCommand/main/${id}`)
            .then(async (response) => setMain(await response.json()));
        fetch(`http://localhost:3001/restaurantCommand/menu/${id}`)
            .then(async (response) => setMenu(await response.json()));
    }, []);

    return (
        <div className="h-full flex flex-col ml-8 min-w-56 max-w-56">
            <div className="bg-orange-200 flex-1 p-1 text-center overflow-auto rounded-t-xl">
                {soup.length > 0 && (
                    <div className="w-full flex flex-row flex-wrap border-b-2 border-gray-400">
                        {soup.map((dish) => (
                            <p key={dish.dishId} className="w-1/2 h-fit text-2xl">
                                {dish.count} x {dish.dishId}
                            </p>
                        ))}
                    </div>
                )}
                {starter.length > 0 && (
                    <div className="w-full flex flex-row flex-wrap border-b-2 border-gray-400">
                        {starter.map((dish) => (
                            <p key={dish.dishId} className="w-1/2 h-fit text-2xl">
                                {dish.count} x {dish.dishId}
                            </p>
                        ))}
                    </div>
                )}
                {main.length > 0 && (
                    <div className="w-full flex flex-row flex-wrap border-b-2 border-gray-400">
                        {main.map((dish) => (
                            <p key={dish.dishId} className="w-1/2 h-fit text-2xl">
                                {dish.count} x {dish.dishId}
                            </p>
                        ))}
                    </div>
                )}
                {menu.length > 0 && (
                    <div className="w-full flex flex-row flex-wrap border-b-2 border-gray-400">
                        {menu.map((dish) => (
                            <p key={dish.dishId} className="w-1/2 h-fit text-2xl">
                                {dish.count} x {dish.dishId}
                            </p>
                        ))}
                    </div>
                )}
            </div>
            <div className="bg-orange-500 h-7 p-1 text-xl font-bold text-left">
                <p>T {id}</p>
            </div>
        </div>
    );
}
