import { isAuth } from "../utils";
import { Navigate } from "react-router-dom";

const AuthRoute =({children}) => {
    return !isAuth() ? <Navigate to='./login' replace/> :<>{children}</>
}

export {AuthRoute} 