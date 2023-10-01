import { Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import { SignUp } from "../pages/Signup"
import { Dashboard } from "../pages/Dashboard"
import { PrivateRoute } from "./PrivateRoute"

export const AllPages = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /> </PrivateRoute>} />
        </Routes>
    )
}
