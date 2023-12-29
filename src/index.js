import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import HomePage from './HomePage/HomePage';
import reportWebVitals from './reportWebVitals';
import CookerPage from "./CookerPage/CookerPage";
import WaiterPage from "./WaiterPage/WaiterPage";
import CommandPage from "./WaiterPage/CommandPage/CommandPage"
import TakeAwayCommandPage from "./WaiterPage/TakeAwayPage/TakeAwayCommandPage"
import TakeAwayCommandView from "./WaiterPage/TakeAwayPage/TakeAwayCommandView/TakeAwayCommandView";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path:"/serveur",
        element:<WaiterPage/>,
    },
    {
        path:"/cuisine",
        element:<CookerPage/>,
    },
    {
        path:"/:id/commande",
        element:<CommandPage/>
    },
    {
        path:"/:id/emporter",
        element:<TakeAwayCommandPage/>
    },
    {
        path:"/:id/emporter/détails",
        element:<TakeAwayCommandView/>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
