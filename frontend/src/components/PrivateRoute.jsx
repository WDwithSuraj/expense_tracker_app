import { Navigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children }) => {

    const jwtToken = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"))

    return (jwtToken && user) ? children : <Navigate state={location.pathname} to={"/"} />


}
