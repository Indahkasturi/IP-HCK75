import { Outlet } from "react-router-dom";
import Navbar from "../Page/component/navbar";

export default function RootLayout(){
    return(
     <> 
     <Navbar/>
     <Outlet/>
     </>
    )
}