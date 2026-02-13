import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import { Home } from "./pages"


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
         <Route path="/" element={<Home/>}></Route>
        </>
    )
) 

const Router = ()=>{
    return(
        <>
            <RouterProvider router={router}/>
            <ToastContainer/>
        </>
    )
}

export default Router