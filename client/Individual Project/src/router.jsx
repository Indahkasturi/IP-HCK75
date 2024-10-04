import {createBrowserRouter, redirect,  } from "react-router-dom"
import Register from "./Page/register"
import Login from "./Page/login"
import Home from "./Page/home"
import Cart from "./Page/cart"
import Admin from "./Page/component/adminOnly"
import Add from "./Page/formAddAlbum"
import Update from "./Page/component/updateAlbum"
import RootLayout from "./layout/rootLayout"



const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>,
    //     loader: () => {
    //         let access_token = localStorage.getItem("access_token");
    //         if (access_token) {
    //           throw redirect("/");
    //         }
    //         return null;
    //       },
    },
    {
        path: '/',
        element: <RootLayout/>,
        loader: () => {
            let access_token = localStorage.getItem("access_token");
            if (!access_token) {
              throw redirect("/login");
            }
            return null;
          },
          children:[
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/cart",
                element: <Cart/>
            },
            {
                path: "/admin",
                element: <Admin/>
            },
            {
                path: "/addAlbum",
                element: <Add/>
            },
            {
                path: "/update/:id",
                element: <Update/>
            },
          ]
    },
   


])
export default router