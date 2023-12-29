import { useEffect, useState } from "react";

export default function RestaurantCommandComponent({id}) {
    const [soup, setSoup] = useState([]);
    const [starter, setStarter] = useState([]);
    const [main, setMain] = useState([]);
    const [wantedTime, setWantedTime] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3001/takeAwayCommand/soup/${id}`)
            .then(async (response) => setSoup(await response.json()));
        fetch(`http://localhost:3001/takeAwayCommand/starter/${id}`)
            .then(async (response) => setStarter(await response.json()));
        fetch(`http://localhost:3001/takeAwayCommand/main/${id}`)
            .then(async (response) => setMain(await response.json()));
        fetch(`http://localhost:3001/takeAway/getTime/${id}`)
            .then(async (response) => await response.json())
            .then((data) => setWantedTime(data[0].wantedTime));
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
            </div>
            <div className="flex fle-row bg-orange-300 h-8 p-1 text-xl font-bold">
                <div className="flex-1"> <p>V</p></div>
                <div className="float-right"> <p>{wantedTime}</p></div>
            </div>
        </div>
    );
}
