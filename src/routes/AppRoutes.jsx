import { Route, Routes } from "react-router-dom"
import SignupPage from "../pages/SignupPage/SignupPage"


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/signup" element={<SignupPage />}></Route>
        </Routes>
    )
}
export default AppRoutes