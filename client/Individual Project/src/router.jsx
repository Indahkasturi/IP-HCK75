import {createBrowserRouter,  } from "react-router-dom"
import Register from "./Page/register"
import Login from "./Page/login"
import Home from "./Page/home"
import Cart from "./Page/cart"



const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/cart",
        element: <Cart/>
    },

])
export default router