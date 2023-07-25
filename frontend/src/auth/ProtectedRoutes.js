import {Outlet,Navigate} from "react-router"



const ProtectedRoutes = () => {
    
    return sessionStorage.getItem("token") !== null && sessionStorage.getItem("token") !== 'undefined' ? <Outlet/> : <Navigate to="/auth"/>;
    
}

export default ProtectedRoutes;