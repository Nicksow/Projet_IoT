import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import HomePage from './HomePage/HomePage';
import reportWebVitals from './reportWebVitals';
import CookerPage from "./CookerPage/CookerPage";
import WaiterPage from "./WaiterPage/WaiterPage";
import CommandPage from "./WaiterPage/CommandPage/CommandPage"

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
    }
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
