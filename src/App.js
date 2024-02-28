import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Home from "./pages/Home/Home";
import {Footer} from "./components/Footer/Footer";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";


const Layout = () => {
    return (
        <div className='app'>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/products",
                element: <Products/>
            },
            {
                path: "/product/:id",
                element: <Product/>
            },
        ]
    },
]);

const App = () => {


    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
};

export default App;