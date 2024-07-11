import { Outlet } from 'react-router-dom' // gives us all/any pages using the MainLayout
import NavBar from '../components/NavBar'
import { ToastContainer } from 'react-toastify' //simply to give a toast message to user when something they want to do is done/not
// import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/ReactToastify.css'

const MainLayout = () =>{
    return (
        <>
            <NavBar></NavBar>
            <Outlet/>
            <ToastContainer/>
        </>
    )
}

export default MainLayout