import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Footer1 from "./components/Footer/Footer";


const Layout = () => {
    return (
        <div className='app'>
            <Navbar/>
            <Outlet/>
            <Footer1/>
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