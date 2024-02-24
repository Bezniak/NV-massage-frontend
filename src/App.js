import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";


const Layout = () => {
    return (
        <div className='app'>
            <Navbar/>
            <Outlet/>
            <Footer/>
            <Footer/>
            <Footer/>
            <Footer/>
            <Footer/>
            <Footer/>
            <Footer/>
            <Footer/>
            <Footer/>
            <Footer/>
            <Footer/>
            <Footer/>
            <Footer/>
            <Footer/>
            <Footer/>
            <Footer/>
            <Footer/>
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
            // {
            //     path: "/products/:id",
            //     element: <Products/>
            // },
            // {
            //     path: "/product/:id",
            //     element: <Product/>
            // },
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