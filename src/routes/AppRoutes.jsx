import { Route, Routes } from "react-router-dom"
import CreateQuizPage from "../pages/CreateQuizPage/CreateQuizPage"
import HomePage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignupPage from "../pages/SignupPage/SignupPage"


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/quizzes/create" element={<CreateQuizPage />}></Route>
        </Routes>
    )
}
export default AppRoutes