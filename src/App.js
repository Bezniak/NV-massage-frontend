import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import {Faq} from "./components/FAQ/Faq";
import {AboutUs} from "./components/AboutUs/AboutUs";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import Reviews from "./components/Reviews/Reviews";
import Book from "./components/Book/Book";
import Location from "./components/Location/Location";
import MemberShip from "./components/MemberShip/MemberShip";


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
        errorElement: <NotFound/>,
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
            {
                path: "/faq",
                element: <Faq/>
            },
            {
                path: "/aboutUs",
                element: <AboutUs/>
            },
            {
                path: "/privacyPolicy",
                element: <PrivacyPolicy/>
            },
            {
                path: "/reviews",
                element: <Reviews/>
            },
            {
                path: "/book",
                element: <Book/>
            },
            {
                path: "/location",
                element: <Location/>
            },
            {
                path: "/memberShip",
                element: <MemberShip/>
            },
            {
                path: "*",
                element: <NotFound/>
            },
        ]
    },
    {
        path: "*",
        element: <Layout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: "*",
                element: <NotFound/>
            }
        ]
    }
]);

const App = () => {
    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
};

export default App;