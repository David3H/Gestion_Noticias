import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
    //leer token estatico en el navegador
    const isLogin = localStorage.getItem('isAuth') === "true"
    //Validar si no esta logeado
    if (!isLogin) {
        return <Navigate to="/login" replace />
    }
    //Si esta logueado se permite el acceso al panel de control
    return children
}

export default ProtectedRoute