import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

export default function WaiterPage(){
    const [number, setNumber] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/tableNumber')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setNumber(data)
            });
    }, []);

    return(
        <div className="flex flex-row flex-wrap p-12">
            {number.map((number)=>{
                return(
                    <div>
                        <NavLink to={`/${number.name}/commande`}>
                        <div className="bg-green-500 w-48 h-48 p-16 mt-16 m-6 rounded-xl text-center max-sm:p-6 max-sm:w-24 max-sm:h-24">
                            <p className="text-6xl max-sm:text-5xl ">
                                {number.name}
                            </p>
                        </div>
                        </NavLink>
                    </div>

                )
            })}
        </div>
    )
}
