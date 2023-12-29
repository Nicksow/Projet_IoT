import { createContext, useContext, useState } from "react";

const CommandContext = createContext(null);

export function useCommand() {
    const context = useContext(CommandContext);
    const { dish, error} = context;

    return {
        ...context,
        isDishLoaded: dish != null,
        isLoadingDish: dish == null && error == null,
        isErrorDish: error != null,
    };
}

export function CommandProvider({ children }) {
    const [dish, setDish] = useState([]);
    const [soup, setSoup] = useState([]);
    const [main, setMain] = useState([]);
    const [starter, setStarter] = useState([]);
    const [menu, setMenu] = useState([]);
    const [error, setError] = useState(null);
    const [inputText, setInputText] = useState("");
    const [inputTime, setInputTime] = useState("");
    const [number, setNumber] = useState([]);
    const [takeAway, setTakeAway] = useState([]);

    const inputHandler = (e) => {
        setInputText(e.target.value);
    };
    const inputTimeHandler = (e) => {
        setInputTime(e.target.value);
    };
    const inputButton = (id) => {
        setInputText(inputText + id);
    };

    const clearSearchbar = () =>{
        setInputText("");
    }

    const filteredData = dish.filter((data) => {
        if (inputText === '') {
            return data;
        }
        else {
            const nameMatch = data.name.toLowerCase().includes(inputText.toLowerCase());
            const idMatch = data.id.toLowerCase().includes(inputText.toLowerCase());
            return nameMatch || idMatch;
        }
    })

    const addTakeAway = () => {
        fetch('http://localhost:3001/takeAway/add', {
            method: 'POST',
        })
        loadTakeAway();
    }
    const loadTakeAway = () => {
        fetch('http://localhost:3001/takeAway')
            .then(response => response.json())
            .then(data => {
                setTakeAway(data);
            });
    }
    const loadKitchenData = async () =>{
        fetch('http://localhost:3001/tableNumber')
            .then(response => response.json())
            .then(data => {
                const tablesToShow = data.filter(table => table.show === 1);
                // Sort the data by time
                tablesToShow.sort((a, b) => {
                    const getTimeParts = time => (time ? time.split(':').map(Number) : [0, 0]);
                    const [aHours, aMinutes] = getTimeParts(a.time);
                    const [bHours, bMinutes] = getTimeParts(b.time);
                    return a.time === b.time
                        ? 0
                        : a.time === null
                            ? 1
                            : b.time === null
                                ? -1
                                : aHours !== bHours
                                    ? aHours - bHours
                                    : aMinutes - bMinutes;
                });
                setNumber(tablesToShow);
            });
        fetch('http://localhost:3001/takeAway')
            .then(response => response.json())
            .then(data => {
                const tablesToShow = data.filter(table => table.show === 1);
                // Sort the data by time
                tablesToShow.sort((a, b) => {
                    const getTimeParts = time => (time ? time.split('h').map(Number) : [0, 0]);
                    const [aHours, aMinutes] = getTimeParts(a.wantedTime);
                    const [bHours, bMinutes] = getTimeParts(b.wantedTime);
                    return a.wantedTime === b.wantedTime
                        ? 0
                        : a.wantedTime === null
                            ? 1
                            : b.wantedTime === null
                                ? -1
                                : aHours !== bHours
                                    ? aHours - bHours
                                    : aMinutes - bMinutes;
                });
                setTakeAway(tablesToShow);
            });
    }


    const loadDish = async () =>{
        setError(null);
        try {
            const response = await fetch('http://localhost:3001/plats');
            const dishData = await response.json();
            setDish(dishData);
        } catch (e) {
            setError(e);
        }
    }

    const loadSoup = async (tableId,type) =>{
        setError(null)
        try{
            const response = await fetch (`http://localhost:3001/${type}/soup/${tableId}`)
            const soupData = await response.json()
            setSoup(soupData)
        } catch (e) {
            setError(e);
        }

    }
    const addSoup = async (id,dishId,type) =>{
        setError(null)
        try{
            await fetch (`http://localhost:3001/${type}/soup/add/${id}/${dishId}`,{
                method: 'POST',
            })
            await loadSoup(id,type)
        } catch (e) {
            setError(e);
        }
    }
    const deleteSoup = async (id,dishId,type) =>{
        setError(null)
        try{
            await fetch (`http://localhost:3001/${type}/soup/delete/${id}/${dishId}`,{
                method: 'POST',
            })
            await loadSoup(id,type)
        } catch (e) {
            setError(e);
        }
    }
    const loadStarter = async (id,type) =>{
        setError(null)
        try{
            const response = await fetch (`http://localhost:3001/${type}/starter/${id}`)
            const starterData = await response.json()
            setStarter(starterData)
        } catch (e) {
            setError(e);
        }
    }
    const addStarter = async (id,dishId,type) =>{
        setError(null)
        try{
            await fetch (`http://localhost:3001/${type}/starter/add/${id}/${dishId}`,{
                method: 'POST',
            })
            await loadStarter(id,type)
        } catch (e) {
            setError(e);
        }
    }
    const deleteStarter = async (id,dishId,type) =>{
        setError(null)
        try{
            await fetch (`http://localhost:3001/${type}/starter/delete/${id}/${dishId}`,{
                method: 'POST',
            })
            await loadStarter(id,type)
        } catch (e) {
            setError(e);
        }
    }
    const loadMain = async (id,type) =>{
        setError(null)
        try{
            const response = await fetch (`http://localhost:3001/${type}/main/${id}`)
            const mainData = await response.json()
            setMain(mainData)
        } catch (e) {
            setError(e);
        }
    }
    const addMain = async (id,dishId,type) =>{
        setError(null)
        try{
            await fetch (`http://localhost:3001/${type}/main/add/${id}/${dishId}`,{
                method: 'POST',
            })
            await loadMain(id,type)
        } catch (e) {
            setError(e);
        }
    }
    const deleteMain = async (id,dishId,type) =>{
        setError(null)
        try{
            await fetch (`http://localhost:3001/${type}/main/delete/${id}/${dishId}`,{
                method: 'POST',
            })
            await loadMain(id,type)
        } catch (e) {
            setError(e);
        }
    }
    const loadMenu = async (tableId) =>{
        setError(null)
        try{
            const response = await fetch (`http://localhost:3001/restaurantCommand/menu/${tableId}`)
            const menuData = await response.json()
            setMenu(menuData)
        } catch (e) {
            setError(e);
        }
    }
    const addMenu = async (tableId,dishId) =>{
        setError(null)
        try{
            await fetch (`http://localhost:3001/restaurantCommand/menu/add/${tableId}/${dishId}`,{
                method: 'POST',
            })
            await loadMenu(tableId)
        } catch (e) {
            setError(e);
        }
    }
    const deleteMenu = async (tableId,dishId) =>{
        setError(null)
        try{
            await fetch (`http://localhost:3001/restaurantCommand/menu/delete/${tableId}/${dishId}`,{
                method: 'POST',
            })
            await loadMenu(tableId)
        } catch (e) {
            setError(e);
        }
    }
    const deleteAll = async (id,type) =>{
        setError(null)
        try{
            await fetch (`http://localhost:3001/${type}/deleteAll/${id}`,{
                method: 'POST',
            })
            await loadSoup(id,type)
            await loadStarter(id,type)
            await loadMain(id,type)
            await loadMenu(id)
        } catch (e) {
            setError(e);
        }
    }
    const showKitchen = async (id,type) =>{
        setError(null)
        try{
            await fetch (`http://localhost:3001/${type}/showKitchen/${id}`,{
                method: 'POST',
            })
        } catch (e) {
            setError(e);
        }
    }
    const setTime = async (id,time) =>{
        setError(null)
        try{
            await fetch (`http://localhost:3001/takeAway/setTime/${id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    time: time,
                }),
            })
        } catch (e) {
            setError(e);
        }
    }
    const getTime = async (id) =>{
        setError(null)
        try{
            const response = await fetch (`http://localhost:3001/takeAway/getTime/${id}`)
            const timeData = await response.json()
            setInputTime(timeData[0].wantedTime)
        } catch (e) {
            setError(e);
        }
    }

    const contextValue = {
        dish,
        soup,
        starter,
        main,
        menu,
        error,
        number,
        takeAway,
        setTakeAway,
        addTakeAway,
        loadTakeAway,
        loadKitchenData,
        deleteAll,
        showKitchen,
        loadDish,
        loadSoup,
        addSoup,
        deleteSoup,
        loadStarter,
        addStarter,
        deleteStarter,
        loadMain,
        addMain,
        deleteMain,
        loadMenu,
        addMenu,
        deleteMenu,
        inputText,
        inputTime,
        inputTimeHandler,
        inputHandler,
        inputButton,
        clearSearchbar,
        setTime,
        getTime,
        filteredData,
    };

    return (
        <CommandContext.Provider value={contextValue}>
            {children}
        </CommandContext.Provider>
    );
}
